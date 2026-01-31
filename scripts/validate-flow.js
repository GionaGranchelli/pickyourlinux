import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const jiti = require("jiti")(__filename, { esmResolve: true, alias: { "~": resolve(rootDir, "src") } });

const { ALL_QUESTIONS } = jiti("../src/data/questions");
const { UserIntentSchema } = jiti("../src/data/types");

const intentKeys = Object.keys(UserIntentSchema.shape);

const collectFields = (condition, fields = []) => {
    if (condition.op === "and" || condition.op === "or") {
        condition.conditions.forEach((child) => collectFields(child, fields));
        return fields;
    }

    fields.push(condition.field);
    return fields;
};

const assertIntentField = (field, context) => {
    if (!intentKeys.includes(field)) {
        throw new Error(`${context} references non-existent field: ${field}`);
    }
};

ALL_QUESTIONS.forEach((q) => {
    if (!q.options || q.options.length === 0) {
        throw new Error(`Question ${q.id} has no options.`);
    }

    if (q.showIf) {
        const fields = collectFields(q.showIf);
        fields.forEach((field) => assertIntentField(field, `Question ${q.id}`));
    }

    q.options.forEach((opt) => {
        opt.patches.forEach((p) => {
            if (p.op === "set") {
                assertIntentField(p.field, `Option ${opt.id}`);
            }
        });
    });
});

console.log("✅ Flow Logic is sound.");
