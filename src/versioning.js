import { validateWorkflow } from './validation.js';

export class WorkflowRepository {
  constructor() {
    this.store = new Map();
  }

  createWorkflow(workflow) {
    const record = {
      workflowId: workflow.id,
      versions: [{ version: 1, workflow, createdAt: new Date().toISOString() }],
      draft: workflow,
      publishedVersion: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.store.set(workflow.id, record);
    return record;
  }

  get(workflowId) {
    const record = this.store.get(workflowId);
    if (!record) throw new Error(`Workflow '${workflowId}' not found`);
    return record;
  }

  saveDraft(workflowId, draftWorkflow) {
    const record = this.get(workflowId);
    record.draft = draftWorkflow;
    record.updatedAt = new Date().toISOString();
    return record;
  }

  publish(workflowId, options = { runTest: null }) {
    const record = this.get(workflowId);
    const validation = validateWorkflow(record.draft);
    if (!validation.valid) {
      throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
    }

    if (options.runTest && !options.runTest(record.draft)) {
      throw new Error('Test run failed. Draft cannot be published');
    }

    const nextVersion = record.versions[record.versions.length - 1].version + 1;
    record.versions.push({
      version: nextVersion,
      workflow: record.draft,
      createdAt: new Date().toISOString(),
    });
    record.publishedVersion = nextVersion;
    record.updatedAt = new Date().toISOString();
    return nextVersion;
  }

  rollback(workflowId, targetVersion) {
    const record = this.get(workflowId);
    const target = record.versions.find((item) => item.version === targetVersion);
    if (!target) {
      throw new Error(`Version '${targetVersion}' not found`);
    }

    record.draft = target.workflow;
    record.publishedVersion = targetVersion;
    record.updatedAt = new Date().toISOString();
    return target.workflow;
  }
}
