<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import howItWorksDe from "~/../i18n/how-it-works/de.md?raw";
import howItWorksEn from "~/../i18n/how-it-works/en.md?raw";
import howItWorksEs from "~/../i18n/how-it-works/es.md?raw";
import howItWorksFr from "~/../i18n/how-it-works/fr.md?raw";
import howItWorksIt from "~/../i18n/how-it-works/it.md?raw";
import howItWorksNl from "~/../i18n/how-it-works/nl.md?raw";
import howItWorksPt from "~/../i18n/how-it-works/pt.md?raw";
import { renderMarkdown } from "~/utils/markdown";

const { locale } = useI18n();

const localizedHowItWorks: Record<string, string> = {
  en: howItWorksEn,
  es: howItWorksEs,
  it: howItWorksIt,
  fr: howItWorksFr,
  de: howItWorksDe,
  nl: howItWorksNl,
  pt: howItWorksPt,
};

const html = computed(() => renderMarkdown(localizedHowItWorks[locale.value] ?? howItWorksEn));
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <article class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="markdown" v-html="html"></div>
    </article>
  </div>
</template>

<style scoped>
.markdown :deep(h1) {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1rem;
}

.markdown :deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: #0f172a;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown :deep(p) {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.markdown :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.markdown :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown :deep(hr) {
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 1.5rem 0;
}
</style>
