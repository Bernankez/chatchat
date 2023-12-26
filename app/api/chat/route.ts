/**
 * ref https://sdk.vercel.ai/docs/guides/providers/openai
 */
// import { ProxyAgent, fetch, type RequestInit } from "undici";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { resolveArgs } from "@/lib/resolve";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();
  const { apiKey, httpsProxy, baseUrl } = resolveArgs(body);
  const { messages, model } = body;

  const payload: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      stream: true,
    }),
  };

  // if (httpsProxy) {
  //   payload.dispatcher = new ProxyAgent(httpsProxy);
  // }

  const response = (await fetch(`${baseUrl}/v1/chat/completions`, payload)) as unknown as Response;

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
