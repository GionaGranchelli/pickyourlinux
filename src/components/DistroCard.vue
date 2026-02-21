<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import type { DistroCardVM } from "~/engine/state";

const { t, te } = useI18n();
const props = defineProps<{ distro: DistroCardVM, isCompared: boolean }>();
const emit = defineEmits<{ (event: "toggleCompare", id: string, isCompared: boolean): void }>();

const modalOpen = ref(false);
const summaryReason = computed(() => props.distro.reasonsIncluded[0]);
const frictionCount = computed(() => props.distro.reasonsFriction.length);
const matchedChoices = computed(() => props.distro.matchedConstraints ?? []);
const matchedChoicesCount = computed(() => matchedChoices.value.length);
const choiceReasonsCount = computed(() => props.distro.reasonsIncluded.length);
const confidenceCoverageLabel = computed(() => {
  const total = props.distro.activeConstraintCount ?? 0;
  if (total <= 0) return tr("results.distroCard.confidenceBaseline", "Baseline fit (no strict filters)");
  return `${matchedChoicesCount.value}/${total} ${tr("results.distroCard.confidenceCoverage", "strict constraints matched")}`;
});
const linksCount = computed(() =>
  [
    props.distro.websiteUrl,
    props.distro.documentationUrl,
    props.distro.forumUrl,
    props.distro.downloadUrl,
    props.distro.testDriveUrl,
  ].filter(Boolean).length
);
const tr = (key: string, fallback: string) => (te(key) ? t(key) : fallback);

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const handleToggleCompare = () => {
  emit("toggleCompare", props.distro.id, !props.isCompared);
};
</script>

