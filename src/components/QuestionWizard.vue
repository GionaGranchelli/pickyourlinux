<script setup lang="ts">
import { useDecisionEngine } from '~/composables/useDecisionEngine';

const { currentQuestion, isComplete, selectOption, undo, intent } = useDecisionEngine();
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="mb-8 p-4 bg-gray-100 rounded text-xs font-mono border border-gray-300">
      <div class="font-bold text-gray-500 mb-2">DEBUG: CURRENT INTENT</div>
      <pre>{{ intent }}</pre>
    </div>

    <div v-if="isComplete" class="text-center py-12">
      <h2 class="text-3xl font-bold">Analysis Complete</h2>
      <button class="btn-primary mt-4">View Recommendations</button>
    </div>

    <div v-else-if="currentQuestion" class="bg-white shadow-lg rounded-xl p-8 transition-all">
      <div class="mb-6">
        <span class="text-sm text-gray-400 font-medium">
          Question {{ currentQuestion.id }}
        </span>
        <h2 class="text-2xl font-bold mt-2 text-gray-900">
          {{ currentQuestion.text }}
        </h2>
      </div>

      <div class="grid gap-3">
        <button
            v-for="option in currentQuestion.options"
            :key="option.id"
            @click="selectOption(currentQuestion.id, option)"
            class="group text-left p-4 rounded-lg border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-colors"
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
