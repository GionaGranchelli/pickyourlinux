import { describe, expect, it } from "vitest";
import { UserIntentSchema, type UserIntent } from "../src/data/types";
import { eliminateDistros, excludedAxes, getDistros } from "../src/engine/eliminate";

const allDistros = getDistros();

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

const survivors = (intent: UserIntent) => eliminateDistros(intent).filter((result) => result.included);

describe("eliminateDistros — the single survival authority", () => {
    it("keeps every distro when the user stated no hard constraint", () => {
        const intent = baseIntent({ installation: "CLI_OK", maintenance: "TERMINAL_OK" });
        expect(survivors(intent).length).toBe(allDistros.length);
    });

    it("keeps only GUI installers when the user asked for a GUI", () => {
        const intent = baseIntent();
        const kept = survivors(intent);
        expect(kept.length).toBeLessThan(allDistros.length);
        kept.forEach((result) => {
            const distro = allDistros.find((item) => item.id === result.distroId);
            expect(distro?.installerExperience).toBe("GUI");
        });
    });

    it("excludes every non-NONE distro when proprietary=AVOID", () => {
        const intent = baseIntent({ installation: "CLI_OK", maintenance: "TERMINAL_OK", proprietary: "AVOID" });
        const kept = survivors(intent);
        const strictDistros = allDistros.filter((distro) => distro.proprietarySupport === "NONE");
        expect(kept.length).toBe(strictDistros.length);
        kept.forEach((result) => {
            const distro = allDistros.find((item) => item.id === result.distroId);
            expect(distro?.proprietarySupport).toBe("NONE");
        });
    });

    it("excludes distros without Secure Boot when the user needs it", () => {
        const intent = baseIntent({ secureBootNeeded: true, installation: "CLI_OK", maintenance: "TERMINAL_OK" });
        const kept = survivors(intent);
        const expected = allDistros.filter((distro) => distro.secureBootOutOfBox);
        expect(kept.length).toBe(expected.length);
        kept.forEach((result) => {
            const distro = allDistros.find((item) => item.id === result.distroId);
            expect(distro?.secureBootOutOfBox).toBe(true);
        });
    });

    it("excludes distros that cannot run on arm64 when the user has ARM hardware", () => {
        const intent = baseIntent({ architecture: "arm64", installation: "CLI_OK", maintenance: "TERMINAL_OK" });
        const kept = survivors(intent);
        const expected = allDistros.filter((distro) => distro.supportedArchitectures.includes("arm64"));
        expect(kept.length).toBe(expected.length);
        kept.forEach((result) => {
            const distro = allDistros.find((item) => item.id === result.distroId);
            expect(distro?.supportedArchitectures).toContain("arm64");
        });
    });

    // Regression guard for the removed low-coverage heuristic: a stated constraint must
    // never be silently downgraded because the dataset happens to be small.
    it("never relaxes a stated constraint when few distros match it", () => {
        const intent = baseIntent({ installation: "CLI_OK", maintenance: "TERMINAL_OK", proprietary: "AVOID" });
        const strictCount = allDistros.filter((distro) => distro.proprietarySupport === "NONE").length;
        const kept = survivors(intent);
        expect(strictCount).toBeLessThan(allDistros.length / 4);
        expect(kept.length).toBe(strictCount);
        expect(kept.length).toBeGreaterThan(0);
    });

    it("returns no survivor and names the axes for an impossible combination", () => {
        const intent = baseIntent({
            architecture: "arm64",
            proprietary: "AVOID",
            secureBootNeeded: true,
        });
        const results = eliminateDistros(intent);
        expect(results.every((result) => !result.included)).toBe(true);
        const axes = excludedAxes(results);
        expect(axes).toContain("architecture");
        expect(axes).toContain("proprietary");
        expect(axes).toContain("secureBootNeeded");
    });

    it("does not filter on stated preferences (init system, package manager, release model)", () => {
        const intent = baseIntent({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            desktopPreference: "KDE",
            releaseModel: "ROLLING",
            initSystem: "OPENRC",
            packageManager: "PACMAN",
        });
        expect(survivors(intent).length).toBe(allDistros.length);
    });
});
