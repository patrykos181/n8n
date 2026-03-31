const EPSILON = 1e-9;

const safeDivide = (numerator, denominator) => {
  if (Math.abs(denominator) <= EPSILON) return null;
  return numerator / denominator;
};

export function calculateMrr(activeSubscriptions) {
  return activeSubscriptions.reduce((total, subscription) => total + subscription.monthlyRevenue, 0);
}

export function calculateCac({ salesAndMarketingCost, newCustomers }) {
  return safeDivide(salesAndMarketingCost, newCustomers);
}

export function calculateLtv({ arpa, grossMarginRate, averageCustomerLifetimeMonths }) {
  return arpa * grossMarginRate * averageCustomerLifetimeMonths;
}

export function calculatePaybackPeriodMonths({ cac, monthlyGrossProfitPerCustomer }) {
  return safeDivide(cac, monthlyGrossProfitPerCustomer);
}

export function calculateNrr({
  mrrStart,
  expansionMrr,
  contractionMrr,
  churnMrr,
}) {
  const denominator = mrrStart;
  if (Math.abs(denominator) <= EPSILON) return null;

  return (mrrStart + expansionMrr - contractionMrr - churnMrr) / denominator;
}

export function evaluateOperationalAlerts({
  nrrSeries,
  paybackMonths,
  cacGrowthQoqRate,
  monthlyLogoChurnRate,
  churnBenchmark = 0.03,
}) {
  const alerts = [];

  if (nrrSeries.length >= 2) {
    const [previousMonth, currentMonth] = nrrSeries.slice(-2);
    if (previousMonth < 1 && currentMonth < 1) {
      alerts.push({
        metric: 'nrr',
        severity: 'high',
        message: 'NRR is below 100% for two consecutive months.',
      });
    }
  }

  if (paybackMonths !== null && paybackMonths > 12) {
    alerts.push({
      metric: 'payback',
      severity: 'high',
      message: 'CAC payback period is above 12 months.',
    });
  }

  if (cacGrowthQoqRate > 0.2) {
    alerts.push({
      metric: 'cac',
      severity: 'medium',
      message: 'CAC increased more than 20% quarter over quarter.',
    });
  }

  if (monthlyLogoChurnRate > churnBenchmark) {
    alerts.push({
      metric: 'logo_churn',
      severity: 'high',
      message: 'Monthly logo churn is above the configured benchmark.',
    });
  }

  return alerts;
}
