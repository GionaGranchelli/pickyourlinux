import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  srcDir: "src/",
  nitro: {
    preset: "static",
    prerender: {
      routes: ["/", "/how-it-works", "/manifesto", "/data-sources"]
    }
  },
  runtimeConfig: {
    public: {
      telemetryEndpoint: ""
    }
  },
  typescript: {
    strict: true
  }
});
