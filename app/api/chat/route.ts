/**
 * ref https://sdk.vercel.ai/docs/guides/providers/openai
 */
import { OpenAIStream, StreamingTextResponse } from "ai";
import { resolveArgs } from "@/lib/resolve";
import { getServerTranslations } from "@/lang/server";
import { response } from "@/lib/response";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(request: Request) {
  const { t } = await getServerTranslations("openai");
  const body = await request.json();
  const { apiKey, baseUrl } = resolveArgs(body);
  const { messages, model, temperature } = body;

  if (!messages) {
    return response(
      {
        error: {
          message: t("noMessages"),
        },
      },
      400,
    );
  }

  if (!apiKey) {
    return response(
      {
        error: {
          message: t("noApiKey"),
        },
      },
      401,
    );
  }

  const payload: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: true,
    }),
  };

  const res = await fetch(`${baseUrl}/v1/chat/completions`, payload).catch((e: Error) => {
    console.error(e);
    return response(
      {
        error: {
          code: e.name,
          message: e.message,
        },
      },
      500,
    );
  });

  const stream = OpenAIStream(res);

  return new StreamingTextResponse(stream);
}
