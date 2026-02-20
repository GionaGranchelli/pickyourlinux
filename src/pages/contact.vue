<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, te } = useI18n();
const tr = (key: string, fallback: string): string => (te(key) ? t(key) : fallback);
const repositoryUrl = "https://github.com/GionaGranchelli/pickyourlinux";

const emailLocalCodes = [103, 105, 111, 110, 97, 46, 103, 114, 97, 110, 99, 104, 101, 108, 108, 105];
const emailDomainCodes = [103, 109, 97, 105, 108, 46, 99, 111, 109];
const atCode = 64;
const mailtoCodes = [109, 97, 105, 108, 116, 111, 58];

const getEmailHref = () => {
  const local = String.fromCharCode(...emailLocalCodes);
  console.log(local);
  const domain = String.fromCharCode(...emailDomainCodes);
  console.log(domain);
  const at = String.fromCharCode(atCode);
  console.log(at);
  const mailto = String.fromCharCode(...mailtoCodes);
  console.log(mailto);
  return `${mailto}${local}${at}${domain}`;
};

const openEmail = () => {
  if (!import.meta.client) return;
  window.location.href = getEmailHref();
};
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
    <button type="button" class="text-sm font-medium text-slate-900 underline" @click="openEmail">
      {{ tr("contact.emailCta", "Contact by email") }}
    </button>
    <p class="text-sm text-slate-700">
      GitHub:
      <a :href="repositoryUrl" target="_blank" rel="noopener noreferrer" class="font-medium text-slate-900 underline">
        github.com/GionaGranchelli/pickyourlinux
      </a>
    </p>
  </div>
</template>
