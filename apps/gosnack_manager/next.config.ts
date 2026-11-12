import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Suporte a internacionalização para o Next.js.
 */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Configuração do Next.js.
 *
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
