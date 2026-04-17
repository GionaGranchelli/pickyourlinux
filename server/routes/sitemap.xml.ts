import { INDEXABLE_ROUTES, SITE_URL } from "~/utils/seo";

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL;
  const lastmod = new Date().toISOString();

  const urls = INDEXABLE_ROUTES.map((route) => {
    const loc = new URL(route, siteUrl).toString();
    const priority = route === "/" ? "1.0" : "0.8";

    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>weekly</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  setHeader(event, "content-type", "application/xml; charset=utf-8");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
  ].join("\n");
});
