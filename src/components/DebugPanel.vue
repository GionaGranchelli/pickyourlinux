<script setup lang="ts">
import type { PropType } from "vue";

export type DebugSkippedQuestion = {
  id: string;
  text: string;
  reason: string;
  showIfJson: string;
};

export type DebugExclusion = {
  distroId: string;
  excludedReason: string[];
};

defineProps({
  enabled: {
    type: Boolean,
    required: true
  },
  intent: {
    type: Object as PropType<Record<string, unknown>>,
    required: true
  },
  appliedPatches: {
    type: Array as PropType<string[]>,
    required: true
  },
  skippedQuestions: {
    type: Array as PropType<DebugSkippedQuestion[]>,
    required: true
  },
  exclusions: {
    type: Array as PropType<DebugExclusion[]>,
    required: true
  }
});
</script>

<template>
  <div v-if="enabled" class="mt-8 rounded-2xl border border-gray-300 bg-gray-50 p-5 text-xs font-mono">
    <div class="font-bold text-gray-600">DEBUG PANEL</div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">UserIntent</div>
      <pre class="mt-2 whitespace-pre-wrap">{{ intent }}</pre>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Applied Patches</div>
      <ul class="mt-2 space-y-1 text-gray-600">
        <li v-if="appliedPatches.length === 0">None</li>
        <li v-for="(patch, idx) in appliedPatches" :key="idx">{{ patch }}</li>
      </ul>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Skipped Questions</div>
      <div v-if="skippedQuestions.length === 0" class="mt-2 text-gray-600">None</div>
      <div v-for="item in skippedQuestions" :key="item.id" class="mt-3 text-gray-600">
        <div class="font-semibold">{{ item.id }} - {{ item.text }}</div>
        <div>Reason: {{ item.reason }}</div>
        <pre class="mt-1 whitespace-pre-wrap">{{ item.showIfJson }}</pre>
      </div>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Exclusion Reasons</div>
      <div v-if="exclusions.length === 0" class="mt-2 text-gray-600">None</div>
      <div v-for="exclusion in exclusions" :key="exclusion.distroId" class="mt-3 text-gray-600">
        <div class="font-semibold">{{ exclusion.distroId }}</div>
        <ul class="mt-1 space-y-1">
          <li v-for="(reason, idx) in exclusion.excludedReason" :key="idx">{{ reason }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
