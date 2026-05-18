/** Per-IP rate limit for MIRA proxy — satisfies security scanners expecting 429 + rate-limit headers */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 24;

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

function clientIp(request: Request): string {
  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export default async function handler(
  request: Request,
  context: { next: () => Promise<Response> }
): Promise<Response> {
  const ip = clientIp(request);
  const now = Date.now();
  let bucket = buckets.get(ip);
  if (!bucket || now > bucket.reset) {
    bucket = { count: 0, reset: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;

  const remaining = Math.max(0, MAX_REQUESTS - bucket.count);

  if (bucket.count > MAX_REQUESTS) {
    return new Response(
      JSON.stringify({ detail: "Too many requests — please wait a moment." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("X-RateLimit-Limit", String(MAX_REQUESTS));
  headers.set("X-RateLimit-Remaining", String(remaining));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
