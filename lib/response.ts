import { loadNamespace } from "@/lang/client";

export function response(body: any, status = 200) {
  try {
    return new Response(JSON.stringify(body), { status });
  } catch (e: any) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: {
          message: e?.message,
        },
      }),
      { status: 500 },
    );
  }
}

export async function handleResponse(response: Response, onReceiving?: (text: string) => void) {
  if (!response.ok) {
    const error = await response.json();
    const i18n = await loadNamespace("openai");
    throw new Error(error.message || i18n.t("commonError"));
  }
  const data = response.body;
  if (!data) {
    const i18n = await loadNamespace("openai");
    throw new Error(i18n.t("noData"));
  }
  let message = "";
  const reader = data.getReader();
  const decoder = new TextDecoder("utf-8");
  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      const char = decoder.decode(value);
      if (char) {
        message += char;
        onReceiving?.(message);
      }
    }
    done = readerDone;
  }
  return {
    data: message,
  };
}
