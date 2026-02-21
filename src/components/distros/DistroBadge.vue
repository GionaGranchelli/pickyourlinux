<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  label: string;
  tone:
    | "blue"
    | "purple"
    | "slate"
    | "cyan"
    | "indigo"
    | "emerald"
    | "orange"
    | "lime"
    | "sky"
    | "fuchsia"
    | "rose"
    | "teal"
    | "amber";
}>();

const toneClasses = computed(() => {
  switch (props.tone) {
    case "blue":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "purple":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "slate":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "cyan":
      return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "indigo":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "emerald":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "orange":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "lime":
      return "bg-lime-100 text-lime-700 border-lime-200";
    case "sky":
      return "bg-sky-100 text-sky-700 border-sky-200";
    case "fuchsia":
      return "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200";
    case "rose":
      return "bg-rose-100 text-rose-700 border-rose-200";
    case "teal":
      return "bg-teal-100 text-teal-700 border-teal-200";
    case "amber":
      return "bg-amber-100 text-amber-700 border-amber-200";
  }
});
</script>

<template>
  <span
    class="distro-badge rounded-full border text-[9px] font-bold uppercase tracking-wide sm:text-[10px]"
    :class="toneClasses"
  >
    {{ props.label }}
  </span>
</template>

<style scoped>
.distro-badge {
  padding: 2%;
}
</style>
