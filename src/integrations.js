export const INTEGRATIONS = {
  crm: {
    key: 'crm',
    name: 'CRM',
    actions: ['createContact', 'updateDeal', 'upsertLead'],
  },
  email: {
    key: 'email',
    name: 'Email',
    actions: ['sendEmail', 'sendTemplate'],
  },
  slack: {
    key: 'slack',
    name: 'Slack',
    actions: ['sendMessage', 'postChannelNotice'],
  },
  google: {
    key: 'google',
    name: 'Google',
    actions: ['appendSheetRow', 'createCalendarEvent'],
  },
  webhook: {
    key: 'webhook',
    name: 'Custom Webhook',
    actions: ['httpRequest'],
  },
};

export function listIntegrations() {
  return Object.values(INTEGRATIONS);
}
