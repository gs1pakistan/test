import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // standalone output for Vercel deployment
  output: "standalone",
  // You can add other options here, but no experimental keys like turbo/appDir
};

export default nextConfig;
