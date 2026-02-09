<script setup lang="ts">
import { useI18n } from "vue-i18n";
import DistroCard from "~/components/DistroCard.vue";
import type { DistroCardVM } from "~/engine/state";

const { t } = useI18n();
const props = defineProps<{
  shortlist: DistroCardVM[];
  all: DistroCardVM[];
  isExpanded: boolean;
  onToggle: () => void;
  distrosToCompare: string[];
}>();

const emit = defineEmits<{ (event: "toggleCompare", id: string, isCompared: boolean): void }>();

const toggle = () => props.onToggle();
const handleToggleCompare = (id: string, isCompared: boolean) => {
  emit("toggleCompare", id, isCompared);
};
</script>

<template>
  <div class="space-y-4">
    <div v-if="props.all.length === 0" class="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
      {{ t("results.noMatch") }}
    </div>

    <div v-else class="results-grid">
      <DistroCard
        v-for="distro in (props.isExpanded ? props.all : props.shortlist)"
        :key="distro.id"
        :distro="distro"
        :is-compared="props.distrosToCompare.includes(distro.id)"
        @toggle-compare="handleToggleCompare"
      />
    </div>

    <div v-if="props.all.length > props.shortlist.length" class="mt-2">
      <button
        class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="toggle"
      >
        {{ props.isExpanded ? t("results.showFewer") : t("results.showAll") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.results-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .results-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .results-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1600px) {
  .results-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
