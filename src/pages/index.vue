<script setup lang="ts">
import { useI18n } from "vue-i18n";
import WelcomeScreen from "~/components/WelcomeScreen.vue";
import { usePageSeo } from "~/composables/usePageSeo";
import { SITE_DESCRIPTION, SITE_NAME } from "~/utils/seo";
import { useDecisionEngine } from "~/composables/useDecisionEngine";

const { t } = useI18n();
const router = useRouter();
const engine = useDecisionEngine(t);

usePageSeo({
  title: "Find your Linux distro",
  description: "Choose a Linux distribution with explicit compatibility filters, transparent reasoning, and no hidden ranking logic.",
  path: "/",
  keywords: ["linux distro finder", "linux distro selector", "linux distro decision tool"],
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE_NAME,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
});

const start = () => {
  if (typeof umTrackEvent === "function") {
    umTrackEvent("flow_started");
  }
  engine.reset();
  void router.push("/wizard");
};
</script>

<template>
  <WelcomeScreen :on-start="start" />
</template>
