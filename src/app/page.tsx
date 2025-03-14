"use client";

import { useState, useRef } from "react";

export default function Home() {
  const sessionId = "user-" + Math.random().toString(36).substring(7);
  const [query, setQuery] = useState("");
  const [responseChunks, setResponseChunks] = useState<string>("");
  const [toolUses, setToolUses] = useState<string[]>([]);
  const [toolOutputs, setToolOutputs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setIsLoading(true);
    setResponseChunks(""); // Clear previous responses
    setToolUses([]);
    setToolOutputs([]);

    try {
      setIsStreaming(true);

      // Call the internal API route with streaming
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          sessionId,
        }),
        signal,
      });

      if (!apiResponse.ok) {
        throw new Error(`Error: ${apiResponse.status}`);
      }

      // Get the reader from the response body
      const reader = apiResponse.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from response");
      }

      // Process the stream
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n");

          for (const line of lines) {
            if (!line.trim() || !line.startsWith("data:")) continue;

            try {
              const data = JSON.parse(line.substring(6));

              if (data.type === "chunk") {
                console.log("chunk:", data.content);

                setResponseChunks(
                  (prev) =>
                    prev +
                    data.content
                      .replace("\r", "")
                      .replace("\n", "")
                      .replace("\t", "")
                );
              } else if (data.type === "tools") {
                if (data.toolUses && data.toolUses.length > 0) {
                  setToolUses(data.toolUses);
                }
                if (data.toolOutputs && data.toolOutputs.length > 0) {
                  setToolOutputs(data.toolOutputs);
                }
              } else if (data.type === "end") {
                // End of stream
                break;
              }
            } catch (err) {
              console.error("Error parsing stream data:", err, line);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error fetching response:", error);
      } else {
        console.log("Aborted");
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
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
            disabled={isLoading || isStreaming}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Sending..." : isStreaming ? "Receiving..." : "Send"}
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-auto border rounded p-4">
        {responseChunks !== "" ? (
          <div className="mb-4">{responseChunks}</div>
        ) : (
          <p className="text-gray-400 mb-4">Ask a question to get started.</p>
        )}

        {/* Show tools used */}
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

        {/* Show tool results */}
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
