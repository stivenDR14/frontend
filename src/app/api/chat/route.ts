import { sendQuery } from "../../../services/ai-client";

// This line sets the runtime environment for the API route to "edge".
// Edge runtimes are designed to run closer to the user, providing lower latency and faster response times.
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Extract the query and sessionId from the body
    const { query, sessionId } = await req.json();

    // Use the AI client service instead of direct fetch
    const result = await sendQuery(query, sessionId);

    console.log("result:", result);

    // Return the processed response
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
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
