<script setup lang="ts">
const emit = defineEmits<{ (event: "restart"): void }>();

const onRestart = () => {
  emit("restart");
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 text-center">
    <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 class="text-2xl font-semibold text-gray-900">We stopped the flow</h2>
      <p class="mt-3 text-sm text-gray-500">
        One of your answers triggered a hard stop in the decision flow. If you want to explore other
        outcomes, you can restart the questions at any time.
      </p>
      <button
        class="mt-6 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500"
        type="button"
        @click="onRestart"
      >
        Start over
      </button>
    </div>
  </div>
</template>
