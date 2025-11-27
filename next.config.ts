import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable App Router in favor of Pages Router
  experimental: {
    appDir: false,
  },
};

export default nextConfig;
