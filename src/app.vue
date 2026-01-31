<script setup lang="ts">
import { computed, ref } from "vue";
import QuestionWizard from "~/components/QuestionWizard.vue";
import ResultsView, { type ResultsItem } from "~/components/ResultsView.vue";
import DebugPanel, { type DebugExclusion } from "~/components/DebugPanel.vue";
import { useDecisionEngine } from "~/composables/useDecisionEngine";
import { recommendDistros } from "~/engine/recommend";
import distrosData from "~/data/distros.json";
import { DistroListSchema } from "~/data/distro-types";

const { intent, isComplete, debugEnabled, skippedQuestions, appliedPatches } = useDecisionEngine();
const debugOn = computed(() => Boolean(debugEnabled));
const showResults = ref(false);

const distros = DistroListSchema.parse(distrosData);

const recommendations = computed<ResultsItem[]>(() => {
  const recs = recommendDistros(intent.value);
  return recs.map((rec) => {
    const distro = distros.find((item) => item.id === rec.distroId);
    return {
      distroId: rec.distroId,
      name: distro?.name ?? rec.distroId,
      description: distro?.description,
      included: rec.included,
      includedReason: rec.includedReason,
      excludedReason: rec.excludedReason,
      matchedTags: rec.matchedTags
    };
  });
});

const exclusionSummary = computed<DebugExclusion[]>(() =>
  recommendations.value
    .filter((rec) => rec.excludedReason.length > 0)
    .map((rec) => ({ distroId: rec.distroId, excludedReason: rec.excludedReason }))
);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
    <header class="mx-auto flex max-w-4xl flex-col gap-2 px-6 pt-10 text-center">
      <h1 class="text-3xl font-semibold text-slate-900">Pick Your Linux</h1>
      <p class="text-sm text-slate-500">A calm, guided path to the right distro.</p>
    </header>

    <main class="mx-auto max-w-4xl px-6 pb-16 pt-8">
      <QuestionWizard v-if="!showResults" />

      <div v-else>
        <ResultsView :recommendations="recommendations" />
      </div>

      <div class="mt-6 flex items-center justify-center gap-3">
        <button
          v-if="isComplete && !showResults"
          class="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500"
          @click="showResults = true"
        >
          See results
        </button>
        <button
          v-if="showResults"
          class="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
          @click="showResults = false"
        >
          Back to questions
        </button>
      </div>

      <DebugPanel
        :enabled="debugOn"
        :intent="intent"
        :applied-patches="appliedPatches"
        :skipped-questions="skippedQuestions"
        :exclusions="exclusionSummary"
      />
    </main>
  </div>
</template>
