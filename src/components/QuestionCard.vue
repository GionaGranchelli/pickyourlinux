<script setup lang="ts">
import OptionButton from "~/components/OptionButton.vue";
import type { QuestionVM } from "~/engine/state";

const props = defineProps<{ question: QuestionVM }>();
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

    <div class="grid gap-3 max-h-80 overflow-y-auto pr-1 pt-1" role="list">
      <OptionButton
        v-for="option in props.question.options"
        :key="option.id"
        :label="option.label"
        :description="option.description"
        role="listitem"
        @select="onSelect(option.id)"
      />
    </div>
  </div>
</template>
