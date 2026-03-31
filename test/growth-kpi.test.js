import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateCac,
  calculateLtv,
  calculateMrr,
  calculateNrr,
  calculatePaybackPeriodMonths,
  evaluateOperationalAlerts,
} from '../src/growth/kpi.js';

test('calculates core SaaS KPIs using plan formulas', () => {
  const mrr = calculateMrr([
    { monthlyRevenue: 4900 },
    { monthlyRevenue: 19900 },
    { monthlyRevenue: 19900 },
  ]);
  assert.equal(mrr, 44700);

  const cac = calculateCac({ salesAndMarketingCost: 60000, newCustomers: 10 });
  assert.equal(cac, 6000);

  const ltv = calculateLtv({ arpa: 800, grossMarginRate: 0.8, averageCustomerLifetimeMonths: 24 });
  assert.equal(ltv, 15360);

  const payback = calculatePaybackPeriodMonths({ cac, monthlyGrossProfitPerCustomer: 800 });
  assert.equal(payback, 7.5);

  const nrr = calculateNrr({ mrrStart: 100000, expansionMrr: 12000, contractionMrr: 5000, churnMrr: 3000 });
  assert.equal(nrr, 1.04);
});

test('guards against division by zero for CAC, payback and NRR', () => {
  assert.equal(calculateCac({ salesAndMarketingCost: 1000, newCustomers: 0 }), null);
  assert.equal(calculatePaybackPeriodMonths({ cac: 5000, monthlyGrossProfitPerCustomer: 0 }), null);
  assert.equal(calculateNrr({ mrrStart: 0, expansionMrr: 100, contractionMrr: 10, churnMrr: 10 }), null);
});

test('emits operational alerts based on threshold policy from growth plan', () => {
  const alerts = evaluateOperationalAlerts({
    nrrSeries: [0.98, 0.97],
    paybackMonths: 13,
    cacGrowthQoqRate: 0.25,
    monthlyLogoChurnRate: 0.05,
  });

  assert.deepEqual(
    alerts.map((alert) => alert.metric).sort(),
    ['cac', 'logo_churn', 'nrr', 'payback'].sort(),
  );
});
