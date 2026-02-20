<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import ResultsShortlist from "~/components/ResultsShortlist.vue";
import ExplainabilityDrawer from "~/components/ExplainabilityDrawer.vue";
import ReviewAnswersDrawer from "~/components/ReviewAnswersDrawer.vue";
import { useDecisionEngine } from "~/composables/useDecisionEngine";
import {
  DEFAULT_RESULTS_FILTERS,
  filterAndSortResults,
  type ResultsFilters,
  type ResultsSort,
} from "~/engine/state";

const { t, te } = useI18n();
const router = useRouter();
const engine = useDecisionEngine(t);
const {
  intent,
  status,
  resultsVM,
  answersVM,
  reset,
  editAnswer,
  upgradeExperienceLevel,
  distrosToCompare,
  addDistroToCompare,
  removeDistroFromCompare,
} = engine;

const expanded = ref(false);
const explainOpen = ref(false);
const reviewOpen = ref(false);
const sortBy = ref<ResultsSort>("BEST_MATCH");
const filters = ref<ResultsFilters>({ ...DEFAULT_RESULTS_FILTERS });
const filterCollapsed = ref(true);

const compareCount = computed(() => distrosToCompare.value.length);
const allResults = computed(() => resultsVM.value.allCompatible);
const totalResultsCount = computed(() => allResults.value.length);
const excludedDistros = computed(() => resultsVM.value.excludedDistros);

const filteredResults = computed(() => {
  return filterAndSortResults(allResults.value, filters.value, sortBy.value);
});

const filteredShortlist = computed(() => filteredResults.value.slice(0, 3));
const visibleResultsCount = computed(() => filteredResults.value.length);
const activeFilterCount = computed(() => {
  const values = Object.values(filters.value);
  return values.filter((value) => value !== "ALL").length;
});

const optionsFrom = <T,>(items: T[]): T[] => Array.from(new Set(items));

const releaseModelOptions = computed(() => optionsFrom(allResults.value.map((item) => item.releaseModel).filter(Boolean)));
const desktopOptions = computed(() => optionsFrom(allResults.value.flatMap((item) => item.supportedDesktops ?? [])));
const gamingOptions = computed(() => optionsFrom(allResults.value.map((item) => item.gamingSupport).filter(Boolean)));
const packageManagerOptions = computed(() => optionsFrom(allResults.value.map((item) => item.packageManager).filter(Boolean)));
const initSystemOptions = computed(() => optionsFrom(allResults.value.map((item) => item.initSystem).filter(Boolean)));
const installerOptions = computed(() => optionsFrom(allResults.value.map((item) => item.installerExperience).filter(Boolean)));
const maintenanceOptions = computed(() => optionsFrom(allResults.value.map((item) => item.maintenanceStyle).filter(Boolean)));
const proprietaryOptions = computed(() => optionsFrom(allResults.value.map((item) => item.proprietarySupport).filter(Boolean)));
const privacyOptions = computed(() => optionsFrom(allResults.value.map((item) => item.privacyPosture).filter(Boolean)));
const nvidiaOptions = computed(() => optionsFrom(allResults.value.map((item) => item.nvidiaExperience).filter(Boolean)));

const trFeature = (value: string) => {
  const key = `compare.feature.${value}`;
  return t(key) === key ? value : t(key);
};

const resetFilters = () => {
  filters.value = { ...DEFAULT_RESULTS_FILTERS };
  sortBy.value = "BEST_MATCH";
};
const tr = (key: string, fallback: string) => (te(key) ? t(key) : fallback);

const nextExperience = computed<"INTERMEDIATE" | "ADVANCED" | null>(() => {
  if (intent.value.experience === "BEGINNER") return "INTERMEDIATE";
  if (intent.value.experience === "INTERMEDIATE") return "ADVANCED";
  return null;
});

const refinementLabel = computed(() => {
  if (nextExperience.value === "INTERMEDIATE") {
    return tr("results.refineToIntermediate", "Refine further (Intermediate)");
  }
  if (nextExperience.value === "ADVANCED") {
    return tr("results.refineToAdvanced", "Refine further (Advanced)");
  }
  return "";
});

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

