import { create } from 'zustand';
import type { Workflow, Agent, Tool, Connection } from '../types/workflow';

interface WorkflowState {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  isLoading: boolean;
  error: string | null;
  setCurrentWorkflow: (workflow: Workflow) => void;
  addAgent: (agent: Agent) => void;
  removeAgent: (agentId: string) => void;
  addTool: (agentId: string, tool: Tool) => void;
  removeTool: (agentId: string, toolId: string) => void;
  addConnection: (connection: Connection) => void;
  removeConnection: (connectionId: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflows: [],
  currentWorkflow: null,
  isLoading: false,
  error: null,
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  addAgent: (agent) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            agents: [...state.currentWorkflow.agents, agent],
          }
        : null,
    })),
  removeAgent: (agentId) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            agents: state.currentWorkflow.agents.filter((a) => a.id !== agentId),
          }
        : null,
    })),
  addTool: (agentId, tool) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            agents: state.currentWorkflow.agents.map((agent) =>
              agent.id === agentId
                ? { ...agent, tools: [...agent.tools, tool] }
                : agent
            ),
          }
        : null,
    })),
  removeTool: (agentId, toolId) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            agents: state.currentWorkflow.agents.map((agent) =>
              agent.id === agentId
                ? {
                    ...agent,
                    tools: agent.tools.filter((t) => t.id !== toolId),
                  }
                : agent
            ),
          }
        : null,
    })),
  addConnection: (connection) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            connections: [...state.currentWorkflow.connections, connection],
          }
        : null,
    })),
  removeConnection: (connectionId) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? {
            ...state.currentWorkflow,
            connections: state.currentWorkflow.connections.filter(
              (c) => c.id !== connectionId
            ),
          }
        : null,
    })),
}));