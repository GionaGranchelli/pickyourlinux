<script setup lang="ts">
import { computed } from "vue";
import { ALL_QUESTIONS } from "~/data/questions";
import {
  ConstraintKeys,
  ExclusionReasonKeys,
  InclusionReasonKeys,
} from "~/data/reason-templates";
import { getDistros } from "~/engine/eliminate";

const distros = getDistros();

const distroCount = computed(() => distros.length);
const questionCount = computed(() => ALL_QUESTIONS.length);
const optionCount = computed(() => ALL_QUESTIONS.reduce((sum, q) => sum + q.options.length, 0));

const countBy = <T extends string>(values: T[]) => {
  const bucket = new Map<string, number>();
  values.forEach((value) => {
    bucket.set(value, (bucket.get(value) ?? 0) + 1);
  });
  return Array.from(bucket.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
};

const releaseModelCounts = computed(() => countBy(distros.map((d) => d.releaseModel)));
const packageManagerCounts = computed(() => countBy(distros.map((d) => d.packageManager)));
const initSystemCounts = computed(() => countBy(distros.map((d) => d.initSystem)));
const installerCounts = computed(() => countBy(distros.map((d) => d.installerExperience)));
const maintenanceCounts = computed(() => countBy(distros.map((d) => d.maintenanceStyle)));

const dataQualityChecks = [
  "TypeScript strict mode",
  "Zod schema validation for intent, questions, and distro data",
  "Flow validator for declarative condition and patch correctness",
  "Question catalog validation",
  "Distro data validation",
  "Distro consistency audits",
];

const docsUsed = [
  "docs/ARCHITECTURE.md",
  "docs/DATA_CONTRACT.md",
  "docs/DATA_RULES.md",
  "docs/CONSTRAINT_MAPPING.md",
  "docs/QUESTION_CATALOG.md",
  "docs/DISTRO_COVERAGE_AUDIT.md",
  "docs/TESTING.md",
];

const repositoryUrl = "https://github.com/GionaGranchelli/pickyourlinux";
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <header class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-3xl font-semibold text-slate-900">Transparency</h1>
      <p class="mt-2 text-sm text-slate-600">
        Full visibility into decision logic, data model, and quality controls.
      </p>
      <p class="mt-3 text-sm text-slate-600">
        Source:
        <a :href="repositoryUrl" target="_blank" rel="noopener noreferrer" class="font-medium text-slate-900 underline">github.com/GionaGranchelli/pickyourlinux</a>
      </p>
    </header>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">Decision policy</h2>
      <ul class="list-disc space-y-2 pl-5 text-sm text-slate-600">
        <li>No ranking, no recommendation engine, and no hidden scoring.</li>
        <li>No weights or heuristics. Matching is pass/fail plus explicit reasons.</li>
        <li>Same answers produce the same result set every time.</li>
        <li>UI renders engine outputs only. Logic lives in data + engine layer.</li>
      </ul>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">Logic inventory</h2>
      <div class="grid gap-3 md:grid-cols-4">
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Questions</div>
          <div class="mt-2 text-2xl font-semibold text-slate-900">{{ questionCount }}</div>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Options</div>
          <div class="mt-2 text-2xl font-semibold text-slate-900">{{ optionCount }}</div>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Hard constraints</div>
          <div class="mt-2 text-2xl font-semibold text-slate-900">{{ ExclusionReasonKeys.length }}</div>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Soft reasons</div>
          <div class="mt-2 text-2xl font-semibold text-slate-900">{{ InclusionReasonKeys.length }}</div>
        </div>
      </div>
      <p class="text-sm text-slate-600">
        Active constraint labels available to users: <span class="font-semibold">{{ ConstraintKeys.length }}</span>
      </p>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">Distro dataset snapshot</h2>
      <p class="text-sm text-slate-600">Current distro records in the dataset: <span class="font-semibold">{{ distroCount }}</span></p>

      <div class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-xl border border-slate-200 p-4">
          <h3 class="text-sm font-semibold text-slate-800">Release model</h3>
          <ul class="mt-2 space-y-1 text-sm text-slate-600">
            <li v-for="item in releaseModelCounts" :key="item.key">{{ item.key }}: {{ item.count }}</li>
          </ul>
        </div>
        <div class="rounded-xl border border-slate-200 p-4">
          <h3 class="text-sm font-semibold text-slate-800">Package manager</h3>
          <ul class="mt-2 space-y-1 text-sm text-slate-600">
            <li v-for="item in packageManagerCounts" :key="item.key">{{ item.key }}: {{ item.count }}</li>
          </ul>
        </div>
        <div class="rounded-xl border border-slate-200 p-4">
          <h3 class="text-sm font-semibold text-slate-800">Init system</h3>
          <ul class="mt-2 space-y-1 text-sm text-slate-600">
            <li v-for="item in initSystemCounts" :key="item.key">{{ item.key }}: {{ item.count }}</li>
          </ul>
        </div>
        <div class="rounded-xl border border-slate-200 p-4">
          <h3 class="text-sm font-semibold text-slate-800">Installer and maintenance</h3>
          <ul class="mt-2 space-y-1 text-sm text-slate-600">
            <li v-for="item in installerCounts" :key="`installer-${item.key}`">Installer {{ item.key }}: {{ item.count }}</li>
            <li v-for="item in maintenanceCounts" :key="`maintenance-${item.key}`">Maintenance {{ item.key }}: {{ item.count }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">Data quality and validation</h2>
      <ul class="list-disc space-y-2 pl-5 text-sm text-slate-600">
        <li v-for="check in dataQualityChecks" :key="check">{{ check }}</li>
      </ul>
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
        Recommended local checks:
        <code class="ml-1">npm run validate:flow</code>,
        <code class="ml-1">npm run validate:questions</code>,
        <code class="ml-1">npm run validate:distros</code>,
        <code class="ml-1">npm run audit:distros</code>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">Source documents</h2>
      <ul class="space-y-1 text-sm text-slate-600">
        <li v-for="doc in docsUsed" :key="doc"><code>{{ doc }}</code></li>
      </ul>
    </section>
  </div>
</template>
