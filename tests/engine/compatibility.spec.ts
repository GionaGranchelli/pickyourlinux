import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "../../src/data/types";
import { buildCompatibility } from "../../src/engine/compatibility";

const getResult = (results: ReturnType<typeof buildCompatibility>, distroId: string) => {
    const result = results.find((item) => item.distroId === distroId);
    if (!result) throw new Error(`Missing result for ${distroId}`);
    return result;
};

describe("compatibility engine", () => {
    it("handles 'just work' expectations", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "REQUIRED",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
        });

        const results = buildCompatibility(intent);
        const arch = getResult(results, "arch");
        const trisquel = getResult(results, "trisquel");

        expect(arch.compatible).toBe(false);
        expect(arch.excludedBecause).toContain("exclude_installer_manual");

        expect(trisquel.compatible).toBe(false);
        expect(trisquel.excludedBecause).toContain("exclude_proprietary_missing");
    });

    it("handles old hardware constraints", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: ["OldHardware"],
        });

        const results = buildCompatibility(intent);
        const ubuntu = getResult(results, "ubuntu");
        const mint = getResult(results, "linux_mint");

        expect(ubuntu.compatible).toBe(false);
        expect(ubuntu.excludedBecause).toContain("exclude_old_hardware_unsuitable");

        expect(mint.compatible).toBe(true);
        expect(mint.includedBecause).toContain("include_old_hardware_suitable");
    });

    it("handles privacy with convenience", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: ["Privacy"],
        });

        const results = buildCompatibility(intent);
        const trisquel = getResult(results, "trisquel");
        const arch = getResult(results, "arch");

        expect(trisquel.compatible).toBe(true);
        expect(trisquel.includedBecause).toContain("include_privacy_strong");

        expect(arch.compatible).toBe(false);
        expect(arch.excludedBecause).toContain("exclude_installer_manual");
    });
});
