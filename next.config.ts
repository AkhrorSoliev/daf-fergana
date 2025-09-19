import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "json-api.uz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.uzum.uz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
