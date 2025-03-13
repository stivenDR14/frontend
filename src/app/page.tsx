"use client";

import { useState } from "react";
import { StreamResponse } from "../services/ai-client";

export default function Home() {
  const sessionId = "user-" + Math.random().toString(36).substring(7);
  const [query, setQuery] = useState("");
  const [responseChunks, setResponseChunks] = useState<string>("");
  const [toolUses, setToolUses] = useState<string[]>([]);
  const [toolOutputs, setToolOutputs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    setResponseChunks(""); // Clear previous responses
    setToolUses([]);
    setToolOutputs([]);

    try {
      // Call the internal API route instead of the AI client directly
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          sessionId,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Error: ${apiResponse.status}`);
      }

      const response: StreamResponse = await apiResponse.json();
      console.log("Response from API:", response);

      // Actualizar el estado con la respuesta
      setResponseChunks(response.chunk.join(""));

      // Actualizar herramientas utilizadas y sus salidas
      if (response.tool_use.length > 0) {
        setToolUses(response.tool_use);
      }

      if (response.tool_output.length > 0) {
        setToolOutputs(response.tool_output);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-auto border rounded p-4">
        {responseChunks !== "" ? (
          <div className="mb-4">{responseChunks}</div>
        ) : (
          <p className="text-gray-400 mb-4">Ask a question to get started.</p>
        )}

        {/* Mostrar herramientas utilizadas */}
        {toolUses.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
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

        {/* Mostrar resultados de las herramientas */}
        {toolOutputs.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Tool Results:</h3>
            <ul className="list-disc pl-5">
              {toolOutputs.map((output, index) => (
                <li key={`output-${index}`} className="mb-1">
                  {output}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
