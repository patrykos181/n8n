export type PlanName = 'free' | 'pro' | 'business' | 'enterprise';

export interface PlanLimits {
	runsPerMonth: number | 'unlimited';
	tasksPerRun: number | 'unlimited';
	users: number | 'unlimited';
	integrations: number | 'unlimited';
}

export interface BillingPlan {
	name: PlanName;
	displayName: string;
	priceCentsMonthly: number;
	trialDays: number;
	limits: PlanLimits;
}

export type SubscriptionStatus =
	| 'trialing'
	| 'active'
	| 'past_due'
	| 'canceled'
	| 'grace_period'
	| 'downgraded';

export interface UsageSnapshot {
	tenantId: string;
	date: string;
	runsUsed: number;
	tasksUsed: number;
	integrationsUsed: number;
	usersUsed: number;
}

export interface Overages {
	runsExceededBy: number;
	tasksExceededBy: number;
	usersExceededBy: number;
	integrationsExceededBy: number;
}

export interface BillingAlert {
	tenantId: string;
	date: string;
	thresholdPercent: number;
	metric: keyof Omit<PlanLimits, 'tasksPerRun'> | 'tasksPerMonth';
	currentUsage: number;
	limit: number;
}

export interface InvoiceRecord {
	invoiceId: string;
	tenantId: string;
	grossCents: number;
	currency: string;
	vatRatePercent: number;
	vatId?: string;
	couponCode?: string;
	issuedAt: string;
	paidAt?: string;
	status: 'open' | 'paid' | 'void' | 'uncollectible';
	providerInvoiceUrl?: string;
}

export interface DunningPolicy {
	retries: number[];
	gracePeriodDays: number;
	autoDowngradeTo: PlanName;
}
