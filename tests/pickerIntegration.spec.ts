import { describe, expect, it } from "vitest";
import distrosData from "../src/data/distros.json";
import { DistroListSchema } from "../src/data/distro-types";
import { UserIntentSchema, type UserIntent } from "../src/data/types";
import { buildResultsPresentation } from "../src/engine/state";

const allDistros = DistroListSchema.parse(distrosData);

const run = (intent: UserIntent) =>
    buildResultsPresentation(intent, allDistros, { limit: Number.MAX_SAFE_INTEGER, showAll: true }, (key) => key);

const intent = (overrides: Partial<UserIntent>) =>
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

describe("picker end-to-end profiles", () => {
    it("gaming + NVIDIA, beginner: gaming distros reach the top", () => {
        const presentation = run(intent({ tags: ["Gaming"], gpu: "NVIDIA", nvidiaTolerance: "WANT_EASY" }));
        const top3 = presentation.compatible.slice(0, 3).map((item) => item.distroId);
        expect(top3.some((id) => ["pop_os", "nobara", "bazzite", "cachyos", "pikaos"].includes(id))).toBe(true);
        expect(presentation.compatible.every((item) => item.includedBecause.length > 0)).toBe(true);
    });

    it("advanced + proprietary=AVOID: Ubuntu is gone, a strict distro leads", () => {
        const presentation = run(
            intent({ installation: "CLI_OK", maintenance: "TERMINAL_OK", proprietary: "AVOID", experience: "ADVANCED" })
        );
        const ids = presentation.compatible.map((item) => item.distroId);
        expect(ids).not.toContain("ubuntu");
        expect(presentation.excluded.find((item) => item.distroId === "ubuntu")?.excludedBecause).toContain(
            "reasons.exclude_proprietary_required"
        );
    });

    it("impossible combination reports the conflicting axes", () => {
        const presentation = run(
            intent({ architecture: "arm64", proprietary: "AVOID", secureBootNeeded: true, experience: "ADVANCED" })
        );
        expect(presentation.compatible).toHaveLength(0);
        expect(presentation.hardConstraintConflictFields).toContain("architecture");
        expect(presentation.hardConstraintConflictFields).toContain("proprietary");
        expect(presentation.hardConstraintConflictFields).toContain("secureBootNeeded");
    });

    it("initSystem=RUNIT with packageManager=APT: each match is claimed, neither is weighted", () => {
        const presentation = run(
            intent({
                installation: "CLI_OK",
                maintenance: "TERMINAL_OK",
                experience: "ADVANCED",
                initSystem: "RUNIT",
                packageManager: "APT",
            })
        );
        expect(presentation.compatible.length).toBeGreaterThan(0);

        const voidLinux = presentation.compatible.find((item) => item.distroId === "void_linux");
        expect(voidLinux?.includedBecause).toContain("reasons.include_init_system_match");
        expect(voidLinux?.includedBecause).not.toContain("reasons.include_package_manager_match");

        const bodhi = presentation.compatible.find((item) => item.distroId === "bodhi_linux");
        expect(bodhi?.includedBecause).toContain("reasons.include_package_manager_match");
        expect(bodhi?.includedBecause).not.toContain("reasons.include_init_system_match");

        // Both satisfy exactly one stated preference, so the tie falls to the name — no weight.
        const countOf = (item: (typeof presentation.compatible)[number]) =>
            item.includedBecause.filter((reason) => reason !== "reasons.include_meets_requirements").length;
        expect(countOf(voidLinux!)).toBe(1);
        expect(countOf(bodhi!)).toBe(1);
        expect(presentation.compatible.indexOf(bodhi!)).toBeLessThan(presentation.compatible.indexOf(voidLinux!));
    });

    it("no-terminal beginner never receives a manual-installer distro", () => {
        const presentation = run(intent({ installation: "GUI", maintenance: "NO_TERMINAL" }));
        presentation.compatible.forEach((item) => {
            const distro = allDistros.find((candidate) => candidate.id === item.distroId)!;
            expect(distro.installerExperience).toBe("GUI");
            expect(distro.maintenanceStyle).toBe("LOW_FRICTION");
        });
    });
});
