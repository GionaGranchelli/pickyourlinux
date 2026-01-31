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

const needsOldHardwareSupport = (intent: UserIntent): boolean => {
    return intent.tags.includes("OldHardware");
};

export function eliminateDistros(intent: UserIntent): EliminationResult[] {
    return distros.map((distro) => {
        const excludedBecause: ExclusionReasonKey[] = [];

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
