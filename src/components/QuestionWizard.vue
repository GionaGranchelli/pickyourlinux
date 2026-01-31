<script setup lang="ts">
import { useDecisionEngine } from '~/composables/useDecisionEngine';

const {
  currentQuestion,
  isComplete,
  selectOption,
  undo,
  intent,
  status,
  answeredIds,
  debugEnabled,
  skippedQuestions,
  progress
} = useDecisionEngine();
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div v-if="debugEnabled" class="mb-8 p-4 bg-gray-100 rounded text-xs font-mono border border-gray-300">
      <div class="font-bold text-gray-500 mb-2">DEBUG: CURRENT INTENT</div>
      <pre>{{ intent }}</pre>
      <div class="font-bold text-gray-500 mt-4 mb-2">DEBUG: STATUS</div>
      <pre>{{ status }}</pre>
      <div class="font-bold text-gray-500 mt-4 mb-2">DEBUG: ANSWERED IDS</div>
      <pre>{{ answeredIds }}</pre>
      <div class="font-bold text-gray-500 mt-4 mb-2">DEBUG: SKIPPED QUESTIONS</div>
      <div v-if="skippedQuestions.length === 0">None</div>
      <div v-for="item in skippedQuestions" :key="item.id" class="mt-2">
        <div class="font-semibold text-gray-600">{{ item.id }} — {{ item.text }}</div>
        <div class="text-gray-500">{{ item.reason }}</div>
        <pre class="mt-1">{{ item.showIfJson }}</pre>
      </div>
    </div>

    <div v-if="isComplete" class="text-center py-12">
      <h2 class="text-3xl font-bold">Analysis Complete</h2>
      <button class="btn-primary mt-4">View Recommendations</button>
    </div>

      <div v-else-if="currentQuestion" class="bg-white shadow-lg rounded-2xl p-8 transition-all duration-300">
        <div class="mb-6">
          <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
            <span>Progress</span>
            <span>{{ progress.answered }} / {{ progress.total }}</span>
          </div>
          <div class="mt-2 h-2 rounded-full bg-gray-200" aria-hidden="true">
            <div
              class="h-2 rounded-full bg-blue-500 transition-all"
              :style="{ width: `${progress.percent}%` }"
            ></div>
          </div>
          <div class="sr-only" role="status" aria-live="polite">
            Progress {{ progress.answered }} of {{ progress.total }}
          </div>
        </div>
        <div class="mb-6">
          <span class="text-sm text-gray-400 font-medium">
            Question {{ progress.answered + 1 }} of {{ progress.total }}
          </span>
          <h2 class="text-2xl font-bold mt-2 text-gray-900">
            {{ currentQuestion.text }}
          </h2>
        </div>

      <div class="grid gap-3" role="list">
        <button
          v-for="option in currentQuestion.options"
          :key="option.id"
          @click="selectOption(currentQuestion.id, option)"
          class="group text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          role="listitem"
        >
          <div class="font-semibold text-gray-800 group-hover:text-blue-700">
            {{ option.label }}
          </div>
          <div v-if="option.description" class="text-sm text-gray-500 mt-1">
            {{ option.description }}
          </div>
        </button>
      </div>

      <div class="mt-8 flex justify-between items-center">
        <button
            @click="undo"
            class="text-gray-400 hover:text-gray-600 text-sm font-medium"
        >
          ← Back
        </button>
      </div>
    </div>
  </div>
</template>
