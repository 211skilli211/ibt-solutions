import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http: false,
        https: false,
        url: false,
        zlib: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
