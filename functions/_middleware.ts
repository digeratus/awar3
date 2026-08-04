import { selectionForRequest } from "./lib/rotation";

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "media-src 'self'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests"
].join("; ");

export function applySecurityHeaders(headers: Headers): Headers {
  headers.set("Content-Security-Policy", CSP);
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  return headers;
}

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;
  const url = new URL(request.url);

  if (url.pathname !== "/") {
    return context.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    const headers = applySecurityHeaders(new Headers({ Allow: "GET, HEAD" }));
    return new Response("Method Not Allowed", { status: 405, headers });
  }

  const selection = selectionForRequest(url, new Date());
  const variantUrl = new URL(`/variants/${selection.variant}/${selection.candidate}/`, url);
  variantUrl.search = "";

  const assetRequest = new Request(variantUrl, {
    method: request.method,
    headers: request.headers
  });
  const assetResponse = await context.env.ASSETS.fetch(assetRequest);
  const headers = applySecurityHeaders(new Headers(assetResponse.headers));

  headers.set("X-AWAR3-Variant", selection.variant);
  headers.set("X-AWAR3-Candidate", selection.candidate);
  headers.set("X-AWAR3-Date", selection.dateKey);

  if (selection.override) {
    headers.set("Cache-Control", "no-store");
    headers.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    headers.delete("X-Robots-Tag");
  }

  return new Response(request.method === "HEAD" ? null : assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers
  });
}
