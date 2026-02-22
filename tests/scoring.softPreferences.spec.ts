import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "../src/data/types";
import { getDistros } from "../src/engine/eliminate";
import { applySoftScoring } from "../src/engine/scoring";

const allDistros = getDistros();

describe("applySoftScoring", () => {
    it("returns all input distros — never removes any", () => {
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

        const scored = applySoftScoring(allDistros, intent);
        expect(scored.length).toBe(allDistros.length);
    });

    it("scores distros with more preference matches higher", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "GNOME",
            releaseModel: "FIXED",
            initSystem: "SYSTEMD",
            packageManager: "APT",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const scored = applySoftScoring(allDistros, intent);
        const ubuntu = scored.find(s => s.distro.id === "ubuntu");
        const gentoo = scored.find(s => s.distro.id === "gentoo");

        expect(ubuntu!.score).toBeGreaterThan(gentoo!.score);
        expect(scored[0].score).toBeGreaterThanOrEqual(scored[scored.length - 1].score);
    });

    it("ignores NO_PREFERENCE values in scoring", () => {
        const intent1 = UserIntentSchema.parse({
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

        const scored1 = applySoftScoring(allDistros, intent1);
        const maxScore1 = scored1[0].maxPossibleScore;

        const intent2 = { ...intent1, desktopPreference: "GNOME" };
        const scored2 = applySoftScoring(allDistros, intent2 as any);
        const maxScore2 = scored2[0].maxPossibleScore;

        expect(maxScore2).toBeGreaterThan(maxScore1);
    });

    it("populates matchedPreferences and missedPreferences correctly", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "GNOME",
            releaseModel: "ROLLING",
            initSystem: "SYSTEMD",
            packageManager: "PACMAN",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const scored = applySoftScoring(allDistros, intent);
        const ubuntu = scored.find(s => s.distro.id === "ubuntu");

        // Ubuntu: GNOME (match), FIXED (miss), SYSTEMD (match), APT (miss)
        const matchedFields = ubuntu!.matchedPreferences.map(m => m.field);
        const missedFields = ubuntu!.missedPreferences.map(m => m.field);

        expect(matchedFields).toContain("desktopPreference");
        expect(matchedFields).toContain("initSystem");
        expect(missedFields).toContain("releaseModel");
        expect(missedFields).toContain("packageManager");
    });
});
