import { defineNuxtConfig } from "nuxt/config";
import { INDEXABLE_ROUTES } from "./src/utils/seo";

export default defineNuxtConfig({
  extends: ["nuxt-umami"],
  ssr: true,
  srcDir: "src/",
  css: ["~/assets/main.css"],
  modules: ["@nuxtjs/i18n"],

  appConfig: {
    umami: {
      version: 2,
      autoTrack: true,
      ignoreLocalhost: true
    }
  },

  i18n: {
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "es", name: "Espanol", file: "es.json" },
      { code: "it", name: "Italiano", file: "it.json" },
      { code: "fr", name: "Francais", file: "fr.json" },
      { code: "de", name: "Deutsch", file: "de.json" },
      { code: "nl", name: "Nederlands", file: "nl.json" },
      { code: "pt", name: "Portugues", file: "pt.json" },
    ],
    langDir: "../i18n/locales",
    defaultLocale: "en",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },
  compatibilityDate: "2026-02-09",
  nitro: {
    preset: "static",
    prerender: {
      routes: [...INDEXABLE_ROUTES, "/robots.txt", "/sitemap.xml"],
    },
  },
  routeRules: {
    ...Object.fromEntries(INDEXABLE_ROUTES.map((route) => [route, { prerender: true }])),
    "/robots.txt": { prerender: true },
    "/sitemap.xml": { prerender: true },
  },
  runtimeConfig: {
    public: {
      siteUrl: "https://pickyourlinux.org",
      telemetryEndpoint: "",
    },
  },
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: "Pick Your Linux - The deterministic, logic-as-data distro picker",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "A schema-driven decision engine that evaluates 30+ conditional questions to recommend from 40+ Linux distributions with zero bias." },
        { name: "author", content: "Pick Your Linux Project" },
        { property: "og:title", content: "Pick Your Linux - Honest Decision Flow" },
        { property: "og:description", content: "Find the Linux distribution that fits your hardware and workflow using a deterministic, explainable engine." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://pickyourlinux.org" },
        { property: "og:image", content: "https://pickyourlinux.org/og-preview.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Pick Your Linux" },
        { name: "twitter:description" , content: "A study in logic-as-data and honest decision engine design." },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      ],
    },
  },
});
