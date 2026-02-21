import { describe, expect, it } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import QuestionWizard from "../../src/components/QuestionWizard.vue";
import { useDecisionEngine } from "../../src/engine/state";
import {createI18n} from "vue-i18n";
import en from "../../i18n/locales/en.json";

const renderWizard = async (engine: ReturnType<typeof useDecisionEngine>) => {
    const app = createSSRApp({
        render: () => h(QuestionWizard, { engine }),
    });

    const i18n = createI18n({
        legacy: false,
        locale: "en",
        globalInjection: true,
        messages: {
            en,
        },
    } as any);

    app.use(i18n);
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
