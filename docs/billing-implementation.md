# Billing implementation blueprint

## 1) Plans and limits

Plans implemented in `src/billing/planCatalog.ts`:
- Free
- Pro
- Business
- Enterprise

Limits enforced per tenant:
- runs per month
- tasks per run (materialized as tasks per month for alerting)
- users
- integrations

## 2) Payment integration (subscription, trial, coupons, VAT invoices, billing webhooks)

Core entities included in migration:
- `tenant_subscription`: active subscription state + provider subscription IDs + trial window + coupon
- `billing_invoice`: invoice state with VAT metadata and hosted/PDF URLs
- `payment_event`: webhook ingestion ledger (idempotent by provider event id)
- `billing_portal_session`: allows secure handoff to external billing portal

Recommended webhook events to support (provider-specific mapping):
- `subscription.created`
- `subscription.updated`
- `invoice.created`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.discount.created`

## 3) Usage metering per tenant with daily aggregates + overage alerts

`usage_daily_aggregate` stores daily counters.

`BillingDomainService` exposes:
- `computeOverages` to evaluate current usage over plan caps
- `generateUsageAlerts` with default thresholds 70/90/100%

## 4) Dunning + grace period + downgrade/upgrade flow

`dunning_attempt` table stores retry schedule and outcomes.

`resolveStatusAfterPaymentFailure` flow:
- while inside retry windows -> `past_due`
- after retries but inside grace period -> `grace_period`
- after grace period -> `downgraded`

Upgrade/downgrade guidance:
- upgrade: immediate entitlement raise, prorated invoice event from provider
- downgrade: set `cancel_at_period_end=true`; on period close move to target plan
- forced downgrade after failed dunning: set plan to `free`

## 5) Customer billing portal + invoice/payment history

Portal flow:
1. Backend creates provider portal session and saves in `billing_portal_session`.
2. Frontend redirects customer to provider-hosted billing page.
3. Invoice and payment history read from `billing_invoice` + `payment_event`.

Suggested REST routes:
- `GET /api/billing/plans`
- `GET /api/billing/subscription`
- `POST /api/billing/checkout`
- `POST /api/billing/portal-session`
- `GET /api/billing/invoices`
- `GET /api/billing/payments`
- `POST /api/billing/webhooks/:provider`
