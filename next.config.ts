import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  
  // Basic configuration
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Webpack configuration for Three.js and client-side libraries
  webpack: (config, { isServer }) => {
    // Handle client-side only libraries
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        encoding: false,
      };
    }

    // Handle Three.js and other client-side libraries
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    return config;
  },
  
  // Basic image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Simple rewrites for internal files
  async rewrites() {
    return [
      {
        source: '/_next/static/:path*',
        destination: '/_next/static/:path*',
      },
    ];
  },
};

export default nextConfig;
