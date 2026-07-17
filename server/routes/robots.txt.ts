import { SITE_URL } from "~/utils/seo";

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const siteUrl = runtimeConfig.public.siteUrl || SITE_URL;

  setHeader(event, "content-type", "text/plain; charset=utf-8");

  return [
    "User-agent: *",
    "Allow: /",
    "",
    "# Allow OpenAI search and model crawlers",
    "User-agent: OAI-SearchBot",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    `Sitemap: ${new URL("/sitemap.xml", siteUrl).toString()}`,
  ].join("\n");
});
