import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// /cv.pdf always serves the latest CV from FlowCV as a direct download.
// Cached on Vercel's CDN for an hour (so FlowCV isn't hit on every click),
// with the static public/resume.pdf as a fallback if FlowCV is unavailable.
const FLOWCV_PDF_URL = "https://app.flowcv.com/api/public/download_resume?token=fq1eblpm8p27";
const CV_FILENAME = "Ibrahim-Abdulrahman-Sardauna-CV.pdf";

async function serveLatestCv(request: Request): Promise<Response> {
  const headers = {
    "content-type": "application/pdf",
    "content-disposition": `attachment; filename="${CV_FILENAME}"`,
    "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  };
  try {
    const upstream = await fetch(FLOWCV_PDF_URL, { signal: AbortSignal.timeout(8000) });
    const type = upstream.headers.get("content-type") ?? "";
    if (upstream.ok && type.includes("pdf")) {
      return new Response(await upstream.arrayBuffer(), { status: 200, headers });
    }
  } catch (error) {
    console.error("FlowCV download failed, falling back to resume.pdf", error);
  }
  const fallback = await fetch(new URL("/resume.pdf", request.url));
  return new Response(fallback.body, {
    status: fallback.status,
    headers: { ...headers, "cache-control": "public, max-age=0, s-maxage=300" },
  });
}

// The portfolio is the same for every visitor, so let Vercel's CDN cache the
// rendered HTML. Browsers still revalidate (max-age=0); each new deployment
// clears the CDN cache, so content never goes stale after a push.
const HTML_CACHE_CONTROL = "public, max-age=0, s-maxage=3600, stale-while-revalidate=604800";

function withEdgeCaching(request: Request, response: Response): Response {
  if (request.method !== "GET" || response.status !== 200) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;
  if ((response.headers.get("cache-control") ?? "").includes("s-maxage")) return response;
  const cached = new Response(response.body, response);
  cached.headers.set("cache-control", HTML_CACHE_CONTROL);
  return cached;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (request.method === "GET" && new URL(request.url).pathname === "/cv.pdf") {
        return await serveLatestCv(request);
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withEdgeCaching(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
