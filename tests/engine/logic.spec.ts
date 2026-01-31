import { describe, expect, it } from "vitest";
import { UserIntentSchema, type Condition } from "../../src/data/types";
import { applyPatch, evaluateCondition } from "../../src/engine/logic";

const baseIntent = UserIntentSchema.parse({
    installation: "GUI",
    maintenance: "NO_TERMINAL",
    proprietary: "OPTIONAL",
    architecture: "x86_64",
    minRam: 4,
    tags: ["Gaming"],
});

describe("evaluateCondition", () => {
    it("handles eq and neq", () => {
        const eqCond: Condition = { field: "architecture", op: "eq", value: "x86_64" };
        const neqCond: Condition = { field: "maintenance", op: "neq", value: "TERMINAL_OK" };

        expect(evaluateCondition(baseIntent, eqCond)).toBe(true);
        expect(evaluateCondition(baseIntent, neqCond)).toBe(true);
    });

    it("handles in (scalar in set)", () => {
        const cond: Condition = {
            field: "architecture",
            op: "in",
            value: ["arm64", "x86_64"],
        };

        expect(evaluateCondition(baseIntent, cond)).toBe(true);
    });

    it("handles contains (array contains scalar)", () => {
        const cond: Condition = { field: "tags", op: "contains", value: "Gaming" };

        expect(evaluateCondition(baseIntent, cond)).toBe(true);
    });

    it("handles and/or recursion", () => {
        const cond: Condition = {
            op: "and",
            conditions: [
                { field: "architecture", op: "eq", value: "x86_64" },
                {
                    op: "or",
                    conditions: [
                        { field: "tags", op: "contains", value: "Server" },
                        { field: "tags", op: "contains", value: "Gaming" },
                    ],
                },
            ],
        };

        expect(evaluateCondition(baseIntent, cond)).toBe(true);
    });
});

describe("applyPatch", () => {
    it("applies set", () => {
        const next = applyPatch(baseIntent, [{ op: "set", field: "minRam", value: 8 }]);
        expect(next.minRam).toBe(8);
    });

    it("handles add_tag/remove_tag deterministically", () => {
        const added = applyPatch(baseIntent, [{ op: "add_tag", value: "Privacy" }]);
        expect(added.tags).toEqual(["Gaming", "Privacy"]);

        const removed = applyPatch(added, [{ op: "remove_tag", value: "Gaming" }]);
        expect(removed.tags).toEqual(["Privacy"]);
    });

    it("does not mutate the input intent", () => {
        const input = structuredClone(baseIntent);
        void applyPatch(input, [{ op: "set", field: "minRam", value: 16 }]);
        expect(input.minRam).toBe(4);
    });
});
