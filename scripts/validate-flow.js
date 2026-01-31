import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const jiti = require("jiti")(__filename, { esmResolve: true, alias: { "~": resolve(rootDir, "src") } });

const { ALL_QUESTIONS } = jiti("../src/data/questions");
const { TagEnum, UserIntentSchema } = jiti("../src/data/types");

const intentKeys = new Set(Object.keys(UserIntentSchema.shape));
const tagValues = new Set(TagEnum.options);

const assertIntentField = (field, context) => {
    if (!intentKeys.has(field)) {
        throw new Error(`${context} references non-existent field: ${field}`);
    }
};

const assertTagValue = (value, context) => {
    if (!tagValues.has(value)) {
        throw new Error(`${context} references invalid tag: ${value}`);
    }
};

const validateCondition = (condition, context) => {
    if (condition.op === "and" || condition.op === "or") {
        condition.conditions.forEach((child, index) =>
            validateCondition(child, `${context} -> ${condition.op}[${index}]`)
        );
        return;
    }

    assertIntentField(condition.field, context);
};

const validatePatch = (patch, context) => {
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
