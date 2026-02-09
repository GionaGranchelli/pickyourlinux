<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <AppHeader />
    <main class="mx-auto w-full max-w-7xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
