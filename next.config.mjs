import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Add custom webpack configuration here

    // Configure loader for MP4 files
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: { name: "[name].[ext]" },
        },
      ],
    });

    return config;
  },
};

export default withNextVideo(nextConfig);