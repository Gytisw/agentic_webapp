import React from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { AgentType, ToolType, AIProvider } from '../types/workflow';

const agentTypes: { type: AgentType; label: string }[] = [
  { type: 'orchestrator', label: 'Orchestrator' },
  { type: 'web_surfer', label: 'Web Surfer' },
  { type: 'tooling', label: 'Tooling Agent' },
  { type: 'evaluation', label: 'Evaluation Agent' },
  { type: 'coding', label: 'Coding Agent' }
];

const toolTypes: { type: ToolType; label: string }[] = [
  { type: 'db_query', label: 'Database Query' },
  { type: 'email_query', label: 'Email Query' },
  { type: 'format_data', label: 'Format Data' },
  { type: 'input', label: 'Input' },
  { type: 'output', label: 'Output' }
];

const aiProviders: { type: AIProvider; label: string }[] = [
  { type: 'openai', label: 'OpenAI' },
  { type: 'ollama', label: 'Ollama' },
  { type: 'gemini', label: 'Gemini' }
];

export function Sidebar() {
  const addAgent = useWorkflowStore(state => state.addAgent);

  const handleDragStart = (agentType: AgentType) => (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: agentType,
      aiProvider: 'openai' as AIProvider
    }));
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Agents</h2>
          <div className="space-y-2">
            {agentTypes.map(({ type, label }) => (
              <div
                key={type}
                draggable
                onDragStart={handleDragStart(type)}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-move hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Tools</h2>
          <div className="space-y-2">
            {toolTypes.map(({ type, label }) => (
              <div
                key={type}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-move hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">AI Providers</h2>
          <div className="space-y-2">
            {aiProviders.map(({ type, label }) => (
              <div
                key={type}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-move hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}