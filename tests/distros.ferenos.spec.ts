import { describe, expect, it } from "vitest";
import { DistroSchema } from "../src/data/distro-types";
import distros from "../src/data/distros.json";
import { UserIntentSchema } from "../src/data/types";
import { buildCompatibility } from "../src/engine/compatibility";

describe("Feren OS distro entry", () => {
    const feren = distros.find(d => d.id === "feren_os");

    it("exists in distros.json", () => {
        expect(feren).toBeDefined();
    });

    it("passes Zod schema validation", () => {
        const result = DistroSchema.safeParse(feren);
        expect(result.success).toBe(true);
    });

    it("has correct technical properties", () => {
        expect(feren?.supportedDesktops).toContain("CINNAMON");
        expect(feren?.packageManager).toBe("APT");
        expect(feren?.releaseModel).toBe("FIXED");
    });

    it("is included with a desktop reason when desktopPreference=CINNAMON", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "CINNAMON",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const result = buildCompatibility(intent).find(item => item.distroId === "feren_os");
        expect(result?.compatible).toBe(true);
        expect(result?.includedBecause).toContain("include_desktop_match");
    });

    it("appears alongside linux_mint and lmde as a Cinnamon option", () => {
        const cinnamonDistros = distros.filter(d => d.supportedDesktops.includes("CINNAMON"));
        const ids = cinnamonDistros.map(d => d.id);
        expect(ids).toContain("linux_mint");
        expect(ids).toContain("lmde");
        expect(ids).toContain("feren_os");
    });
});
