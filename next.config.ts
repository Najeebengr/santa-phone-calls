/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Properly configure devIndicators
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
  // Move suppressHydrationWarnings to react config
  reactStrictMode: true,
};

module.exports = nextConfig;
