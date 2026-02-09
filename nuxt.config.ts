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
});
