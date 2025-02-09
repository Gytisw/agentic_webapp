export type AgentType = 'orchestrator' | 'web_surfer' | 'tooling' | 'evaluation' | 'coding';
export type ToolType = 'db_query' | 'email_query' | 'format_data' | 'input' | 'output';
export type AIProvider = 'openai' | 'ollama' | 'gemini';

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  tools: Tool[];
  aiProvider: AIProvider;
  position: { x: number; y: number };
}

export interface Tool {
  id: string;
  type: ToolType;
  name: string;
  config: Record<string, any>;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  type: 'data' | 'control';
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  agents: Agent[];
  connections: Connection[];
  created: Date;
  modified: Date;
}