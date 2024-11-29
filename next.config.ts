import type { NextConfig } from "next";
import path from 'path';

const nextConfig = {
  output: 'standalone',
  experimental: {
    serverExternalPackages: ['@prisma/client'], // Updated from serverComponentsExternalPackages
  },
  webpack: (config, { dev, isServer }) => {
    // Use absolute path for cache directory
    const cacheDir = path.resolve(process.cwd(), '.next/cache');
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: cacheDir,
      name: isServer ? 'server' : 'client',
      version: '1',
    }
    return config
  },
} as NextConfig;

export default nextConfig;