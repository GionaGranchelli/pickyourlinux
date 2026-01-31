<script setup lang="ts">
import type { PropType } from "vue";

type PresentedDistro = {
  distroId: string;
  name: string;
  description?: string;
  includedBecause: string[];
  excludedBecause: string[];
  matchedConstraints: string[];
};

type AnswerSummary = {
  questionId: string;
  questionText: string;
  optionLabel: string;
};

defineProps({
  compatible: {
    type: Array as PropType<PresentedDistro[]>,
    required: true
  },
  excluded: {
    type: Array as PropType<PresentedDistro[]>,
    required: true
  },
  compatibleTotal: {
    type: Number,
    required: true
  },
  compatibleShown: {
    type: Number,
    required: true
  },
  canToggleCompatible: {
    type: Boolean,
    required: true
  },
  showAll: {
    type: Boolean,
    required: true
  },
  activeConstraints: {
    type: Array as PropType<string[]>,
    required: true
  },
  answers: {
    type: Array as PropType<AnswerSummary[]>,
    required: true
  },
  shareUrl: {
    type: String,
    required: true
  },
  canShare: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits<{
  (event: "toggleShowAll"): void;
  (event: "copyShare"): void;
  (event: "restart"): void;
  (event: "editAnswer", questionId: string): void;
}>();

const toggleShowAll = () => emit("toggleShowAll");
const copyShare = () => emit("copyShare");
const restart = () => emit("restart");
const editAnswer = (questionId: string) => emit("editAnswer", questionId);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <section>
      <div class="mb-4 space-y-3">
        <h2 class="text-2xl font-semibold text-gray-900">Your Compatibility Results</h2>
        <p class="text-sm text-gray-500">These results reflect the constraints you chose. There is no ranking.</p>
        <p class="text-xs text-gray-400">Showing {{ compatibleShown }} of {{ compatibleTotal }} compatible distros.</p>
        <div v-if="canShare" class="flex flex-wrap items-center gap-2">
          <button
            class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
            type="button"
            @click="copyShare"
          >
            Copy share link
          </button>
          <a
            class="text-xs text-slate-500 underline-offset-2 hover:underline"
            :href="shareUrl"
          >
            Open share link
          </a>
        </div>
      </div>

      <div v-if="compatible.length === 0" class="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
        None matched the current constraints.
      </div>

      <div
        v-for="result in compatible"
        :key="result.distroId"
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ result.name }}</h3>
            <p v-if="result.description" class="mt-1 text-sm text-gray-500">
              {{ result.description }}
            </p>
          </div>
          <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Compatible
          </span>
        </div>

        <div class="mt-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Included because</div>
          <ul class="mt-2 space-y-1 text-sm text-gray-600">
            <li v-if="result.includedBecause.length === 0">No additional notes.</li>
            <li v-for="(reason, idx) in result.includedBecause" :key="idx">{{ reason }}</li>
          </ul>
        </div>
      </div>

      <div v-if="canToggleCompatible" class="mt-4">
        <button
          class="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
          type="button"
          @click="toggleShowAll"
        >
          {{ showAll ? "Show fewer compatible distros" : "Show all compatible distros" }}
        </button>
      </div>
    </section>

    <section>
      <details class="rounded-2xl border border-gray-200 bg-white p-6">
        <summary class="cursor-pointer text-sm font-semibold text-gray-700">Why these results?</summary>

        <div class="mt-4">
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Active constraints</div>
          <ul class="mt-2 space-y-1 text-sm text-gray-600">
            <li v-if="activeConstraints.length === 0">No active constraints.</li>
            <li v-for="(constraint, idx) in activeConstraints" :key="idx">{{ constraint }}</li>
          </ul>
        </div>

        <div class="mt-6">
          <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Matched constraints</div>
          <div v-if="compatible.length === 0" class="mt-2 text-sm text-gray-500">
            No compatible distros to explain.
          </div>
          <div v-for="result in compatible" :key="result.distroId" class="mt-4">
            <div class="font-semibold text-sm text-gray-700">{{ result.name }}</div>
            <ul class="mt-2 space-y-1 text-sm text-gray-600">
              <li v-if="result.matchedConstraints.length === 0">No active constraints matched.</li>
              <li v-for="(constraint, idx) in result.matchedConstraints" :key="idx">{{ constraint }}</li>
            </ul>
          </div>
        </div>
      </details>
    </section>

    <section>
      <details class="rounded-2xl border border-gray-200 bg-white p-6">
        <summary class="cursor-pointer text-sm font-semibold text-gray-700">Excluded distros ({{ excluded.length }})</summary>

        <div v-if="excluded.length === 0" class="mt-4 text-sm text-gray-500">
          None were excluded.
        </div>

        <div
          v-for="result in excluded"
          :key="result.distroId"
          class="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ result.name }}</h3>
              <p v-if="result.description" class="mt-1 text-sm text-gray-500">
                {{ result.description }}
              </p>
            </div>
            <span class="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Excluded
            </span>
          </div>

          <div class="mt-3">
            <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Excluded because</div>
            <ul class="mt-2 space-y-1 text-sm text-gray-600">
              <li v-if="result.excludedBecause.length === 0">No reasons provided.</li>
              <li v-for="(reason, idx) in result.excludedBecause" :key="idx">{{ reason }}</li>
            </ul>
          </div>
        </div>
      </details>
    </section>

    <section class="rounded-2xl border border-gray-200 bg-white p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Review or change your answers</h3>
          <p class="text-sm text-gray-500">Adjust an answer or restart to explore other outcomes.</p>
        </div>
        <button
          class="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500"
          type="button"
          @click="restart"
        >
          Start over
        </button>
      </div>

      <div v-if="answers.length === 0" class="mt-4 text-sm text-gray-500">No answers recorded.</div>

      <ul v-else class="mt-4 space-y-2">
        <li
          v-for="answer in answers"
          :key="answer.questionId"
          class="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div class="text-sm font-semibold text-gray-700">{{ answer.questionText }}</div>
            <div class="text-xs text-gray-500">{{ answer.optionLabel }}</div>
          </div>
          <button
            class="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400"
            type="button"
            @click="editAnswer(answer.questionId)"
          >
            Edit
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
