/** @type {import('next').NextConfig} */
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig = {
  output: "standalone",
  experimental: {},
  webpack: (config: WebpackConfigContext["webpack"]) => {
    // Disable cache for now to avoid issues
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
