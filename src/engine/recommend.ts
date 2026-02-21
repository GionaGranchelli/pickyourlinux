import distrosData from "~/data/distros.json";
import { DistroListSchema, type Distro } from "~/data/distro-types";
import { buildCompatibility } from "~/engine/compatibility";
import { RecommendedDistroListSchema, type RecommendedDistro } from "~/data/recommendation-types";
import type { UserIntent } from "~/data/types";
import type { EnginePolicyOptions } from "~/engine/eliminate";

export type DistroRecommendation = RecommendedDistro & { included: boolean };

const distros = DistroListSchema.parse(distrosData);

const getMatchedTags = (intent: UserIntent, distro: Distro): UserIntent["tags"] => {
    const matched: UserIntent["tags"] = [];

    if (intent.tags.includes("Gaming") && distro.gamingSupport !== "NONE") {
        matched.push("Gaming");
    }

    if (intent.tags.includes("Privacy") && distro.privacyPosture === "STRONG") {
        matched.push("Privacy");
    }

    if (intent.tags.includes("OldHardware") && distro.suitableForOldHardware) {
        matched.push("OldHardware");
    }

    return matched;
};

export function recommendDistros(intent: UserIntent, options: EnginePolicyOptions = {}): DistroRecommendation[] {
    const compatibility = buildCompatibility(intent, options);
    const recommendations: DistroRecommendation[] = compatibility.map((result) => {
        const distro = distros.find((item) => item.id === result.distroId);
        const matchedTags = distro ? getMatchedTags(intent, distro) : [];

        return {
            distroId: result.distroId,
            included: result.compatible,
            includedReason: result.includedBecause,
            excludedReason: result.excludedBecause,
            matchedTags,
        };
    });

    const validated = RecommendedDistroListSchema.parse(
        recommendations.map(({ included, ...rest }) => rest)
    );

    return validated.map((item, index) => {
        const source = recommendations[index];
        if (!source) {
            throw new Error(`Recommendation alignment error at index ${index}`);
        }

        return { ...item, included: source.included };
    });
}
