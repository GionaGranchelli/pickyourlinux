import { computed, ref, toRaw, watch } from "vue";
import { z } from "zod";
import { UserIntentSchema, type UserIntent, type Question, type QuestionOption } from "~/data/types";
import { ALL_QUESTIONS, QUESTION_PHASES } from "~/data/questions";
import { CompatibilityResultListSchema, type CompatibilityResult } from "~/data/compatibility-types";
import type { Distro } from "~/data/distro-types";
import {
    type ConstraintKey,
    type ExclusionReasonKey,
    type InclusionReasonKey,
} from "~/data/reason-templates";
import { applyPatch, evaluateCondition } from "~/engine/logic";
import { getDistros } from "~/engine/eliminate";
import { buildCompatibility } from "~/engine/compatibility";

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
    lastAppliedPatches: string[];
    answerHistory: AnswerRecord[];
}

const SessionStateSchema = z.object({
    intent: UserIntentSchema,
    answeredIds: z.array(z.string()),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "DISQUALIFIED"]),
    disqualifyReason: z.string().optional(),
});

const SessionPayloadSchema = z.object({
    intent: UserIntentSchema,
    answeredIds: z.array(z.string()),
    status: z.enum(["IN_PROGRESS", "COMPLETED", "DISQUALIFIED"]),
    disqualifyReason: z.string().optional(),
    appliedPatches: z.array(z.string()).optional(),
    answerHistory: z
        .array(
            z.object({
                questionId: z.string(),
                questionText: z.string(),
                optionId: z.string(),
                optionLabel: z.string(),
            })
        )
        .optional(),
});

const SharePayloadSchema = z.object({
    intent: UserIntentSchema,
    answeredIds: z.array(z.string()),
});

export type SharePayload = z.infer<typeof SharePayloadSchema>;

const defaultIntent: UserIntent = UserIntentSchema.parse({
    installation: "GUI",
    maintenance: "NO_TERMINAL",
    proprietary: "OPTIONAL",
    architecture: "x86_64",
    minRam: 4,
    tags: [],
    experience: "BEGINNER",
    desktopPreference: "NO_PREFERENCE",
    releaseModel: "NO_PREFERENCE",
    initSystem: "NO_PREFERENCE",
    packageManager: "NO_PREFERENCE",
    secureBootNeeded: null,
    gpu: "UNKNOWN",
    nvidiaTolerance: "NO_PREFERENCE",
});

export type AnswerRecord = {
    questionId: string;
    questionText: string;
    optionId: string;
    optionLabel: string;
};

export type AnswerGroup = {
    phaseKey: (typeof QUESTION_PHASES)[number]["key"];
    phaseLabel: string;
    answers: AnswerRecord[];
};

export type ProgressVM = {
    current: number;
    total: number;
    percent: number;
    phaseLabel: string;
};

export type QuestionOptionVM = {
    id: string;
    label: string;
    description?: string;
    image?: string;
};

export type QuestionVM = {
    id: string;
    text: string;
    options: QuestionOptionVM[];
};

export type PhaseGateVM = QuestionVM;

export type AnswerVM = {
    questionId: string;
    questionText: string;
    optionLabel: string;
    phaseLabel: string;
};

export type WizardMode = "QUESTION" | "PHASE_GATE" | "COMPLETE" | "DISQUALIFIED";

export type DistroCardVM = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    websiteUrl?: string;
    documentationUrl?: string;
    forumUrl?: string;
    downloadUrl?: string;
    testDriveUrl?: string;
    distroSeaUrl?: string;
    reasonsIncluded: string[];
    reasonsFriction: string[];
    matchedConstraints?: string[];
    activeConstraintCount?: number;
    strictMatchCount: number;
    choiceReasonCount: number;
    releaseModel?: Distro["releaseModel"];
    supportedDesktops?: Distro["supportedDesktops"];
    gamingSupport?: Distro["gamingSupport"];
    packageManager?: Distro["packageManager"];
    initSystem?: Distro["initSystem"];
    installerExperience?: Distro["installerExperience"];
    maintenanceStyle?: Distro["maintenanceStyle"];
    proprietarySupport?: Distro["proprietarySupport"];
    privacyPosture?: Distro["privacyPosture"];
    secureBootOutOfBox?: Distro["secureBootOutOfBox"];
    nvidiaExperience?: Distro["nvidiaExperience"];
    suitableForOldHardware?: Distro["suitableForOldHardware"];
    isBeginnerFriendly?: boolean;
};

export type ExcludedDistroVM = {
    id: string;
    name: string;
    description?: string;
    reasons: string[];
};

export type ResultsSort = "BEST_MATCH" | "NAME_ASC" | "NAME_DESC";

