import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.8.187"],
  devIndicators: false,
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);