import { describe, expect, it } from "vitest";
import { DistroSchema } from "../src/data/distro-types";
import distros from "../src/data/distros.json";
import { UserIntentSchema } from "../src/data/types";
import { eliminateDistros } from "../src/engine/eliminate";
import { buildCompatibility } from "../src/engine/compatibility";
import { buildResultsPresentation } from "../src/engine/state";
import { DistroListSchema } from "../src/data/distro-types";

describe("Artix Linux distro entry", () => {
    const artix = distros.find(d => d.id === "artix");

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

    it("is the only Artix entry in the dataset", () => {
        const artixEntries = distros.filter(d => d.name === "Artix Linux");
        expect(artixEntries).toHaveLength(1);
        expect(artixEntries[0].id).toBe("artix");
    });

    it("matches an OPENRC preference with a stated reason", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "TERMINAL_OK",
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

        const presentation = buildResultsPresentation(
            intent,
            DistroListSchema.parse(distros),
            { limit: Number.MAX_SAFE_INTEGER, showAll: true },
            (key) => key
        );
        const presented = presentation.compatible.find(item => item.distroId === "artix");
        expect(presented).toBeDefined();
        expect(presented!.includedBecause).toContain("reasons.include_init_system_match");
    });

    it("is excluded when proprietary=AVOID because proprietarySupport=OPTIONAL", () => {
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

        const result = eliminateDistros(intent).find(item => item.distroId === "artix");
        expect(result?.included).toBe(false);
        expect(result?.excludedBecause).toContain("exclude_proprietary_required");

        const compatibility = buildCompatibility(intent).find(item => item.distroId === "artix");
        expect(compatibility?.compatible).toBe(false);
    });
});
