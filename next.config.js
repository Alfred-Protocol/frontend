/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALCHEMY_MUMBAI_API_KEY: process.env.ALCHEMY_MUMBAI_API_KEY,
    ALCHEMY_API_MUMBAI_API_KEY: process.env.ALCHEMY_API_MUMBAI_API_KEY,
    FUNDS_FACTORY_MUMBAI_ADDRESS: process.env.FUNDS_FACTORY_MUMBAI_ADDRESS,
    USDC_MUMBAI_ADDRESS: process.env.USDC_MUMBAI_ADDRESS,
  },
  images: {
    domains: ['seeklogo.com', 'cdn.iconscout.com', 'friconix.com'],
  },
};

module.exports = nextConfig;
