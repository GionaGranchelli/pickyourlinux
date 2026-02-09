<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";

const { t, te } = useI18n();
const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);
const route = useRoute();

const navItems = computed(() => [
  { to: "/", label: tr("app.nav.home", "Home") },
  { to: "/how-it-works", label: tr("app.nav.howItWorks", "How it works") },
  { to: "/transparency", label: tr("app.nav.transparency", "Transparency") },
  { to: "/manifesto", label: tr("app.nav.manifesto", "Manifesto") },
  { to: "/data-sources", label: tr("app.nav.dataSources", "Data sources") },
  { to: "/contact", label: tr("app.nav.contact", "Contact") },
]);

const isActive = (to: string) => {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
};
</script>

<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 py-4">
      <div class="text-sm font-semibold uppercase tracking-wide text-slate-600">{{ tr("app.title", "Pick Your Linux") }}</div>
      <div class="text-xs text-slate-500">{{ tr("app.tagline", "Compatibility-based, explainable, no rankings.") }}</div>
    </div>
    <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-3 md:flex-row md:items-center md:justify-between">
      <nav class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-full border px-3 py-1 text-xs font-semibold transition"
          :class="isActive(item.to) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-300 text-slate-700 hover:border-slate-400'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="md:ml-4">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>
