<script setup lang="ts">
import { computed } from "vue";
import manifestoText from "~/../MANIFESTO.md?raw";
import { renderMarkdown } from "~/utils/markdown";

const html = computed(() => renderMarkdown(manifestoText));
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <article class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="markdown" v-html="html"></div>
    </article>
  </div>
</template>

<style scoped>
.markdown :deep(h1) {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1rem;
}

.markdown :deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: #0f172a;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown :deep(h3) {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: #0f172a;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.markdown :deep(p) {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.markdown :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.markdown :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown :deep(hr) {
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 1.5rem 0;
}
</style>
