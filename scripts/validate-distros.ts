import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DistroListSchema } from "../src/data/distro-types";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const dataPath = resolve(rootDir, "src", "data", "distros.json");

const raw = readFileSync(dataPath, "utf-8");
const parsed = JSON.parse(raw);
;
const distros = DistroListSchema.parse(parsed);
const ids = new Set<string>();
const duplicates: string[] = [];

for (const distro of distros) {
    if (ids.has(distro.id)) duplicates.push(distro.id);
    ids.add(distro.id);
}

if (duplicates.length > 0) {
    throw new Error(`Duplicate distro IDs: ${duplicates.join(", ")}`);
}

console.log("✅ Distro data is valid.");
