<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import QuestionWizard from "~/components/QuestionWizard.vue";
import ResultsView from "~/components/ResultsView.vue";
import DisqualifiedView from "~/components/DisqualifiedView.vue";
import DebugPanel from "~/components/DebugPanel.vue";
import distrosData from "~/data/distros.json";
import { DistroListSchema } from "~/data/distro-types";
import { useDecisionEngine } from "~/composables/useDecisionEngine";
import { buildResultsPresentation, type SharePayload } from "~/engine/state";
import { decodeSharePayload, encodeSharePayload } from "~/utils/share";
import { getTelemetryEnabled, sendTelemetry, setTelemetryEnabled } from "~/utils/telemetry";

const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const engine = useDecisionEngine();
const { status, answeredIds, intent, lastAppliedPatches, skippedQuestions, answeredQuestions } = engine;
const distros = DistroListSchema.parse(distrosData);
const debugEnabled = import.meta.dev;
const showAllCompatible = ref(false);
const compatibleLimit = 3;
const shareBaseUrl = ref("");
const telemetryEnabled = ref(false);
const telemetryStarted = ref(false);
const telemetryCompleted = ref(false);

const emptyPresentation = {
  compatible: [],
  excluded: [],
  compatibleTotal: 0,
  compatibleShown: 0,
  activeConstraints: []
};

const presentation = computed(() => {
  if (status.value !== "COMPLETED") return emptyPresentation;
  return buildResultsPresentation(intent.value, distros, {
    limit: compatibleLimit,
    showAll: showAllCompatible.value
  });
});

const canToggleCompatible = computed(() => presentation.value.compatibleTotal > compatibleLimit);
const shareToken = computed(() => {
  if (status.value !== "COMPLETED") return "";
  return encodeSharePayload(engine.getSharePayload());
});
const shareUrl = computed(() => {
  if (!shareBaseUrl.value || !shareToken.value) return "";
  return `${shareBaseUrl.value}?s=${shareToken.value}`;
});
const canShare = computed(() => Boolean(shareUrl.value));

const restart = () => {
  engine.reset();
  showAllCompatible.value = false;
};

const toggleShowAll = () => {
  showAllCompatible.value = !showAllCompatible.value;
};

const editAnswer = (questionId: string) => {
  engine.editAnswer(questionId);
  showAllCompatible.value = false;
};

const copyShareLink = async () => {
  if (!shareUrl.value || typeof navigator === "undefined") return;
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(shareUrl.value);
  } else {
    window.prompt("Copy this link:", shareUrl.value);
  }
};

const trackStarted = () => {
  if (telemetryStarted.value) return;
  if (sendTelemetry(runtimeConfig.public.telemetryEndpoint, "flow_started")) {
    telemetryStarted.value = true;
  }
};

const trackCompleted = () => {
  if (telemetryCompleted.value) return;
  if (sendTelemetry(runtimeConfig.public.telemetryEndpoint, "flow_completed")) {
    telemetryCompleted.value = true;
  }
};

onMounted(() => {
  telemetryEnabled.value = getTelemetryEnabled();
  shareBaseUrl.value = `${window.location.origin}${route.path}`;

  const token = route.query.s;
  if (typeof token === "string") {
    try {
      const payload = decodeSharePayload(token) as SharePayload;
      if (engine.restoreSharePayload(payload)) {
        void router.replace({ query: {} });
      }
    } catch {
      // ignore invalid shared links
    }
  }

  if (telemetryEnabled.value) {
    trackStarted();
    if (status.value === "COMPLETED") {
      trackCompleted();
    }
  }
});

watch(telemetryEnabled, (enabled) => {
  setTelemetryEnabled(enabled);
  if (enabled) {
    trackStarted();
    if (status.value === "COMPLETED") {
      trackCompleted();
    }
  }
});

watch(status, (value) => {
  if (!telemetryEnabled.value) return;
  if (value === "IN_PROGRESS") {
    trackStarted();
  }
  if (value === "COMPLETED") {
    trackCompleted();
  }
});
</script>

<template>
  <div class="space-y-6">
    <QuestionWizard v-if="status === 'IN_PROGRESS'" :engine="engine" />

    <ResultsView
      v-else-if="status === 'COMPLETED'"
      :compatible="presentation.compatible"
      :excluded="presentation.excluded"
      :compatible-total="presentation.compatibleTotal"
      :compatible-shown="presentation.compatibleShown"
      :can-toggle-compatible="canToggleCompatible"
      :show-all="showAllCompatible"
      :active-constraints="presentation.activeConstraints"
      :answers="answeredQuestions"
      :share-url="shareUrl"
      :can-share="canShare"
      @toggle-show-all="toggleShowAll"
      @copy-share="copyShareLink"
      @restart="restart"
      @edit-answer="editAnswer"
    />

    <DisqualifiedView v-else @restart="restart" />

    <section class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div class="font-semibold text-slate-800">Anonymous usage pings (optional)</div>
          <p class="text-xs text-slate-500">
            If enabled, we only count when a flow starts or completes. No answers are sent.
          </p>
        </div>
        <label class="flex items-center gap-2 text-sm text-slate-600">
          <input v-model="telemetryEnabled" type="checkbox" class="h-4 w-4 rounded border-slate-300" />
          Enable
        </label>
      </div>
    </section>

    <DebugPanel
      v-if="debugEnabled"
      :enabled="debugEnabled"
      :status="status"
      :answered-ids="answeredIds"
      :intent="intent"
      :last-applied-patches="lastAppliedPatches"
      :skipped-questions="skippedQuestions"
    />
  </div>
</template>
