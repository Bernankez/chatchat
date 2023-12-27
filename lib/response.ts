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
