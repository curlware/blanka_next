import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'demo.cocobasic.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
