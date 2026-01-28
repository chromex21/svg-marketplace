/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Ensure proper output for Vercel
  output: 'standalone',
  // Disable static optimization to prevent 404s
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
