<script setup lang="ts">
import type { PropType } from "vue";

export type AnswerSummary = {
  questionId: string;
  questionText: string;
  optionLabel: string;
};

export type AnswerGroup = {
  phaseKey: string;
  phaseLabel: string;
  answers: AnswerSummary[];
};

defineProps({
  groups: {
    type: Array as PropType<AnswerGroup[]>,
    required: true
  }
});

const emit = defineEmits<{
  (event: "editAnswer", questionId: string): void;
}>();

const editAnswer = (questionId: string) => emit("editAnswer", questionId);
</script>

<template>
  <div>
    <div v-if="groups.length === 0" class="mt-4 text-sm text-gray-500">No answers recorded.</div>

    <div v-else class="mt-4 space-y-6">
      <div v-for="group in groups" :key="group.phaseKey" class="space-y-2">
        <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ group.phaseLabel }}</div>
        <ul class="space-y-2">
          <li
            v-for="answer in group.answers"
            :key="answer.questionId"
            class="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div class="text-sm font-semibold text-gray-700">{{ answer.questionText }}</div>
              <div class="text-xs text-gray-500">{{ answer.optionLabel }}</div>
            </div>
            <button
              class="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
              type="button"
              @click="editAnswer(answer.questionId)"
            >
              Edit
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
