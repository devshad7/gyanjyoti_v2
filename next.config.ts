import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure external packages for server components
  serverExternalPackages: ['cloudinary'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Add this to fix PDF upload size limit
    },
  },
};

export default nextConfig;
