import { readdirSync, readFileSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const targetDirs = [resolve(rootDir, "src", "components"), resolve(rootDir, "src", "pages")];
const forbidden = ["~/engine/logic", "~/engine/eliminate", "~/engine/compatibility"];
const allowedExtensions = new Set([".ts", ".js", ".vue"]);

const violations = [];

const walk = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!allowedExtensions.has(extname(entry.name))) continue;
    const content = readFileSync(fullPath, "utf-8");
    forbidden.forEach((path) => {
      if (content.includes(path)) {
        violations.push({ file: fullPath, path });
      }
    });
  }
};

targetDirs.forEach((dir) => walk(dir));

if (violations.length > 0) {
  console.error("UI import boundary violations found:");
  for (const violation of violations) {
    console.error(`- ${violation.file} imports ${violation.path}`);
  }
  process.exit(1);
}

console.log("✅ Lint checks passed.");
