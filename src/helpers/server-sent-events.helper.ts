export type ProcessStreamHandlers = {
  // Handlers for different event types
  onChunk?: (content: string) => void;
  onTools?: (toolUses: string[], toolOutputs: string[]) => void;
  onEnd?: () => void;
  onError?: (error: unknown, line: string) => void;

  // For collecting tools data when not immediately sending
  collectToolUses?: boolean;
  collectToolOutputs?: boolean;
};

/**
 * Processes an SSE (Server-Sent Events) stream and handles different event types
 * @param reader The ReadableStreamDefaultReader to read from
 * @param handlers Object containing handlers for different event types
 * @returns Promise that resolves when stream processing is complete
 */
export async function processSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  handlers: ProcessStreamHandlers
): Promise<{ toolUses: string[]; toolOutputs: string[] }> {
  const decoder = new TextDecoder();
  let done = false;

  // For collecting tool data if needed
  const toolUses: string[] = [];
  const toolOutputs: string[] = [];

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;

    if (done) {
      // Stream is done
      if (handlers.onEnd) {
        handlers.onEnd();
      }
      break;
    }

    if (value) {
      const chunk = decoder.decode(value);
      console.log("chunk:", chunk);
      const lines = chunk.split("\n\n");

      console.log("lines:", lines);

      for (const line of lines) {
        if (!line.trim() || !line.startsWith("data:")) continue;

        try {
          const data = JSON.parse(line.substring(6));

          if (data.type === "chunk" && handlers.onChunk) {
            handlers.onChunk(
              data.content.replace("\r", "").replace("\n", "").replace("\t", "")
            );
          } else if (data.type === "tools" && handlers.onTools) {
            handlers.onTools(data.toolUses || [], data.toolOutputs || []);
          } else if (data.type === "end" && handlers.onEnd) {
            handlers.onEnd();
            break;
          }
        } catch (err) {
          if (handlers.onError) {
            handlers.onError(err, line);
          } else {
            console.error("Error parsing stream data:", err, line);
          }
        }
      }
    }
  }

  return { toolUses, toolOutputs };
}

/**
 * Helper for handling SSE stream in controller context (for ReadableStream)
 * @param reader The reader from fetch response body
 * @param controller ReadableStreamDefaultController
 * @returns Promise with collected tool data
 */
export async function processSSEStreamForController(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  controller: ReadableStreamDefaultController
): Promise<{ toolUses: string[]; toolOutputs: string[] }> {
  const toolUses: string[] = [];
  const toolOutputs: string[] = [];

  return processSSEStream(reader, {
    onChunk: (content) => {
      controller.enqueue(
        new TextEncoder().encode(
          `data: ${JSON.stringify({ type: "chunk", content })}\n\n`
        )
      );
    },
    onEnd: () => {
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

      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({ type: "end" })}\n\n`)
      );
      controller.close();
    },
    onError: (error) => {
      console.error("Stream processing error:", error);
      controller.error(error);
    },
    collectToolUses: true,
    collectToolOutputs: true,
  });
}
