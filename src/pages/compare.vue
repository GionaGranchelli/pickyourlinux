<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDecisionEngine } from "~/composables/useDecisionEngine";
import { buildCompatibilityResults, getAllDistros } from "~/engine/state";

const { t, te } = useI18n();
const engine = useDecisionEngine(t);
const { distrosToCompare, clearComparison, intent } = engine;

const allDistros = getAllDistros();
const selectedDistros = computed(() => {
  return allDistros.filter((distro) => distrosToCompare.value.includes(distro.id));
});
const compatibilityById = computed(() => {
  const rows = buildCompatibilityResults(intent.value);
  return new Map(rows.map((row) => [row.distroId, row]));
});

const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);
const pageTitle = computed(() => tr("compare.title", "Compare Distros"));
const clearComparisonLabel = computed(() => tr("compare.clearComparison", "Clear Comparison"));
const selectAtLeastTwoLabel = computed(() => tr("compare.selectAtLeastTwo", "Please select at least two distros to compare."));
const featureColumnLabel = computed(() => tr("compare.featureColumn", "Feature"));
const showAllFeatures = ref(false);
const toggleFeatureModeLabel = computed(() =>
  showAllFeatures.value
    ? tr("compare.showLess", "Show fewer features")
    : tr("compare.showAll", "Show all features")
);

const quickFeatures: Array<{ key: string; label: string }> = [
  { key: "releaseModel", label: tr("compare.feature.releaseModel", "Release Model") },
  { key: "packageManager", label: tr("compare.feature.packageManager", "Package Manager") },
  { key: "initSystem", label: tr("compare.feature.initSystem", "Init System") },
  { key: "secureBootOutOfBox", label: tr("compare.feature.secureBootOutOfBox", "Secure Boot Out-of-the-Box") },
  { key: "nvidiaExperience", label: tr("compare.feature.nvidiaExperience", "NVIDIA Experience") },
  { key: "docsEcosystem", label: tr("compare.feature.docsEcosystem", "Docs & Community") },
  { key: "primaryUseCase", label: tr("compare.feature.primaryUseCase", "Primary Use Case") },
  { key: "laptopFriendly", label: tr("compare.feature.laptopFriendly", "Laptop Friendly") },
  { key: "immutable", label: tr("compare.feature.immutable", "Immutable / Atomic") },
];

const detailedFeatures: Array<{ key: string; label: string }> = [
  { key: "supportedDesktops", label: tr("compare.feature.desktopEnvironment", "Desktop Environment") },
  { key: "minRam", label: tr("compare.feature.minRam", "Minimum RAM") },
  { key: "installerExperience", label: tr("compare.feature.installerExperience", "Installer Experience") },
  { key: "maintenanceStyle", label: tr("compare.feature.maintenanceStyle", "Maintenance Style") },
  { key: "proprietarySupport", label: tr("compare.feature.proprietarySupport", "Proprietary Software Support") },
  { key: "gamingSupport", label: tr("compare.feature.gamingSupport", "Gaming Support") },
  { key: "privacyPosture", label: tr("compare.feature.privacyPosture", "Privacy Posture") },
];

const features = computed(() =>
  showAllFeatures.value ? [...quickFeatures, ...detailedFeatures] : quickFeatures
);

const asDisplayValue = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.map((item) => asDisplayValue(item)).join(", ");
  }

  if (typeof value === "boolean") {
    const key = `compare.feature.${String(value)}`;
    return te(key) ? t(key) : value ? "Yes" : "No";
  }

  if (value === null || value === undefined || value === "") {
    return tr("compare.feature.NO_PREFERENCE", "No preference");
  }

  if (typeof value === "number") {
    return `${value} GB`;
  }

  const text = String(value);
  const key = `compare.feature.${text}`;
  return te(key) ? t(key) : text;
};

const getFeatureValue = (distro: any, featureKey: string) => {
  const value = distro[featureKey];
  return asDisplayValue(value);
};

const getExclusionReasons = (distroId: string): string[] => {
  const compatibility = compatibilityById.value.get(distroId);
  if (!compatibility || compatibility.compatible) return [];
  return compatibility.excludedBecause.map((reason) => {
    const key = `reasons.${reason}`;
    return te(key) ? t(key) : reason;
  });
};
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8">
    <header class="sticky top-0 z-20 mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <h1 class="text-3xl font-semibold text-slate-900">{{ pageTitle }}</h1>
      <div class="flex items-center gap-2">
        <button
          class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="button"
          @click="showAllFeatures = !showAllFeatures"
        >
          {{ toggleFeatureModeLabel }}
        </button>
        <button
          class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="button"
          @click="clearComparison"
        >
          {{ clearComparisonLabel }}
        </button>
      </div>
    </header>

    <div v-if="selectedDistros.length < 2" class="text-center text-slate-600">
      {{ selectAtLeastTwoLabel }}
    </div>

    <div v-else class="space-y-4">
      <section class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="distro in selectedDistros"
          :key="`summary-${distro.id}`"
          class="rounded-xl border border-slate-200 bg-white p-3"
        >
          <h2 class="text-sm font-semibold text-slate-900">{{ distro.name }}</h2>
          <p class="mt-1 text-xs text-slate-600">
            {{ getExclusionReasons(distro.id).length === 0 ? tr("compare.feature.notExcluded", "Not excluded") : `${getExclusionReasons(distro.id).length} ${tr("compare.feature.exclusion", "exclusion reasons")}` }}
          </p>
        </article>
      </section>

      <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="w-full min-w-[960px] table-auto border-collapse">
        <thead>
          <tr class="bg-slate-50">
            <th class="sticky left-0 z-10 border-b-2 border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700">{{ featureColumnLabel }}</th>
            <th
              v-for="distro in selectedDistros"
              :key="distro.id"
              class="border-b-2 border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700"
            >
              {{ distro.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="sticky left-0 z-10 border-b border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800">{{ tr("compare.feature.exclusion", "Why excluded") }}</td>
            <td
              v-for="distro in selectedDistros"
              :key="`excluded-${distro.id}`"
              class="border-b border-slate-200 px-4 py-3 text-sm text-slate-600"
            >
              <div v-if="getExclusionReasons(distro.id).length === 0" class="text-emerald-700">
                {{ tr("compare.feature.notExcluded", "Not excluded") }}
              </div>
              <ul v-else class="list-disc space-y-1 pl-4 text-rose-700">
                <li v-for="reason in getExclusionReasons(distro.id)" :key="`${distro.id}-${reason}`">{{ reason }}</li>
              </ul>
            </td>
          </tr>
          <tr v-for="feature in features" :key="feature.key">
            <td class="sticky left-0 z-10 border-b border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800">{{ feature.label }}</td>
            <td
              v-for="distro in selectedDistros"
              :key="distro.id"
              class="border-b border-slate-200 px-4 py-3 text-sm text-slate-600"
            >
              {{ getFeatureValue(distro, feature.key) }}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>
