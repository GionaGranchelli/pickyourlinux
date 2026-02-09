<script setup lang="ts">
import { useI18n } from "vue-i18n";
import OptionButton from "~/components/OptionButton.vue";
import type { QuestionVM } from "~/engine/state";

const { t } = useI18n();
const props = defineProps<{ phaseGate: QuestionVM }>();
const emit = defineEmits<{ (event: "select", optionId: string): void }>();

const onSelect = (optionId: string) => emit("select", optionId);
</script>

<template>
  <div class="bg-white shadow-lg rounded-2xl p-8 space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900">
        {{ props.phaseGate.text }}
      </h2>
      <p class="mt-2 text-sm text-gray-500">{{ t("wizard.phaseGate.tagline") }}</p>
    </div>

    <div class="grid gap-3">
      <OptionButton
        v-for="option in props.phaseGate.options"
        :key="option.id"
        :label="option.label"
        :description="option.description"
        @select="onSelect(option.id)"
      />
    </div>
  </div>
</template>
