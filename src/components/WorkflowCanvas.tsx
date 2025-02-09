import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  Node,
  Edge,
  Connection
} from 'react-flow-renderer';
import { useWorkflowStore } from '../store/workflowStore';

const nodeTypes = {
  // Custom node types will be implemented here
};

export function WorkflowCanvas() {
  const currentWorkflow = useWorkflowStore(state => state.currentWorkflow);
  
  // Convert workflow agents to ReactFlow nodes
  const nodes: Node[] = currentWorkflow?.agents.map(agent => ({
    id: agent.id,
    type: 'agent',
    position: agent.position,
    data: { ...agent }
  })) || [];

  // Convert workflow connections to ReactFlow edges
  const edges: Edge[] = currentWorkflow?.connections.map(conn => ({
    id: conn.id,
    source: conn.source,
    target: conn.target,
    type: conn.type,
    animated: true
  })) || [];

  const onConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return;
    
    useWorkflowStore.getState().addConnection({
      id: `${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      type: 'data'
    });
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="w-full h-[600px]"
      >
        <Background />
        <Controls className="dark:bg-gray-700 dark:text-white" />
        <MiniMap className="dark:bg-gray-700" />
      </ReactFlow>
    </div>
  );
}