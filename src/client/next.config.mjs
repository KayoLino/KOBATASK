/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false, // False se for redirecionamento temporário
      },
    ];
  },
};

export default nextConfig;
