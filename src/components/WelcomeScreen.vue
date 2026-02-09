<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, te, tm } = useI18n();

const props = defineProps<{ onStart: () => void }>();

const onClickStart = () => {
  props.onStart();
};

const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);

const expectBullets = computed<string[]>(() => {
  const key: string = "welcome.expect.bullets";
  if (!te(key)) return [];
  const message = tm(key) as unknown;
  if (!Array.isArray(message)) return [];
  return message.map((item: unknown) => String(item));
});
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-3">
      <h1 class="text-3xl font-semibold text-slate-900">{{ tr("welcome.title", "Pick a Linux distro that fits your choices") }}</h1>
      <p class="text-sm text-slate-600">
        {{ tr("welcome.tagline", "This is a compatibility-based picker. It never ranks or recommends - it only filters based on what you select.") }}
      </p>
    </header>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-base font-semibold text-slate-900">{{ tr("welcome.expect.title", "What you can expect") }}</h2>
      <ul class="mt-4 space-y-3 text-sm text-slate-600">
        <li v-for="(bullet, index) in expectBullets" :key="index" class="flex items-start gap-2">
          <span class="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
          {{ bullet }}
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        class="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="onClickStart"
      >
        {{ tr("welcome.start", "Start") }}
      </button>
      <NuxtLink
        class="text-sm font-semibold text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        to="/how-it-works"
      >
        {{ tr("welcome.howItWorks", "How it works") }}
      </NuxtLink>
    </section>

    <p class="text-xs text-slate-500">
      {{ tr("welcome.quickPhase", "You can stop after the quick phase and still get results.") }}
    </p>
  </div>
</template>
