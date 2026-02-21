import { CompatibilityResultListSchema, type CompatibilityResult } from "~/data/compatibility-types";
import type { UserIntent } from "~/data/types";
import type { InclusionReasonKey } from "~/data/reason-templates";
import { eliminateDistros, getDistros, type EnginePolicyOptions } from "~/engine/eliminate";

const distros = getDistros();

const needsOldHardwareSupport = (intent: UserIntent): boolean => {
    return intent.tags.includes("OldHardware");
};

const buildIncludedReasons = (intent: UserIntent, distroId: string): InclusionReasonKey[] => {
    const distro = distros.find((item) => item.id === distroId);
    if (!distro) return ["include_meets_requirements"];

    const reasons: InclusionReasonKey[] = [];

    if (intent.installation === "GUI" && distro.installerExperience === "GUI") {
        reasons.push("include_installer_gui_match");
    }

    if (intent.maintenance === "NO_TERMINAL" && distro.maintenanceStyle === "LOW_FRICTION") {
        reasons.push("include_maintenance_low_friction_match");
    }

    if (intent.proprietary === "AVOID" && distro.proprietarySupport === "NONE") {
        reasons.push("include_proprietary_none_match");
    }

    if (intent.proprietary === "REQUIRED" && distro.proprietarySupport !== "NONE") {
        reasons.push("include_proprietary_supported");
    }

    if (intent.secureBootNeeded === true && distro.secureBootOutOfBox) {
        reasons.push("include_secure_boot_supported");
    }

    if (
        intent.gpu === "NVIDIA" &&
        intent.nvidiaTolerance === "WANT_EASY" &&
        (distro.nvidiaExperience === "GOOD" || distro.nvidiaExperience === "OK")
    ) {
        reasons.push("include_nvidia_easy_match");
    }

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

    if (intent.immutablePreference === "PREFER_IMMUTABLE" && distro.immutable) {
        reasons.push("include_immutable_match");
    }

    if (intent.immutablePreference === "PREFER_TRADITIONAL" && !distro.immutable) {
        reasons.push("include_immutable_match");
    }

    if (intent.tags.includes("Server") && (distro.primaryUseCase === "SERVER" || distro.primaryUseCase === "BOTH")) {
        reasons.push("include_server_use_case_match");
    }

    if (intent.deviceType === "LAPTOP" && distro.laptopFriendly) {
        reasons.push("include_laptop_friendly_match");
    }

    if (reasons.length === 0) {
        reasons.push("include_meets_requirements");
    }

    return reasons;
};

export function buildCompatibility(intent: UserIntent, options: EnginePolicyOptions = {}): CompatibilityResult[] {
    const hardResults = eliminateDistros(intent, options);

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
