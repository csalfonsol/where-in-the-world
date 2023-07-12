/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: ["flagcdn.com", "upload.wikimedia.org"]
  }
};

module.exports = nextConfig;