export type ResultsFilters = {
    releaseModel: "ALL" | Distro["releaseModel"];
    desktop: "ALL" | Distro["supportedDesktops"][number];
    gamingSupport: "ALL" | Distro["gamingSupport"];
    packageManager: "ALL" | Distro["packageManager"];
    initSystem: "ALL" | Distro["initSystem"];
    installerExperience: "ALL" | Distro["installerExperience"];
    maintenanceStyle: "ALL" | Distro["maintenanceStyle"];
    proprietarySupport: "ALL" | Distro["proprietarySupport"];
    privacyPosture: "ALL" | Distro["privacyPosture"];
    secureBootOutOfBox: "ALL" | "YES" | "NO";
    nvidiaExperience: "ALL" | Distro["nvidiaExperience"];
    suitableForOldHardware: "ALL" | "YES" | "NO";
};

export const DEFAULT_RESULTS_FILTERS: ResultsFilters = {
    releaseModel: "ALL",
    desktop: "ALL",
    gamingSupport: "ALL",
    packageManager: "ALL",
    initSystem: "ALL",
    installerExperience: "ALL",
    maintenanceStyle: "ALL",
    proprietarySupport: "ALL",
    privacyPosture: "ALL",
    secureBootOutOfBox: "ALL",
    nvidiaExperience: "ALL",
    suitableForOldHardware: "ALL",
};

export type ResultsVM = {
    shortlist: DistroCardVM[];
    allCompatible: DistroCardVM[];
    excluded: { name: string; reason: string }[];
    excludedDistros: ExcludedDistroVM[];
    activeConstraints: string[];
};

export type DebugVM = {
    intent: UserIntent;
    status: EngineStatus;
    answeredIds: string[];
    currentQuestionId?: string;
};

type PhaseKey = AnswerGroup["phaseKey"];

const experiencePhaseLabel: Record<UserIntent["experience"], string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Refine",
    ADVANCED: "Expert",
};

const RESULTS_SHORTLIST_LIMIT = 3;

const questionPhaseLookup = new Map<string, { key: PhaseKey; label: string }>();
QUESTION_PHASES.forEach((phase) => {
    phase.questionIds.forEach((questionId) => {
        questionPhaseLookup.set(questionId, { key: phase.key, label: phase.label });
    });
});

const distrosForVM = getDistros();

