/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'store.nintendo.com.au',
        pathname: '/**'
      }
    ]
  }};

export default nextConfig;
