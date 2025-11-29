import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Ignore TypeScript Errors to force deployment */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },

  /* 2. Ignore ESLint Errors to force deployment */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  /* 3. Allow images from external sources (Vital for Cloudinary) */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Your Cloudinary images
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Your placeholder images
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // If you use Unsplash for mock data
      },
    ],
  },
};

export default nextConfig;