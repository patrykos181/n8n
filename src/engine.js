function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout(promiseFactory, timeoutMs) {
  let timeout;
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs);
  });

  try {
    return await Promise.race([promiseFactory(), timeoutPromise]);
  } finally {
    clearTimeout(timeout);
  }
}

export class RunStore {
  constructor() {
    this.runs = new Map();
  }

  createRun({ workflowId, workflowVersion, input }) {
    const runId = crypto.randomUUID();
    const run = {
      runId,
      workflowId,
      workflowVersion,
      status: 'queued',
      input,
      output: null,
      createdAt: new Date().toISOString(),
      logs: [],
      steps: [],
      debugPayload: { input },
    };
    this.runs.set(runId, run);
    return run;
  }

  getRun(runId) {
    return this.runs.get(runId);
  }

  log(runId, entry) {
    const run = this.getRun(runId);
    if (!run) return;
    run.logs.push({ timestamp: new Date().toISOString(), ...entry });
  }

  step(runId, step) {
    const run = this.getRun(runId);
    if (!run) return;
    run.steps.push({ timestamp: new Date().toISOString(), ...step });
  }

  update(runId, patch) {
    const run = this.getRun(runId);
    if (!run) return;
    Object.assign(run, patch);
  }
}

export class WorkerQueue {
  constructor({ runStore, retryPolicy }) {
    this.runStore = runStore;
    this.retryPolicy = {
      maxRetries: 3,
      backoffMs: 100,
      timeoutMs: 5_000,
      ...retryPolicy,
    };
    this.queue = [];
    this.deadLetterQueue = [];
    this.running = false;
  }

  enqueue(job) {
    this.queue.push({ ...job, attempts: 0 });
  }

  async drain() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      await this.executeJob(job);
    }

    this.running = false;
  }

  async executeJob(job) {
    const { maxRetries, backoffMs, timeoutMs } = this.retryPolicy;

    while (job.attempts <= maxRetries) {
      job.attempts += 1;
      this.runStore.log(job.runId, {
        level: 'info',
        message: `Attempt ${job.attempts} for job ${job.runId}`,
      });

      try {
        const result = await withTimeout(() => job.handler(), timeoutMs);
        this.runStore.update(job.runId, { status: 'succeeded', output: result });
        this.runStore.log(job.runId, { level: 'info', message: 'Job succeeded' });
        return;
      } catch (error) {
        this.runStore.log(job.runId, {
          level: 'error',
          message: error.message,
          attempt: job.attempts,
        });

        if (job.attempts > maxRetries) {
          this.runStore.update(job.runId, { status: 'dead-letter', error: error.message });
          this.deadLetterQueue.push({ ...job, error: error.message, failedAt: new Date().toISOString() });
          return;
        }

        const delay = backoffMs * 2 ** (job.attempts - 1);
        await wait(delay);
      }
    }
  }
}

export class WorkflowRuntime {
  constructor({ runStore, workerQueue }) {
    this.runStore = runStore;
    this.workerQueue = workerQueue;
  }

  async execute(workflow, input) {
    const run = this.runStore.createRun({
      workflowId: workflow.id,
      workflowVersion: workflow.version ?? null,
      input,
    });

    this.runStore.update(run.runId, { status: 'running' });

    this.workerQueue.enqueue({
      runId: run.runId,
      handler: async () => {
        const output = await this.walk(workflow, input, run.runId);
        return output;
      },
    });

    await this.workerQueue.drain();
    return this.runStore.getRun(run.runId);
  }

  async walk(workflow, initialPayload, runId) {
    let currentNodeId = workflow.startNodeId;
    let payload = initialPayload;

    while (currentNodeId) {
      const node = workflow.nodes.get(currentNodeId);
      if (!node) throw new Error(`Node '${currentNodeId}' not found`);

      this.runStore.step(runId, {
        nodeId: node.id,
        nodeName: node.name,
        status: 'running',
        payload,
      });

      const result = await node.execute(payload);
      const edge = workflow.edges.get(node.id) ?? {};

      if (node.type === 'condition') {
        currentNodeId = edge[result ? 'true' : 'false'] ?? null;
      } else {
        currentNodeId = edge.next ?? null;
      }

      payload = result;
      this.runStore.step(runId, {
        nodeId: node.id,
        nodeName: node.name,
        status: 'completed',
        payload,
      });
    }

    const run = this.runStore.getRun(runId);
    run.debugPayload.output = payload;
    return payload;
  }

  async replayRun(workflow, runId) {
    const run = this.runStore.getRun(runId);
    if (!run) throw new Error(`Run '${runId}' not found`);
    return this.execute(workflow, run.input);
  }
}
