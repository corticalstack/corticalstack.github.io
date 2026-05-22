import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (no Node server at runtime).
  output: "export",
  // GitHub Pages cannot run Next's image optimizer.
  images: {
    unoptimized: true,
  },
  // Emit each route as <route>/index.html so GitHub Pages resolves
  // clean URLs without a server.
  trailingSlash: true,
};

export default nextConfig;
