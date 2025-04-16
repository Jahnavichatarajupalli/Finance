/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Add basePath and assetPrefix for proper route handling
  basePath: '',
  assetPrefix: '',
  // Ensure proper route generation
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  generateEtags: true,
  poweredByHeader: true,
};

module.exports = nextConfig