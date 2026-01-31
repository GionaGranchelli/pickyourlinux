import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "../../src/data/questions";
import type { QuestionOption } from "../../src/data/types";
import { useDecisionEngine } from "../../src/engine/state";

const getOption = (questionId: string, optionId: string): QuestionOption => {
    const question = ALL_QUESTIONS.find((q) => q.id === questionId);
    if (!question) throw new Error(`Missing question: ${questionId}`);
    const option = question.options.find((opt) => opt.id === optionId);
    if (!option) throw new Error(`Missing option: ${optionId}`);
    return option;
};

describe("engine/state", () => {
    it("updates visibility when intent changes", () => {
        const engine = useDecisionEngine();
        const armOption: QuestionOption = {
            id: "set_arch_arm64",
            label: "Set architecture",
            patches: [{ op: "set", field: "architecture", value: "arm64" }],
            isDisqualifier: false,
        };

        engine.selectOption("q_purpose", armOption);

        const visibleIds = engine.visibleQuestions.value.map((q) => q.id);
        expect(visibleIds).not.toContain("q_gaming");
    });

    it("tracks answeredIds in selection order", () => {
        const engine = useDecisionEngine();
        const selectedIds: string[] = [];

        while (engine.currentQuestion.value) {
            const question = engine.currentQuestion.value;
            if (!question) break;
            selectedIds.push(question.id);
            engine.selectOption(question.id, question.options[0]);
        }

        expect(engine.answeredIds.value).toEqual(selectedIds);
    });

    it("undo restores intent, progress, and status", () => {
        const engine = useDecisionEngine();
        const purposeOption = getOption("q_purpose", "gaming");
        const privacyOption = getOption("q_privacy", "very_important");

        engine.selectOption("q_purpose", purposeOption);
        engine.selectOption("q_privacy", privacyOption);

        expect(engine.intent.value.tags).toContain("Gaming");
        expect(engine.intent.value.tags).toContain("Privacy");
        expect(engine.answeredIds.value).toEqual(["q_purpose", "q_privacy"]);

        engine.undo();

        expect(engine.intent.value.tags).toEqual(["Gaming"]);
        expect(engine.answeredIds.value).toEqual(["q_purpose"]);
        expect(engine.status.value).toBe("IN_PROGRESS");
    });

    it("handles disqualifier behavior", () => {
        const engine = useDecisionEngine();

        const disqualifyOption: QuestionOption = {
            id: "disq",
            label: "Stop",
            patches: [{ op: "set", field: "minRam", value: 16 }],
            isDisqualifier: true,
        };

        engine.selectOption("q_purpose", disqualifyOption);

        expect(engine.status.value).toBe("DISQUALIFIED");
        expect(engine.intent.value.minRam).toBe(4);
        expect(engine.disqualifyReason.value).toBe("Stop");
        expect(engine.answeredIds.value).toEqual(["q_purpose"]);
    });

    it("detects completion when no visible questions remain", () => {
        const engine = useDecisionEngine();

        while (engine.currentQuestion.value) {
            const question = engine.currentQuestion.value;
            if (!question) break;
            engine.selectOption(question.id, question.options[0]);
        }

        void engine.currentQuestion.value;

        expect(engine.status.value).toBe("COMPLETED");
        expect(engine.isComplete.value).toBe(true);
    });
});
