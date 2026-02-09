<script setup lang="ts">
const props = defineProps<{ label: string; description?: string }>();
const emit = defineEmits<{ (event: "select"): void }>();

const onSelect = () => emit("select");
</script>

<template>
  <button
    class="group text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    type="button"
    @click="onSelect"
  >
    <div class="font-semibold text-gray-800 group-hover:text-blue-700">
      {{ props.label }}
    </div>
    <div v-if="props.description" class="text-sm text-gray-500 mt-1">
      {{ props.description }}
    </div>
  </button>
</template>
