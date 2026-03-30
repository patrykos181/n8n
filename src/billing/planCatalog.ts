import type { BillingPlan, PlanName } from './types';

export const PLAN_CATALOG: Record<PlanName, BillingPlan> = {
	free: {
		name: 'free',
		displayName: 'Free',
		priceCentsMonthly: 0,
		trialDays: 0,
		limits: {
			runsPerMonth: 100,
			tasksPerRun: 20,
			users: 1,
			integrations: 3,
		},
	},
	pro: {
		name: 'pro',
		displayName: 'Pro',
		priceCentsMonthly: 4900,
		trialDays: 14,
		limits: {
			runsPerMonth: 5_000,
			tasksPerRun: 100,
			users: 5,
			integrations: 20,
		},
	},
	business: {
		name: 'business',
		displayName: 'Business',
		priceCentsMonthly: 19900,
		trialDays: 14,
		limits: {
			runsPerMonth: 50_000,
			tasksPerRun: 500,
			users: 30,
			integrations: 100,
		},
	},
	enterprise: {
		name: 'enterprise',
		displayName: 'Enterprise',
		priceCentsMonthly: 0,
		trialDays: 30,
		limits: {
			runsPerMonth: 'unlimited',
			tasksPerRun: 'unlimited',
			users: 'unlimited',
			integrations: 'unlimited',
		},
	},
};

export const DEFAULT_ALERT_THRESHOLDS = [70, 90, 100];
