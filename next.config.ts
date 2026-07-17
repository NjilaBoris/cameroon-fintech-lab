import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
  },
    experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or whatever ceiling makes sense
    },
  },
};

export default nextConfig;
