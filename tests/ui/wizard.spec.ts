import { describe, expect, it } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import QuestionWizard from "../../src/components/QuestionWizard.vue";
import { useDecisionEngine } from "../../src/engine/state";

const renderWizard = async (engine: ReturnType<typeof useDecisionEngine>) => {
    const app = createSSRApp({
        render: () => h(QuestionWizard, { engine }),
    });

    return renderToString(app);
};

describe("QuestionWizard wiring", () => {
    it("renders first question, advances on selection, and supports undo", async () => {
        const engine = useDecisionEngine();
        const firstQuestion = engine.currentQuestion.value;

        if (!firstQuestion) throw new Error("Missing first question");

        let html = await renderWizard(engine);
        expect(html).toContain(firstQuestion.text);

        engine.selectOptionById(firstQuestion.options[0].id);
        const nextQuestion = engine.currentQuestion.value;
        if (!nextQuestion) throw new Error("Missing next question");

        html = await renderWizard(engine);
        expect(html).toContain(nextQuestion.text);

        engine.undo();
        html = await renderWizard(engine);
        expect(html).toContain(firstQuestion.text);
    });
});
