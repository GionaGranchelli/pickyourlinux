<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  OG_LOCALE_BY_CODE,
  SITE_AUTHOR,
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_THEME_COLOR,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
  toAbsoluteUrl,
} from "~/utils/seo";

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();

const siteUrl = computed(() => runtimeConfig.public.siteUrl || SITE_URL);
const socialImage = computed(() => toAbsoluteUrl(siteUrl.value, SOCIAL_IMAGE_PATH));

if (import.meta.server) {
  useSeoMeta({
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    author: SITE_AUTHOR,
    applicationName: SITE_NAME,
    appleMobileWebAppTitle: SITE_NAME,
    publisher: SITE_AUTHOR,
    ogSiteName: SITE_NAME,
    ogType: "website",
    ogImage: () => socialImage.value,
    ogImageAlt: `${SITE_NAME} social preview image`,
    ogLocale: () => OG_LOCALE_BY_CODE[locale.value] ?? "en_US",
    twitterCard: "summary_large_image",
    twitterImage: () => socialImage.value,
  });
}

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_DEFAULT_TITLE}`;
  },
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
  meta: [
    { name: "theme-color", content: SITE_THEME_COLOR },
    { name: "format-detection", content: "telephone=no" },
  ],
  script: () => [
    {
      key: "ld-json-website",
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl.value,
        description: SITE_DESCRIPTION,
        inLanguage: locale.value,
      }),
    },
    {
      key: "ld-json-organization",
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: siteUrl.value,
        logo: socialImage.value,
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
