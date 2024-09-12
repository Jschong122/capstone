/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

export default nextConfig;
