import React, { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';

interface ChatMessage {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
}

export function ChatWindow() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [messages] = useState<ChatMessage[]>([]);
  const [verboseLogging, setVerboseLogging] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ${
      isExpanded ? 'h-80' : 'h-12'
    }`}>
      <div 
        className="p-4 border-b dark:border-gray-700 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="font-semibold">Agent Communication</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={verboseLogging}
              onChange={(e) => setVerboseLogging(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm">Verbose Logging</span>
          </label>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 h-[calc(100%-4rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No messages yet. Start the workflow to see agent communication.
              </p>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {message.from} → {message.to}
                  </div>
                  <div className="mt-1">{message.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}