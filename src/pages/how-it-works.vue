<template>
  <div class="mx-auto max-w-3xl space-y-8">
    <header class="space-y-3">
      <h1 class="text-3xl font-semibold text-slate-900">How it works</h1>
      <p class="text-sm text-slate-600">
        This site does not pick a single “best” Linux version. It only shows what fits the answers you give.
      </p>
    </header>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">1) Pick how deep you want to go</h2>
      <p class="text-sm text-slate-600">
        Start with a quick set of questions. If you want more accuracy, you can keep refining.
        You can also stop after the first phase and still get results.
      </p>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">2) You answer plain questions</h2>
      <p class="text-sm text-slate-600">
        We ask about things like whether you want everything to work without using the terminal,
        whether you need proprietary software, or whether your computer is older.
      </p>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">3) Optional refinements (if you choose)</h2>
      <p class="text-sm text-slate-600">
        The next phase explains a few concepts in beginner terms:
      </p>
      <ul class="list-disc pl-5 text-sm text-slate-600 space-y-2">
        <li><span class="font-semibold">Desktop preference</span> = the look and layout of the interface.</li>
        <li><span class="font-semibold">Release model</span> = how updates arrive (fixed batches vs rolling updates).</li>
        <li><span class="font-semibold">No preference</span> = don’t filter on that attribute.</li>
      </ul>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">4) We filter based on your choices</h2>
      <p class="text-sm text-slate-600">
        Your answers become clear, fixed constraints. Every Linux version is checked against those
        constraints. If it doesn’t meet them, it is excluded. Nothing is ranked or scored.
      </p>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">5) Multiple results are normal</h2>
      <p class="text-sm text-slate-600">
        Many Linux versions can satisfy the same constraints. That is expected. You can review the
        reasons for each result or change an answer to explore other outcomes.
      </p>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <h2 class="text-xl font-semibold text-slate-900">What we do not do</h2>
      <ul class="list-disc pl-5 text-sm text-slate-600 space-y-2">
        <li>We do not choose favorites.</li>
        <li>We do not rank or score Linux versions.</li>
        <li>We do not add hidden weights or personal opinions.</li>
      </ul>
    </section>
  </div>
</template>
