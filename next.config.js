/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/chat',
      destination: 'http://localhost:8000/chat',
    },
    {
      source: '/session/:path*',
      destination: 'http://localhost:8000/session/:path*',
    },
    {
      source: '/debug_raw',
      destination: 'http://localhost:8000/debug_raw',
    },
  ],
};

module.exports = nextConfig;
