import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/flight-tracker",
  assetPrefix: "/flight-tracker",
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
