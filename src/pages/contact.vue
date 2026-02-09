<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, te } = useI18n();
const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-semibold text-slate-900">{{ tr("contact.title", "Contact") }}</h1>
    <p class="text-sm text-slate-600">
      {{ tr("contact.tagline", "Questions, feedback, or corrections? Open an issue and include your quiz path.") }}
    </p>
    <p class="text-sm text-slate-600">
      {{ tr("contact.openIssue", "Use the project issue tracker to report bugs and request features.") }}
    </p>
  </div>
</template>
