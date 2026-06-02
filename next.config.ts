import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Copy Cesium static assets to public directory
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(
                path.dirname(require.resolve("cesium")),
                "../Build/Cesium/Workers"
              ),
              to: path.resolve(__dirname, "public/cesium/Workers"),
            },
            {
              from: path.resolve(
                path.dirname(require.resolve("cesium")),
                "../Build/Cesium/Assets"
              ),
              to: path.resolve(__dirname, "public/cesium/Assets"),
            },
            {
              from: path.resolve(
                path.dirname(require.resolve("cesium")),
                "../Build/Cesium/Widgets"
              ),
              to: path.resolve(__dirname, "public/cesium/Widgets"),
            },
          ],
        })
      );
    }

    // Cesium uses eval() in some modules — disable unsafe-eval CSP conflict
    config.module.rules.push({
      test: /\.js$/,
      include: path.dirname(require.resolve("cesium")),
      use: {
        loader: "source-map-loader",
      },
      enforce: "pre",
    });

    // Suppress Node.js module warnings for Cesium
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

    return config;
  },
  // Set Cesium base URL for client-side
  env: {
    CESIUM_BASE_URL: "/cesium/",
  },
};

export default nextConfig;
