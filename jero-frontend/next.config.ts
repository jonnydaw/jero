import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hlurjjcb8uyhaumm.public.blob.vercel-storage.com',
      },
    ],
  },
};



export default withNextIntl(nextConfig);