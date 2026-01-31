import { ALL_QUESTIONS } from "../src/data/questions";
import { TagEnum, UserIntentSchema, type Condition, type Patch } from "../src/data/types";

const intentKeys = new Set(Object.keys(UserIntentSchema.shape));
type TagValue = (typeof TagEnum.options)[number];
const tagValues = new Set<TagValue>(TagEnum.options);

const assertIntentField = (field: string, context: string) => {
    if (!intentKeys.has(field)) {
        throw new Error(`${context} references non-existent field: ${field}`);
    }
};

const assertTagValue = (value: TagValue, context: string) => {
    if (!tagValues.has(value)) {
        throw new Error(`${context} references invalid tag: ${value}`);
    }
};

const validateCondition = (condition: Condition, context: string) => {
    if (condition.op === "and" || condition.op === "or") {
        condition.conditions.forEach((child, index) =>
            validateCondition(child, `${context} -> ${condition.op}[${index}]`)
        );
        return;
    }

    assertIntentField(condition.field, context);
};

const validatePatch = (patch: Patch, context: string) => {
    if (patch.op === "set") {
        assertIntentField(patch.field, context);
        return;
    }

    if (patch.op === "add_tag" || patch.op === "remove_tag") {
        assertTagValue(patch.value, context);
    }
};

ALL_QUESTIONS.forEach((q) => {
    if (!q.options || q.options.length === 0) {
        throw new Error(`Question ${q.id} has no options.`);
    }

    if (q.showIf) {
        validateCondition(q.showIf, `Question ${q.id} showIf`);
    }

    q.options.forEach((opt) => {
        opt.patches.forEach((patch) => {
            validatePatch(patch, `Question ${q.id} option ${opt.id}`);
        });
    });
});

console.log("✅ Flow Logic is sound.");
