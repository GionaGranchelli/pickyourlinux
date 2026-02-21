<script setup lang="ts">
import type { Distro } from "~/data/distro-types";

const props = defineProps<{ distro: Distro }>();
const emit = defineEmits<{ (event: "openFeatures", id: string): void }>();
</script>

<template>
  <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="mb-3">
      <h2 class="text-lg font-semibold text-slate-900">{{ props.distro.name }}</h2>
      <p class="text-xs text-slate-500">{{ props.distro.id }}</p>
      <p v-if="props.distro.description" class="mt-1 text-sm text-slate-600">{{ props.distro.description }}</p>
    </div>

    <div class="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full border border-blue-300 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"
        @click="emit('openFeatures', props.distro.id)"
      >
        View distro features
      </button>
      <a v-if="props.distro.websiteUrl" :href="props.distro.websiteUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Website</a>
      <a v-if="props.distro.documentationUrl" :href="props.distro.documentationUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Docs</a>
      <a v-if="props.distro.downloadUrl" :href="props.distro.downloadUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Download</a>
    </div>
  </article>
</template>
