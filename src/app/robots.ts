import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",
          "/auth-gateway",
          "/login",
          "/signup",
          "/confirm-email",
          "/password-change",
          "/profile",
          "/access-restricted",
        ],
      },
    ],
    sitemap: "https://www.ikisakitours.com/sitemap.xml",
  };
}
