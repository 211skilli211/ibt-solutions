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
  env: {
    NEXT_PUBLIC_CESIUM_ION_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMzU2OWM3Yy1lMjhjLTQzNTEtYjkxNS1kNTMwMWI3MWJkYjkiLCJpZCI6NDM5NjEzLCJzdWIiOiJTa2lsbGkyMTEiLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoiSUJUIiwiaWF0IjoxNzgwNDM2MTQxfQ.ooVWwemzqH4n6KjpNoAbU86jzIelQd3OZt9hVG5x5hc',
  },
};

export default nextConfig;
