import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DistroListSchema } from "../src/data/distro-types";
import { findInvariantViolations } from "./distro-invariants";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const dataPath = resolve(rootDir, "src", "data", "distros.json");
const compareViewPath = resolve(rootDir, "src", "pages", "compare.vue");

const distros = DistroListSchema.parse(JSON.parse(readFileSync(dataPath, "utf-8")));
const compareViewSource = readFileSync(compareViewPath, "utf-8");

const violations = findInvariantViolations(distros, { compareViewSource });

if (violations.length > 0) {
    const detail = violations
        .map((violation) => {
            const ids = violation.distroIds.length > 0 ? ` [${violation.distroIds.join(", ")}]` : "";
            return `  - ${violation.code}${ids}: ${violation.message}`;
        })
        .join("\n");
    throw new Error(`${violations.length} distro invariant violation(s):\n${detail}`);
}

console.log(
    `✅ Distro invariants are valid (${distros.length} entries: identity, freshness, cross-field consistency, satisfiable answers, compare-view keys).`
);
