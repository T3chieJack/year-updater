export default {
  fetch(request) {
    const headers = {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });

    const tz = new URL(request.url).searchParams.get("tz") || "UTC";
    let year;
    try {
      year = new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric" }).format(new Date());
    } catch {
      year = String(new Date().getUTCFullYear());
    }

    return new Response(year, { headers });
  },
};
