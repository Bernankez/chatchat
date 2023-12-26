export function resolveArgs(body: any) {
  if (body && typeof body === "object") {
    const {
      apiKey = process.env.OPENAI_API_KEY,
      httpsProxy = process.env.HTTPS_PROXY,
      baseUrl = (process.env.OPENAI_API_BASE_URL || "https://api.openai.com").trim().replace(/\/$/, ""),
    } = body;

    return {
      apiKey,
      httpsProxy,
      baseUrl,
    };
  }
  return {};
}
