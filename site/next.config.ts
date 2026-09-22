import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: { root: __dirname },
};

export default nextConfig;
