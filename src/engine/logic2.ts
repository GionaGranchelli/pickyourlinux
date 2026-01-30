import { UserIntentSchema, type UserIntent, type Condition, type Patch } from "~/data/types";

/**
 * Evaluate a declarative condition against intent.
 * Pure function. No side effects. No mutation.
 */
export function evaluateCondition(intent: UserIntent, condition: Condition): boolean {
    // Group nodes
    if ("op" in condition && (condition.op === "and" || condition.op === "or")) {
        return condition.op === "and"
            ? condition.conditions.every((c) => evaluateCondition(intent, c))
            : condition.conditions.some((c) => evaluateCondition(intent, c));
    }

    // Leaf node
    const userValue = intent[condition.field];

    switch (condition.op) {
        case "eq":
            return userValue === condition.value;

        case "neq":
            return userValue !== condition.value;

        case "in":
            // scalar in set
            return Array.isArray(condition.value) && condition.value.includes(userValue);

        case "contains":
            // array contains scalar (e.g. tags contains "Gaming")
            return Array.isArray(userValue) && userValue.includes(condition.value);

        default:
            return false;
    }
}

/**
 * Apply patches to intent (immutable).
 * Uses structuredClone to avoid mutation side effects.
 * Validates final output using UserIntentSchema.
 */
export function applyPatch(intent: UserIntent, patches: Patch[]): UserIntent {
    const next: UserIntent = structuredClone(intent);

    for (const patch of patches) {
        switch (patch.op) {
            case "set":
                // field is schema-derived; value is validated at end
                (next as any)[patch.field] = patch.value;
                break;

            case "add_tag":
                if (!next.tags.includes(patch.value)) next.tags.push(patch.value);
                break;

            case "remove_tag":
                next.tags = next.tags.filter((t) => t !== patch.value);
                break;
        }
    }

    // Runtime safety
    return UserIntentSchema.parse(next);
}
