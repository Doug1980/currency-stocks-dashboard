import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Autoriza domínios externos para uso com next/image.
     * - flagcdn.com: bandeiras de países (Flagpedia CDN)
     * - icons.brapi.dev: logos das empresas brasileiras (brapi.dev)
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "icons.brapi.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;