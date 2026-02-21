<script setup lang="ts">
import { computed, ref } from "vue";
import type { Distro } from "~/data/distro-types";
import { getAllDistros } from "~/engine/state";
import DistroFilters from "~/components/distros/DistroFilters.vue";
import DistroSummaryCard from "~/components/distros/DistroSummaryCard.vue";
import DistroFeaturesModal from "~/components/distros/DistroFeaturesModal.vue";

const allDistros = getAllDistros();

const search = ref("");
const releaseFilter = ref<"ALL" | "FIXED" | "ROLLING">("ALL");
const useCaseFilter = ref<"ALL" | "DESKTOP" | "SERVER" | "BOTH">("ALL");
const docsFilter = ref<"ALL" | "EXCELLENT" | "GOOD" | "OK" | "THIN">("ALL");
const openDistroId = ref<string | null>(null);

const normalized = (text: string) => text.toLowerCase().trim();

const filtered = computed(() => {
  const q = normalized(search.value);

  return allDistros
    .filter((distro) => {
      if (releaseFilter.value !== "ALL" && distro.releaseModel !== releaseFilter.value) return false;
      if (useCaseFilter.value !== "ALL" && distro.primaryUseCase !== useCaseFilter.value) return false;
      if (docsFilter.value !== "ALL" && distro.docsEcosystem !== docsFilter.value) return false;

      if (!q) return true;

      const haystack = [
        distro.id,
        distro.name,
        distro.description,
        distro.packageManager,
        distro.initSystem,
        distro.releaseModel,
        distro.primaryUseCase,
        distro.docsEcosystem,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
});

const openFeatures = (id: string) => {
  openDistroId.value = id;
};

const closeFeatures = () => {
  openDistroId.value = null;
};

const selectedDistro = computed<Distro | null>(() => {
  if (!openDistroId.value) return null;
  return allDistros.find((d) => d.id === openDistroId.value) ?? null;
});
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-6 px-4 py-6">
    <header class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900">All distros and metrics</h1>
      <p class="text-sm text-slate-600">
        Complete dataset view. No scoring and no hidden weights, just modeled attributes.
      </p>
    </header>

    <DistroFilters
      :search="search"
      :release-filter="releaseFilter"
      :use-case-filter="useCaseFilter"
      :docs-filter="docsFilter"
      @update:search="search = $event"
      @update:release-filter="releaseFilter = $event"
      @update:use-case-filter="useCaseFilter = $event"
      @update:docs-filter="docsFilter = $event"
    />

    <div class="text-xs font-semibold text-slate-600">
      Showing {{ filtered.length }} / {{ allDistros.length }} distros
    </div>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <DistroSummaryCard
        v-for="distro in filtered"
        :key="distro.id"
        :distro="distro"
        @open-features="openFeatures"
      />
    </section>

    <DistroFeaturesModal :distro="selectedDistro" @close="closeFeatures" />
  </div>
</template>
