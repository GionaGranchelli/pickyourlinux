import { computed, ref } from "vue";
import { z } from "zod";
import { UserIntentSchema, type UserIntent, type Question, type QuestionOption } from "~/data/types";
import { ALL_QUESTIONS } from "~/data/questions";
import { applyPatch, evaluateCondition } from "~/engine/logic";

export type EngineStatus = "IN_PROGRESS" | "COMPLETED" | "DISQUALIFIED";

export interface SessionState {
    intent: UserIntent;
    answeredIds: string[]; // order matters
    status: EngineStatus;
    disqualifyReason?: string;
}

interface Snapshot {
    intent: UserIntent;
    answeredIds: string[];
    status: EngineStatus;
    disqualifyReason?: string;
    appliedPatches: string[];
}

const SessionStateSchema = z.object({
    intent: UserIntentSchema,
    answeredIds: z.array(z.string()),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "DISQUALIFIED"]),
    disqualifyReason: z.string().optional(),
});

const defaultIntent: UserIntent = UserIntentSchema.parse({
    installation: "GUI",
    maintenance: "NO_TERMINAL",
    proprietary: "OPTIONAL",
    architecture: "x86_64",
    minRam: 4,
    tags: [],
});

export function useDecisionEngine() {
    const debugEnabled = import.meta.dev;

    // Single source of truth (reactive)
    const intent = ref<UserIntent>(structuredClone(defaultIntent));
    const answeredIds = ref<string[]>([]);
    const status = ref<EngineStatus>("IN_PROGRESS");
    const disqualifyReason = ref<string | undefined>(undefined);

    // History for undo
    const history = ref<Snapshot[]>([]);
    const appliedPatches = ref<string[]>([]);

    // Derived: visible questions given current intent
    const visibleQuestions = computed<Question[]>(() => {
        return ALL_QUESTIONS.filter((q) => {
            if (!q.showIf) return true;
            return evaluateCondition(intent.value, q.showIf);
        });
    });

    // Derived: first visible unanswered question
    const currentQuestion = computed<Question | undefined>(() => {
        if (status.value !== "IN_PROGRESS") return undefined;

        const next = visibleQuestions.value.find((q) => !answeredIds.value.includes(q.id));
        if (!next) {
            // No remaining visible questions: complete deterministically
            status.value = "COMPLETED";
            return undefined;
        }
        return next;
    });

    const isComplete = computed(() => status.value === "COMPLETED");
    const isDisqualified = computed(() => status.value === "DISQUALIFIED");
    const progress = computed(() => {
        const total = visibleQuestions.value.length;
        const answered = answeredIds.value.length;
        const percent = total === 0 ? 100 : Math.min(100, Math.round((answered / total) * 100));
        return { total, answered, percent };
    });

    const skippedQuestions = computed(() => {
        if (!debugEnabled) return [];
        return ALL_QUESTIONS.filter((q) => q.showIf && !evaluateCondition(intent.value, q.showIf)).map((q) => ({
            id: q.id,
            text: q.text,
            reason: "showIf evaluated to false",
            showIf: q.showIf,
            showIfJson: JSON.stringify(q.showIf),
        }));
    });

    function selectOption(questionId: string, option: QuestionOption) {
        if (status.value !== "IN_PROGRESS") return;

        // Snapshot for undo
        history.value.push({
            intent: structuredClone(intent.value),
            answeredIds: [...answeredIds.value],
            status: status.value,
            disqualifyReason: disqualifyReason.value,
            appliedPatches: [...appliedPatches.value],
        });

        // Disqualifier: stop immediately (do NOT apply patches unless you explicitly want to)
        if (option.isDisqualifier) {
            status.value = "DISQUALIFIED";
            disqualifyReason.value = option.label;
            if (!answeredIds.value.includes(questionId)) answeredIds.value.push(questionId);
            return;
        }

        if (debugEnabled) {
            const label = `q:${questionId} -> ${option.id}`;
            const serialized = option.patches.map((patch) => JSON.stringify(patch)).join(", ");
            appliedPatches.value.push(serialized ? `${label} [${serialized}]` : `${label} []`);
        }

        // Apply patches (validated)
        intent.value = applyPatch(intent.value, option.patches);

        // Mark answered (by ID, not index)
        if (!answeredIds.value.includes(questionId)) answeredIds.value.push(questionId);
    }

    function undo() {
        const prev = history.value.pop();
        if (!prev) return;

        intent.value = prev.intent;
        answeredIds.value = prev.answeredIds;
        status.value = prev.status;
        disqualifyReason.value = prev.disqualifyReason;
        appliedPatches.value = prev.appliedPatches;
    }

    function serializeSession(): string {
        const snapshot: SessionState = {
            intent: intent.value,
            answeredIds: answeredIds.value,
            status: status.value,
            disqualifyReason: disqualifyReason.value,
        };
        return JSON.stringify(snapshot);
    }

    function restoreSession(serialized: string): boolean {
        try {
            const parsed = JSON.parse(serialized);
            const restored = SessionStateSchema.parse(parsed);

            const validIds = new Set(ALL_QUESTIONS.map((q) => q.id));
            const seen = new Set<string>();
            for (const id of restored.answeredIds) {
                if (!validIds.has(id)) throw new Error(`Unknown question id: ${id}`);
                if (seen.has(id)) throw new Error(`Duplicate answered id: ${id}`);
                seen.add(id);
            }

            intent.value = restored.intent;
            answeredIds.value = [...restored.answeredIds];
            status.value = restored.status;
            disqualifyReason.value = restored.disqualifyReason;
            history.value = [];
            appliedPatches.value = [];
            return true;
        } catch {
            return false;
        }
    }

    return {
        // state
        intent,
        answeredIds,
        status,
        disqualifyReason,
        debugEnabled,
        appliedPatches,

        // derived
        visibleQuestions,
        currentQuestion,
        isComplete,
        isDisqualified,
        progress,
        skippedQuestions,

        // actions
        selectOption,
        undo,
        serializeSession,
        restoreSession,
    };
}
