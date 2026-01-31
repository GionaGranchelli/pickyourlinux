<script setup lang="ts">
import type { PropType } from "vue";

export type ResultsItem = {
  distroId: string;
  includedReason: string[];
  excludedReason: string[];
  matchedTags: string[];
  included: boolean;
  name: string;
  description?: string;
};

defineProps({
  recommendations: {
    type: Array as PropType<ResultsItem[]>,
    required: true
  }
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6">
    <div
      v-for="rec in recommendations"
      :key="rec.distroId"
      class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">{{ rec.name }}</h3>
          <p v-if="rec.description" class="mt-1 text-sm text-gray-500">
            {{ rec.description }}
          </p>
        </div>
        <span
          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          :class="rec.included ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
        >
          {{ rec.included ? 'Included' : 'Excluded' }}
        </span>
      </div>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Why included</div>
          <ul class="mt-2 space-y-1 text-sm text-gray-600">
            <li v-if="rec.includedReason.length === 0">None</li>
            <li v-for="(reason, idx) in rec.includedReason" :key="idx">{{ reason }}</li>
          </ul>
        </div>
        <div>
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Why excluded</div>
          <ul class="mt-2 space-y-1 text-sm text-gray-600">
            <li v-if="rec.excludedReason.length === 0">None</li>
            <li v-for="(reason, idx) in rec.excludedReason" :key="idx">{{ reason }}</li>
          </ul>
        </div>
      </div>

      <div v-if="rec.matchedTags.length" class="mt-4 text-xs text-gray-500">
        Matched tags: {{ rec.matchedTags.join(', ') }}
      </div>
    </div>
  </div>
</template>
