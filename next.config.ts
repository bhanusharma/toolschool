import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your Next.js config here
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'www.google.com',
      },
      {
        protocol: 'https' as const,
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'pub-*.r2.dev',
      },
      {
        protocol: 'https' as const,
        hostname: 'logo.clearbit.com',
      },
    ],
  },
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
