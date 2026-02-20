<script setup lang="ts">
const props = defineProps<{ 
  label: string; 
  description?: string;
  image?: string;
}>();
const emit = defineEmits<{ (event: "select"): void }>();

const onSelect = () => emit("select");
</script>

<template>
  <button
    class="group text-left p-0 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 overflow-hidden flex flex-col h-full bg-white shadow-sm hover:shadow-md"
    type="button"
    @click="onSelect"
  >
    <div v-if="props.image" class="w-full aspect-video bg-gray-100 overflow-hidden border-b border-gray-100">
      <img :src="props.image" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" :alt="props.label">
    </div>
    <div class="p-5">
      <div class="font-bold text-gray-900 group-hover:text-blue-700 text-lg leading-snug">
        {{ props.label }}
      </div>
      <div v-if="props.description" class="text-sm text-gray-500 mt-2 line-clamp-2">
        {{ props.description }}
      </div>
    </div>
  </button>
</template>
