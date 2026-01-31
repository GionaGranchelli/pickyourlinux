import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_QUESTIONS } from "../src/data/questions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const catalogPath = resolve(__dirname, "..", "docs", "QUESTION_CATALOG.md");
const catalogText = readFileSync(catalogPath, "utf-8");

const idRegex = /^Question ID:\s*([a-z0-9_]+)\s*$/gim;
const catalogIds = new Set<string>();
const duplicateIds: string[] = [];

let match: RegExpExecArray | null;
while ((match = idRegex.exec(catalogText)) !== null) {
    const id = match[1];
    if (catalogIds.has(id)) duplicateIds.push(id);
    catalogIds.add(id);
}

if (catalogIds.size === 0) {
    throw new Error("No Question ID entries found in docs/QUESTION_CATALOG.md.");
}

if (duplicateIds.length > 0) {
    throw new Error(`Duplicate Question ID entries found: ${duplicateIds.join(", ")}`);
}

const flowIds = ALL_QUESTIONS.map((q) => q.id);
const missingInCatalog = flowIds.filter((id) => !catalogIds.has(id));

if (missingInCatalog.length > 0) {
    throw new Error(`Question IDs missing from catalog: ${missingInCatalog.join(", ")}`);
}

console.log("✅ Question catalog matches flow IDs.");
