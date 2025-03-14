import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const UseRealtimeChat = (
  setError: Dispatch<SetStateAction<string | null>>,
  setIsStreaming: Dispatch<SetStateAction<boolean>>,
  setResponseChunks: Dispatch<SetStateAction<string>>,
  setToolUses: Dispatch<SetStateAction<string[]>>,
  setToolOutputs: Dispatch<SetStateAction<string[]>>,
  sessionId: string,
  query: string
) => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `api/chat?query=${encodeURIComponent(
      query
    )}&sessionId=${encodeURIComponent(sessionId)}`;
    console.log("Connecting to:", url);

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    // Agregar listener específico para cada tipo de evento
    eventSource.addEventListener("chunk", (event) => {
      console.log("Chunk event received:", event.data);
      try {
        const content = event.data;
        // Actualizar el estado con el nuevo chunk
        if (content) {
          setResponseChunks((prev) => prev + content.replace(/[\r\n\t]/g, ""));
        }
      } catch (err) {
        console.error("Failed to parse chunk event:", err, event.data);
      }
    });

    eventSource.addEventListener("tool_use", (event) => {
      console.log("Tool use event received:", event);
      try {
        const content = event.data;
        if (content && content.trim()) {
          setToolUses((prev) => [...prev, content]);
        }
      } catch (err) {
        console.error("Failed to parse tool_use event:", err, event.data);
      }
    });

    eventSource.addEventListener("tool_output", (event) => {
      console.log("Tool output event received:", event);
      try {
        const content = event.data;
        if (content && content.trim()) {
          setToolOutputs((prev) => [...prev, content]);
        }
      } catch (err) {
        console.error("Failed to parse tool_output event:", err, event.data);
      }
    });

    eventSource.addEventListener("end", () => {
      console.log("End event received");
      setIsStreaming(false);
      eventSource.close();
    });

    eventSource.addEventListener("init", (event) => {
      console.log("Init event received:", event);
    });

    eventSource.addEventListener("error", (event) => {
      console.log("Error event received:", event);
    });

    eventSource.onopen = () => {
      console.log("EventSource connection opened successfully");
      setIsStreaming(true);
      setError(null);
      reconnectAttemptsRef.current = 0;
    };

    eventSource.onmessage = (event) => {
      console.log("Generic message received:", event);
    };

    eventSource.onerror = (errorEvent) => {
      console.error("EventSource error:", errorEvent);

      // Verificar el estado de readyState para determinar el tipo de error
      if (eventSource.readyState === EventSource.CONNECTING) {
        console.log("Connection is being established...");
      } else if (eventSource.readyState === EventSource.OPEN) {
        console.log("Connection is open but an error occurred");
      } else if (eventSource.readyState === EventSource.CLOSED) {
        console.log("Connection was closed due to an error");
        setIsStreaming(false);
        setError("Connection lost or failed to establish");
      }

      // Intentar obtener más información sobre el error
      if (errorEvent instanceof Event) {
        console.log("Error event properties:", {
          bubbles: errorEvent.bubbles,
          cancelable: errorEvent.cancelable,
          composed: errorEvent.composed,
          currentTarget: errorEvent.currentTarget,
          defaultPrevented: errorEvent.defaultPrevented,
          eventPhase: errorEvent.eventPhase,
          isTrusted: errorEvent.isTrusted,
          target: errorEvent.target,
          timeStamp: errorEvent.timeStamp,
          type: errorEvent.type,
        });
      }
    };
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        console.log("Cleaning up EventSource connection on unmount");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  return { connect };
};
