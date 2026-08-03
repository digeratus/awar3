import { describe, expect, it, vi } from "vitest";
import { onRequest } from "../functions/_middleware";

function createContext(url: string, method = "GET") {
  const assetFetch = vi.fn(async (request: Request) =>
    new Response(`<html data-source="${new URL(request.url).pathname}"></html>`, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow"
      }
    })
  );
  const next = vi.fn(async () => new Response("pass-through", { status: 299 }));
  return {
    context: {
      request: new Request(url, { method }),
      env: { ASSETS: { fetch: assetFetch } },
      next
    },
    assetFetch,
    next
  };
}

describe("root Pages Function", () => {
  it("passes non-root routes through", async () => {
    const { context, next, assetFetch } = createContext("https://awar3.com/variants/field-station/");
    const response = await onRequest(context);
    expect(response.status).toBe(299);
    expect(next).toHaveBeenCalledOnce();
    expect(assetFetch).not.toHaveBeenCalled();
  });

  it("serves valid overrides with diagnostics, no-store, and noindex", async () => {
    const { context, assetFetch } = createContext("https://awar3.com/?design=living-systems");
    const response = await onRequest(context);
    expect(new URL(assetFetch.mock.calls[0][0].url).pathname).toBe("/variants/living-systems/");
    expect(response.headers.get("X-AWAR3-Variant")).toBe("living-systems");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
  });

  it("ignores invalid overrides and exposes production security headers", async () => {
    const { context } = createContext("https://awar3.com/?design=javascript:alert(1)");
    const response = await onRequest(context);
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=0, must-revalidate");
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
    expect(response.headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
    expect(response.headers.get("Strict-Transport-Security")).toContain("includeSubDomains");
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("returns a bodyless HEAD response with the same variant diagnostics", async () => {
    const { context } = createContext("https://awar3.com/?design=airborne-workshop", "HEAD");
    const response = await onRequest(context);
    expect(response.headers.get("X-AWAR3-Variant")).toBe("airborne-workshop");
    expect(await response.text()).toBe("");
  });

  it("rejects unsupported root methods", async () => {
    const { context } = createContext("https://awar3.com/", "POST");
    const response = await onRequest(context);
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("GET, HEAD");
  });
});
