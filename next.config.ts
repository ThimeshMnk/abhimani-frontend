/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // Allows Next.js to fetch from localhost:8000
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'web-production-3c6bc.up.railway.app',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'info.karakara.lk',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'abhimani-website-vercel-app.karakara.lk',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: "/shop", destination: "/social-enterprise", permanent: false },
      { source: "/resources", destination: "/library", permanent: false },
      { source: "/news", destination: "/projects", permanent: false },
      { source: "/news/:path*", destination: "/projects", permanent: false },
      { source: "/work", destination: "/projects", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://abhimani-website-vercel-app.karakara.lk https://info.karakara.lk https://web-production-3c6bc.up.railway.app http://localhost:8000;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;