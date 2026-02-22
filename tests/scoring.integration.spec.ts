import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "../src/data/types";
import { getDistros } from "../src/engine/eliminate";
import { applyHardConstraints, applySoftScoring } from "../src/engine/scoring";

const allDistros = getDistros();

describe("Scoring Integration", () => {
    it("Persona 1: Beginner, gaming, NVIDIA, no strong preferences", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: ["Gaming"],
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "NVIDIA",
            nvidiaTolerance: "WANT_EASY",
        });

        const { filteredDistros } = applyHardConstraints(allDistros, intent);
        const scored = applySoftScoring(filteredDistros, intent);
        
        const top3Ids = scored.slice(0, 3).map(s => s.distro.id);
        // Expect gaming/nvidia focused distros like Pop!_OS, Nobara, Bazzite
        expect(top3Ids.some(id => ["pop_os", "nobara", "bazzite"].includes(id))).toBe(true);
    });

    it("Persona 2: Advanced, proprietary=AVOID (hard), initSystem=OPENRC (soft)", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "AVOID",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "ADVANCED",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "OPENRC",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros } = applyHardConstraints(allDistros, intent);
        // Proprietary AVOID should filter out Ubuntu, Pop!_OS, etc.
        expect(filteredDistros.some(d => d.id === "ubuntu")).toBe(false);
        
        const scored = applySoftScoring(filteredDistros, intent);
        const top1 = scored[0];
        // Alpine or Gentoo should score high due to OPENRC
        expect(["alpine", "gentoo", "artix"].includes(top1.distro.id)).toBe(true);
    });

    it("Persona 4: Impossible combination: architecture=arm64 (hard) + secureBootNeeded=true (hard) + proprietary=AVOID (hard)", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "AVOID",
            architecture: "arm64",
            minRam: 4,
            tags: [],
            experience: "ADVANCED",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: true,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        expect(filteredDistros.length).toBe(0);
        expect(conflictFields).toContain("architecture");
        expect(conflictFields).toContain("secureBootNeeded");
        expect(conflictFields).toContain("proprietary");
    });

    it("Persona 5: Advanced, initSystem=RUNIT (soft), packageManager=APT (soft)", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "ADVANCED",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "RUNIT",
            packageManager: "APT",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros } = applyHardConstraints(allDistros, intent);
        const scored = applySoftScoring(filteredDistros, intent);
        
        // This combination doesn't exist exactly (RUNIT distros use XBPS or other pkg managers)
        // But it should NOT return 0 results. It should return distros matching ONE of them.
        expect(scored.length).toBeGreaterThan(0);
        // Void Linux should be high because of RUNIT match
        expect(scored[0].distro.id).toBe("void_linux");
        expect(scored[0].matchedPreferences.some(m => m.field === "initSystem")).toBe(true);
        expect(scored[0].missedPreferences.some(m => m.field === "packageManager")).toBe(true);
    });
});
