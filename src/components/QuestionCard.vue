<script setup lang="ts">
import type { Question } from "~/data/types";

const props = defineProps<{ question: Question }>();
const emit = defineEmits<{ (event: "select", optionId: string): void }>();

const onSelect = (optionId: string) => {
  emit("select", optionId);
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-2xl p-8 transition-all duration-300">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ props.question.text }}
      </h2>
    </div>

    <div class="grid gap-3" role="list">
      <button
        v-for="option in props.question.options"
        :key="option.id"
        class="group text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        role="listitem"
        @click="onSelect(option.id)"
      >
        <div class="font-semibold text-gray-800 group-hover:text-blue-700">
          {{ option.label }}
        </div>
        <div v-if="option.description" class="text-sm text-gray-500 mt-1">
          {{ option.description }}
        </div>
      </button>
    </div>
  </div>
</template>
