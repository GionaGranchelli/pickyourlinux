<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{ 
  onRestart: () => void;
  onUndo: () => void;
  reason?: string;
}>();

const restart = () => props.onRestart();
const undo = () => props.onUndo();
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
    <h2 class="text-2xl font-semibold text-slate-900">{{ t("disqualified.title") }}</h2>
    <p class="mt-3 text-sm text-slate-600">
      {{ props.reason || t("disqualified.tagline") }}
    </p>
    
    <div v-if="props.reason" class="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium italic">
      "{{ props.reason }}"
    </div>

    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <button
        class="w-full sm:w-auto rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="undo"
      >
        {{ t("wizard.nav.back") }}
      </button>
      <button
        class="w-full sm:w-auto rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="restart"
      >
        {{ t("disqualified.startOver") }}
      </button>
    </div>
  </div>
</template>
