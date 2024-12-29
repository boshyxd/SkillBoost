/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/SkillBoost',
  assetPrefix: '/SkillBoost/',
}

module.exports = nextConfig