import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const dataPath = resolve(rootDir, "src", "data", "distros.json");

const raw = readFileSync(dataPath, "utf-8");
const distros = JSON.parse(raw) as Array<Record<string, unknown>>;

const invalidLastVerified = distros.filter((distro) => {
  const value = distro.lastVerified;
  return typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value);
});

const unknownNvidia = distros.filter((distro) => distro.nvidiaExperience === "UNKNOWN");

if (invalidLastVerified.length > 0) {
  throw new Error(
    `Invalid/missing lastVerified for: ${invalidLastVerified.map((d) => String(d.id)).join(", ")}`
  );
}

if (unknownNvidia.length > 0) {
  throw new Error(
    `nvidiaExperience must not be UNKNOWN: ${unknownNvidia.map((d) => String(d.id)).join(", ")}`
  );
}

console.log("✅ Distro invariants are valid (lastVerified + nvidiaExperience). ");
