/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.ijmb.ng' },
      { protocol: 'https', hostname: 'ijmb.ng' }
    ]
  }
};

export default nextConfig;
