import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(__filename, "..", "..");
const jiti = require("jiti")(__filename, { esmResolve: true, alias: { "~": resolve(rootDir, "src") } });

jiti("./validate-distros.ts");
