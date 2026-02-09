<script setup lang="ts">
import { useI18n } from "vue-i18n";
import WelcomeScreen from "~/components/WelcomeScreen.vue";
import { useDecisionEngine } from "~/composables/useDecisionEngine";

const { t } = useI18n();
const router = useRouter();
const engine = useDecisionEngine(t);

const start = () => {
  engine.reset();
  void router.push("/wizard");
};
</script>

<template>
  <WelcomeScreen :on-start="start" />
</template>
