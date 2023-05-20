/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['cdn.freecodecamp.org'],
  },
}

module.exports = nextConfig
