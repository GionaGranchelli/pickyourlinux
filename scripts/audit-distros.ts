import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DistroListSchema, type Distro } from "../src/data/distro-types";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const dataPath = resolve(rootDir, "src", "data", "distros.json");

const raw = readFileSync(dataPath, "utf-8");
const parsed = JSON.parse(raw);
const distros = DistroListSchema.parse(parsed);

const warnings: string[] = [];
const allowRollingLowFriction = new Set<string>(["manjaro"]);

const warn = (message: string) => warnings.push(message);

const rollingLowFriction = distros.filter(
    (distro) =>
        distro.releaseModel === "ROLLING" &&
        distro.maintenanceStyle === "LOW_FRICTION" &&
        !allowRollingLowFriction.has(distro.id)
);

rollingLowFriction.forEach((distro) => {
    warn(
        `${distro.id}: rolling release marked LOW_FRICTION; verify or document exception.`
    );
});

const secureBootEnabled = distros.filter((distro) => distro.secureBootOutOfBox);
secureBootEnabled.forEach((distro) => {
    warn(`${distro.id}: secureBootOutOfBox=true should be rare and defensible.`);
});

const secureBootRatio = secureBootEnabled.length / distros.length;
if (secureBootRatio > 0.25) {
    warn(
        `secureBootOutOfBox true appears on ${secureBootEnabled.length}/${distros.length} entries; double-check rarity.`
    );
}

const nvidiaInconsistent = distros.filter(
    (distro) => distro.nvidiaExperience === "GOOD" && distro.proprietarySupport === "NONE"
);

nvidiaInconsistent.forEach((distro) => {
    warn(
        `${distro.id}: nvidiaExperience is GOOD but proprietarySupport is NONE; these conflict.`
    );
});

if (warnings.length === 0) {
    console.log("✅ No distro audit warnings.");
} else {
    console.log(`⚠️ Distro audit warnings (${warnings.length}):`);
    warnings.forEach((message) => console.log(`- ${message}`));
}
