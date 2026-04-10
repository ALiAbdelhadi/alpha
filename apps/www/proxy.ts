import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

function createNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

export default function proxy(request: NextRequest) {
  const nonce = createNonce();
  const res = intlMiddleware(request);

  // Make nonce available to Server Components via request headers().
  res.headers.set("x-middleware-override-headers", "x-nonce");
  res.headers.set("x-middleware-request-x-nonce", nonce);
  res.headers.set("x-nonce", nonce);

  const csp = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data:`,
    `style-src 'self' 'unsafe-inline'`,
    `worker-src 'self' blob:`,
    `connect-src 'self' https://www.clarity.ms https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http:`,
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};