import { describe, expect, it } from "vitest";
import { UserIntentSchema } from "~/data/types";
import { applyPatch, evaluateCondition } from "~/engine/logic";

describe("engine/logic", () => {
    it("evaluateCondition: contains works for tags", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: ["Gaming"],
        });

        const cond = { field: "tags", op: "contains", value: "Gaming" } as const;
        expect(evaluateCondition(intent, cond)).toBe(true);
    });

    it("applyPatch: add_tag is idempotent and validated", () => {
        const intent = UserIntentSchema.parse({
            installation: "GUI",
            maintenance: "NO_TERMINAL",
            proprietary: "OPTIONAL",
            architecture: "x86_64",
            minRam: 4,
            tags: [],
        });

        const next = applyPatch(intent, [{ op: "add_tag", value: "Privacy" }]);
        expect(next.tags).toEqual(["Privacy"]);

        const next2 = applyPatch(next, [{ op: "add_tag", value: "Privacy" }]);
        expect(next2.tags).toEqual(["Privacy"]);
    });
});
