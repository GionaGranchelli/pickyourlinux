<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  label: string;
  description?: string;
  image?: string;
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
