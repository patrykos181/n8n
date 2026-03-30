-- Billing foundation: plans, subscriptions, usage metering, dunning and portal history

create table if not exists billing_plan (
  id bigserial primary key,
  code text unique not null,
  display_name text not null,
  price_cents_monthly integer not null,
  trial_days integer not null default 0,
  limits_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists tenant_subscription (
  id bigserial primary key,
  tenant_id uuid not null,
  plan_code text not null references billing_plan(code),
  status text not null,
  billing_provider_customer_id text,
  billing_provider_subscription_id text,
  trial_ends_at timestamptz,
  current_period_starts_at timestamptz,
  current_period_ends_at timestamptz,
  cancel_at_period_end boolean not null default false,
  grace_period_ends_at timestamptz,
  coupon_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id)
);

create table if not exists usage_daily_aggregate (
  id bigserial primary key,
  tenant_id uuid not null,
  usage_date date not null,
  runs_used integer not null default 0,
  tasks_used integer not null default 0,
  users_used integer not null default 0,
  integrations_used integer not null default 0,
  created_at timestamptz not null default now(),
  unique (tenant_id, usage_date)
);

create table if not exists usage_alert (
  id bigserial primary key,
  tenant_id uuid not null,
  usage_date date not null,
  metric text not null,
  threshold_percent integer not null,
  current_usage integer not null,
  limit_value integer not null,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists billing_invoice (
  id bigserial primary key,
  tenant_id uuid not null,
  provider_invoice_id text unique,
  amount_gross_cents integer not null,
  amount_net_cents integer not null,
  vat_rate_percent numeric(5,2) not null default 0,
  vat_id text,
  currency char(3) not null,
  status text not null,
  invoice_pdf_url text,
  hosted_invoice_url text,
  issued_at timestamptz not null,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists payment_event (
  id bigserial primary key,
  tenant_id uuid not null,
  provider_event_id text unique not null,
  provider_type text not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists dunning_attempt (
  id bigserial primary key,
  tenant_id uuid not null,
  subscription_id bigint not null references tenant_subscription(id),
  attempt_no integer not null,
  scheduled_at timestamptz not null,
  attempted_at timestamptz,
  outcome text,
  note text,
  created_at timestamptz not null default now(),
  unique (subscription_id, attempt_no)
);

create table if not exists billing_portal_session (
  id bigserial primary key,
  tenant_id uuid not null,
  provider_session_id text unique not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_usage_daily_aggregate_tenant_date on usage_daily_aggregate(tenant_id, usage_date desc);
create index if not exists idx_billing_invoice_tenant on billing_invoice(tenant_id, issued_at desc);
create index if not exists idx_payment_event_tenant on payment_event(tenant_id, created_at desc);
