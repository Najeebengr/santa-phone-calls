import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  webpack: (config, { dev, isServer }) => {
    // Keep cache enabled but with different settings for Replit
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: '.next/cache',
      name: isServer ? 'server' : 'client',
      version: '1',
    }
    return config
  },
}

export default nextConfig;