/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {},
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
