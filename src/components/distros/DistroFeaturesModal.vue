<script setup lang="ts">
import type { Distro } from "~/data/distro-types";
import DistroBadge from "~/components/distros/DistroBadge.vue";

const props = defineProps<{ distro: Distro | null }>();
const emit = defineEmits<{ (event: "close"): void }>();

const bool = (value: boolean) => (value ? "Yes" : "No");
</script>

<template>
  <Teleport to="body">
    <div v-if="props.distro" class="distro-modal-overlay" @click="emit('close')">
      <div class="distro-modal-backdrop"></div>
      <div class="distro-modal-center">
        <section class="distro-modal-panel" @click.stop>
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold text-slate-900 sm:text-xl">{{ props.distro.name }}</h2>
              <p class="text-xs text-slate-500">{{ props.distro.id }}</p>
            </div>
            <button
              type="button"
              class="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              @click="emit('close')"
            >
              Close
            </button>
          </div>

          <div class="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
            <DistroBadge
              v-if="props.distro.installerExperience === 'GUI' && props.distro.maintenanceStyle === 'LOW_FRICTION'"
              tone="blue"
              label="🔰 Beginner Friendly"
            />
            <DistroBadge v-if="props.distro.gamingSupport === 'GOOD'" tone="purple" label="🎮 Gaming Ready" />
            <DistroBadge
              v-if="props.distro.primaryUseCase === 'SERVER' || props.distro.primaryUseCase === 'BOTH'"
              tone="slate"
              label="🖥️ Server-Ready"
            />
            <DistroBadge v-if="props.distro.laptopFriendly" tone="cyan" label="💻 Laptop-Friendly" />
            <DistroBadge v-if="props.distro.immutable" tone="indigo" label="⚛️ Immutable / Atomic" />
            <DistroBadge
              v-if="props.distro.docsEcosystem === 'EXCELLENT' || props.distro.docsEcosystem === 'GOOD'"
              tone="emerald"
              label="📚 Strong Docs"
            />
            <DistroBadge v-if="props.distro.releaseModel === 'ROLLING'" tone="orange" label="♻️ Rolling Release" />
            <DistroBadge v-if="props.distro.releaseModel === 'FIXED'" tone="lime" label="📌 Fixed Release" />
            <DistroBadge v-if="props.distro.secureBootOutOfBox" tone="sky" label="✅ Secure Boot OOTB" />
            <DistroBadge
              v-if="props.distro.nvidiaExperience === 'GOOD' || props.distro.nvidiaExperience === 'OK'"
              tone="fuchsia"
              label="✅ NVIDIA Compliant"
            />
            <DistroBadge v-if="props.distro.nvidiaExperience === 'HARD'" tone="rose" label="🔧 NVIDIA Hands-On" />
            <DistroBadge v-if="props.distro.privacyPosture === 'STRONG'" tone="teal" label="🛡️ Privacy-Focused" />
            <DistroBadge v-if="props.distro.suitableForOldHardware" tone="amber" label="🏗️ Old Hardware Friendly" />
          </div>

          <dl class="mt-4 grid gap-x-3 gap-y-2 text-xs distro-features-grid">
            <dt class="text-slate-500">Installer</dt><dd class="text-slate-800">{{ props.distro.installerExperience }}</dd>
            <dt class="text-slate-500">Maintenance</dt><dd class="text-slate-800">{{ props.distro.maintenanceStyle }}</dd>
            <dt class="text-slate-500">Release</dt><dd class="text-slate-800">{{ props.distro.releaseModel }}</dd>
            <dt class="text-slate-500">Package mgr</dt><dd class="text-slate-800">{{ props.distro.packageManager }}</dd>
            <dt class="text-slate-500">Init</dt><dd class="text-slate-800">{{ props.distro.initSystem }}</dd>
            <dt class="text-slate-500">Primary use</dt><dd class="text-slate-800">{{ props.distro.primaryUseCase }}</dd>
            <dt class="text-slate-500">Docs</dt><dd class="text-slate-800">{{ props.distro.docsEcosystem }}</dd>
            <dt class="text-slate-500">Privacy</dt><dd class="text-slate-800">{{ props.distro.privacyPosture }}</dd>
            <dt class="text-slate-500">Gaming</dt><dd class="text-slate-800">{{ props.distro.gamingSupport }}</dd>
            <dt class="text-slate-500">NVIDIA</dt><dd class="text-slate-800">{{ props.distro.nvidiaExperience }}</dd>
            <dt class="text-slate-500">Laptop friendly</dt><dd class="text-slate-800">{{ bool(props.distro.laptopFriendly) }}</dd>
            <dt class="text-slate-500">Old hardware</dt><dd class="text-slate-800">{{ bool(props.distro.suitableForOldHardware) }}</dd>
            <dt class="text-slate-500">Immutable</dt><dd class="text-slate-800">{{ bool(props.distro.immutable) }}</dd>
            <dt class="text-slate-500">Secure Boot</dt><dd class="text-slate-800">{{ bool(props.distro.secureBootOutOfBox) }}</dd>
            <dt class="text-slate-500">Desktops</dt><dd class="text-slate-800">{{ props.distro.supportedDesktops.join(', ') }}</dd>
            <dt class="text-slate-500">Verified</dt><dd class="text-slate-800">{{ props.distro.lastVerified }}</dd>
            <dt class="text-slate-500">Method</dt><dd class="text-slate-800">{{ props.distro.verificationMethod || '-' }}</dd>
          </dl>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.distro-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
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
  max-width: 42rem;
  max-height: 86vh;
  overflow-y: auto;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.25);
}

.distro-features-grid {
  grid-template-columns: minmax(0, 8.5rem) minmax(0, 1fr);
}

@media (min-width: 640px) {
  .distro-modal-panel {
    padding: 1.25rem;
  }
}
</style>
