<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import type { AnswerVM } from "~/engine/state";

const { t } = useI18n();
const props = defineProps<{
  open: boolean;
  answers: AnswerVM[];
  onClose: () => void;
  onJumpTo: (questionId: string) => void;
}>();

const panelRef = ref<HTMLElement | null>(null);

const groupedAnswers = computed(() => {
  const groups = new Map<string, AnswerVM[]>();
  props.answers.forEach((answer) => {
    if (!groups.has(answer.phaseLabel)) {
      groups.set(answer.phaseLabel, []);
    }
    groups.get(answer.phaseLabel)?.push(answer);
  });

  return Array.from(groups.entries()).map(([phaseLabel, items]) => ({
    phaseLabel,
    items,
  }));
});

const close = () => props.onClose();
const jumpTo = (questionId: string) => props.onJumpTo(questionId);

watch(
  () => props.open,
  (open) => {
    if (!open) return;
    void nextTick(() => {
      panelRef.value?.focus();
    });
  }
);
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-slate-900/40" @click="close"></div>
    <div
      class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
      role="dialog"
      aria-modal="true"
      @keydown.esc="close"
      tabindex="0"
      ref="panelRef"
    >
      <div class="flex items-center justify-between border-b border-slate-200 p-4">
        <div>
          <div class="text-sm font-semibold text-slate-900">{{ t("reviewAnswers.title") }}</div>
          <div class="text-xs text-slate-500">{{ t("reviewAnswers.tagline") }}</div>
        </div>
        <button
          class="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="button"
          @click="close"
        >
          {{ t("reviewAnswers.close") }}
        </button>
      </div>

      <div class="h-full overflow-y-auto p-4">
        <div v-if="groupedAnswers.length === 0" class="text-sm text-slate-500">
          {{ t("reviewAnswers.noAnswers") }}
        </div>

        <div v-else class="space-y-6">
          <div v-for="group in groupedAnswers" :key="group.phaseLabel" class="space-y-2">
            <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ group.phaseLabel }}</div>
            <ul class="space-y-2">
              <li
                v-for="answer in group.items"
                :key="answer.questionId"
                class="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <div>
                  <div class="text-sm font-semibold text-gray-700">{{ answer.questionText }}</div>
                  <div class="text-xs text-gray-500">{{ answer.optionLabel }}</div>
                </div>
                <button
                  class="self-start rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  type="button"
                  @click="jumpTo(answer.questionId)"
                >
                  {{ t("reviewAnswers.change") }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
