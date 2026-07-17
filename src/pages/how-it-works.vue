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
import { usePageSeo } from "~/composables/usePageSeo";
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
const repositoryUrl = "https://github.com/GionaGranchelli/pickyourlinux";
const docsUsed = [
  "docs/ARCHITECTURE.md",
  "docs/DATA_CONTRACT.md",
  "docs/DATA_RULES.md",
  "docs/QUESTION_CATALOG.md",
  "docs/CONSTRAINT_MAPPING.md",
  "docs/RESULTS_COPY.md",
  "docs/TESTING.md",
  "docs/TONE_AND_COPY.md",
  "docs/FRONTEND-IMPLEMENTATION-RULES.md",
];

const faqItems = [
  {
    question: "How does Pick Your Linux choose a distro?",
    answer: "It filters the distro dataset using the answers you provide and explicit modeled attributes such as installer experience, release model, package manager, hardware needs, and maintenance style. The result explains the relevant constraints and trade-offs.",
  },
  {
    question: "Does it use hidden scores or opaque recommendations?",
    answer: "No. The project is designed around inspectable decision rules and schema-defined data. You can review the modeled fields, validation checks, and source code before relying on a result.",
  },
  {
    question: "Can I browse the distro data without taking the flow?",
    answer: "Yes. The All distros and metrics page exposes the current dataset and lets you filter distributions by attributes such as release model, intended use case, and documentation ecosystem.",
  },
  {
    question: "How current is the distro information?",
    answer: "Each distro record includes a last verified date. The fields are maintained snapshots, so use the linked official project site and documentation for release-specific details that may have changed.",
  },
];

usePageSeo({
  title: "How it works",
  description: "See how Pick Your Linux filters distributions through explicit constraints, declarative data, and explainable outputs.",
  path: "/how-it-works",
  keywords: ["how linux distro picker works", "declarative decision engine", "linux distro filtering logic"],
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <div class="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
      Source: <a :href="repositoryUrl" target="_blank" rel="noopener noreferrer" class="font-medium text-slate-900 underline">github.com/GionaGranchelli/pickyourlinux</a>
    </div>
    <div class="mb-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
      <p class="mb-2 font-semibold text-slate-800">Documentation sources</p>
      <ul class="space-y-1">
        <li v-for="doc in docsUsed" :key="doc">
          <a
            :href="`${repositoryUrl}/blob/master/${doc}`"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            {{ doc }}
          </a>
        </li>
      </ul>
    </div>
    <article class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="markdown" v-html="html"></div>
    </article>

    <section class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 class="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
      <div class="mt-5 space-y-5">
        <div v-for="item in faqItems" :key="item.question">
          <h3 class="text-base font-semibold text-slate-900">{{ item.question }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.answer }}</p>
        </div>
      </div>
    </section>
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
