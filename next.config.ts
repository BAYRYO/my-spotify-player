import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This allows production builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows production builds to complete even with TypeScript errors
    // Only use this if you're confident your app will work despite the errors
    ignoreBuildErrors: true,
  }
};

export default nextConfig;

