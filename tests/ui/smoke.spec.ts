import { describe, expect, it } from "vitest";
import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createI18n } from "vue-i18n";
import en from "../../i18n/locales/en.json";
import ResultsShortlist from "../../src/components/ResultsShortlist.vue";
import ReviewAnswersDrawer from "../../src/components/ReviewAnswersDrawer.vue";
import DisqualifiedCard from "../../src/components/DisqualifiedCard.vue";
import { ALL_QUESTIONS } from "../../src/data/questions";
import { useDecisionEngine, type DistroCardVM } from "../../src/engine/state";

const renderComponent = async (component: any, props: Record<string, unknown>) => {
  const app = createSSRApp({
    render: () => h(component, props),
  });

  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {
      en,
    },
  } as any);

  app.use(i18n);

  return renderToString(app);
};

const t = (key: string) => {
  const keys = key.split(".");
  let value: any = en;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  return value;
};

const answerAll = (engine: ReturnType<typeof useDecisionEngine>) => {
  while (engine.currentQuestion.value) {
    const question = engine.currentQuestion.value;
    if (!question) break;
    const dataQuestion = ALL_QUESTIONS.find((q) => q.id === question.id);
    if (!dataQuestion) throw new Error(`Missing question ${question.id}`);
    const option = dataQuestion.options.find((opt) => !opt.isDisqualifier) ?? dataQuestion.options[0];
    engine.selectOption(question.id, option);
  }
};

describe("UI smoke", () => {
  it("completes a basic flow and renders a shortlist", async () => {
    const engine = useDecisionEngine(t);
    answerAll(engine);

    expect(engine.status.value).toBe("COMPLETED");
    expect(engine.resultsVM.value.shortlist.length > 0).toBe(true);

    const html = await renderComponent(ResultsShortlist, {
      shortlist: engine.resultsVM.value.shortlist,
      all: engine.resultsVM.value.allCompatible,
      isExpanded: false,
      onToggle: () => {},
      distrosToCompare: [],
    });

    expect(html).toContain(en.results.distroCard.compatible);
  });

  it("renders review drawer with answers", async () => {
    const engine = useDecisionEngine(t);
    const firstQuestion = ALL_QUESTIONS[0];
    engine.selectOption(firstQuestion.id, firstQuestion.options[0]);

    const html = await renderComponent(ReviewAnswersDrawer, {
      open: true,
      answers: engine.answersVM.value,
      onClose: () => {},
      onJumpTo: () => {},
    });

    expect(html).toContain(en.reviewAnswers.title);
    expect(html).toContain(t(firstQuestion.text));
  });

  it("supports undo in the decision engine", () => {
    const engine = useDecisionEngine(t);
    const firstQuestion = engine.currentQuestion.value;
    if (!firstQuestion) throw new Error("Missing first question");

    const firstOption = firstQuestion.options.find((opt) => !opt.isDisqualifier) ?? firstQuestion.options[0];
    engine.selectOption(firstQuestion.id, firstOption);

    const secondQuestion = engine.currentQuestion.value;
    if (!secondQuestion) throw new Error("Missing second question");
    const secondOption = secondQuestion.options.find((opt) => !opt.isDisqualifier) ?? secondQuestion.options[0];
    engine.selectOption(secondQuestion.id, secondOption);

    expect(engine.answeredIds.value.length).toBe(2);
    engine.undo();
    expect(engine.answeredIds.value.length).toBe(1);
    expect(engine.answeredIds.value[0]).toBe(firstQuestion.id);
  });

  it("shows the toggle when more compatible distros are available", async () => {
    const sample: DistroCardVM[] = [
      { id: "a", name: "A", reasonsIncluded: [], reasonsFriction: [], strictMatchCount: 0, choiceReasonCount: 0 },
      { id: "b", name: "B", reasonsIncluded: [], reasonsFriction: [], strictMatchCount: 0, choiceReasonCount: 0 },
      { id: "c", name: "C", reasonsIncluded: [], reasonsFriction: [], strictMatchCount: 0, choiceReasonCount: 0 },
      { id: "d", name: "D", reasonsIncluded: [], reasonsFriction: [], strictMatchCount: 0, choiceReasonCount: 0 },
    ];

    const html = await renderComponent(ResultsShortlist, {
      shortlist: sample.slice(0, 2),
      all: sample,
      isExpanded: false,
      onToggle: () => {},
      distrosToCompare: [],
    });

    expect(html).toContain(en.results.showAll);
  });

  it("renders disqualified card", async () => {
    const html = await renderComponent(DisqualifiedCard, {
      onRestart: () => {},
    });

    expect(html).toContain(en.disqualified.title);
  });
});
