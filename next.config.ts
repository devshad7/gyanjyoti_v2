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
  // Configure file upload limits
  experimental: {
    serverComponentsExternalPackages: ['cloudinary'],
  },
  // API route configuration
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Set desired value here
    },
    responseLimit: '50mb',
  },
};

export default nextConfig;
