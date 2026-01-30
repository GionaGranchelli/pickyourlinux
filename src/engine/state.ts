import { computed, ref } from "vue";
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
}

const defaultIntent: UserIntent = UserIntentSchema.parse({
    installation: "GUI",
    maintenance: "NO_TERMINAL",
    proprietary: "OPTIONAL",
    architecture: "x86_64",
    minRam: 4,
    tags: [],
});

export function useDecisionEngine() {
    // Single source of truth (reactive)
    const intent = ref<UserIntent>(structuredClone(defaultIntent));
    const answeredIds = ref<string[]>([]);
    const status = ref<EngineStatus>("IN_PROGRESS");
    const disqualifyReason = ref<string | undefined>(undefined);

    // History for undo
    const history = ref<Snapshot[]>([]);

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

    function selectOption(questionId: string, option: QuestionOption) {
        if (status.value !== "IN_PROGRESS") return;

        // Snapshot for undo
        history.value.push({
            intent: structuredClone(intent.value),
            answeredIds: [...answeredIds.value],
            status: status.value,
            disqualifyReason: disqualifyReason.value,
        });

        // Disqualifier: stop immediately (do NOT apply patches unless you explicitly want to)
        if (option.isDisqualifier) {
            status.value = "DISQUALIFIED";
            disqualifyReason.value = option.label;
            if (!answeredIds.value.includes(questionId)) answeredIds.value.push(questionId);
            return;
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
    }

    return {
        // state
        intent,
        answeredIds,
        status,
        disqualifyReason,

        // derived
        visibleQuestions,
        currentQuestion,
        isComplete,
        isDisqualified,

        // actions
        selectOption,
        undo,
    };
}
