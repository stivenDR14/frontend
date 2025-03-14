export type ChunkEvent = {
  type: "chunk" | "tool_use" | "tool_output" | "end";
  content: string;
};

export type StreamResponse = {
  tool_use: string[];
  tool_output: string[];
  chunk: string[];
};

export async function sendQuery(
  query: string,
  sessionId: string
): Promise<ReadableStream<ChunkEvent>> {
  // Create a new ReadableStream
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Make the request to the backend API
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            session_id: sessionId,
          }),
        };

        // Fetch from the backend with streaming
        const response = await fetch(
          "http://localhost:8000/query",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        // Get the reader from the response body
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Failed to get reader from response");
        }

        // Tool tracking
        const toolUses = [];
        const toolOutputs = [];

        // Process the stream
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // When done, send any collected tool data
            if (toolUses.length > 0 || toolOutputs.length > 0) {
              controller.enqueue(
                new TextEncoder().encode(
                  `data: ${JSON.stringify({
                    type: "tools",
                    toolUses,
                    toolOutputs,
                  })}\n\n`
                )
              );
            }
            break;
          }

          // Convert the chunk to text
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split("\n");

          // Process the lines to identify events and data
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line) continue;

            if (line.startsWith("event:")) {
              const eventType = line.substring(6).trim();

              // Check if there's a data line after this event
              if (i + 1 < lines.length) {
                const dataLine = lines[i + 1];

                if (dataLine.startsWith("data:")) {
                  const content = dataLine.substring(6);

                  // Handle different event types
                  if (eventType.includes("chunk")) {
                    // Send the chunk directly to the client
                    controller.enqueue(
                      new TextEncoder().encode(
                        `data: ${JSON.stringify({
                          type: "chunk",
                          content,
                        })}\n\n`
                      )
                    );
                  } else if (eventType.includes("tool_use") && content.trim()) {
                    toolUses.push(content);
                  } else if (
                    eventType.includes("tool_output") &&
                    content.trim()
                  ) {
                    toolOutputs.push(content);
                  }

                  i++; // Skip the data line
                }
              }
            }
          }
        }

        // Signal that we're done
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ type: "end" })}\n\n`
          )
        );
        controller.close();
      } catch (error) {
        console.error("Stream processing error:", error);
        controller.error(error);
      }
    },
  });
  return stream;
}
