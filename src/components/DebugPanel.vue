<script setup lang="ts">
import type { PropType } from "vue";
import type { EngineStatus } from "~/engine/state";
import type { UserIntent } from "~/data/types";

export type DebugSkippedQuestion = {
  questionId: string;
  showIfJson: string;
};

defineProps({
  enabled: {
    type: Boolean,
    required: true
  },
  status: {
    type: String as PropType<EngineStatus>,
    required: true
  },
  answeredIds: {
    type: Array as PropType<string[]>,
    required: true
  },
  intent: {
    type: Object as PropType<UserIntent>,
    required: true
  },
  lastAppliedPatches: {
    type: Array as PropType<string[]>,
    required: true
  },
  skippedQuestions: {
    type: Array as PropType<DebugSkippedQuestion[]>,
    required: true
  }
});
</script>

<template>
  <div v-if="enabled" class="mt-8 rounded-2xl border border-gray-300 bg-gray-50 p-5 text-xs font-mono">
    <div class="font-bold text-gray-600">DEBUG PANEL</div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Status</div>
      <pre class="mt-2 whitespace-pre-wrap">{{ status }}</pre>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Answered IDs</div>
      <pre class="mt-2 whitespace-pre-wrap">{{ answeredIds }}</pre>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">UserIntent</div>
      <pre class="mt-2 whitespace-pre-wrap">{{ intent }}</pre>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Last Applied Patches</div>
      <ul class="mt-2 space-y-1 text-gray-600">
        <li v-if="lastAppliedPatches.length === 0">None</li>
        <li v-for="(patch, idx) in lastAppliedPatches" :key="idx">{{ patch }}</li>
      </ul>
    </div>

    <div class="mt-4">
      <div class="font-semibold text-gray-500">Skipped Questions</div>
      <div v-if="skippedQuestions.length === 0" class="mt-2 text-gray-600">None</div>
      <div v-for="item in skippedQuestions" :key="item.questionId" class="mt-3 text-gray-600">
        <div class="font-semibold">{{ item.questionId }}</div>
        <pre class="mt-1 whitespace-pre-wrap">{{ item.showIfJson }}</pre>
      </div>
    </div>
  </div>
</template>
