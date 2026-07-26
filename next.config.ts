import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Force HTTPS for two years incl. subdomains (matches Elite Market).
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Narrow CSP WITHOUT script-src on purpose: Next inlines hydration
          // scripts, so a script-src would need per-request nonces (middleware)
          // to avoid 'unsafe-inline' — out of scope here. These directives still
          // block clickjacking, plugin/object embedding, <base> hijack, and
          // cross-origin form posts.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
