import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "../src/data/types";
import { getDistros } from "../src/engine/eliminate";
import { applyHardConstraints } from "../src/engine/scoring";

const allDistros = getDistros();

describe("applyHardConstraints", () => {
    it("returns all distros when no hard constraints are active", () => {
        const intent = UserIntentSchema.parse({
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

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        expect(filteredDistros.length).toBe(allDistros.length);
        expect(conflictFields).toEqual([]);
    });

    it("filters out distros that include proprietary software when proprietary=AVOID", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "AVOID",
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

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        expect(filteredDistros.length).toBeLessThan(allDistros.length);
        filteredDistros.forEach((d) => {
            expect(d.proprietarySupport).toBe("NONE");
        });
        expect(conflictFields).toEqual([]);
    });

    it("filters out distros without secureBootOutOfBox when secureBootNeeded=true", () => {
        const intent = UserIntentSchema.parse({
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
            secureBootNeeded: true,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        expect(filteredDistros.length).toBeLessThan(allDistros.length);
        filteredDistros.forEach((d) => {
            expect(d.secureBootOutOfBox).toBe(true);
        });
        expect(conflictFields).toEqual([]);
    });

    it("filters out distros that do not support arm64 when architecture=arm64", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "arm64",
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

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        expect(filteredDistros.length).toBeLessThan(allDistros.length);
        filteredDistros.forEach((d) => {
            expect(d.supportedArchitectures).toContain("arm64");
        });
        expect(conflictFields).toEqual([]);
    });

    it("returns empty array when no distro satisfies all hard constraints", () => {
        // Impossible combo: arm64 + secureBootNeeded=true (since no ARM distro currently has secureBootOutOfBox=true in our data)
        // Let's verify our data first. 
        const armDistros = allDistros.filter(d => d.supportedArchitectures.includes("arm64"));
        const armWithSecureBoot = armDistros.filter(d => d.secureBootOutOfBox);
        
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "arm64",
            minRam: 4,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: true,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        if (armWithSecureBoot.length === 0) {
            expect(filteredDistros.length).toBe(0);
            expect(conflictFields).toContain("architecture");
            expect(conflictFields).toContain("secureBootNeeded");
        } else {
            // If we added ARM distros with secure boot, this test case needs to change
            expect(filteredDistros.length).toBe(armWithSecureBoot.length);
        }
    });

    it("does NOT filter on soft preference fields (initSystem, packageManager, releaseModel)", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "KDE",
            releaseModel: "ROLLING",
            initSystem: "OPENRC",
            packageManager: "PACMAN",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros, conflictFields } = applyHardConstraints(allDistros, intent);
        expect(filteredDistros.length).toBe(allDistros.length); // Should still be all
        expect(conflictFields).toEqual([]);
    });
});
