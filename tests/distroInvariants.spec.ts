import { describe, expect, it } from "vitest";
import distrosData from "../src/data/distros.json";
import { DistroListSchema, type Distro } from "../src/data/distro-types";
import { findInvariantViolations } from "../scripts/distro-invariants";

const real = DistroListSchema.parse(distrosData);

const withDistro = (id: string, patch: Partial<Distro>): Distro[] =>
    real.map((distro) => (distro.id === id ? { ...distro, ...patch } : distro));

const codes = (distros: Distro[]) => findInvariantViolations(distros).map((violation) => violation.code);

describe("distro invariants", () => {
    it("the committed dataset is clean", () => {
        expect(findInvariantViolations(real)).toEqual([]);
    });

    it("flags a second entry with the same name (the Artix failure mode)", () => {
        const duplicate: Distro = { ...real[0], id: "some_other_id", name: real[0].name };
        expect(codes([...real, duplicate])).toContain("duplicate_name");
    });

    it("flags a stale verification date", () => {
        const stale = withDistro("ubuntu", { lastVerified: "2020-01-01" });
        expect(codes(stale)).toContain("stale_verification");
    });

    it("flags Secure Boot claimed without a UEFI architecture", () => {
        const wrong = withDistro("fedora", { supportedArchitectures: ["i686"] });
        expect(codes(wrong)).toContain("secure_boot_without_uefi_arch");
    });

    it("flags Ubuntu-family drift on Secure Boot", () => {
        const drifted = withDistro("xubuntu", { secureBootOutOfBox: !real.find((d) => d.id === "ubuntu")!.secureBootOutOfBox });
        expect(codes(drifted)).toContain("ubuntu_family_drift");
    });

    it("flags a stated answer that no entry can satisfy", () => {
        const noStrictDistro = real.map((distro) => ({ ...distro, proprietarySupport: "OPTIONAL" as const }));
        expect(codes(noStrictDistro)).toContain("proprietary_none_unsatisfiable");

        const noSecureBoot = real.map((distro) => ({ ...distro, secureBootOutOfBox: false }));
        expect(codes(noSecureBoot)).toContain("secure_boot_unsatisfiable");

        const noOldHardware = real.map((distro) => ({ ...distro, suitableForOldHardware: false }));
        expect(codes(noOldHardware)).toContain("old_hardware_unsatisfiable");
    });

    it("flags an entry with missing core data", () => {
        const missingLink = withDistro("ubuntu", { websiteUrl: null });
        expect(codes(missingLink)).toContain("missing_core_data");
    });

    it("flags an architecture spelling the engine does not consult", () => {
        const renamed = withDistro("archcraft", { supportedArchitectures: ["aarch64"] });
        expect(codes(renamed)).toContain("unknown_architecture");
    });

    it("flags a compare-view row that no distro field can fill", () => {
        const source = `const detailedFeatures = [{ key: "supportedDesktops", label: "x" }, { key: "minRam", label: "Minimum RAM" }];`;
        const violations = findInvariantViolations(real, { compareViewSource: source });
        expect(violations.map((violation) => violation.code)).toContain("compare_field_not_modelled");
    });

    it("flags UNKNOWN nvidiaExperience and a malformed date", () => {
        expect(codes(withDistro("ubuntu", { nvidiaExperience: "UNKNOWN" }))).toContain("nvidia_unknown");
        expect(codes(withDistro("ubuntu", { lastVerified: "21/02/2026" }))).toContain("invalid_last_verified");
    });

    it("the real compare view is modelled by the schema", () => {
        expect(codes(real).includes("compare_field_not_modelled")).toBe(false);
    });
});
