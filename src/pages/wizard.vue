<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import QuestionCard from "~/components/QuestionCard.vue";
import WizardProgress from "~/components/WizardProgress.vue";
import WizardNavBar from "~/components/WizardNavBar.vue";
import PhaseGateCard from "~/components/PhaseGateCard.vue";
import ReviewAnswersDrawer from "~/components/ReviewAnswersDrawer.vue";
import DisqualifiedCard from "~/components/DisqualifiedCard.vue";
import DebugOverlay from "~/components/DebugOverlay.vue";
import { useDecisionEngine } from "~/composables/useDecisionEngine";

const { t } = useI18n();
const router = useRouter();
const engine = useDecisionEngine(t);
const isDev = import.meta.dev;
const {
  status,
  wizardMode,
  progressVM,
  currentQuestionVM,
  phaseGateVM,
  answersVM,
  debugVM,
  canUndo,
  selectOptionById,
  undo,
  reset,
  editAnswer,
} = engine;

const reviewOpen = ref(false);

const openReview = () => {
  reviewOpen.value = true;
};

const closeReview = () => {
  reviewOpen.value = false;
};

const onRestart = () => {
  reset();
  void router.push("/");
};

const goToResults = () => {
  void router.push("/results");
};

watch(status, (value) => {
  if (value === "COMPLETED") {
    void router.push("/results");
  }
});

watch(wizardMode, (value) => {
  if (value === "COMPLETE") {
    void router.push("/results");
  }
});
</script>

<template>
  <div class="space-y-8">
    <WizardProgress :progress="progressVM" />

    <section v-if="wizardMode === 'QUESTION' && currentQuestionVM" class="space-y-6">
      <QuestionCard :question="currentQuestionVM" @select="selectOptionById" />
      <WizardNavBar :can-undo="canUndo" :on-undo="undo" :on-restart="onRestart" :on-review="openReview" />
    </section>

    <section v-else-if="wizardMode === 'PHASE_GATE' && phaseGateVM" class="space-y-6">
      <PhaseGateCard :phase-gate="phaseGateVM" @select="selectOptionById" />
      <WizardNavBar :can-undo="canUndo" :on-undo="undo" :on-restart="onRestart" :on-review="openReview" />
    </section>

    <section v-else-if="wizardMode === 'COMPLETE'" class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 class="text-2xl font-semibold text-slate-900">{{ t("wizard.complete.title") }}</h2>
      <p class="mt-3 text-sm text-slate-600">{{ t("wizard.complete.tagline") }}</p>
      <button
        class="mt-6 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        @click="goToResults"
      >
        {{ t("wizard.complete.viewResults") }}
      </button>
    </section>

    <section v-else-if="wizardMode === 'DISQUALIFIED'">
      <DisqualifiedCard :on-restart="onRestart" />
    </section>

    <ReviewAnswersDrawer
      :open="reviewOpen"
      :answers="answersVM"
      :on-close="closeReview"
      :on-jump-to="editAnswer"
    />

    <DebugOverlay v-if="isDev" :debug="debugVM" />
  </div>
</template>
