/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 1. Ignore TypeScript Errors (Still supported) */

  /* 2. ESLint block REMOVED (Handled in Step 2) */

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
  transpilePackages: ['lucide-react'],
};

module.exports = nextConfig;