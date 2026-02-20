<template>
  <div class="mx-auto max-w-3xl space-y-8">
    <header class="space-y-3">
      <h1 class="text-3xl font-semibold text-slate-900">Data sources and definitions</h1>
      <p class="text-sm text-slate-600">
        These attributes describe observable traits we can compare. They are not opinions or rankings.
      </p>
      <p class="text-sm text-slate-600">
        Source:
        <a
          href="https://github.com/GionaGranchelli/pickyourlinux"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-slate-900 underline"
        >
          github.com/GionaGranchelli/pickyourlinux
        </a>
      </p>
    </header>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">What the fields mean</h2>
      <div class="space-y-4 text-sm text-slate-600">
        <div>
          <div class="font-semibold text-slate-700">maintenanceStyle</div>
          <p>
            Describes how much ongoing maintenance typically requires manual terminal work. “LOW_FRICTION”
            means most routine updates and settings are handled with guided tools. “HANDS_ON” means you will
            regularly work in the terminal for common tasks.
          </p>
        </div>
        <div>
          <div class="font-semibold text-slate-700">proprietarySupport</div>
          <p>
            Indicates whether proprietary (closed-source) software or drivers are supported. “NONE” means the
            system avoids them by default. “OPTIONAL” means they can be enabled. “FULL” means they are commonly
            included or expected for typical use.
          </p>
        </div>
        <div>
          <div class="font-semibold text-slate-700">suitableForOldHardware</div>
          <p>
            A yes/no flag based on whether a system is commonly used on older machines without requiring high
            specifications. This does not guarantee performance on any specific device.
          </p>
        </div>
        <div>
          <div class="font-semibold text-slate-700">installerExperience</div>
          <p>
            “GUI” means a guided graphical installer is available. “MANUAL” means setup is primarily command-line
            and requires more manual steps.
          </p>
        </div>
        <div>
          <div class="font-semibold text-slate-700">gamingSupport</div>
          <p>
            A rough indicator of how well a system supports modern games with minimal extra setup. “GOOD” means
            common gaming tools are well supported, “LIMITED” means some work is needed, and “NONE” means gaming
            is not a focus.
          </p>
        </div>
        <div>
          <div class="font-semibold text-slate-700">privacyPosture</div>
          <p>
            “STRONG” indicates a system is designed with privacy protections as a primary goal. “DEFAULT” means it
            does not make that a central focus.
          </p>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">Limits and boundaries</h2>
      <ul class="list-disc pl-5 text-sm text-slate-600 space-y-2">
        <li>These fields are simplified summaries of observable behavior, not judgments of quality.</li>
        <li>Real-world experience can vary by hardware, updates, and personal configuration.</li>
        <li>We avoid scores, rankings, and hidden weights by design.</li>
      </ul>
    </section>
  </div>
</template>
