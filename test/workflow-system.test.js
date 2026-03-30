import test from 'node:test';
import assert from 'node:assert/strict';

import { WorkflowBuilder, hydrateWorkflow } from '../src/workflow.js';
import { WorkflowRepository } from '../src/versioning.js';
import { listIntegrations } from '../src/integrations.js';
import { RunStore, WorkerQueue, WorkflowRuntime } from '../src/engine.js';

function sampleWorkflow() {
  const builder = new WorkflowBuilder('Lead qualification');

  const triggerId = builder.addNode({
    name: 'Webhook Trigger',
    type: 'trigger',
    config: { event: 'lead.created' },
    execute: async (payload) => payload,
  });

  const transformId = builder.addNode({
    name: 'Normalize Lead',
    type: 'transform',
    config: { mapping: 'normalizeFields' },
    execute: async (payload) => ({ ...payload, normalized: true }),
  });

  const conditionId = builder.addNode({
    name: 'Check Budget',
    type: 'condition',
    config: { expression: 'budget > 1000' },
    execute: async (payload) => payload.budget > 1000,
  });

  const actionId = builder.addNode({
    name: 'Push to CRM',
    type: 'action',
    integration: 'crm',
    config: { operation: 'upsertLead' },
    execute: async (payload) => ({ ...payload, sentToCrm: true }),
  });

  builder.connect(triggerId, 'next', transformId);
  builder.connect(transformId, 'next', conditionId);
  builder.connect(conditionId, 'true', actionId);

  return hydrateWorkflow(builder.build());
}

test('builder supports trigger/action/transform/condition nodes', async () => {
  const workflow = sampleWorkflow();
  assert.equal(workflow.nodes.size, 4);
  assert.ok(workflow.startNodeId);
});

test('versioning supports draft/publish/rollback with validation and test run', async () => {
  const workflow = sampleWorkflow();
  const repo = new WorkflowRepository();
  repo.createWorkflow(workflow);

  const nextDraft = { ...workflow, nodes: new Map(workflow.nodes), edges: new Map(workflow.edges) };

  repo.saveDraft(workflow.id, nextDraft);

  const version = repo.publish(workflow.id, {
    runTest: () => true,
  });

  assert.equal(version, 2);

  const rolledBack = repo.rollback(workflow.id, 1);
  assert.equal(rolledBack.id, workflow.id);
});

test('worker queue handles retries, backoff and dead-letter queue', async () => {
  const runStore = new RunStore();
  const queue = new WorkerQueue({
    runStore,
    retryPolicy: {
      maxRetries: 1,
      backoffMs: 1,
      timeoutMs: 20,
    },
  });

  const run = runStore.createRun({ workflowId: 'wf', workflowVersion: 1, input: {} });

  queue.enqueue({
    runId: run.runId,
    handler: async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return { ok: true };
    },
  });

  await queue.drain();

  assert.equal(queue.deadLetterQueue.length, 1);
  assert.equal(runStore.getRun(run.runId).status, 'dead-letter');
});

test('runtime stores per-run logs, step statuses, debug payload and supports replay', async () => {
  const workflow = sampleWorkflow();
  const runStore = new RunStore();
  const queue = new WorkerQueue({ runStore, retryPolicy: { maxRetries: 0, timeoutMs: 100 } });
  const runtime = new WorkflowRuntime({ runStore, workerQueue: queue });

  const run = await runtime.execute(workflow, { budget: 2500, email: 'x@example.com' });

  assert.equal(run.status, 'succeeded');
  assert.ok(run.logs.length > 0);
  assert.ok(run.steps.length >= 2);
  assert.ok(run.debugPayload.output);

  const replay = await runtime.replayRun(workflow, run.runId);
  assert.equal(replay.status, 'succeeded');
});

test('integration catalog exposes required providers', async () => {
  const integrations = listIntegrations().map((item) => item.key);
  assert.deepEqual(integrations.sort(), ['crm', 'email', 'google', 'slack', 'webhook'].sort());
});
