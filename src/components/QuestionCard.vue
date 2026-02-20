<script setup lang="ts">
import { computed } from "vue";
import OptionButton from "~/components/OptionButton.vue";
import type { QuestionVM } from "~/engine/state";

const props = defineProps<{ question: QuestionVM }>();
const emit = defineEmits<{ (event: "select", optionId: string): void }>();

const hasImages = computed(() => props.question.options.some(opt => !!opt.image));

const onSelect = (optionId: string) => {
  emit("select", optionId);
};
</script>

<template>
  <div class="bg-white shadow-xl rounded-3xl p-6 sm:p-10 border border-gray-100 transition-all duration-300">
    <div class="mb-10">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {{ props.question.text }}
      </h2>
    </div>

    <div 
      class="grid pr-1 pt-1"
      :class="[hasImages ? 'gap-8 grid-cols-1 sm:grid-cols-2' : 'gap-6 grid-cols-1']"
      role="list"
    >
      <OptionButton
        v-for="option in props.question.options"
        :key="option.id"
        :label="option.label"
        :description="option.description"
        :image="option.image"
        role="listitem"
        @select="onSelect(option.id)"
      />
    </div>
  </div>
</template>
