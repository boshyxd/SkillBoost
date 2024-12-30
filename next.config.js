/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/SkillBoost',
  assetPrefix: '/SkillBoost/'
}

module.exports = nextConfig