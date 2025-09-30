import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Add any other custom configurations here
};

export default nextConfig;
