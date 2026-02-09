<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{ onRestart: () => void }>();

const restart = () => props.onRestart();
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
    <h2 class="text-2xl font-semibold text-slate-900">{{ t("disqualified.title") }}</h2>
    <p class="mt-3 text-sm text-slate-600">
      {{ t("disqualified.tagline") }}
    </p>
    <button
      class="mt-6 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      type="button"
      @click="restart"
    >
      {{ t("disqualified.startOver") }}
    </button>
  </div>
</template>
