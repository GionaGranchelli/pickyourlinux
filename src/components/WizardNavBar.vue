<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, te } = useI18n();
const props = defineProps<{
  canUndo: boolean;
  onUndo: () => void;
  onSkip?: () => void;
  canSkip?: boolean;
  onRestart: () => void;
  onReview: () => void;
}>();

const handleUndo = () => props.onUndo();
const handleSkip = () => props.onSkip?.();
const handleRestart = () => props.onRestart();
const handleReview = () => props.onReview();
const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);
</script>

<template>
  <div class="mt-8 flex flex-wrap items-center justify-between gap-3">
    <button
      class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-30 disabled:pointer-events-none"
      type="button"
      :disabled="!props.canUndo"
      @click="handleUndo"
    >
      {{ t("wizard.nav.back") }}
    </button>

    <div class="flex items-center gap-3">
      <button
        v-if="props.onSkip"
        class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-30 disabled:pointer-events-none"
        type="button"
        :disabled="props.canSkip === false"
        @click="handleSkip"
      >
        {{ tr("wizard.nav.skip", "Skip") }}
      </button>
      <button
        class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="handleReview"
      >
        {{ t("wizard.nav.reviewAnswers") }}
      </button>
      <button
        class="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="handleRestart"
      >
        {{ t("wizard.nav.restart") }}
      </button>
    </div>
  </div>
</template>