const openExplain = () => {
  explainOpen.value = true;
};

const closeExplain = () => {
  explainOpen.value = false;
};

const openReview = () => {
  reviewOpen.value = true;
};

const closeReview = () => {
  reviewOpen.value = false;
};

const restart = () => {
  reset();
  void router.push("/");
};

const handleToggleCompare = (id: string, isCompared: boolean) => {
  if (isCompared) {
    addDistroToCompare(id);
  } else {
    removeDistroFromCompare(id);
  }
};

const goToCompare = () => {
  void router.push("/compare");
};

const continueRefinement = () => {
  if (!nextExperience.value) return;
  const changed = upgradeExperienceLevel(nextExperience.value);
  if (!changed) return;
  void router.push("/wizard");
};

watchEffect(() => {
  if (status.value === "IN_PROGRESS") {
    void router.push("/wizard");
  }
});
</script>

<template>
  <div class="space-y-8">
    <section class="space-y-3">
      <h1 class="text-2xl font-semibold text-slate-900">{{ t("results.title") }}</h1>
      <p class="text-sm text-slate-600">
        {{ t("results.tagline") }}
      </p>
      <p class="text-xs text-slate-500">
        {{ tr("results.confidenceHelp", "Confidence of fit is shown as strict constraints matched out of active constraints.") }}
      </p>
    </section>

    <section class="results-filter-shell">
      <div class="results-filter-header cursor-pointer select-none" @click="filterCollapsed = !filterCollapsed">
        <div class="flex-grow">
          <div class="flex items-center justify-between">
            <h2 class="results-filter-title">Filter and sort</h2>
            <button
              class="flex items-center gap-1 text-xs font-bold text-blue-600 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              type="button"
            >
              {{ filterCollapsed ? 'Expand Filters' : 'Collapse' }}
            </button>
          </div>
          <p class="results-filter-subtitle">Refine results using distro attributes and compare-style metadata.</p>
        </div>
        <div class="results-filter-badges hidden md:flex">
          <span class="results-pill">{{ visibleResultsCount }} / {{ totalResultsCount }} visible</span>
          <span class="results-pill results-pill-accent">{{ activeFilterCount }} filters active</span>
          <button
            class="results-reset-btn"
            type="button"
            @click.stop="resetFilters"
          >
            Reset
          </button>
        </div>
      </div>

      <div v-show="!filterCollapsed" class="results-filter-grid pt-2 border-t border-slate-100 mt-2">
        <label class="results-filter-field">
          <span>Sort</span>
          <select v-model="sortBy" class="results-select">
            <option value="BEST_MATCH">Most match first</option>
            <option value="NAME_ASC">Name A-Z</option>
            <option value="NAME_DESC">Name Z-A</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Release</span>
          <select v-model="filters.releaseModel" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in releaseModelOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Desktop environment</span>
          <select v-model="filters.desktop" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in desktopOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Gaming</span>
          <select v-model="filters.gamingSupport" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in gamingOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Package manager</span>
          <select v-model="filters.packageManager" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in packageManagerOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Init system</span>
          <select v-model="filters.initSystem" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in initSystemOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Installer</span>
          <select v-model="filters.installerExperience" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in installerOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Maintenance</span>
          <select v-model="filters.maintenanceStyle" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in maintenanceOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Proprietary support</span>
          <select v-model="filters.proprietarySupport" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in proprietaryOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Privacy</span>
          <select v-model="filters.privacyPosture" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in privacyOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>Secure Boot</span>
          <select v-model="filters.secureBootOutOfBox" class="results-select">
            <option value="ALL">All</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </label>
        <label class="results-filter-field">
          <span>NVIDIA experience</span>
          <select v-model="filters.nvidiaExperience" class="results-select">
            <option value="ALL">All</option>
            <option v-for="value in nvidiaOptions" :key="value" :value="value">{{ trFeature(String(value)) }}</option>
          </select>
        </label>
      </div>

      <div class="md:hidden mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-2 items-center justify-between">
        <div class="flex gap-2">
          <span class="text-[0.65rem] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{{ visibleResultsCount }} / {{ totalResultsCount }}</span>
          <span v-if="activeFilterCount > 0" class="text-[0.65rem] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{{ activeFilterCount }} active</span>
        </div>
        <button
          v-if="activeFilterCount > 0"
          class="text-[0.65rem] font-bold text-slate-600 underline underline-offset-2"
          type="button"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
    </section>

    <ResultsShortlist
      :shortlist="filteredShortlist"
      :all="filteredResults"
      :is-expanded="expanded"
      :on-toggle="toggleExpanded"
      :distros-to-compare="distrosToCompare"
      @toggle-compare="handleToggleCompare"
    />

    <section class="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">{{ tr("results.excluded.title", "Why others were excluded") }}</h2>
          <p class="text-sm text-slate-500">
            {{ tr("results.excluded.tagline", "These distros were filtered out by explicit constraints in your answers.") }}
          </p>
        </div>
        <span class="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          {{ excludedDistros.length }} {{ tr("results.excluded.count", "excluded") }}
        </span>
      </div>

      <div v-if="excludedDistros.length === 0" class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        {{ tr("results.excluded.none", "No distros were excluded for your current constraints.") }}
      </div>

      <div v-else class="excluded-grid">
        <article
          v-for="item in excludedDistros"
          :key="item.id"
          class="rounded-xl border border-rose-100 bg-rose-50/40 p-4"
        >
          <h3 class="text-sm font-semibold text-slate-900">{{ item.name }}</h3>
          <p v-if="item.description" class="mt-1 text-xs text-slate-500">{{ item.description }}</p>
          <ul class="mt-3 space-y-1 text-sm text-slate-700">
            <li v-for="reason in item.reasons" :key="`${item.id}-${reason}`">- {{ reason }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900">{{ t("results.explainability.title") }}</h2>
          <p class="text-sm text-slate-500">{{ t("results.explainability.tagline") }}</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            @click="openReview"
          >
            {{ t("results.reviewAnswers") }}
          </button>
          <button
            class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            @click="openExplain"
          >
            {{ t("results.why") }}
          </button>
          <button
            class="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            @click="restart"
          >
            {{ t("results.startOver") }}
          </button>
          <button
            v-if="nextExperience"
            class="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            type="button"
            @click="continueRefinement"
          >
            {{ refinementLabel }}
          </button>
          <button
            v-if="compareCount >= 1"
            class="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            :disabled="compareCount < 2"
            @click="goToCompare"
          >
            {{ t("results.compareSelected", { count: compareCount }) }}
          </button>
        </div>
      </div>
    </section>

    <ExplainabilityDrawer
      :open="explainOpen"
      :active-constraints="resultsVM.activeConstraints"
      :excluded="resultsVM.excludedDistros"
      :on-close="closeExplain"
    />

    <ReviewAnswersDrawer
      :open="reviewOpen"
      :answers="answersVM"
      :on-close="closeReview"
      :on-jump-to="editAnswer"
    />
  </div>
</template>

<style scoped>
.results-filter-shell {
  position: sticky;
  top: 0.75rem;
  z-index: 20;
  border: 1px solid #cbd5e1;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.95)),
    radial-gradient(circle at 20% -20%, rgba(147, 197, 253, 0.2), transparent 40%);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.1);
}

.results-filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.results-filter-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}

.results-filter-subtitle {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  color: #64748b;
}

.results-filter-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
}

.results-pill {
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.28rem 0.62rem;
}

.results-pill-accent {
  border-color: #bfdbfe;
  background: #eff6ff;
  color: #1e40af;
}

.results-reset-btn {
  border-radius: 999px;
  border: 1px solid #94a3b8;
  background: #ffffff;
  color: #334155;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.33rem 0.75rem;
  cursor: pointer;
}

.results-filter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.results-filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #475569;
}

.results-select {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 0.58rem;
  background: #fff;
  color: #0f172a;
  font-size: 0.82rem;
  padding: 0.46rem 0.58rem;
}

.excluded-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 900px) {
  .results-filter-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .excluded-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .results-filter-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
