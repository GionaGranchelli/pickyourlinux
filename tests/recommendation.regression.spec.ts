import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "../src/data/questions";
import { UserIntentSchema, type UserIntent } from "../src/data/types";
import { applyPatch } from "../src/engine/logic";
import { buildResultsPresentation, getAllDistros, type PresentedDistro } from "../src/engine/state";

type PersonaSelection = {
    questionId: string;
    optionId: string;
};

type PersonaFixture = {
    id: string;
    name: string;
    topN: number;
    selections: PersonaSelection[];
};

const fixturesDir = resolve(process.cwd(), "tests", "fixtures", "personas");

const baseIntent: UserIntent = UserIntentSchema.parse({
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

const loadPersonas = (): PersonaFixture[] => {
    const files = readdirSync(fixturesDir)
        .filter((file) => file.endsWith(".json"))
        .sort((a, b) => a.localeCompare(b));

    return files.map((file) => {
        const raw = readFileSync(resolve(fixturesDir, file), "utf-8");
        return JSON.parse(raw) as PersonaFixture;
    });
};

const toRankedDistroIds = (intent: UserIntent): string[] => {
    const presentation = buildResultsPresentation(
        intent,
        getAllDistros(),
        { limit: Number.MAX_SAFE_INTEGER, showAll: true },
        (key) => key
    );

    const ranked = [...presentation.compatible].sort((a: PresentedDistro, b: PresentedDistro) => {
        if (b.matchedConstraints.length !== a.matchedConstraints.length) {
            return b.matchedConstraints.length - a.matchedConstraints.length;
        }

        if (b.includedBecause.length !== a.includedBecause.length) {
            return b.includedBecause.length - a.includedBecause.length;
        }

        return a.name.localeCompare(b.name);
    });

    return ranked.map((item) => item.distroId);
};

const applyPersonaSelections = (persona: PersonaFixture): UserIntent => {
    return persona.selections.reduce((intent, selection, index) => {
        const question = ALL_QUESTIONS.find((item) => item.id === selection.questionId);
        if (!question) {
            throw new Error(`Unknown question '${selection.questionId}' in persona '${persona.id}' at index ${index}`);
        }

        const option = question.options.find((item) => item.id === selection.optionId);
        if (!option) {
            throw new Error(`Unknown option '${selection.optionId}' in question '${selection.questionId}' for persona '${persona.id}' at index ${index}`);
        }

        return applyPatch(intent, option.patches);
    }, structuredClone(baseIntent));
};

describe("recommendation regression personas", () => {
    const personas = loadPersonas();

    it("loads persona fixtures", () => {
        expect(personas.length).toBeGreaterThanOrEqual(5);
        expect(personas.length).toBeLessThanOrEqual(8);
    });

    for (const persona of personas) {
        it(`${persona.id}: ${persona.name}`, () => {
            const intent = applyPersonaSelections(persona);
            const rankedIds = toRankedDistroIds(intent).slice(0, persona.topN);

            expect(rankedIds).toMatchSnapshot();
        });
    }
});
