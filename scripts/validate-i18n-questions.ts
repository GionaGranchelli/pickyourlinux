import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ALL_QUESTIONS } from "../src/data/questions";

type JsonRecord = Record<string, unknown>;

const localesDir = resolve(process.cwd(), "i18n", "locales");

const flattenKeys = (obj: unknown, prefix = ""): string[] => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
        return prefix ? [prefix] : [];
    }

    const record = obj as JsonRecord;
    const keys: string[] = [];

    for (const [key, value] of Object.entries(record)) {
        const nextPrefix = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            keys.push(...flattenKeys(value, nextPrefix));
            continue;
        }

        keys.push(nextPrefix);
    }

    return keys;
};

const requiredKeys = new Set<string>();
for (const question of ALL_QUESTIONS) {
    requiredKeys.add(question.text);

    for (const option of question.options) {
        requiredKeys.add(option.label);
        if (option.description) requiredKeys.add(option.description);
    }

    if (question.options.some((option) => option.isDisqualifier && option.disqualificationReason)) {
        for (const option of question.options) {
            if (option.isDisqualifier && option.disqualificationReason) {
                requiredKeys.add(option.disqualificationReason);
            }
        }
    }
}

const localeFiles = readdirSync(localesDir).filter((file) => file.endsWith(".json")).sort((a, b) => a.localeCompare(b));
if (localeFiles.length === 0) {
    throw new Error(`No locale files found in ${localesDir}`);
}

let hasMissing = false;
for (const file of localeFiles) {
    const localeCode = file.replace(/\.json$/, "");
    const raw = readFileSync(resolve(localesDir, file), "utf-8");
    const parsed = JSON.parse(raw);
    const localeKeys = new Set(flattenKeys(parsed));
    const missing = [...requiredKeys].filter((key) => !localeKeys.has(key));

    if (missing.length > 0) {
        hasMissing = true;
        console.error(`❌ Missing i18n keys in locale '${localeCode}' (${missing.length}):`);
        for (const key of missing) {
            console.error(`   - ${key}`);
        }
    }
}

if (hasMissing) {
    throw new Error("Question i18n coverage validation failed.");
}

console.log("✅ Question i18n coverage is complete across all locales.");
