/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
  },
};

module.exports = nextConfig;
