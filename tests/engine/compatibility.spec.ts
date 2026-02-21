import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "../../src/data/types";
import { buildCompatibility } from "../../src/engine/compatibility";
import { getDistros } from "../../src/engine/eliminate";

const getResult = (results: ReturnType<typeof buildCompatibility>, distroId: string) => {
    const result = results.find((item) => item.distroId === distroId);
    if (!result) throw new Error(`Missing result for ${distroId}`);
    return result;
};

describe("compatibility engine", () => {
    it("keeps non-matching distros when a hard preference has low coverage", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
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

        // Secure Boot matches are >3 today, so force a higher threshold to validate soft behavior.
        const results = buildCompatibility(intent, { lowCoverageThreshold: 20 });
        const fedora = getResult(results, "fedora");
        const mint = getResult(results, "linux_mint");

        expect(fedora.compatible).toBe(true);
        expect(fedora.includedBecause).toContain("include_secure_boot_supported");
        expect(mint.compatible).toBe(true);
        expect(mint.excludedBecause).not.toContain("exclude_secure_boot_unavailable");
    });

    it("handles 'just work' expectations", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "REQUIRED",
            architecture: "x86_64",
            minRam: 8,
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
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
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
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const trisquel = getResult(results, "trisquel");
        const arch = getResult(results, "arch");

        expect(trisquel.compatible).toBe(true);
        expect(trisquel.includedBecause).toContain("include_privacy_strong");

        expect(arch.compatible).toBe(false);
        expect(arch.excludedBecause).toContain("exclude_installer_manual");
    });

    it("excludes distros without secure boot when required", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
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

        const results = buildCompatibility(intent);
        const distrosById = new Map(getDistros().map((distro) => [distro.id, distro]));
        const compatible = results.filter((item) => item.compatible);
        const excludedForSecureBoot = results.filter(
            (item) =>
                !item.compatible &&
                item.excludedBecause.includes("exclude_secure_boot_unavailable")
        );
        const mint = getResult(results, "linux_mint");

        expect(compatible.length).toBeGreaterThan(0);
        compatible.forEach((item) => {
            expect(distrosById.get(item.distroId)?.secureBootOutOfBox).toBe(true);
        });
        expect(excludedForSecureBoot.length).toBeGreaterThan(0);
        expect(mint.compatible).toBe(false);
        expect(mint.excludedBecause).toContain("exclude_secure_boot_unavailable");
    });

    it("keeps hard filtering when coverage is at least 3", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
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

        const results = buildCompatibility(intent, { lowCoverageThreshold: 3 });
        const mint = getResult(results, "linux_mint");

        expect(mint.compatible).toBe(false);
        expect(mint.excludedBecause).toContain("exclude_secure_boot_unavailable");
    });

    it("excludes hard NVIDIA setups when easy NVIDIA is required", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "NVIDIA",
            nvidiaTolerance: "WANT_EASY",
        });

        const results = buildCompatibility(intent);
        const arch = getResult(results, "arch");
        const ubuntu = getResult(results, "ubuntu");

        expect(arch.compatible).toBe(false);
        expect(arch.excludedBecause).toContain("exclude_nvidia_hard");
        expect(ubuntu.compatible).toBe(true);
    });

    it("adds secure boot inclusion reason when secure boot is required", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
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

        const results = buildCompatibility(intent);
        const compatible = results.filter((item) => item.compatible);

        expect(compatible.length).toBeGreaterThan(0);
        compatible.forEach((item) => {
            expect(item.includedBecause).toContain("include_secure_boot_supported");
        });
    });

    it("flags NVIDIA proprietary conflict when proprietary software is avoided", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "AVOID",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "NVIDIA",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const distrosById = new Map(getDistros().map((distro) => [distro.id, distro]));
        const goodOrOkNvidia = results.filter((item) => {
            const distro = distrosById.get(item.distroId);
            return distro?.nvidiaExperience === "GOOD" || distro?.nvidiaExperience === "OK";
        });

        expect(goodOrOkNvidia.length).toBeGreaterThan(0);
        goodOrOkNvidia.forEach((item) => {
            expect(item.compatible).toBe(false);
            expect(item.excludedBecause).toContain("exclude_nvidia_proprietary_required");
        });
    });

    it("adds desktop preference reasons without excluding other distros", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "KDE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const kubuntu = getResult(results, "kubuntu");
        const ubuntu = getResult(results, "ubuntu");

        expect(kubuntu.compatible).toBe(true);
        expect(kubuntu.includedBecause).toContain("include_desktop_match");
        expect(ubuntu.compatible).toBe(true);
    });

    it("does not add preference reasons when set to NO_PREFERENCE", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
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

        const results = buildCompatibility(intent);
        const kubuntu = getResult(results, "kubuntu");

        expect(kubuntu.includedBecause).not.toContain("include_desktop_match");
    });

    it("adds immutable preference reason for matching distros", () => {
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
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            immutablePreference: "PREFER_IMMUTABLE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const silverblue = getResult(results, "fedora_silverblue");
        const ubuntu = getResult(results, "ubuntu");

        expect(silverblue.compatible).toBe(true);
        expect(silverblue.includedBecause).toContain("include_immutable_match");
        expect(ubuntu.compatible).toBe(true);
        expect(ubuntu.includedBecause).not.toContain("include_immutable_match");
    });

    it("boosts server-focused distros when server purpose is selected", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: ["Server"],
            experience: "INTERMEDIATE",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            immutablePreference: "NO_PREFERENCE",
            deviceType: "SERVER",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const rocky = getResult(results, "rocky_linux");
        const linuxMint = getResult(results, "linux_mint");

        expect(rocky.compatible).toBe(true);
        expect(rocky.includedBecause).toContain("include_server_use_case_match");
        expect(linuxMint.compatible).toBe(true);
        expect(linuxMint.includedBecause).not.toContain("include_server_use_case_match");
    });

    it("boosts laptop-friendly distros when laptop device type is selected", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            immutablePreference: "NO_PREFERENCE",
            deviceType: "LAPTOP",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const ubuntu = getResult(results, "ubuntu");
        const gentoo = getResult(results, "gentoo");

        expect(ubuntu.compatible).toBe(true);
        expect(ubuntu.includedBecause).toContain("include_laptop_friendly_match");
        expect(gentoo.compatible).toBe(true);
        expect(gentoo.includedBecause).not.toContain("include_laptop_friendly_match");
    });

    it("adds desktop match reason for tiling preference without hard exclusions", () => {
        const intent = UserIntentSchema.parse({
            installation: "CLI_OK",
            maintenance: "TERMINAL_OK",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "ADVANCED",
            desktopPreference: "TILING",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            immutablePreference: "NO_PREFERENCE",
            deviceType: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const arch = getResult(results, "arch");
        const ubuntu = getResult(results, "ubuntu");

        expect(arch.compatible).toBe(true);
        expect(arch.includedBecause).toContain("include_desktop_match");
        expect(ubuntu.compatible).toBe(true);
    });

    it("boosts strong docs ecosystems for beginner low-friction intent", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 8,
            tags: [],
            experience: "BEGINNER",
            desktopPreference: "NO_PREFERENCE",
            releaseModel: "NO_PREFERENCE",
            initSystem: "NO_PREFERENCE",
            packageManager: "NO_PREFERENCE",
            immutablePreference: "NO_PREFERENCE",
            deviceType: "NO_PREFERENCE",
            secureBootNeeded: null,
            gpu: "UNKNOWN",
            nvidiaTolerance: "NO_PREFERENCE",
        });

        const results = buildCompatibility(intent);
        const ubuntu = getResult(results, "ubuntu");
        const bodhi = getResult(results, "bodhi_linux");

        expect(ubuntu.compatible).toBe(true);
        expect(ubuntu.includedBecause).toContain("include_docs_ecosystem_match");
        expect(bodhi.compatible).toBe(true);
        expect(bodhi.includedBecause).not.toContain("include_docs_ecosystem_match");
    });
});
