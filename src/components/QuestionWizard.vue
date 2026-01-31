<script setup lang="ts">
import { computed } from "vue";
import QuestionCard from "~/components/QuestionCard.vue";
import { useDecisionEngine } from "~/composables/useDecisionEngine";
import type { DecisionEngine } from "~/engine/state";

const props = defineProps<{ engine?: DecisionEngine }>();

const engine = props.engine ?? useDecisionEngine();
const { currentQuestion, status, intent, answeredIds, selectOptionById, undo, progress, phaseLabel } = engine;

const canUndo = computed(() => answeredIds.value.length > 0);
const onSelect = (optionId: string) => {
  selectOptionById(optionId);
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div v-if="status === 'IN_PROGRESS' && currentQuestion" class="space-y-6">
      <div class="mb-6">
        <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
          <span>Progress</span>
          <span>{{ progress.answered }} / {{ progress.total }}</span>
        </div>
        <div class="mt-2 h-2 rounded-full bg-gray-200" aria-hidden="true">
          <div
            class="h-2 rounded-full bg-blue-500 transition-all"
            :style="{ width: `${progress.percent}%` }"
          ></div>
        </div>
        <div class="sr-only" role="status" aria-live="polite">
          Progress {{ progress.answered }} of {{ progress.total }}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-400 font-medium">
        <span>Question {{ progress.current }} of {{ progress.total }}</span>
        <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {{ phaseLabel }}
        </span>
      </div>

      <QuestionCard :question="currentQuestion" @select="onSelect" />

      <div class="mt-8 flex justify-between items-center">
        <button
          class="text-gray-400 hover:text-gray-600 text-sm font-medium"
          type="button"
          :disabled="!canUndo"
          @click="undo"
        >
          <- Back
        </button>
      </div>
    </div>

    <div v-else class="text-center py-12 text-sm text-gray-500">
      <p v-if="status === 'COMPLETED'">You have completed the questions.</p>
      <p v-else-if="status === 'DISQUALIFIED'">The flow has been stopped.</p>
      <p v-else>Preparing the next step.</p>
    </div>
  </div>
</template>
