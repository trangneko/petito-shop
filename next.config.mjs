/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: [
          "lh3.googleusercontent.com",
          "lh3.google.com",
          "static.mercdn.net",
        ],
      },
    ],
  },
};

export default nextConfig;
