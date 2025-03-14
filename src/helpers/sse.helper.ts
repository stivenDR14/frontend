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
 * Encode a message as a Server-Sent Event
 *
 * @param event The event type (e.g., "chunk", "tool_use", etc.)
 * @param data The data to send
 * @returns Encoded SSE message as Uint8Array
 */
export function encodeSSE(event: string, data: string): Uint8Array {
  // Format: "event: event_type\ndata: data_content\n\n"
  let message = "";

  // Add the event type
  message += `event: ${event}\n`;

  // Add the data (either stringified if object, or as is if string)
  const dataContent = typeof data === "object" ? JSON.stringify(data) : data;
  message += `data: ${dataContent}\n\n`;

  return new TextEncoder().encode(message);
}
