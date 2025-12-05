import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/flight-tracker",
  assetPrefix: "/flight-tracker",
  output: "export", // Outputs a "static" directory to "out" which github pages will deploy
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
