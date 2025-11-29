import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Ignore TypeScript Errors (Still supported) */
  typescript: {
    ignoreBuildErrors: true,
  },

  /* 2. ESLint block REMOVED (Handled in Step 2) */

  /* 3. Allow images from external sources */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;