import { defineNuxtConfig } from "nuxt/config";
import { INDEXABLE_ROUTES } from "./src/utils/seo";

export default defineNuxtConfig({
  extends: ["nuxt-umami"],
  ssr: true,
  srcDir: "src/",
  css: ["~/assets/main.css"],
  modules: ["@nuxtjs/i18n"],
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "es",
        name: "Espanol",
        file: "es.json",
      },
      {
        code: "it",
        name: "Italiano",
        file: "it.json",
      },
      {
        code: "fr",
        name: "Francais",
        file: "fr.json",
      },
      {
        code: "de",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "nl",
        name: "Nederlands",
        file: "nl.json",
      },
      {
        code: "pt",
        name: "Portugues",
        file: "pt.json",
      },
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
});
