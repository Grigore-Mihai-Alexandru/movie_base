/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['image.tmdb.org']
  },
  eslint: {
    dirs: ['',], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}

module.exports = nextConfig
