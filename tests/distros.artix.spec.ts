import { describe, expect, it } from "vitest";
import { DistroSchema } from "../src/data/distro-types";
import distros from "../src/data/distros.json";
import { UserIntentSchema } from "../src/data/types";
import { applyHardConstraints, applySoftScoring } from "../src/engine/scoring";

describe("Artix Linux distro entry", () => {
    const artix = distros.find(d => d.id === "artix_linux");

    it("exists in distros.json", () => {
        expect(artix).toBeDefined();
    });

    it("passes Zod schema validation", () => {
        const result = DistroSchema.safeParse(artix);
        expect(result.success).toBe(true);
    });

    it("has correct technical properties", () => {
        expect(artix?.initSystem).toBe("OPENRC");
        expect(artix?.packageManager).toBe("PACMAN");
        expect(artix?.releaseModel).toBe("ROLLING");
        expect(artix?.maintenanceStyle).toBe("HANDS_ON");
    });

    it("appears in soft scoring results when initSystem=OPENRC preference is active", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
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

        const scored = applySoftScoring([artix as any], intent);
        expect(scored[0].score).toBeGreaterThan(0);
        expect(scored[0].matchedPreferences.some(m => m.field === "initSystem" && m.preferred === "OPENRC")).toBe(true);
    });

    it("does NOT appear when hard constraint proprietary=AVOID is active and proprietarySupport=OPTIONAL", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "AVOID",
            architecture: "x86_64",
            minRam: 4,
            tags: [],
            experience: "ADVANCED",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const { filteredDistros } = applyHardConstraints([artix as any], intent);
        expect(filteredDistros.length).toBe(0);
    });
});
