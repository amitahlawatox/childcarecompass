/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permanent redirect to consolidate SEO authority on the homepage
  // (the calculator now lives at /). 308 status, treated as 301 by Google.
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
