/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow remote images used in the app
    domains: [
      "json-api.uz",
      "picsum.photos",
      "avatars.mds.yandex.net",
      "res.cloudinary.com",
      "images.uzum.uz",
      "flagsapi.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "json-api.uz",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
        pathname: "/**",
      },
    ],
    // Configure allowed quality values to avoid Next 16 warnings
    qualities: [50, 60, 70, 75, 80, 85, 90],
  },
};

module.exports = nextConfig;
