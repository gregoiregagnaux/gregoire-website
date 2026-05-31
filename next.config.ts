import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → Cloudflare Pages serves the `out/` folder as plain static assets.
  output: "export",
  // next/image's default optimizer needs a server; disable it for the static export.
  images: { unoptimized: true },
};

export default nextConfig;
