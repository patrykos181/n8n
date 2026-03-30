import { PLAN_CATALOG, DEFAULT_ALERT_THRESHOLDS } from './planCatalog';
import type {
	BillingAlert,
	DunningPolicy,
	Overages,
	PlanLimits,
	PlanName,
	SubscriptionStatus,
	UsageSnapshot,
} from './types';

const DEFAULT_DUNNING_POLICY: DunningPolicy = {
	retries: [1, 3, 7],
	gracePeriodDays: 7,
	autoDowngradeTo: 'free',
};

const isUnlimited = (value: number | 'unlimited'): value is 'unlimited' => value === 'unlimited';

const exceededBy = (usage: number, limit: number | 'unlimited') => {
	if (isUnlimited(limit)) return 0;
	return Math.max(0, usage - limit);
};

export class BillingDomainService {
	public computeOverages(plan: PlanName, usage: UsageSnapshot): Overages {
		const limits = PLAN_CATALOG[plan].limits;
		return {
			runsExceededBy: exceededBy(usage.runsUsed, limits.runsPerMonth),
			tasksExceededBy: exceededBy(usage.tasksUsed, this.monthlyTaskLimit(limits, usage.runsUsed)),
			usersExceededBy: exceededBy(usage.usersUsed, limits.users),
			integrationsExceededBy: exceededBy(usage.integrationsUsed, limits.integrations),
		};
	}

	public generateUsageAlerts(plan: PlanName, usage: UsageSnapshot, thresholds = DEFAULT_ALERT_THRESHOLDS): BillingAlert[] {
		const limits = PLAN_CATALOG[plan].limits;
		const metrics = [
			{ key: 'runsPerMonth' as const, usage: usage.runsUsed, limit: limits.runsPerMonth },
			{ key: 'users' as const, usage: usage.usersUsed, limit: limits.users },
			{ key: 'integrations' as const, usage: usage.integrationsUsed, limit: limits.integrations },
			{ key: 'tasksPerMonth' as const, usage: usage.tasksUsed, limit: this.monthlyTaskLimit(limits, usage.runsUsed) },
		];

		const alerts: BillingAlert[] = [];
		for (const metric of metrics) {
			if (isUnlimited(metric.limit)) continue;
			for (const thresholdPercent of thresholds) {
				if (metric.usage >= Math.ceil((metric.limit * thresholdPercent) / 100)) {
					alerts.push({
						tenantId: usage.tenantId,
						date: usage.date,
						thresholdPercent,
						metric: metric.key,
						currentUsage: metric.usage,
						limit: metric.limit,
					});
				}
			}
		}

		return alerts;
	}

	public resolveStatusAfterPaymentFailure(
		currentStatus: SubscriptionStatus,
		daysPastDue: number,
		policy: DunningPolicy = DEFAULT_DUNNING_POLICY,
	): SubscriptionStatus {
		if (currentStatus === 'canceled' || currentStatus === 'downgraded') return currentStatus;
		if (daysPastDue <= policy.retries[policy.retries.length - 1]) return 'past_due';
		if (daysPastDue <= policy.gracePeriodDays) return 'grace_period';
		return 'downgraded';
	}

	public monthlyTaskLimit(limits: PlanLimits, currentRuns: number): number | 'unlimited' {
		if (isUnlimited(limits.tasksPerRun) || isUnlimited(limits.runsPerMonth)) return 'unlimited';
		return limits.tasksPerRun * Math.max(1, currentRuns);
	}
}
