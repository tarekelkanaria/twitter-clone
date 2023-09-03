/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: "avatars.githubusercontent.com",
        pathname: "/**/*",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/*",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
