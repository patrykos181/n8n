import { INTEGRATIONS } from './integrations.js';

const REQUIRED_CONFIG = {
  trigger: ['event'],
  action: ['operation'],
  transform: ['mapping'],
  condition: ['expression'],
};

export function validateNodeConfig(node) {
  const missingFields = [];
  const required = REQUIRED_CONFIG[node.type] ?? [];

  for (const field of required) {
    if (node.config?.[field] === undefined || node.config?.[field] === null || node.config?.[field] === '') {
      missingFields.push(field);
    }
  }

  if (node.type === 'action' && node.integration) {
    const integration = INTEGRATIONS[node.integration];
    if (!integration) {
      missingFields.push(`integration:${node.integration}`);
    } else if (!integration.actions.includes(node.config.operation)) {
      missingFields.push(`operation:${node.config.operation}`);
    }
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}

export function validateWorkflow(workflow) {
  const errors = [];

  for (const [, node] of workflow.nodes.entries()) {
    const result = validateNodeConfig(node);
    if (!result.valid) {
      errors.push({
        nodeId: node.id,
        nodeName: node.name,
        missingFields: result.missingFields,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