export function useDecisionEngine(t: (key: string) => string = (key) => key) {
    const debugEnabled = import.meta.dev;

    // Auto-persist to localStorage
    const STORAGE_KEY = "picklinux_session";
    let isRestoring = true; // Flag to prevent watch during restoration
    
    // Single source of truth (reactive)
    const intent = ref<UserIntent>(structuredClone(defaultIntent));
    const answeredIds = ref<string[]>([]);
    const status = ref<EngineStatus>("IN_PROGRESS");
    const disqualifyReason = ref<string | undefined>(undefined);

    // Comparison state
    const distrosToCompare = ref<string[]>([]);

    // History for undo
    const history = ref<Snapshot[]>([]);
    const appliedPatches = ref<string[]>([]);
    const lastAppliedPatches = ref<string[]>([]);
    const answerHistory = ref<AnswerRecord[]>([]);

    // Restore from localStorage on initialization
    if (import.meta.client) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = SessionPayloadSchema.parse(JSON.parse(stored));
                intent.value = parsed.intent;
                answeredIds.value = parsed.answeredIds;
                status.value = parsed.status;
                disqualifyReason.value = parsed.disqualifyReason;
                appliedPatches.value = parsed.appliedPatches || [];
                answerHistory.value = parsed.answerHistory || [];
            }
        } catch {
            // Invalid stored data, ignore
        }
        // Restoration complete, enable watch
        isRestoring = false;
    }

    // Auto-save to localStorage on state changes
    if (import.meta.client) {
        watch(
            [intent, answeredIds, status, disqualifyReason, appliedPatches, answerHistory],
            () => {
                if (isRestoring) return; // Skip during restoration
                const payload = {
                    intent: toRaw(intent.value),
                    answeredIds: answeredIds.value,
                    status: status.value,
                    disqualifyReason: disqualifyReason.value,
                    appliedPatches: appliedPatches.value,
                    answerHistory: answerHistory.value,
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            },
            { deep: true }
        );
    }

    // Functions for comparison
    const addDistroToCompare = (distroId: string) => {
        if (!distrosToCompare.value.includes(distroId)) {
            distrosToCompare.value.push(distroId);
        }
    };

    const removeDistroFromCompare = (distroId: string) => {
        distrosToCompare.value = distrosToCompare.value.filter((id) => id !== distroId);
    };

    const clearComparison = () => {
        distrosToCompare.value = [];
    };

    const experienceRank: Record<UserIntent["experience"], number> = {
        BEGINNER: 0,
        INTERMEDIATE: 1,
        ADVANCED: 2,
    };

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
        const visibleIds = new Set(visibleQuestions.value.map((question) => question.id));
        const answered = answeredIds.value.filter((id) => visibleIds.has(id)).length;
        const percent = total === 0 ? 100 : Math.min(100, Math.round((answered / total) * 100));
        const current = total === 0 ? 0 : Math.min(total, answered + 1);
        return { total, answered, percent, current };
    });

    const phaseLabel = computed(() => experiencePhaseLabel[intent.value.experience]);

    const progressVM = computed<ProgressVM>(() => ({
        current: progress.value.current,
        total: progress.value.total,
        percent: progress.value.percent,
        phaseLabel: phaseLabel.value,
    }));

    const currentQuestionVM = computed<QuestionVM | null>(() => {
        if (!currentQuestion.value) return null;
        return {
            id: currentQuestion.value.id,
            text: t(currentQuestion.value.text),
            options: currentQuestion.value.options.map((option) => ({
                id: option.id,
                label: t(option.label),
                description: option.description ? t(option.description) : undefined,
                image: option.image,
            })),
        };
    });

    const answeredGroups = computed<AnswerGroup[]>(() => {
        const groups = QUESTION_PHASES.map((phase) => ({
            phaseKey: phase.key,
            phaseLabel: phase.label,
            answers: [] as AnswerRecord[],
        }));

        const groupMap = new Map<PhaseKey, (typeof groups)[number]>();
        groups.forEach((group) => groupMap.set(group.phaseKey, group));

        answerHistory.value.forEach((answer) => {
            const phase = questionPhaseLookup.get(answer.questionId) ?? {
                key: QUESTION_PHASES[0].key,
                label: QUESTION_PHASES[0].label,
            };
            const group = groupMap.get(phase.key);
            if (group) {
                group.answers.push(answer);
            }
        });

        return groups.filter((group) => group.answers.length > 0);
    });

    const answersVM = computed<AnswerVM[]>(() => {
        return answerHistory.value.map((answer) => {
            const phase = questionPhaseLookup.get(answer.questionId) ?? {
                key: QUESTION_PHASES[0].key,
                label: QUESTION_PHASES[0].label,
            };

            return {
                questionId: answer.questionId,
                questionText: answer.questionText,
                optionLabel: answer.optionLabel,
                phaseLabel: phase.label,
            };
        });
    });

    const wizardMode = computed<WizardMode>(() => {
        if (status.value === "DISQUALIFIED") return "DISQUALIFIED";
        if (status.value === "COMPLETED") return "COMPLETE";
        if (currentQuestion.value?.id === "q_phase_exit") return "PHASE_GATE";
        return "QUESTION";
    });

    const phaseGateVM = computed<PhaseGateVM | null>(() => {
        if (wizardMode.value !== "PHASE_GATE") return null;
        return currentQuestionVM.value;
    });

    const resultsVM = computed<ResultsVM>(() => {
        if (status.value !== "COMPLETED") {
            return {
                shortlist: [],
                allCompatible: [],
                excluded: [],
                excludedDistros: [],
                activeConstraints: [],
            };
        }

        const presentation = buildResultsPresentation(intent.value, distrosForVM, {
            limit: RESULTS_SHORTLIST_LIMIT,
            showAll: true,
        }, t);

        const toCardVM = (item: PresentedDistro): DistroCardVM => ({
            id: item.distroId,
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            websiteUrl: item.websiteUrl,
            documentationUrl: item.documentationUrl,
            forumUrl: item.forumUrl,
            downloadUrl: item.downloadUrl,
            testDriveUrl: item.testDriveUrl,
            distroSeaUrl: item.distroSeaUrl,
            reasonsIncluded: item.includedBecause,
            reasonsFriction: item.excludedBecause,
            matchedConstraints: item.matchedConstraints,
            activeConstraintCount: presentation.activeConstraints.length,
            strictMatchCount: item.matchedConstraints.length,
            choiceReasonCount: item.includedBecause.length,
            releaseModel: item.releaseModel,
            supportedDesktops: item.supportedDesktops,
            gamingSupport: item.gamingSupport,
            packageManager: item.packageManager,
            initSystem: item.initSystem,
            installerExperience: item.installerExperience,
            maintenanceStyle: item.maintenanceStyle,
            proprietarySupport: item.proprietarySupport,
            privacyPosture: item.privacyPosture,
            secureBootOutOfBox: item.secureBootOutOfBox,
            nvidiaExperience: item.nvidiaExperience,
            suitableForOldHardware: item.suitableForOldHardware,
            isBeginnerFriendly: item.isBeginnerFriendly,
        });

        const allCompatible = presentation.compatible.map(toCardVM);
        const shortlist = allCompatible.slice(0, RESULTS_SHORTLIST_LIMIT);
        const excludedDistros = presentation.excluded.map((item) => ({
            id: item.distroId,
            name: item.name,
            description: item.description,
            reasons: item.excludedBecause.length > 0 ? item.excludedBecause : ["Excluded by your constraints."],
        }));
        const excluded = presentation.excluded.flatMap((item) => {
            if (item.excludedBecause.length === 0) {
                return [{ name: item.name, reason: "Excluded by your constraints." }];
            }

            return item.excludedBecause.map((reason) => ({
                name: item.name,
                reason,
            }));
        });

        return {
            shortlist,
            allCompatible,
            excluded,
            excludedDistros,
            activeConstraints: presentation.activeConstraints,
        };
    });

    const debugVM = computed<DebugVM>(() => ({
        intent: intent.value,
        status: status.value,
        answeredIds: answeredIds.value,
        currentQuestionId: currentQuestion.value?.id,
    }));

    const canUndo = computed(() => answeredIds.value.length > 0);

    const skippedQuestions = computed(() => {
        if (!debugEnabled) return [];
        return ALL_QUESTIONS.filter((q) => q.showIf && !evaluateCondition(intent.value, q.showIf)).map((q) => ({
            questionId: q.id,
            showIf: q.showIf,
            showIfJson: JSON.stringify(q.showIf),
        }));
    });

    function selectOption(questionId: string, option: QuestionOption) {
        if (status.value !== "IN_PROGRESS") return;

        // Snapshot for undo
        history.value.push({
            intent: structuredClone(toRaw(intent.value)),
            answeredIds: [...answeredIds.value],
            status: status.value,
            disqualifyReason: disqualifyReason.value,
            appliedPatches: [...appliedPatches.value],
            lastAppliedPatches: [...lastAppliedPatches.value],
            answerHistory: [...answerHistory.value],
        });

        const question = ALL_QUESTIONS.find((item) => item.id === questionId);
        const record: AnswerRecord = {
            questionId,
            questionText: t(question?.text ?? questionId),
            optionId: option.id,
            optionLabel: t(option.label),
        };

        // Disqualifier: stop immediately (do NOT apply patches unless you explicitly want to)
        if (option.isDisqualifier) {
            status.value = "DISQUALIFIED";
            disqualifyReason.value = option.disqualificationReason ? t(option.disqualificationReason) : t(option.label);
            if (!answeredIds.value.includes(questionId)) answeredIds.value.push(questionId);
            if (!answerHistory.value.some((item) => item.questionId === questionId)) {
                answerHistory.value.push(record);
            }
            lastAppliedPatches.value = [];
            return;
        }

        // Special handling for phase gate "see results" option
        if (questionId === "q_phase_exit" && option.id === "see_results") {
            if (!answeredIds.value.includes(questionId)) answeredIds.value.push(questionId);
            if (!answerHistory.value.some((item) => item.questionId === questionId)) {
                answerHistory.value.push(record);
            }
            status.value = "COMPLETED";
            lastAppliedPatches.value = [];
            return;
        }

        lastAppliedPatches.value = option.patches.map((patch) => JSON.stringify(patch));

        if (debugEnabled) {
            const label = `q:${questionId} -> ${option.id}`;
            const serialized = option.patches.map((patch) => JSON.stringify(patch)).join(", ");
            appliedPatches.value.push(serialized ? `${label} [${serialized}]` : `${label} []`);
        }

        // Apply patches (validated)
        intent.value = applyPatch(toRaw(intent.value), option.patches);

        // Mark answered (by ID, not index)
        if (!answeredIds.value.includes(questionId)) answeredIds.value.push(questionId);
        if (!answerHistory.value.some((item) => item.questionId === questionId)) {
            answerHistory.value.push(record);
        }

        // Check if all visible questions are now answered
        const next = visibleQuestions.value.find((q) => !answeredIds.value.includes(q.id));
        if (!next) {
            status.value = "COMPLETED";
        }
    }

    function undo() {
        const prev = history.value.pop();
        if (!prev) return;

        intent.value = prev.intent;
        answeredIds.value = prev.answeredIds;
        status.value = prev.status;
        disqualifyReason.value = prev.disqualifyReason;
        appliedPatches.value = prev.appliedPatches;
        lastAppliedPatches.value = prev.lastAppliedPatches;
        answerHistory.value = prev.answerHistory;
    }

    function selectOptionById(optionId: string) {
        const question = currentQuestion.value;
        if (!question) return;
        const option = question.options.find((item) => item.id === optionId);
        if (!option) return;
        selectOption(question.id, option);
    }

    function reset() {
        intent.value = structuredClone(defaultIntent);
        answeredIds.value = [];
        status.value = "IN_PROGRESS";
        disqualifyReason.value = undefined;
        history.value = [];
        appliedPatches.value = [];
        lastAppliedPatches.value = [];
        answerHistory.value = [];
        if (import.meta.client) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    function editAnswer(questionId: string) {
        const index = answeredIds.value.indexOf(questionId);
        if (index === -1) return;
        const snapshot = history.value[index];
        if (!snapshot) return;

        intent.value = snapshot.intent;
        answeredIds.value = snapshot.answeredIds;
        status.value = "IN_PROGRESS";
        disqualifyReason.value = undefined;
        appliedPatches.value = snapshot.appliedPatches;
        lastAppliedPatches.value = snapshot.lastAppliedPatches;
        answerHistory.value = snapshot.answerHistory;
        history.value = history.value.slice(0, index);
    }

    function upgradeExperienceLevel(next: UserIntent["experience"]): boolean {
        const current = intent.value.experience;
        if (experienceRank[next] <= experienceRank[current]) return false;

        intent.value = {
            ...toRaw(intent.value),
            experience: next,
        };
        status.value = "IN_PROGRESS";
        disqualifyReason.value = undefined;
        clearComparison();
        return true;
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

    const validateAnsweredIds = (ids: string[]) => {
        const validIds = new Set(ALL_QUESTIONS.map((q) => q.id));
        const seen = new Set<string>();
        for (const id of ids) {
            if (!validIds.has(id)) throw new Error(`Unknown question id: ${id}`);
            if (seen.has(id)) throw new Error(`Duplicate answered id: ${id}`);
            seen.add(id);
        }
    };

    function restoreSession(serialized: string): boolean {
        try {
            const parsed = JSON.parse(serialized);
            const restored = SessionStateSchema.parse(parsed);

            validateAnsweredIds(restored.answeredIds);

            intent.value = restored.intent;
            answeredIds.value = [...restored.answeredIds];
            status.value = restored.status;
            disqualifyReason.value = restored.disqualifyReason;
            history.value = [];
            appliedPatches.value = [];
            lastAppliedPatches.value = [];
            answerHistory.value = [];
            return true;
        } catch {
            return false;
        }
    }

    function getSharePayload(): SharePayload {
        return {
            intent: structuredClone(toRaw(intent.value)),
            answeredIds: [...answeredIds.value],
        };
    }

    function restoreSharePayload(payload: SharePayload): boolean {
        try {
            const restored = SharePayloadSchema.parse(payload);
            validateAnsweredIds(restored.answeredIds);

            intent.value = restored.intent;
            answeredIds.value = [...restored.answeredIds];
            status.value = "IN_PROGRESS";
            disqualifyReason.value = undefined;
            history.value = [];
            appliedPatches.value = [];
            lastAppliedPatches.value = [];
            answerHistory.value = [];
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
        lastAppliedPatches,
        answeredQuestions: answerHistory,
        answeredGroups,
        phaseLabel,
        progressVM,
        currentQuestionVM,
        phaseGateVM,
        answersVM,
        wizardMode,
        resultsVM,
        debugVM,
        canUndo,

        // derived
        visibleQuestions,
        currentQuestion,
        isComplete,
        isDisqualified,
        progress,
        skippedQuestions,

        // actions
        selectOption,
        selectOptionById,
        undo,
        editAnswer,
        reset,
        upgradeExperienceLevel,
        serializeSession,
        restoreSession,
        getSharePayload,
        restoreSharePayload,

        // comparison
        distrosToCompare,
        addDistroToCompare,
        removeDistroFromCompare,
        clearComparison,
    };
}

export type DecisionEngine = ReturnType<typeof useDecisionEngine>;

export function buildCompatibilityResults(intent: UserIntent): CompatibilityResult[] {
    return buildCompatibility(intent);
}

export type PresentedDistro = {
    distroId: string;
    name: string;
    description?: string;
    imageUrl?: string;
    websiteUrl?: string;
    documentationUrl?: string;
    forumUrl?: string;
    downloadUrl?: string;
    testDriveUrl?: string;
    distroSeaUrl?: string;
    includedBecause: string[];
    excludedBecause: string[];
    matchedConstraints: string[];
    releaseModel?: Distro["releaseModel"];
    supportedDesktops?: Distro["supportedDesktops"];
    gamingSupport?: Distro["gamingSupport"];
    packageManager?: Distro["packageManager"];
    initSystem?: Distro["initSystem"];
    installerExperience?: Distro["installerExperience"];
    maintenanceStyle?: Distro["maintenanceStyle"];
    proprietarySupport?: Distro["proprietarySupport"];
    privacyPosture?: Distro["privacyPosture"];
    secureBootOutOfBox?: Distro["secureBootOutOfBox"];
    nvidiaExperience?: Distro["nvidiaExperience"];
    suitableForOldHardware?: Distro["suitableForOldHardware"];
    isBeginnerFriendly?: boolean;
};

export type ResultsPresentation = {
    compatible: PresentedDistro[];
    excluded: PresentedDistro[];
    compatibleTotal: number;
    compatibleShown: number;
    activeConstraints: string[];
};

type PresentationOptions = {
    limit: number;
    showAll: boolean;
};

const sortByDistroId = (a: CompatibilityResult, b: CompatibilityResult) => {
    return a.distroId.localeCompare(b.distroId);
};

const getActiveConstraintKeys = (intent: UserIntent): ConstraintKey[] => {
    const constraints: ConstraintKey[] = [];

    if (intent.installation === "GUI") {
        constraints.push("constraint_installer_gui");
    }

    if (intent.maintenance === "NO_TERMINAL") {
        constraints.push("constraint_maintenance_low_friction");
    }

    if (intent.proprietary === "AVOID") {
        constraints.push("constraint_proprietary_none");
    }

    if (intent.proprietary === "REQUIRED") {
        constraints.push("constraint_proprietary_allowed");
    }

    if (intent.tags.includes("OldHardware")) {
        constraints.push("constraint_old_hardware");
    }

    if (intent.tags.includes("Gaming")) {
        constraints.push("constraint_gaming_support");
    }

    if (intent.tags.includes("Privacy")) {
        constraints.push("constraint_privacy_strong");
    }

    if (intent.secureBootNeeded === true) {
        constraints.push("constraint_secure_boot_required");
    }

    if (intent.gpu === "NVIDIA" && intent.nvidiaTolerance === "WANT_EASY") {
        constraints.push("constraint_nvidia_easy");
    }

    if (intent.gpu === "NVIDIA" && intent.proprietary === "AVOID") {
        constraints.push("constraint_nvidia_avoid_proprietary");
    }

    if (intent.desktopPreference === "GNOME") {
        constraints.push("constraint_desktop_gnome");
    } else if (intent.desktopPreference === "KDE") {
        constraints.push("constraint_desktop_kde");
    } else if (intent.desktopPreference === "XFCE") {
        constraints.push("constraint_desktop_xfce");
    } else if (intent.desktopPreference === "CINNAMON") {
        constraints.push("constraint_desktop_cinnamon");
    } else if (intent.desktopPreference === "MATE") {
        constraints.push("constraint_desktop_mate");
    } else if (intent.desktopPreference === "LXQT") {
        constraints.push("constraint_desktop_lxqt");
    }

    if (intent.releaseModel === "FIXED") {
        constraints.push("constraint_release_fixed");
    } else if (intent.releaseModel === "ROLLING") {
        constraints.push("constraint_release_rolling");
    }

    if (intent.initSystem === "SYSTEMD") {
        constraints.push("constraint_init_systemd");
    } else if (intent.initSystem === "OPENRC") {
        constraints.push("constraint_init_openrc");
    } else if (intent.initSystem === "RUNIT") {
        constraints.push("constraint_init_runit");
    }

    if (intent.packageManager === "APT") {
        constraints.push("constraint_pkg_apt");
    } else if (intent.packageManager === "DNF") {
        constraints.push("constraint_pkg_dnf");
    } else if (intent.packageManager === "PACMAN") {
        constraints.push("constraint_pkg_pacman");
    } else if (intent.packageManager === "ZYPPER") {
        constraints.push("constraint_pkg_zypper");
    } else if (intent.packageManager === "APK") {
        constraints.push("constraint_pkg_apk");
    } else if (intent.packageManager === "NIX") {
        constraints.push("constraint_pkg_nix");
    }

    return constraints;
};

const matchesConstraint = (constraint: ConstraintKey, distro: Distro): boolean => {
    switch (constraint) {
        case "constraint_installer_gui":
            return distro.installerExperience === "GUI";
        case "constraint_maintenance_low_friction":
            return distro.maintenanceStyle === "LOW_FRICTION";
        case "constraint_proprietary_none":
            return distro.proprietarySupport === "NONE";
        case "constraint_proprietary_allowed":
            return distro.proprietarySupport !== "NONE";
        case "constraint_old_hardware":
            return distro.suitableForOldHardware;
        case "constraint_gaming_support":
            return distro.gamingSupport !== "NONE";
        case "constraint_privacy_strong":
            return distro.privacyPosture === "STRONG";
        case "constraint_secure_boot_required":
            return distro.secureBootOutOfBox;
        case "constraint_nvidia_easy":
            return distro.nvidiaExperience === "GOOD" || distro.nvidiaExperience === "OK";
        case "constraint_nvidia_avoid_proprietary":
            return distro.nvidiaExperience === "HARD" || distro.nvidiaExperience === "UNKNOWN";
        case "constraint_desktop_gnome":
            return distro.supportedDesktops.includes("GNOME");
        case "constraint_desktop_kde":
            return distro.supportedDesktops.includes("KDE");
        case "constraint_desktop_xfce":
            return distro.supportedDesktops.includes("XFCE");
        case "constraint_desktop_cinnamon":
            return distro.supportedDesktops.includes("CINNAMON");
        case "constraint_desktop_mate":
            return distro.supportedDesktops.includes("MATE");
        case "constraint_desktop_lxqt":
            return distro.supportedDesktops.includes("LXQT");
        case "constraint_release_fixed":
            return distro.releaseModel === "FIXED";
        case "constraint_release_rolling":
            return distro.releaseModel === "ROLLING";
        case "constraint_init_systemd":
            return distro.initSystem === "SYSTEMD";
        case "constraint_init_openrc":
            return distro.initSystem === "OPENRC";
        case "constraint_init_runit":
            return distro.initSystem === "RUNIT";
        case "constraint_pkg_apt":
            return distro.packageManager === "APT";
        case "constraint_pkg_dnf":
            return distro.packageManager === "DNF";
        case "constraint_pkg_pacman":
            return distro.packageManager === "PACMAN";
        case "constraint_pkg_zypper":
            return distro.packageManager === "ZYPPER";
        case "constraint_pkg_apk":
            return distro.packageManager === "APK";
        case "constraint_pkg_nix":
            return distro.packageManager === "NIX";
        default:
            return false;
    }
};

const renderInclusionReasons = (reasons: InclusionReasonKey[], t: (key: string) => string): string[] => {
    return reasons.map((reason) => t(`reasons.${reason}`));
};

const renderExclusionReasons = (reasons: ExclusionReasonKey[], t: (key: string) => string): string[] => {
    return reasons.map((reason) => t(`reasons.${reason}`));
};

export function buildResultsPresentation(
    intent: UserIntent,
    distros: Distro[],
    options: PresentationOptions,
    t: (key: string) => string = (key) => key
): ResultsPresentation {
    const results = CompatibilityResultListSchema.parse(buildCompatibility(intent));
    const distrosById = new Map(distros.map((distro) => [distro.id, distro] as const));

    const compatibleAll = results.filter((item) => item.compatible).sort(sortByDistroId);
    const excludedAll = results.filter((item) => !item.compatible).sort(sortByDistroId);

    const compatibleShown = options.showAll ? compatibleAll : compatibleAll.slice(0, options.limit);
    const activeConstraintKeys = getActiveConstraintKeys(intent);
    const activeConstraints = activeConstraintKeys.map((key) => t(`constraints.${key}`));

    const presentCompatible = (result: CompatibilityResult): PresentedDistro => {
        const distro = distrosById.get(result.distroId);
        const matchedConstraints = distro
            ? activeConstraintKeys
                  .filter((constraint) => matchesConstraint(constraint, distro))
                  .map((constraint) => t(`constraints.${constraint}`))
            : [];

        return {
            distroId: result.distroId,
            name: distro?.name ?? result.distroId,
            description: distro?.description,
            imageUrl: distro?.imageUrl ?? undefined,
            websiteUrl: distro?.websiteUrl ?? undefined,
            documentationUrl: distro?.documentationUrl ?? undefined,
            forumUrl: distro?.forumUrl ?? undefined,
            downloadUrl: distro?.downloadUrl ?? undefined,
            testDriveUrl: distro?.testDriveUrl ?? undefined,
            distroSeaUrl: distro?.distroSeaUrl ?? undefined,
            includedBecause: renderInclusionReasons(result.includedBecause, t),
            excludedBecause: [],
            matchedConstraints,
            releaseModel: distro?.releaseModel,
            supportedDesktops: distro?.supportedDesktops,
            gamingSupport: distro?.gamingSupport,
            packageManager: distro?.packageManager,
            initSystem: distro?.initSystem,
            installerExperience: distro?.installerExperience,
            maintenanceStyle: distro?.maintenanceStyle,
            proprietarySupport: distro?.proprietarySupport,
            privacyPosture: distro?.privacyPosture,
            secureBootOutOfBox: distro?.secureBootOutOfBox,
            nvidiaExperience: distro?.nvidiaExperience,
            suitableForOldHardware: distro?.suitableForOldHardware,
            isBeginnerFriendly: distro?.installerExperience === "GUI" && distro?.maintenanceStyle === "LOW_FRICTION",
        };
    };

    const presentExcluded = (result: CompatibilityResult): PresentedDistro => {
        const distro = distrosById.get(result.distroId);
        return {
            distroId: result.distroId,
            name: distro?.name ?? result.distroId,
            description: distro?.description,
            imageUrl: distro?.imageUrl ?? undefined,
            websiteUrl: distro?.websiteUrl ?? undefined,
            documentationUrl: distro?.documentationUrl ?? undefined,
            forumUrl: distro?.forumUrl ?? undefined,
            downloadUrl: distro?.downloadUrl ?? undefined,
            testDriveUrl: distro?.testDriveUrl ?? undefined,
            includedBecause: [],
            excludedBecause: renderExclusionReasons(result.excludedBecause, t),
            matchedConstraints: [],
            releaseModel: distro?.releaseModel,
            supportedDesktops: distro?.supportedDesktops,
            gamingSupport: distro?.gamingSupport,
            packageManager: distro?.packageManager,
            initSystem: distro?.initSystem,
            installerExperience: distro?.installerExperience,
            maintenanceStyle: distro?.maintenanceStyle,
            proprietarySupport: distro?.proprietarySupport,
            privacyPosture: distro?.privacyPosture,
            secureBootOutOfBox: distro?.secureBootOutOfBox,
            nvidiaExperience: distro?.nvidiaExperience,
            suitableForOldHardware: distro?.suitableForOldHardware,
            isBeginnerFriendly: distro?.installerExperience === "GUI" && distro?.maintenanceStyle === "LOW_FRICTION",
        };
    };

    return {
        compatible: compatibleShown.map(presentCompatible),
        excluded: excludedAll.map(presentExcluded),
        compatibleTotal: compatibleAll.length,
        compatibleShown: compatibleShown.length,
        activeConstraints,
    };
}

export function filterAndSortResults(
    cards: DistroCardVM[],
    filters: ResultsFilters,
    sort: ResultsSort
): DistroCardVM[] {
    const filtered = cards.filter((card) => {
        if (filters.releaseModel !== "ALL" && card.releaseModel !== filters.releaseModel) return false;
        if (
            filters.desktop !== "ALL" &&
            !(card.supportedDesktops ?? []).includes(filters.desktop)
        ) {
            return false;
        }
        if (filters.gamingSupport !== "ALL" && card.gamingSupport !== filters.gamingSupport) return false;
        if (filters.packageManager !== "ALL" && card.packageManager !== filters.packageManager) return false;
        if (filters.initSystem !== "ALL" && card.initSystem !== filters.initSystem) return false;
        if (
            filters.installerExperience !== "ALL" &&
            card.installerExperience !== filters.installerExperience
        ) {
            return false;
        }
        if (
            filters.maintenanceStyle !== "ALL" &&
            card.maintenanceStyle !== filters.maintenanceStyle
        ) {
            return false;
        }
        if (
            filters.proprietarySupport !== "ALL" &&
            card.proprietarySupport !== filters.proprietarySupport
        ) {
            return false;
        }
        if (filters.privacyPosture !== "ALL" && card.privacyPosture !== filters.privacyPosture) return false;
        if (filters.secureBootOutOfBox === "YES" && card.secureBootOutOfBox !== true) return false;
        if (filters.secureBootOutOfBox === "NO" && card.secureBootOutOfBox !== false) return false;
        if (filters.nvidiaExperience !== "ALL" && card.nvidiaExperience !== filters.nvidiaExperience) return false;
        if (filters.suitableForOldHardware === "YES" && card.suitableForOldHardware !== true) return false;
        if (filters.suitableForOldHardware === "NO" && card.suitableForOldHardware !== false) return false;
        return true;
    });

    return [...filtered].sort((a, b) => {
        if (sort === "NAME_ASC") return a.name.localeCompare(b.name);
        if (sort === "NAME_DESC") return b.name.localeCompare(a.name);

        if (b.strictMatchCount !== a.strictMatchCount) {
            return b.strictMatchCount - a.strictMatchCount;
        }
        if (b.choiceReasonCount !== a.choiceReasonCount) {
            return b.choiceReasonCount - a.choiceReasonCount;
        }
        return a.name.localeCompare(b.name);
    });
}
