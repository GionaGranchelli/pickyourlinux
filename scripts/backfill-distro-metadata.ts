import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BACKFILL_DATE } from "./constants";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const dataPath = resolve(rootDir, "src", "data", "distros.json");

const manualIds = new Set([
  // Task 03
  "rocky_linux",
  "almalinux",
  "centos_stream",
  "solus",
  "mageia",
  "pclinuxos",
  "deepin",
  "bodhi_linux",
  "kali_linux",
  // Task 06
  "artix",
  "fedora_silverblue",
  "fedora_kinoite",
  "opensuse_microos",
]);

const raw = readFileSync(dataPath, "utf-8");
const distros = JSON.parse(raw) as Array<Record<string, unknown>>;

for (const distro of distros) {
  distro.lastVerified = BACKFILL_DATE;

  if (manualIds.has(String(distro.id))) {
    distro.verificationMethod = "MANUAL";
  } else if (!distro.verificationMethod) {
    distro.verificationMethod = "INFERRED";
  }
}

writeFileSync(dataPath, `${JSON.stringify(distros, null, 2)}\n`, "utf-8");

console.log(`✅ Backfilled lastVerified=${BACKFILL_DATE} for ${distros.length} distros.`);
console.log("✅ verificationMethod set to MANUAL for Task 03/06 records, INFERRED otherwise.");
