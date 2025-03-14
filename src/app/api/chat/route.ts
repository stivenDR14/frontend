import { sendQuery } from "../../../services/ai-client";

// This line sets the runtime environment for the API route to "edge".
// Edge runtimes are designed to run closer to the user, providing lower latency and faster response times.
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Extract the query and sessionId from the body
    const { query, sessionId } = await req.json();

    // Call the sendQuery function with the query and sessionId
    const stream = await sendQuery(query, sessionId);

    // Return the streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
