<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  label: string;
  description?: string;
  image?: string;
  narrowChoice?: boolean;
}>();
const emit = defineEmits<{ (event: "select"): void }>();
const { t, te } = useI18n();
const showPreview = ref(false);

const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);
const onSelect = () => emit("select");
const openPreview = () => {
  if (!props.image) return;
  showPreview.value = true;
};
const closePreview = () => {
  showPreview.value = false;
};
</script>

<template>
  <div class="flex h-full flex-col gap-3">
    <button
      class="group w-full flex-1 text-left p-0 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md"
      type="button"
      @click="onSelect"
    >
      <div class="p-5">
        <div
          v-if="props.narrowChoice"
          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 mb-2"
        >
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          {{ tr("wizard.narrowChoice", "Narrow Choice") }}
        </div>
        <div class="font-bold text-gray-900 group-hover:text-blue-700 text-lg leading-snug">
          {{ props.label }}
        </div>
        <div v-if="props.description" class="text-sm text-gray-500 mt-2 line-clamp-2">
          {{ props.description }}
        </div>
      </div>
    </button>

    <button
      v-if="props.image"
      type="button"
      class="self-start text-xs font-semibold text-blue-700 underline"
      @click="openPreview"
    >
      {{ tr("wizard.previewImage", "Show me what you mean") }}
    </button>

    <div v-if="showPreview && props.image" class="fixed inset-0 z-50">
      <button class="absolute inset-0 bg-slate-900/60" type="button" @click="closePreview" />
      <div class="absolute inset-x-4 top-1/2 mx-auto max-w-3xl -translate-y-1/2 rounded-2xl bg-white p-4 shadow-xl">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-900">{{ props.label }}</h3>
          <button type="button" class="text-xs font-semibold text-slate-700 underline" @click="closePreview">
            {{ tr("reviewAnswers.close", "Close") }}
          </button>
        </div>
        <img
          :src="props.image"
          :alt="props.label"
          class="w-full rounded-xl object-contain bg-slate-50"
          style="max-height: 70vh;"
        >
      </div>
    </div>
  </div>
</template>
