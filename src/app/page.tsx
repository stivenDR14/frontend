"use client";

import { useState, useEffect } from "react";
import { UseRealtimeChat } from "./hooks/use-realtime-chat.hook";

export default function Home() {
  const sessionId = "user-" + Math.random().toString(36).substring(7);
  const [query, setQuery] = useState("");
  const [responseChunks, setResponseChunks] = useState<string>("");
  const [toolUses, setToolUses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [toolOutputs, setToolOutputs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { connect } = UseRealtimeChat(
    setError,
    setIsStreaming,
    setResponseChunks,
    setToolUses,
    setToolOutputs,
    sessionId,
    query
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Resetear estados
    setIsLoading(true);
    setResponseChunks("");
    setToolUses([]);
    setToolOutputs([]);
    setError(null);

    // Conectar al servidor
    connect();
  };

  // Actualizar estado de carga cuando finaliza streaming
  useEffect(() => {
    if (!isStreaming && isLoading) {
      setIsLoading(false);
    }
  }, [isStreaming, isLoading]);

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SuperCar Assistant</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about cars..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading || isStreaming}
            className="bg-primary-500 dark:bg-secondary-700 text-white px-4 py-2 rounded hover:bg-primary-600 dark:hover:bg-secondary-600 disabled:bg-secondary-400 dark:disabled:bg-secondary-800 transition-colors"
          >
            {isLoading ? "Sending..." : isStreaming ? "Receiving..." : "Send"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-error-500/20 text-error-500 rounded">
          Error: {error}
        </div>
      )}

      <div className="flex-1 overflow-auto border rounded p-4">
        {responseChunks !== "" ? (
          <div className="mb-4">{responseChunks}</div>
        ) : (
          <p className="text-secondary-500 mb-4">
            Ask a question to get started.
          </p>
        )}

        {/* Show tools used */}
        {toolUses.length > 0 && (
          <div className="mt-4 p-3 bg-secondary-800 rounded">
            <h3 className="font-bold mb-2">Tools Used:</h3>
            <ul className="list-disc pl-5">
              {toolUses.map((tool, index) => (
                <li key={`tool-${index}`} className="mb-1">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show tool results */}
        {toolOutputs.length > 0 && (
          <div className="mt-4 p-3 bg-secondary-800 rounded">
            <h3 className="font-bold mb-2">Tool Results:</h3>
            <ul className="list-disc pl-5">
              {toolOutputs.map((output, index) => (
                <li key={`output-${index}`} className="mb-1">
                  {typeof output === "string" && output.startsWith("{")
                    ? JSON.parse(output).output
                    : output}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
