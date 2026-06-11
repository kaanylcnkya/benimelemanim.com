import type { MetadataRoute } from "next";

const SITE_URL = "https://benimelemanim.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "",
    "/temizlikci-bul",
    "/temizlikci-ol",
    "/is-talepleri",
    "/kayit",
    "/kullanici-kayit",
    "/kvkk",
    "/gizlilik-politikasi",
    "/kullanim-sartlari",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/temizlikci-bul" ? 0.9 : 0.7,
  }));
}