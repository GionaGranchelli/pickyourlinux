import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import distrosData from "../src/data/distros.json";
import { DistroListSchema, type Distro } from "../src/data/distro-types";
import { ALL_QUESTIONS } from "../src/data/questions";
import { UserIntentSchema, type UserIntent } from "../src/data/types";
import { applyPatch } from "../src/engine/logic";
import { buildResultsPresentation } from "../src/engine/state";

const allDistros = DistroListSchema.parse(distrosData);
const identity = (key: string) => key;
const fixtureDir = resolve(process.cwd(), "tests", "fixtures", "personas");

/**
 * Independent oracle: everything the user explicitly asked for. Deliberately written
 * from the answers, not from the engine, so the engine cannot mark its own homework.
 */
const unmetAnswers = (distro: Distro, intent: UserIntent): string[] => {
    const unmet: string[] = [];
    if (intent.architecture === "arm64" && !distro.supportedArchitectures.includes("arm64")) unmet.push("architecture");
    if (intent.installation === "GUI" && distro.installerExperience !== "GUI") unmet.push("installation");
    if (intent.maintenance === "NO_TERMINAL" && distro.maintenanceStyle !== "LOW_FRICTION") unmet.push("maintenance");
    if (intent.proprietary === "AVOID" && distro.proprietarySupport !== "NONE") unmet.push("proprietary");
    if (intent.proprietary === "REQUIRED" && distro.proprietarySupport === "NONE") unmet.push("proprietaryRequired");
    if (intent.tags.includes("OldHardware") && !distro.suitableForOldHardware) unmet.push("oldHardware");
    if (intent.secureBootNeeded === true && !distro.secureBootOutOfBox) unmet.push("secureBoot");
    if (intent.gpu === "NVIDIA" && intent.nvidiaTolerance === "WANT_EASY" && distro.nvidiaExperience === "HARD") {
        unmet.push("nvidiaEasy");
    }
    if (
        intent.gpu === "NVIDIA" &&
        intent.proprietary === "AVOID" &&
        (distro.nvidiaExperience === "GOOD" || distro.nvidiaExperience === "OK")
    ) {
        unmet.push("nvidiaProprietary");
    }
    return unmet;
};

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

const personaIntents = (): UserIntent[] =>
    readdirSync(fixtureDir)
        .filter((file) => file.endsWith(".json"))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => {
            const persona = JSON.parse(readFileSync(resolve(fixtureDir, file), "utf-8")) as {
                selections: { questionId: string; optionId: string }[];
            };
            return persona.selections.reduce((intent, selection) => {
                const question = ALL_QUESTIONS.find((item) => item.id === selection.questionId);
                if (!question) throw new Error(`Unknown question ${selection.questionId}`);
                const option = question.options.find((item) => item.id === selection.optionId);
                if (!option) throw new Error(`Unknown option ${selection.optionId}`);
                return applyPatch(intent, option.patches);
            }, structuredClone(baseIntent));
        });

/** Deterministic sweep across the answers that drive survival. */
const sweepIntents = (): UserIntent[] => {
    const intents: UserIntent[] = [];
    const installations: UserIntent["installation"][] = ["GUI", "CLI_OK"];
    const maintenances: UserIntent["maintenance"][] = ["NO_TERMINAL", "TERMINAL_OK"];
    const proprietaries: UserIntent["proprietary"][] = ["AVOID", "OPTIONAL", "REQUIRED"];
    const secureBoots: (boolean | null)[] = [true, null];
    const architecture: UserIntent["architecture"][] = ["x86_64", "arm64"];
    const tagSets: UserIntent["tags"][] = [[], ["OldHardware"], ["Privacy"], ["Gaming"], ["Server"]];

    for (const installation of installations) {
        for (const maintenance of maintenances) {
            for (const proprietary of proprietaries) {
                for (const secureBootNeeded of secureBoots) {
                    for (const arch of architecture) {
                        for (const tags of tagSets) {
                            intents.push({ ...structuredClone(baseIntent), installation, maintenance, proprietary, secureBootNeeded, architecture: arch, tags });
                        }
                    }
                }
            }
        }
    }
    return intents;
};

const present = (intent: UserIntent, distros: Distro[] = allDistros) =>
    buildResultsPresentation(intent, distros, { limit: Number.MAX_SAFE_INTEGER, showAll: true }, identity);

const intents = [...personaIntents(), ...sweepIntents()];

describe("result contract", () => {
    it("sweeps a meaningful number of answer combinations", () => {
        expect(sweepIntents().length).toBeGreaterThanOrEqual(100);
    });

    it("no result ever violates an answer the user gave", () => {
        intents.forEach((intent) => {
            present(intent).compatible.forEach((item) => {
                const distro = allDistros.find((candidate) => candidate.id === item.distroId)!;
                expect(unmetAnswers(distro, intent)).toEqual([]);
            });
        });
    });

    it("keeps exactly the distros that satisfy every stated answer", () => {
        intents.forEach((intent) => {
            const expected = allDistros.filter((distro) => unmetAnswers(distro, intent).length === 0).map((d) => d.id);
            const actual = present(intent).compatible.map((item) => item.distroId);
            expect([...actual].sort()).toEqual([...expected].sort());
        });
    });

    it("explains every entry, kept or dropped", () => {
        intents.forEach((intent) => {
            const presentation = present(intent);
            presentation.compatible.forEach((item) => {
                expect(item.includedBecause.length).toBeGreaterThan(0);
            });
            presentation.excluded.forEach((item) => {
                expect(item.excludedBecause.length).toBeGreaterThan(0);
            });
        });
    });

    it("reports a hard conflict exactly when nothing survives", () => {
        intents.forEach((intent) => {
            const presentation = present(intent);
            expect(presentation.hardConstraintConflict).toBe(presentation.compatible.length === 0);
            if (presentation.hardConstraintConflict) {
                expect(presentation.hardConstraintConflictFields.length).toBeGreaterThan(0);
            }
        });
    });

    it("is deterministic and independent of dataset order", () => {
        const reversed = [...allDistros].reverse();
        intents.slice(0, 24).forEach((intent) => {
            const forward = present(intent).compatible.map((item) => item.distroId);
            expect(present(intent).compatible.map((item) => item.distroId)).toEqual(forward);
            expect(present(intent, reversed).compatible.map((item) => item.distroId)).toEqual(forward);
        });
    });

    it("never relaxes a stated answer to keep the list non-empty", () => {
        const strict = present({
            ...structuredClone(baseIntent),
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "AVOID",
        });
        const strictCount = allDistros.filter((distro) => distro.proprietarySupport === "NONE").length;
        expect(strict.compatible.length).toBe(strictCount);
        expect(strict.compatible.length).toBeLessThan(allDistros.length);
    });
});
