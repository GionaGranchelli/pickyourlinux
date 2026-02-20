<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";

const repositoryUrl = "https://github.com/GionaGranchelli/pickyourlinux";

const emailLocalCodes = [103, 105, 111, 110, 97, 46, 103, 114, 97, 110, 99, 104, 101, 108, 108, 105];
const emailDomainCodes = [103, 109, 97, 105, 108, 46, 99, 111, 109];
const atCode = 64;
const mailtoCodes = [109, 97, 105, 108, 116, 111, 58];

const getEmailHref = () => {
  const local = String.fromCharCode(...emailLocalCodes);
  const domain = String.fromCharCode(...emailDomainCodes);
  const at = String.fromCharCode(atCode);
  const mailto = String.fromCharCode(...mailtoCodes);
  return `${mailto}${local}${at}${domain}`;
};

const openEmail = () => {
  if (!import.meta.client) return;
  window.location.href = getEmailHref();
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
    <AppHeader />
    <main class="mx-auto w-full max-w-7xl px-4 py-8 flex-1">
      <slot />
    </main>
    <footer class="border-t border-slate-200 bg-white">
      <div class="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Pick Your Linux</p>
        <div class="flex items-center gap-3">
          <a :href="repositoryUrl" target="_blank" rel="noopener noreferrer" class="underline">GitHub</a>
          <button type="button" class="underline" @click="openEmail">Email</button>
        </div>
      </div>
    </footer>
  </div>
</template>
