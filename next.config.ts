/** @type {import('next').NextConfig} */
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig = {
  output: "standalone",
  experimental: {},
  // Add devIndicators configuration
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
    showDeploymentIndicator: false,
  },
  webpack: (config: WebpackConfigContext["webpack"]) => {
    // Disable cache for now to avoid issues
    config.cache = false;
    // // Add CSS handling
    // config.module.rules.push({
    //   test: /\.css$/i,
    //   use: ["style-loader", "css-loader"],
    // });
    return config;
  },
};

module.exports = nextConfig;
