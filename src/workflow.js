const NODE_TYPES = new Set(['trigger', 'action', 'transform', 'condition']);

export class WorkflowBuilder {
  constructor(name) {
    this.workflow = {
      id: crypto.randomUUID(),
      name,
      nodes: new Map(),
      edges: new Map(),
      startNodeId: null,
      createdAt: new Date().toISOString(),
    };
  }

  addNode(node) {
    if (!NODE_TYPES.has(node.type)) {
      throw new Error(`Unsupported node type: ${node.type}`);
    }

    const normalizedNode = {
      id: node.id ?? crypto.randomUUID(),
      name: node.name,
      type: node.type,
      integration: node.integration ?? null,
      config: node.config ?? {},
      execute: node.execute,
      outputs: node.outputs ?? ['next'],
    };

    if (typeof normalizedNode.execute !== 'function') {
      throw new Error(`Node '${normalizedNode.name}' must provide execute function`);
    }

    this.workflow.nodes.set(normalizedNode.id, normalizedNode);
    this.workflow.edges.set(normalizedNode.id, {});

    if (!this.workflow.startNodeId && normalizedNode.type === 'trigger') {
      this.workflow.startNodeId = normalizedNode.id;
    }

    return normalizedNode.id;
  }

  connect(fromNodeId, output, toNodeId) {
    if (!this.workflow.nodes.has(fromNodeId)) {
      throw new Error(`Source node '${fromNodeId}' does not exist`);
    }

    if (!this.workflow.nodes.has(toNodeId)) {
      throw new Error(`Target node '${toNodeId}' does not exist`);
    }

    const routing = this.workflow.edges.get(fromNodeId);
    routing[output] = toNodeId;
    return this;
  }

  build() {
    if (!this.workflow.startNodeId) {
      throw new Error('Workflow requires at least one trigger node');
    }

    return {
      ...this.workflow,
      nodes: [...this.workflow.nodes.entries()].map(([id, node]) => [id, { ...node }]),
      edges: [...this.workflow.edges.entries()].map(([id, edge]) => [id, { ...edge }]),
    };
  }
}

export function hydrateWorkflow(serializedWorkflow) {
  return {
    ...serializedWorkflow,
    nodes: new Map(serializedWorkflow.nodes),
    edges: new Map(serializedWorkflow.edges),
  };
}
