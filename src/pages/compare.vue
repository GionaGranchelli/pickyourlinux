<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDecisionEngine } from "~/composables/useDecisionEngine";
import { getDistros } from "~/engine/eliminate";
import { buildCompatibilityResults } from "~/engine/state";

const { t, te } = useI18n();
const engine = useDecisionEngine(t);
const { distrosToCompare, clearComparison, intent } = engine;

const allDistros = getDistros();
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

const features: Array<{ key: string; label: string }> = [
  { key: "supportedDesktops", label: tr("compare.feature.desktopEnvironment", "Desktop Environment") },
  { key: "packageManager", label: tr("compare.feature.packageManager", "Package Manager") },
  { key: "initSystem", label: tr("compare.feature.initSystem", "Init System") },
  { key: "releaseModel", label: tr("compare.feature.releaseModel", "Release Model") },
  { key: "minRam", label: tr("compare.feature.minRam", "Minimum RAM") },
  { key: "installerExperience", label: tr("compare.feature.installerExperience", "Installer Experience") },
  { key: "maintenanceStyle", label: tr("compare.feature.maintenanceStyle", "Maintenance Style") },
  { key: "proprietarySupport", label: tr("compare.feature.proprietarySupport", "Proprietary Software Support") },
  { key: "gamingSupport", label: tr("compare.feature.gamingSupport", "Gaming Support") },
  { key: "privacyPosture", label: tr("compare.feature.privacyPosture", "Privacy Posture") },
  { key: "secureBootOutOfBox", label: tr("compare.feature.secureBootOutOfBox", "Secure Boot Out-of-the-Box") },
  { key: "nvidiaExperience", label: tr("compare.feature.nvidiaExperience", "NVIDIA Experience") },
];

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
    <header class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-semibold text-slate-900">{{ pageTitle }}</h1>
      <button
        class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="clearComparison"
      >
        {{ clearComparisonLabel }}
      </button>
    </header>

    <div v-if="selectedDistros.length < 2" class="text-center text-slate-600">
      {{ selectAtLeastTwoLabel }}
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th class="border-b-2 border-slate-300 px-4 py-3 text-left text-sm font-semibold text-slate-700">{{ featureColumnLabel }}</th>
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
            <td class="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">{{ tr("compare.feature.exclusion", "Why excluded") }}</td>
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
            <td class="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">{{ feature.label }}</td>
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
</template>
