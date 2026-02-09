<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{
  open: boolean;
  activeConstraints: string[];
  excluded: { id: string; name: string; reasons: string[] }[];
  onClose: () => void;
}>();

const panelRef = ref<HTMLElement | null>(null);

const close = () => props.onClose();

watch(
  () => props.open,
  (open) => {
    if (!open) return;
    void nextTick(() => panelRef.value?.focus());
  }
);
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-slate-900/40" @click="close"></div>
    <div
      class="absolute left-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
      role="dialog"
      aria-modal="true"
      tabindex="0"
      ref="panelRef"
      @keydown.esc="close"
    >
      <div class="flex items-center justify-between border-b border-slate-200 p-4">
        <div>
          <div class="text-sm font-semibold text-slate-900">{{ t("explainability.title") }}</div>
          <div class="text-xs text-slate-500">{{ t("explainability.tagline") }}</div>
        </div>
        <button
          class="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="button"
          @click="close"
        >
          {{ t("explainability.close") }}
        </button>
      </div>

      <div class="h-full overflow-y-auto p-4 space-y-6">
        <section>
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ t("explainability.activeConstraints") }}</div>
          <ul class="mt-2 space-y-1 text-sm text-gray-600">
            <li v-if="props.activeConstraints.length === 0">{{ t("explainability.noActiveConstraints") }}</li>
            <li v-for="(constraint, idx) in props.activeConstraints" :key="idx">{{ constraint }}</li>
          </ul>
        </section>

        <section>
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ t("explainability.excludedDistros") }}</div>
          <div v-if="props.excluded.length === 0" class="mt-2 text-sm text-gray-500">
            {{ t("explainability.noneExcluded") }}
          </div>
          <div v-else class="mt-2 space-y-3">
            <div
              v-for="item in props.excluded"
              :key="item.id"
              class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-gray-600"
            >
              <div class="font-semibold text-gray-700">{{ item.name }}</div>
              <ul class="mt-1 list-disc space-y-1 pl-4">
                <li v-for="reason in item.reasons" :key="`${item.id}-${reason}`">{{ reason }}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
