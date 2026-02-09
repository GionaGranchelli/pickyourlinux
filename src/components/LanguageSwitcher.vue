<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales } = useI18n();
const nuxtApp = useNuxtApp();

const flagByCode: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  nl: "🇳🇱",
  pt: "🇵🇹",
};

const availableLocales = computed(() => {
  return locales.value.map((i: any) => ({
    code: i.code,
    name: i.name || i.code,
    flag: flagByCode[i.code] || "🌐",
  }));
});

const currentLocale = computed(() => String(locale.value));

const switchLanguage = async (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  const code = target?.value;
  if (!code) return;
  await nuxtApp.$i18n.setLocale(code as "en" | "es" | "it" | "fr" | "de" | "nl" | "pt");
};
</script>

<template>
  <div class="language-picker">
    <label class="language-picker__label" for="language-picker">Language</label>
    <select
      id="language-picker"
      class="language-picker__select"
      :value="currentLocale"
      @change="switchLanguage"
    >
      <option
        v-for="lang in availableLocales"
        :key="lang.code"
        :value="lang.code"
      >
        {{ lang.flag }} {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.language-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem 0.75rem;
}

.language-picker__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #475569;
}

.language-picker__select {
  border: 1px solid #cbd5e1;
  border-radius: 0.6rem;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.38rem 0.6rem;
}
</style>