<template>
  <article
    class="cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-300"
    role="button"
    tabindex="0"
    :aria-expanded="modalOpen"
    @click="openModal"
    @keydown.enter.prevent="openModal"
    @keydown.space.prevent="openModal"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h3 class="truncate text-lg font-semibold text-gray-900">{{ props.distro.name }}</h3>
        <p v-if="props.distro.description" class="mt-1 text-xs text-gray-500">
          {{ props.distro.description }}
        </p>
      </div>
      <div class="flex shrink-0 flex-col items-end gap-2">
        <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {{ t("results.distroCard.compatible") }}
        </span>
        <button
          class="flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition hover:-translate-y-0.5"
          :class="{
            'border-blue-500 bg-blue-50 text-blue-700': props.isCompared,
            'border-gray-300 text-gray-700 hover:border-blue-400': !props.isCompared,
          }"
          @click.stop="handleToggleCompare"
        >
          <svg
            v-if="props.isCompared"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-3 w-3"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
          {{ props.isCompared ? t("results.distroCard.compared") : t("results.distroCard.compare") }}
        </button>
      </div>
    </div>

    <div class="mt-3 flex flex-wrap items-center gap-2">
      <span v-if="props.distro.isBeginnerFriendly" class="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-200">
        🔰 Beginner Friendly
      </span>
      <span v-if="props.distro.gamingSupport === 'GOOD'" class="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-700 border border-purple-200">
        🎮 Gaming Ready
      </span>
      <span v-if="props.distro.primaryUseCase === 'SERVER' || props.distro.primaryUseCase === 'BOTH'" class="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200">
        🖥️ Server-Ready
      </span>
      <span v-if="props.distro.laptopFriendly" class="rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700 border border-cyan-200">
        💻 Laptop-Friendly
      </span>
      <span v-if="props.distro.immutable" class="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-200">
        ⚛️ Immutable / Atomic
      </span>
      <span v-if="props.distro.docsEcosystem === 'EXCELLENT' || props.distro.docsEcosystem === 'GOOD'" class="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
        📚 Strong Docs
      </span>
      <span v-if="props.distro.releaseModel === 'ROLLING'" class="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700 border border-orange-200">
        ♻️ Rolling Release
      </span>
      <span v-if="props.distro.releaseModel === 'FIXED'" class="rounded-full bg-lime-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-lime-700 border border-lime-200">
        📌 Fixed Release
      </span>
      <span v-if="props.distro.secureBootOutOfBox" class="rounded-full bg-sky-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 border border-sky-200">
        ✅ Secure Boot OOTB
      </span>
      <span v-if="props.distro.nvidiaExperience === 'GOOD' || props.distro.nvidiaExperience === 'OK'" class="rounded-full bg-fuchsia-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-700 border border-fuchsia-200">
        ✅ NVIDIA Compliant
      </span>
      <span v-if="props.distro.nvidiaExperience === 'HARD'" class="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 border border-rose-200">
        🔧 NVIDIA Hands-On
      </span>
      <span v-if="props.distro.initSystem === 'SYSTEMD'" class="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 border border-violet-200">
        ⚙️ systemd
      </span>
      <span v-if="props.distro.initSystem === 'OPENRC'" class="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 border border-violet-200">
        ⚙️ OpenRC
      </span>
      <span v-if="props.distro.initSystem === 'RUNIT'" class="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 border border-violet-200">
        ⚙️ runit
      </span>
      <span v-if="props.distro.packageManager && props.distro.packageManager !== 'OTHER'" class="rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700 border border-zinc-200">
        📦 {{ props.distro.packageManager }}
      </span>
      <span v-if="props.distro.privacyPosture === 'STRONG'" class="rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700 border border-teal-200">
        🛡️ Privacy-Focused
      </span>
      <span v-if="props.distro.suitableForOldHardware" class="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
        🏗️ Old Hardware Friendly
      </span>
    </div>

    <div class="mt-3 flex flex-wrap items-center gap-2">
      <span v-if="summaryReason" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {{ summaryReason }}
      </span>
      <span v-if="frictionCount > 0" class="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
        {{ frictionCount }} {{ tr("results.distroCard.potentialFriction", "Potential friction") }}
      </span>
      <span v-if="matchedChoicesCount > 0" class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
        {{ matchedChoicesCount }} {{ tr("results.distroCard.strictFiltersMatched", "Strict filters matched") }}
      </span>
      <span v-if="choiceReasonsCount > 0" class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
        {{ choiceReasonsCount }} {{ tr("results.distroCard.choiceDrivenReasons", "Choice-driven reasons") }}
      </span>
      <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
        {{ tr("results.distroCard.confidenceOfFit", "Confidence of fit") }}: {{ confidenceCoverageLabel }}
      </span>
      <span v-if="linksCount > 0" class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
        {{ linksCount }} links
      </span>
    </div>

    <div class="mt-4">
      <button
        class="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
        type="button"
        @click.stop="openModal"
      >
        {{ tr("results.distroCard.details", "View details") }}
      </button>
    </div>
  </article>

  <Teleport to="body">
    <div v-if="modalOpen" class="distro-modal" @click="closeModal">
      <div class="distro-modal-backdrop"></div>
      <div class="distro-modal-center">
        <section
          class="distro-modal-panel rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
          role="dialog"
          aria-modal="true"
          :aria-label="props.distro.name"
          @click.stop
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ props.distro.name }}</h3>
              <p v-if="props.distro.description" class="mt-1 text-sm text-gray-500">{{ props.distro.description }}</p>
            </div>
            <button
              class="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
              type="button"
              @click="closeModal"
            >
              {{ tr("results.distroCard.closeDetails", "Close") }}
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              {{ matchedChoicesCount }} {{ tr("results.distroCard.strictFiltersMatched", "Strict filters matched") }}
            </span>
            <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
              {{ choiceReasonsCount }} {{ tr("results.distroCard.choiceDrivenReasons", "Choice-driven reasons") }}
            </span>
            <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
              {{ tr("results.distroCard.confidenceOfFit", "Confidence of fit") }}: {{ confidenceCoverageLabel }}
            </span>
          </div>

          <div class="mt-5">
            <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ tr("results.distroCard.strictFiltersMatched", "Strict filters matched") }}</div>
            <ul class="mt-2 space-y-1 text-sm text-gray-700">
              <li v-if="matchedChoicesCount === 0">{{ tr("results.distroCard.noStrictFiltersMatched", "No strict filters were active for this result.") }}</li>
              <li v-for="(choice, idx) in matchedChoices" :key="idx">{{ choice }}</li>
            </ul>
          </div>

          <div class="mt-5">
            <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ tr("results.distroCard.choiceDrivenReasons", "Choice-driven reasons") }}</div>
            <ul class="mt-2 space-y-1 text-sm text-gray-700">
              <li v-if="props.distro.reasonsIncluded.length === 0">{{ t("results.distroCard.noReasons") }}</li>
              <li v-for="(reason, idx) in props.distro.reasonsIncluded" :key="idx">{{ reason }}</li>
            </ul>
          </div>

          <div v-if="props.distro.reasonsFriction.length > 0" class="mt-5">
            <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">{{ t("results.distroCard.potentialFriction") }}</div>
            <ul class="mt-2 space-y-1 text-sm text-gray-700">
              <li v-for="(reason, idx) in props.distro.reasonsFriction" :key="idx">{{ reason }}</li>
            </ul>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            <a v-if="props.distro.websiteUrl" :href="props.distro.websiteUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
              {{ t("results.distroCard.links.website") }}
            </a>
            <a v-if="props.distro.documentationUrl" :href="props.distro.documentationUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
              {{ t("results.distroCard.links.documentation") }}
            </a>
            <a v-if="props.distro.forumUrl" :href="props.distro.forumUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
              {{ t("results.distroCard.links.forum") }}
            </a>
            <a v-if="props.distro.downloadUrl" :href="props.distro.downloadUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
              {{ t("results.distroCard.links.download") }}
            </a>
            <a v-if="props.distro.distroSeaUrl" :href="props.distro.distroSeaUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border-2 border-indigo-500 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-100 shadow-sm transition-all hover:shadow-md">
              ✨ {{ t("results.distroCard.links.tryOnline") }}
            </a>
            <a v-if="props.distro.testDriveUrl" :href="props.distro.testDriveUrl" target="_blank" rel="noopener noreferrer" class="rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50">
              {{ t("results.distroCard.links.testDrive") }}
            </a>
          </div>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.distro-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.distro-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
}

.distro-modal-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.distro-modal-panel {
  width: 100%;
  max-width: 56rem;
  max-height: 85vh;
  overflow-y: auto;
}
</style>
