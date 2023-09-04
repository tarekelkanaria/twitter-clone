/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "10mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "help.twitter.com",
        pathname: "/content/**/**/*",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.techbooky.com",
        pathname: "/wp-content/uploads/**/*",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/*",
        port: "",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**/**/*",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
