import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.ijmb.ng" },
      { protocol: "https", hostname: "ijmb.ng" }
    ]
  }
};

export default nextConfig;
