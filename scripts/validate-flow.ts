import { ALL_QUESTIONS } from "../src/data/questions";
import { UserIntentSchema, type Condition } from "../src/data/types";

const intentKeys = Object.keys(UserIntentSchema.shape);

const collectFields = (condition: Condition, fields: string[] = []): string[] => {
    if ("op" in condition && (condition.op === "and" || condition.op === "or")) {
        condition.conditions.forEach((child: Condition) => collectFields(child, fields));
        return fields;
    }

    fields.push(condition.field);
    return fields;
};

ALL_QUESTIONS.forEach((q) => {
    if (q.showIf) {
        const fields = collectFields(q.showIf);
        fields.forEach((field) => {
            if (!intentKeys.includes(field)) {
                throw new Error(`Question ${q.id} references non-existent field: ${field}`);
            }
        });
    }

    q.options.forEach((opt) => {
        opt.patches.forEach((p) => {
            if (p.op === "set" && !intentKeys.includes(p.field)) {
                throw new Error(`Option ${opt.id} tries to set non-existent field: ${p.field}`);
            }
        });
    });
});

console.log("✅ Flow Logic is sound.");
