import { describe, expect, it } from "vitest";
import distrosData from "../src/data/distros.json";
import { DistroListSchema } from "../src/data/distro-types";
import { UserIntentSchema, type UserIntent } from "../src/data/types";
import { buildResultsPresentation } from "../src/engine/state";

const allDistros = DistroListSchema.parse(distrosData);
const identity = (key: string) => key;

const baseIntent = (overrides: Partial<UserIntent> = {}): UserIntent =>
    UserIntentSchema.parse({
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
        ...overrides,
    });

const rank = (intent: UserIntent) =>
    buildResultsPresentation(intent, allDistros, { limit: Number.MAX_SAFE_INTEGER, showAll: true }, identity);

describe("result ordering contract", () => {
    it("never invents a distro and never scores one", () => {
        const presentation = rank(baseIntent());
        const ids = presentation.compatible.map((item) => item.distroId);
        expect(new Set(ids).size).toBe(ids.length);
        ids.forEach((id) => expect(allDistros.some((distro) => distro.id === id)).toBe(true));
        expect(presentation.compatible.every((item) => !("score" in item))).toBe(true);
    });

    it("orders by matched stated constraints, then by matched stated preferences, then by name", () => {
        const intent = baseIntent({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            desktopPreference: "GNOME",
            releaseModel: "FIXED",
            initSystem: "SYSTEMD",
            packageManager: "APT",
        });
        const presentation = rank(intent);
        const keys = presentation.compatible.map((item) => ({
            strict: item.matchedConstraints.length,
            preferences: item.includedBecause.filter((reason) => reason !== "include_meets_requirements").length,
            name: item.name,
        }));

        keys.forEach((key, index) => {
            const next = keys[index + 1];
            if (!next) return;
            if (key.strict !== next.strict) {
                expect(key.strict).toBeGreaterThan(next.strict);
                return;
            }
            if (key.preferences !== next.preferences) {
                expect(key.preferences).toBeGreaterThan(next.preferences);
                return;
            }
            expect(key.name.localeCompare(next.name)).toBeLessThanOrEqual(0);
        });

        const ubuntu = keys.find((key) => new Set(presentation.compatible.map((item) => item.name)).has("Ubuntu"));
        expect(ubuntu).toBeDefined();
    });

    it("counts a stated preference once, with no weights or half matches", () => {
        const anOpenRcDistro = allDistros.find((item) => item.initSystem === "OPENRC")!;
        const aSystemdDistro = allDistros.find((item) => item.initSystem === "SYSTEMD")!;
        const withoutPreference = rank(baseIntent({ installation: "CLI_OK", maintenance: "TERMINAL_OK" }));
        const withPreference = rank(
            baseIntent({ installation: "CLI_OK", maintenance: "TERMINAL_OK", initSystem: "OPENRC" })
        );

        const countFor = (presentation: ReturnType<typeof rank>, id: string) =>
            (presentation.compatible.find((item) => item.distroId === id)?.includedBecause ?? []).filter(
                (reason) => reason !== "reasons.include_meets_requirements"
            ).length;

        expect(countFor(withoutPreference, anOpenRcDistro.id)).toBe(0);
        expect(countFor(withPreference, anOpenRcDistro.id)).toBe(1);
        expect(countFor(withPreference, aSystemdDistro.id)).toBe(0);
    });

    it("explains every compatible distro with at least one reason", () => {
        const presentation = rank(baseIntent({ desktopPreference: "KDE" }));
        expect(presentation.compatible.length).toBeGreaterThan(0);
        presentation.compatible.forEach((item) => {
            expect(item.includedBecause.length).toBeGreaterThan(0);
        });
    });

    it("explains every exclusion with the rule that fired", () => {
        const presentation = rank(baseIntent({ proprietary: "AVOID", installation: "CLI_OK", maintenance: "TERMINAL_OK" }));
        expect(presentation.excluded.length).toBeGreaterThan(0);
        presentation.excluded.forEach((item) => {
            expect(item.excludedBecause).toContain("reasons.exclude_proprietary_required");
        });
    });

    it("is stable under dataset reordering", () => {
        const intent = baseIntent({ desktopPreference: "XFCE" });
        const shuffled = [...allDistros].reverse();
        const forward = buildResultsPresentation(intent, allDistros, { limit: 100, showAll: true }, identity);
        const backward = buildResultsPresentation(intent, shuffled, { limit: 100, showAll: true }, identity);
        expect(backward.compatible.map((item) => item.distroId)).toEqual(
            forward.compatible.map((item) => item.distroId)
        );
    });

    it("reports a hard conflict instead of relaxing the answer", () => {
        const presentation = rank(baseIntent({ architecture: "arm64", proprietary: "AVOID", secureBootNeeded: true }));
        expect(presentation.compatible).toHaveLength(0);
        expect(presentation.compatibleTotal).toBe(0);
        expect(presentation.hardConstraintConflict).toBe(true);
        expect(presentation.hardConstraintConflictFields.length).toBeGreaterThan(0);
    });
});
