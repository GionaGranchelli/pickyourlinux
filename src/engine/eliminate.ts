import distrosData from "~/data/distros.json";
import { DistroListSchema, type Distro } from "~/data/distro-types";
import type { UserIntent } from "~/data/types";
import type { ExclusionReasonKey } from "~/data/reason-templates";

export type EliminationResult = {
    distroId: string;
    included: boolean;
    excludedBecause: ExclusionReasonKey[];
};

const distros = DistroListSchema.parse(distrosData);
const DEFAULT_LOW_COVERAGE_THRESHOLD = 3;

type HardConstraintCoverage = {
    installerGui: number;
    maintenanceLowFriction: number;
    proprietaryNone: number;
    proprietaryAllowed: number;
    oldHardwareSuitable: number;
    secureBootOutOfBox: number;
    nvidiaEasy: number;
    nvidiaAvoidProprietary: number;
};

const HARD_CONSTRAINT_COVERAGE: HardConstraintCoverage = {
    installerGui: distros.filter((distro) => distro.installerExperience === "GUI").length,
    maintenanceLowFriction: distros.filter((distro) => distro.maintenanceStyle === "LOW_FRICTION").length,
    proprietaryNone: distros.filter((distro) => distro.proprietarySupport === "NONE").length,
    proprietaryAllowed: distros.filter((distro) => distro.proprietarySupport !== "NONE").length,
    oldHardwareSuitable: distros.filter((distro) => distro.suitableForOldHardware).length,
    secureBootOutOfBox: distros.filter((distro) => distro.secureBootOutOfBox).length,
    nvidiaEasy: distros.filter((distro) => distro.nvidiaExperience === "GOOD" || distro.nvidiaExperience === "OK").length,
    nvidiaAvoidProprietary: distros.filter((distro) => distro.nvidiaExperience === "HARD" || distro.nvidiaExperience === "UNKNOWN").length,
};

export type EnginePolicyOptions = {
    lowCoverageThreshold?: number;
};

const needsOldHardwareSupport = (intent: UserIntent): boolean => {
    return intent.tags.includes("OldHardware");
};

export function eliminateDistros(intent: UserIntent, options: EnginePolicyOptions = {}): EliminationResult[] {
    const lowCoverageThreshold = options.lowCoverageThreshold ?? DEFAULT_LOW_COVERAGE_THRESHOLD;
    const softInstallerGui = intent.installation === "GUI" && HARD_CONSTRAINT_COVERAGE.installerGui < lowCoverageThreshold;
    const softMaintenanceLowFriction = intent.maintenance === "NO_TERMINAL" && HARD_CONSTRAINT_COVERAGE.maintenanceLowFriction < lowCoverageThreshold;
    const softProprietaryNone = intent.proprietary === "AVOID" && HARD_CONSTRAINT_COVERAGE.proprietaryNone < lowCoverageThreshold;
    const softProprietaryAllowed = intent.proprietary === "REQUIRED" && HARD_CONSTRAINT_COVERAGE.proprietaryAllowed < lowCoverageThreshold;
    const softOldHardware = needsOldHardwareSupport(intent) && HARD_CONSTRAINT_COVERAGE.oldHardwareSuitable < lowCoverageThreshold;
    const softSecureBoot = intent.secureBootNeeded === true && HARD_CONSTRAINT_COVERAGE.secureBootOutOfBox < lowCoverageThreshold;
    const softNvidiaEasy = intent.gpu === "NVIDIA" && intent.nvidiaTolerance === "WANT_EASY" && HARD_CONSTRAINT_COVERAGE.nvidiaEasy < lowCoverageThreshold;
    const softNvidiaAvoidProprietary = intent.gpu === "NVIDIA" && intent.proprietary === "AVOID" && HARD_CONSTRAINT_COVERAGE.nvidiaAvoidProprietary < lowCoverageThreshold;

    return distros.map((distro) => {
        const excludedBecause: ExclusionReasonKey[] = [];

        if (!softInstallerGui && intent.installation === "GUI" && distro.installerExperience !== "GUI") {
            excludedBecause.push("exclude_installer_manual");
        }

        if (!softMaintenanceLowFriction && intent.maintenance === "NO_TERMINAL" && distro.maintenanceStyle !== "LOW_FRICTION") {
            excludedBecause.push("exclude_maintenance_hands_on");
        }

        if (!softProprietaryNone && intent.proprietary === "AVOID" && distro.proprietarySupport !== "NONE") {
            excludedBecause.push("exclude_proprietary_required");
        }

        if (!softProprietaryAllowed && intent.proprietary === "REQUIRED" && distro.proprietarySupport === "NONE") {
            excludedBecause.push("exclude_proprietary_missing");
        }

        if (!softOldHardware && needsOldHardwareSupport(intent) && !distro.suitableForOldHardware) {
            excludedBecause.push("exclude_old_hardware_unsuitable");
        }

        if (!softSecureBoot && intent.secureBootNeeded === true && !distro.secureBootOutOfBox) {
            excludedBecause.push("exclude_secure_boot_unavailable");
        }

        if (!softNvidiaEasy && intent.gpu === "NVIDIA" && intent.nvidiaTolerance === "WANT_EASY") {
            if (distro.nvidiaExperience === "HARD") {
                excludedBecause.push("exclude_nvidia_hard");
            }
        }

        if (!softNvidiaAvoidProprietary && intent.gpu === "NVIDIA" && intent.proprietary === "AVOID") {
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

export function getDistros(): Distro[] {
    return distros;
}
