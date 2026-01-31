import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "../../src/data/types";
import { recommendDistros } from "../../src/engine/recommend";

const baseIntent = UserIntentSchema.parse({
    installation: "GUI",
    maintenance: "NO_TERMINAL",
    proprietary: "OPTIONAL",
    architecture: "x86_64",
    minRam: 4,
    tags: [],
});

const findRec = (recommendations: ReturnType<typeof recommendDistros>, distroId: string) => {
    const rec = recommendations.find((item) => item.distroId === distroId);
    if (!rec) throw new Error(`Missing recommendation for ${distroId}`);
    return rec;
};

describe("recommendDistros", () => {
    it("excludes terminal-heavy distros for terminal-averse users", () => {
        const intent = { ...baseIntent, maintenance: "NO_TERMINAL" as const };
        const recs = recommendDistros(intent);
        const debian = findRec(recs, "debian");

        expect(debian.included).toBe(false);
        expect(debian.excludedReason).toContain("exclude_maintenance_hands_on");
    });

    it("prioritizes privacy-focused intent", () => {
        const intent = UserIntentSchema.parse({ ...baseIntent, tags: ["Privacy"] });
        const recs = recommendDistros(intent);
        const trisquel = findRec(recs, "trisquel");

        expect(trisquel.includedReason).toContain("include_privacy_strong");
    });

    it("tracks gaming intent and matched tags", () => {
        const intent = UserIntentSchema.parse({ ...baseIntent, tags: ["Gaming"] });
        const recs = recommendDistros(intent);
        const pop = findRec(recs, "pop_os");

        expect(pop.includedReason).toContain("include_gaming_good");
        expect(pop.matchedTags).toContain("Gaming");
    });
});
