import type { UserIntent, ScoredDistro, MatchDetail } from "~/data/types";
import type { Distro } from "~/data/distro-types";

/**
 * Pass 1: Filter distros that fail any hard constraint.
 * Returns the subset of distros that satisfy all hard constraints.
 * If the result is empty, returns an empty array — never throws.
 */
export function applyHardConstraints(
    distros: Distro[],
    intent: UserIntent
): { filteredDistros: Distro[]; conflictFields: string[] } {
    const conflictFields: string[] = [];

    const filtered = distros.filter((distro) => {
        let isCompatible = true;

        // 1. Architecture
        if (intent.architecture === "arm64") {
            if (!distro.supportedArchitectures.includes("arm64")) {
                isCompatible = false;
                if (!conflictFields.includes("architecture")) conflictFields.push("architecture");
            }
        }

        // 2. Proprietary (only if AVOID is selected)
        if (intent.proprietary === "AVOID") {
            if (distro.proprietarySupport !== "NONE") {
                isCompatible = false;
                if (!conflictFields.includes("proprietary")) conflictFields.push("proprietary");
            }
        }

        // 3. Secure Boot (only if MUST be on)
        if (intent.secureBootNeeded === true) {
            if (!distro.secureBootOutOfBox) {
                isCompatible = false;
                if (!conflictFields.includes("secureBootNeeded")) conflictFields.push("secureBootNeeded");
            }
        }

        return isCompatible;
    });

    return {
        filteredDistros: filtered,
        conflictFields: filtered.length === 0 ? conflictFields : [],
    };
}

/**
 * Pass 2: Score each distro by how well it matches soft preferences.
 * Returns distros sorted by score descending.
 */
export function applySoftScoring(
    distros: Distro[],
    intent: UserIntent
): ScoredDistro[] {
    return distros
        .map((distro) => {
            const matchedPreferences: MatchDetail[] = [];
            const missedPreferences: MatchDetail[] = [];
            let score = 0;
            let maxPossibleScore = 0;

            const addMatch = (field: string, preferred: unknown, weight: number = 1) => {
                score += weight;
                maxPossibleScore += weight;
                matchedPreferences.push({ field, preferred, actual: preferred, weight });
            };

            const addMiss = (field: string, preferred: unknown, actual: unknown, weight: number = 1) => {
                maxPossibleScore += weight;
                missedPreferences.push({ field, preferred, actual, weight });
            };

            // Release Model
            if (intent.releaseModel !== "NO_PREFERENCE") {
                if (distro.releaseModel === intent.releaseModel) {
                    addMatch("releaseModel", intent.releaseModel);
                } else {
                    addMiss("releaseModel", intent.releaseModel, distro.releaseModel);
                }
            }

            // Init System
            if (intent.initSystem !== "NO_PREFERENCE") {
                if (distro.initSystem === intent.initSystem) {
                    addMatch("initSystem", intent.initSystem);
                } else {
                    addMiss("initSystem", intent.initSystem, distro.initSystem);
                }
            }

            // Package Manager
            if (intent.packageManager !== "NO_PREFERENCE") {
                if (distro.packageManager === intent.packageManager) {
                    addMatch("packageManager", intent.packageManager);
                } else {
                    addMiss("packageManager", intent.packageManager, distro.packageManager);
                }
            }

            // Desktop Preference
            if (intent.desktopPreference !== "NO_PREFERENCE") {
                if (distro.supportedDesktops.includes(intent.desktopPreference as any)) {
                    addMatch("desktopPreference", intent.desktopPreference);
                } else {
                    addMiss("desktopPreference", intent.desktopPreference, distro.supportedDesktops);
                }
            }

            // Maintenance
            const preferredMaintenance = intent.maintenance === "NO_TERMINAL" ? "LOW_FRICTION" : "HANDS_ON";
            if (distro.maintenanceStyle === preferredMaintenance) {
                addMatch("maintenance", intent.maintenance);
            } else {
                addMiss("maintenance", intent.maintenance, distro.maintenanceStyle);
            }

            // Installation
            if (intent.installation === "GUI") {
                if (distro.installerExperience === "GUI") {
                    addMatch("installation", "GUI");
                } else {
                    addMiss("installation", "GUI", distro.installerExperience);
                }
            } else {
                if (distro.installerExperience === "MANUAL") {
                    addMatch("installation", "CLI_OK");
                } else {
                    addMiss("installation", "CLI_OK", distro.installerExperience);
                }
            }

            // GPU / NVIDIA
            if (intent.gpu === "NVIDIA") {
                maxPossibleScore += 2;
                if (distro.nvidiaExperience === "GOOD") {
                    score += 2;
                    matchedPreferences.push({ field: "gpu_nvidia", preferred: "GOOD", actual: "GOOD", weight: 2 });
                } else if (distro.nvidiaExperience === "OK") {
                    score += 1;
                    matchedPreferences.push({ field: "gpu_nvidia", preferred: "GOOD", actual: "OK", weight: 1 });
                } else {
                    missedPreferences.push({ field: "gpu_nvidia", preferred: "GOOD", actual: distro.nvidiaExperience, weight: 2 });
                }
            }

            // Immutable Preference
            if (intent.immutablePreference !== "NO_PREFERENCE") {
                const wantsImmutable = intent.immutablePreference === "PREFER_IMMUTABLE";
                if (distro.immutable === wantsImmutable) {
                    addMatch("immutable", intent.immutablePreference);
                } else {
                    addMiss("immutable", intent.immutablePreference, distro.immutable ? "IMMUTABLE" : "TRADITIONAL");
                }
            }

            // Device Type: Laptop
            if (intent.deviceType === "LAPTOP") {
                if (distro.laptopFriendly) {
                    addMatch("deviceType", "LAPTOP");
                } else {
                    addMiss("deviceType", "LAPTOP", "Generic");
                }
            }

            // Tags: Gaming
            if (intent.tags.includes("Gaming")) {
                if (distro.gamingSupport === "GOOD") {
                    addMatch("gaming", "GOOD");
                } else if (distro.gamingSupport === "LIMITED") {
                    // Half match
                    score += 0.5;
                    maxPossibleScore += 1;
                    matchedPreferences.push({ field: "gaming", preferred: "GOOD", actual: "LIMITED", weight: 0.5 });
                } else {
                    addMiss("gaming", "GOOD", distro.gamingSupport);
                }
            }

            // Tags: Privacy
            if (intent.tags.includes("Privacy")) {
                if (distro.privacyPosture === "STRONG") {
                    addMatch("privacy", "STRONG");
                } else {
                    addMiss("privacy", "STRONG", distro.privacyPosture);
                }
            }

            // Tags: Server
            if (intent.tags.includes("Server")) {
                if (distro.primaryUseCase === "SERVER" || distro.primaryUseCase === "BOTH") {
                    addMatch("server", "YES");
                } else {
                    addMiss("server", "YES", distro.primaryUseCase);
                }
            }

            // Docs Ecosystem (especially for beginners)
            if (intent.experience === "BEGINNER" && intent.maintenance === "NO_TERMINAL") {
                if (distro.docsEcosystem === "EXCELLENT" || distro.docsEcosystem === "GOOD") {
                    addMatch("docsEcosystem", "STRONG");
                } else {
                    addMiss("docsEcosystem", "STRONG", distro.docsEcosystem);
                }
            }

            return {
                distro,
                score,
                maxPossibleScore,
                matchedPreferences,
                missedPreferences,
            };
        })
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.distro.id.localeCompare(b.distro.id);
        });
}
