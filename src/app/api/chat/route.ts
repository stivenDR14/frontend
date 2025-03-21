import { env } from "@/config/env";
import { encodeSSE } from "@/helpers/sse.helper";
import { NextRequest, NextResponse } from "next/server";

// Set the runtime environment for the API route to "edge" for lower latency and faster response times
export const runtime = "edge";

// Force the route to be dynamic, ensuring it always fetches fresh data
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const sessionId = searchParams.get("sessionId");
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

    // Create a new ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await fetch(env.AI_CLIENT_ENDPOINT, requestOptions);

          if (!response.ok) {
            const errorBody = await response.text();
            console.error("API error message:", errorBody);
            controller.enqueue(
              encodeSSE("error", `API responded with status ${response.status}`)
            );
            controller.close();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) {
            controller.enqueue(encodeSSE("error", "No data received from API"));
            controller.close();
            return;
          }

          // Notify client of successful connection
          controller.enqueue(encodeSSE("init", "Connecting..."));

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }

          controller.close();
          reader.releaseLock();
        } catch (error) {
          console.error("Stream error:", error);
          controller.enqueue(encodeSSE("error", "Stream interrupted"));
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
