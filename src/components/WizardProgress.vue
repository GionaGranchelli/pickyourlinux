<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ProgressVM } from "~/engine/state";

const { t } = useI18n();
const props = defineProps<{ progress: ProgressVM }>();
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
      <span>{{ t("wizard.progress.progress") }}</span>
      <span>{{ props.progress.current }} / {{ props.progress.total }}</span>
    </div>
    <div class="mt-2 h-2 rounded-full bg-gray-200" aria-hidden="true">
      <div
        class="h-2 rounded-full bg-blue-500 transition-all"
        :style="{ width: `${props.progress.percent}%` }"
      ></div>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-400 font-medium">
      <span>{{ t("wizard.progress.questionOf", { current: props.progress.current, total: props.progress.total }) }}</span>
      <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        {{ props.progress.phaseLabel }}
      </span>
    </div>
  </div>
</template>
