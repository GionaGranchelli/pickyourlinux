<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { DebugVM } from "~/engine/state";

const { t } = useI18n();
const props = defineProps<{ debug: DebugVM }>();
</script>

<template>
  <div class="fixed bottom-2 right-2 max-w-xs max-h-80 overflow-y-auto rounded-lg border border-slate-300 bg-white/95 p-3 text-xs text-slate-700 shadow-xl backdrop-blur z-[9999]">
    <div class="font-semibold text-slate-900 mb-1">{{ t("debug.title") }}</div>
    <pre class="whitespace-pre-wrap text-[10px] leading-tight">{{ JSON.stringify(props.debug, null, 2) }}</pre>
  </div>
</template>
