<script setup lang="ts">
const props = defineProps<{
  search: string;
  releaseFilter: "ALL" | "FIXED" | "ROLLING";
  useCaseFilter: "ALL" | "DESKTOP" | "SERVER" | "BOTH";
  docsFilter: "ALL" | "EXCELLENT" | "GOOD" | "OK" | "THIN";
}>();

const emit = defineEmits<{
  (event: "update:search", value: string): void;
  (event: "update:releaseFilter", value: "ALL" | "FIXED" | "ROLLING"): void;
  (event: "update:useCaseFilter", value: "ALL" | "DESKTOP" | "SERVER" | "BOTH"): void;
  (event: "update:docsFilter", value: "ALL" | "EXCELLENT" | "GOOD" | "OK" | "THIN"): void;
}>();
</script>

<template>
  <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
    <label class="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
      Search
      <input
        :value="props.search"
        type="text"
        placeholder="Search distro, package manager, init..."
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </label>

    <label class="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
      Release
      <select
        :value="props.releaseFilter"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
        @change="emit('update:releaseFilter', ($event.target as HTMLSelectElement).value as 'ALL' | 'FIXED' | 'ROLLING')"
      >
        <option value="ALL">All</option>
        <option value="FIXED">Fixed</option>
        <option value="ROLLING">Rolling</option>
      </select>
    </label>

    <label class="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
      Primary use
      <select
        :value="props.useCaseFilter"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
        @change="emit('update:useCaseFilter', ($event.target as HTMLSelectElement).value as 'ALL' | 'DESKTOP' | 'SERVER' | 'BOTH')"
      >
        <option value="ALL">All</option>
        <option value="DESKTOP">Desktop</option>
        <option value="SERVER">Server</option>
        <option value="BOTH">Both</option>
      </select>
    </label>

    <label class="space-y-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
      Docs ecosystem
      <select
        :value="props.docsFilter"
        class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
        @change="emit('update:docsFilter', ($event.target as HTMLSelectElement).value as 'ALL' | 'EXCELLENT' | 'GOOD' | 'OK' | 'THIN')"
      >
        <option value="ALL">All</option>
        <option value="EXCELLENT">Excellent</option>
        <option value="GOOD">Good</option>
        <option value="OK">OK</option>
        <option value="THIN">Thin</option>
      </select>
    </label>
  </section>
</template>
