import { CompatibilityResultListSchema, type CompatibilityResult } from "~/data/compatibility-types";
import type { UserIntent } from "~/data/types";
import type { InclusionReasonKey } from "~/data/reason-templates";
import { eliminateDistros, getDistros } from "~/engine/eliminate";

const distros = getDistros();

const needsOldHardwareSupport = (intent: UserIntent): boolean => {
    return intent.tags.includes("OldHardware");
};

const buildIncludedReasons = (intent: UserIntent, distroId: string): InclusionReasonKey[] => {
    const distro = distros.find((item) => item.id === distroId);
    if (!distro) return ["include_meets_requirements"];

    const reasons: InclusionReasonKey[] = [];

    if (intent.tags.includes("Gaming")) {
        if (distro.gamingSupport === "GOOD") {
            reasons.push("include_gaming_good");
        } else if (distro.gamingSupport === "LIMITED") {
            reasons.push("include_gaming_limited");
        }
    }

    if (intent.tags.includes("Privacy") && distro.privacyPosture === "STRONG") {
        reasons.push("include_privacy_strong");
    }

    if (needsOldHardwareSupport(intent) && distro.suitableForOldHardware) {
        reasons.push("include_old_hardware_suitable");
    }

    if (
        intent.desktopPreference !== "NO_PREFERENCE" &&
        distro.supportedDesktops.includes(intent.desktopPreference)
    ) {
        reasons.push("include_desktop_match");
    }

    if (intent.releaseModel !== "NO_PREFERENCE" && distro.releaseModel === intent.releaseModel) {
        reasons.push("include_release_model_match");
    }

    if (intent.initSystem !== "NO_PREFERENCE" && distro.initSystem === intent.initSystem) {
        reasons.push("include_init_system_match");
    }

    if (
        intent.packageManager !== "NO_PREFERENCE" &&
        distro.packageManager === intent.packageManager
    ) {
        reasons.push("include_package_manager_match");
    }

    if (reasons.length === 0) {
        reasons.push("include_meets_requirements");
    }

    return reasons;
};

export function buildCompatibility(intent: UserIntent): CompatibilityResult[] {
    const hardResults = eliminateDistros(intent);

    const results = hardResults.map((result) => {
        if (!result.included) {
            return {
                distroId: result.distroId,
                compatible: false,
                includedBecause: [],
                excludedBecause: result.excludedBecause,
            };
        }

        return {
            distroId: result.distroId,
            compatible: true,
            includedBecause: buildIncludedReasons(intent, result.distroId),
            excludedBecause: [],
        };
    });

    return CompatibilityResultListSchema.parse(results);
}
