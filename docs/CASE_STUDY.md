# Case Study: PickYourLinux

## Designing a Decision Engine That Refuses to Lie to Users

---

## Executive Summary

PickYourLinux is a schema-driven decision engine that evaluates **30+ conditional questions across 3 structured phases** to recommend among **40+ Linux distributions**, while enforcing one strict invariant:

> **Zero business logic exists inside any Vue component.**

All domain rules are expressed declaratively in a DSL and validated through
Zod.
Every state change triggers deterministic recomputation.
Phase boundaries prevent misleading or meaningless questions.

Adding a new question requires editing exactly one DSL definition file.
No UI logic changes. No duplicated conditionals.

The project began as a simple conditional quiz. It evolved into a defensive decision system after the initial architecture proved fragile under change.

---

## The Trigger: When “Working” Became Dangerous

The first version worked.

It used Vue templates with conditional rendering:

```vue
<div v-if="answers.useCase === 'gaming' && answers.ram < 8">
```

The logic felt manageable at first.
But after a seemingly small product request —

> “Add a performance preference that applies to gaming users but adjusts recommendations for low-RAM systems.”

— the cracks appeared.

That change required:

* Editing multiple Vue components
* Duplicating conditionals
* Revalidating edge cases manually
* Testing through the UI rather than in isolation

After implementing it, I wasn’t confident it was correct.

The problem wasn’t complexity.
It was coupling.

Business logic lived inside presentation logic.
State mutations cascaded unpredictably.
Back-navigation exposed stale branches.

At that point, the architecture was already lying about its maintainability.

The real question became:

> If this feels fragile at 10 questions, what happens at 30?

That question triggered the rewrite.

---

## The Core Architectural Decision: Logic-as-Data

The rewrite introduced a DSL.

Instead of imperative UI conditions:

```ts
if (
  (useCase === "gaming" && ram < 8) ||
  (prefersSystemd === false && gpu === "nvidia")
) { ... }
```

Rules became declarative:

```json
{
  "or": [
    {
      "and": [
        { "equals": ["useCase", "gaming"] },
        { "lt": ["ram", 8] }
      ]
    },
    {
      "and": [
        { "equals": ["prefersSystemd", false] },
        { "equals": ["gpu", "nvidia"] }
      ]
    }
  ]
}
```

This approach is:

* More verbose
* Less ergonomic at a glance
* Structurally rigid

But it is also:

* Serializable
* Testable without UI
* Statistically analyzable
* Auditable

During development I considered allowing inline evaluator functions for complex cases.

I rejected that option.

Because once arbitrary functions enter the system, it loses:

* Determinism
* Serializability
* Rule graph validation potential

The verbosity is intentional.
It preserves architectural guarantees.

---

## Validation as a First-Class Contract

All DSL structures and state snapshots are validated through
Zod.

This means:

* The engine never evaluates malformed data
* Types are inferred directly from schemas
* UI cannot produce structurally invalid state

There was friction:

* Schema refactors caused compile errors
* Minor DSL tweaks required explicit updates
* Iteration felt slower initially

But that friction exposed hidden assumptions early.
It prevented runtime ambiguity later.

Validation is not decoration.
It is enforcement.

---

## Deterministic Recalculation Over Mutation

Version 1 mutated state.

Version 2 recomputes everything.

When a user changes an early answer:

1. The entire decision graph re-evaluates
2. Invalid downstream answers are discarded
3. Candidate sets are recalculated from a validated snapshot

This design:

* Eliminates stale state bugs
* Makes back-navigation safe
* Reduces debugging to pure-function evaluation

The trade-off is computational overhead.
The benefit is structural integrity.

---

## The Real Product Insight: Trap UX

The most important shift was not technical.

It was psychological.

At one point in the flow, only one distribution remained viable.
Yet the system continued asking refinement questions.

Technically valid.
Practically misleading.

The user believed they were still choosing.

They weren’t.

This is **Trap UX**:
When a system continues asking questions that no longer influence the outcome.

The solution was not automatic exit.

Instead, the engine introduces a `q_phase_exit` question when the candidate set becomes sufficiently narrow.

The system evaluates:

* Remaining candidate count
* Potential meaningful refinement

And then surfaces the decision:

> “We’ve narrowed this down significantly.
> Would you like to see the results now or continue refining?”

This preserves:

* Transparency
* User agency
* Architectural honesty

The engine evaluates.
The UI presents.
The user decides.

That separation is deliberate.

---

## Quantified Snapshot

Scale is moderate. Discipline is not.

Current system:

* 3 explicit phases
* 30+ conditional questions
* 40+ modeled distributions
* 100+ rule combinations
* 100% DSL schema validation
* **0 business conditionals inside Vue components**

The invariant matters more than the count.

---

## Trade-offs Lived

### DSL Verbosity

Complex logical expressions become structurally heavy.
Nested `and`/`or` trees reduce readability.

I accepted verbosity to preserve:

* Determinism
* Static analyzability
* Tooling potential

The cost is developer ergonomics.
The gain is structural clarity.

---

### Phase Boundaries

Phases constrain flow flexibility.
They introduce additional modeling overhead.

But without them:

* Branch ordering becomes implicit
* Circular dependencies become easier
* UX drift becomes harder to detect

The constraint is intentional.

---

### Validation Strictness

Strict schema enforcement slowed iteration early.

But it prevented runtime surprises and made refactoring safer.

---

## Failure Modes Considered

Prevented by design:

* UI-driven business logic drift
* Partial downstream state corruption
* Undetected malformed inputs
* Invisible invalid states

Not yet fully solved:

* Static circular condition detection
* Automated rule conflict analysis
* Outcome coverage verification (e.g., unreachable distros)

These are tooling problems, not architectural flaws.

---

## What I Would Do Differently

### Build Rule Graph Validation Earlier

As the DSL grew, I began reasoning about rule interactions manually.
A graph visualization and static cycle detection system would have accelerated confidence.

Nothing broke — but confidence depended on developer reasoning rather than tooling.

---

### Add Conflict Detection

While adding conditions, I occasionally paused:

> “Is this rule shadowing another?”

Today, that confidence comes from review.
In a production-scale system, it should come from automation.

---

### Add Outcome Coverage Tests

The engine guarantees determinism.
It does not yet automatically verify:

* All distros are reachable
* No rule combination produces zero results
* No rule is permanently shadowed

Those tests would complete the system’s self-verification story.

---

## Why This Pattern Matters Professionally

The trap UX problem is not unique to Linux selectors.

It appears anywhere a multi-step system continues past the point of meaningful differentiation:

* Insurance eligibility flows
* Loan application wizards
* Regulatory onboarding systems
* Configuration builders
* Financial product selectors

The architectural solution is consistent:

1. Evaluate the remaining outcome space.
2. Determine whether additional questions meaningfully reduce it.
3. Surface that state transparently.
4. Preserve agency without creating illusion.

This project is a contained exploration of that pattern.

It began as a distro picker.
It became a study in boundary enforcement, validation discipline, and honest decision flow design.

---

**End.**
