/** @type {import('next').NextConfig} */
const nextConfig = {
  // The following fixes https://github.com/stripe/connect-js/issues/94
  reactStrictMode: false,
};

export default nextConfig;
