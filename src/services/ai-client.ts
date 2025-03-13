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
): Promise<StreamResponse> {
  // Configurar los parámetros de la solicitud
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

  console.log("Sending request:", requestOptions);

  // Hacer la solicitud
  const response = await fetch("http://localhost:8000/query", requestOptions);

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  const streamResponse: StreamResponse = {
    tool_use: [],
    tool_output: [],
    chunk: [],
  };

  try {
    // Obtener el texto completo de la respuesta
    const textContent = await response.text();

    // Separar la respuesta en líneas
    const lines = textContent.split("\n");

    // Procesar las líneas en pares (event y data)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!line) continue;

      // Verificar si la línea comienza con "event:"
      if (line.startsWith("event:")) {
        const eventType = line.substring(6);

        // Verificar si la siguiente línea contiene los datos
        if (i + 1 < lines.length) {
          const dataLine = lines[i + 1];

          // Verificar si la línea es de datos
          if (dataLine.startsWith("data:")) {
            const content = dataLine.substring(6);

            // Procesar según el tipo de evento
            if (eventType.includes("chunk")) {
              console.log("content:", content);

              streamResponse.chunk.push(content.replace("\r", ""));
            } else if (eventType.includes("tool_use")) {
              // Asegurarse de que el contenido no esté vacío
              if (content.trim()) {
                streamResponse.tool_use.push(content);
                console.log("Tool use detected:", content);
              }
            } else if (eventType.includes("tool_output")) {
              // Asegurarse de que el contenido no esté vacío
              if (content.trim()) {
                streamResponse.tool_output.push(content);
                console.log("Tool output detected:", content);
              }
            }

            // Avanzar a la siguiente línea (ya procesada)
            i++;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing response:", error);
  }

  return streamResponse;
}
