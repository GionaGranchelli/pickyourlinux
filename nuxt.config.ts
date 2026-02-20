import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
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
      routes: ["/", "/how-it-works", "/transparency", "/manifesto", "/data-sources"],
    },
  },
  runtimeConfig: {
    public: {
      telemetryEndpoint: "",
    },
  },
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: "Pick Your Linux - The explainable compatibility-based distro picker",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Don't guess which Linux is best. Answer simple questions, apply strict filters, and see which distributions are truly compatible with your needs." },
        { name: "author", content: "Pick Your Linux Project" },
        { property: "og:title", content: "Pick Your Linux" },
        { property: "og:description", content: "Find the Linux distribution that fits your hardware and workflow." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://pickyourlinux.org" },
        { property: "og:image", content: "https://pickyourlinux.org/og-preview.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Pick Your Linux" },
        { name: "twitter:description", content: "Compatibility-first Linux distro picker." },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      ],
    },
  },
});
