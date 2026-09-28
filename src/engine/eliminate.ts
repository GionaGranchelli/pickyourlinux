import distrosData from "~/data/distros.json";
import { DistroListSchema, type Distro } from "~/data/distro-types";
import type { UserIntent } from "~/data/types";
import type { ExclusionReasonKey } from "~/data/reason-templates";

export type EliminationResult = {
    distroId: string;
    included: boolean;
    excludedBecause: ExclusionReasonKey[];
};

/** The answer the user gave that a rule enforces. Used to explain a zero-result set. */
export type IntentAxis =
    | "architecture"
    | "installation"
    | "maintenance"
    | "proprietary"
    | "tags"
    | "secureBootNeeded"
    | "gpu";

export const EXCLUSION_AXES: Record<ExclusionReasonKey, IntentAxis> = {
    exclude_architecture_unsupported: "architecture",
    exclude_installer_manual: "installation",
    exclude_maintenance_hands_on: "maintenance",
    exclude_proprietary_required: "proprietary",
    exclude_proprietary_missing: "proprietary",
    exclude_old_hardware_unsuitable: "tags",
    exclude_secure_boot_unavailable: "secureBootNeeded",
    exclude_nvidia_hard: "gpu",
    exclude_nvidia_proprietary_required: "gpu",
};

const distros = DistroListSchema.parse(distrosData);

const needsOldHardwareSupport = (intent: UserIntent): boolean => {
    return intent.tags.includes("OldHardware");
};

/**
 * The single survival authority: a distro is kept only when no rule fires.
 * Every rule is an answer the user actually gave, evaluated as a boolean or enum
 * comparison. Nothing is weighted, scored, or silently relaxed because the
 * dataset has few matches — a stated constraint either applies or the user is
 * told it cannot be met.
 */
export function eliminateDistros(intent: UserIntent): EliminationResult[] {
    return distros.map((distro) => {
        const excludedBecause: ExclusionReasonKey[] = [];

        if (intent.architecture === "arm64" && !distro.supportedArchitectures.includes("arm64")) {
            excludedBecause.push("exclude_architecture_unsupported");
        }

        if (intent.installation === "GUI" && distro.installerExperience !== "GUI") {
            excludedBecause.push("exclude_installer_manual");
        }

        if (intent.maintenance === "NO_TERMINAL" && distro.maintenanceStyle !== "LOW_FRICTION") {
            excludedBecause.push("exclude_maintenance_hands_on");
        }

        if (intent.proprietary === "AVOID" && distro.proprietarySupport !== "NONE") {
            excludedBecause.push("exclude_proprietary_required");
        }

        if (intent.proprietary === "REQUIRED" && distro.proprietarySupport === "NONE") {
            excludedBecause.push("exclude_proprietary_missing");
        }

        if (needsOldHardwareSupport(intent) && !distro.suitableForOldHardware) {
            excludedBecause.push("exclude_old_hardware_unsuitable");
        }

        if (intent.secureBootNeeded === true && !distro.secureBootOutOfBox) {
            excludedBecause.push("exclude_secure_boot_unavailable");
        }

        if (intent.gpu === "NVIDIA" && intent.nvidiaTolerance === "WANT_EASY") {
            if (distro.nvidiaExperience === "HARD") {
                excludedBecause.push("exclude_nvidia_hard");
            }
        }

        if (intent.gpu === "NVIDIA" && intent.proprietary === "AVOID") {
            if (distro.nvidiaExperience === "GOOD" || distro.nvidiaExperience === "OK") {
                excludedBecause.push("exclude_nvidia_proprietary_required");
            }
        }

        return {
            distroId: distro.id,
            included: excludedBecause.length === 0,
            excludedBecause,
        };
    });
}

/** Deduplicated axes behind the exclusions — what to tell the user when nothing survives. */
export function excludedAxes(results: { excludedBecause: ExclusionReasonKey[] }[]): IntentAxis[] {
    const axes = new Set<IntentAxis>();
    results.forEach((result) => {
        result.excludedBecause.forEach((reason) => axes.add(EXCLUSION_AXES[reason]));
    });
    return [...axes];
}

export function getDistros(): Distro[] {
    return distros;
}
