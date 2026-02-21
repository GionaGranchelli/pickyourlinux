import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_QUESTIONS } from "../src/data/questions";
import distrosData from "../src/data/distros.json";
import { DistroListSchema, type Distro } from "../src/data/distro-types";
import type { Condition, Question, QuestionOption } from "../src/data/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");
const reportsDir = resolve(rootDir, "reports");
const jsonPath = resolve(reportsDir, "coverage_phase3.json");
const markdownPath = resolve(reportsDir, "coverage_phase3.md");

const distros = DistroListSchema.parse(distrosData);

type SetConstraint = {
    field: string;
    value: unknown;
};

type CoverageEntry = {
    questionId: string;
    optionId: string;
    constraints: SetConstraint[];
    mappedConstraints: SetConstraint[];
    unmappedConstraints: SetConstraint[];
    matchCount: number;
    distroIds: string[];
    flaggedLowCoverage: boolean;
};

const LOW_COVERAGE_THRESHOLD = 3;

const isAdvancedCondition = (condition: Condition): boolean => {
    if (condition.op === "and" || condition.op === "or") {
        return condition.conditions.some((child) => isAdvancedCondition(child));
    }

    if (condition.field !== "experience") return false;

    if (condition.op === "eq") {
        return condition.value === "ADVANCED";
    }

    if (condition.op === "in" && Array.isArray(condition.value)) {
        return condition.value.includes("ADVANCED");
    }

    return false;
};

const isAdvancedQuestion = (question: Question): boolean => {
    if (!question.showIf) return false;
    return isAdvancedCondition(question.showIf);
};

const extractSetConstraints = (option: QuestionOption): SetConstraint[] => {
    return option.patches
        .filter((patch) => patch.op === "set")
        .map((patch) => ({ field: patch.field, value: patch.value }));
};

const buildConstraintMatcher = (constraint: SetConstraint): ((distro: Distro) => boolean) | null => {
    switch (constraint.field) {
        case "installation": {
            if (constraint.value === "GUI") return (distro) => distro.installerExperience === "GUI";
            if (constraint.value === "CLI_OK") return (distro) => distro.installerExperience === "MANUAL";
            return null;
        }
        case "maintenance": {
            if (constraint.value === "NO_TERMINAL") return (distro) => distro.maintenanceStyle === "LOW_FRICTION";
            if (constraint.value === "TERMINAL_OK") return (distro) => distro.maintenanceStyle === "HANDS_ON";
            return null;
        }
        case "proprietary": {
            if (constraint.value === "REQUIRED") return (distro) => distro.proprietarySupport !== "NONE";
            if (constraint.value === "AVOID") return (distro) => distro.proprietarySupport === "NONE";
            if (constraint.value === "OPTIONAL") return () => true;
            return null;
        }
        case "desktopPreference": {
            if (constraint.value === "NO_PREFERENCE") return () => true;
            return (distro) => distro.supportedDesktops.includes(String(constraint.value));
        }
        case "releaseModel": {
            if (constraint.value === "NO_PREFERENCE") return () => true;
            return (distro) => distro.releaseModel === constraint.value;
        }
        case "initSystem": {
            if (constraint.value === "NO_PREFERENCE") return () => true;
            return (distro) => distro.initSystem === constraint.value;
        }
        case "packageManager": {
            if (constraint.value === "NO_PREFERENCE") return () => true;
            return (distro) => distro.packageManager === constraint.value;
        }
        case "immutablePreference": {
            if (constraint.value === "NO_PREFERENCE") return () => true;
            if (constraint.value === "PREFER_IMMUTABLE") return (distro) => distro.immutable;
            if (constraint.value === "PREFER_TRADITIONAL") return (distro) => !distro.immutable;
            return null;
        }
        case "secureBootNeeded": {
            if (constraint.value === true) return (distro) => distro.secureBootOutOfBox;
            if (constraint.value === false || constraint.value === null) return () => true;
            return null;
        }
        case "nvidiaTolerance": {
            if (constraint.value === "NO_PREFERENCE") return () => true;
            if (constraint.value === "WANT_EASY") return (distro) => distro.nvidiaExperience === "GOOD" || distro.nvidiaExperience === "OK";
            if (constraint.value === "OK_HANDS_ON") return (distro) => distro.nvidiaExperience !== "UNKNOWN";
            if (constraint.value === "AVOID_PROPRIETARY") return (distro) => distro.nvidiaExperience === "HARD";
            return null;
        }
        default:
            return null;
    }
};

const evaluateOptionCoverage = (question: Question, option: QuestionOption): CoverageEntry => {
    const constraints = extractSetConstraints(option);
    const mappedConstraints: SetConstraint[] = [];
    const unmappedConstraints: SetConstraint[] = [];
    const matchers: Array<(distro: Distro) => boolean> = [];

    for (const constraint of constraints) {
        const matcher = buildConstraintMatcher(constraint);

        if (matcher) {
            mappedConstraints.push(constraint);
            matchers.push(matcher);
            continue;
        }

        unmappedConstraints.push(constraint);
    }

    const matchedDistros = distros.filter((distro) => matchers.every((matcher) => matcher(distro)));
    const distroIds = matchedDistros.map((distro) => distro.id);

    return {
        questionId: question.id,
        optionId: option.id,
        constraints,
        mappedConstraints,
        unmappedConstraints,
        matchCount: distroIds.length,
        distroIds,
        flaggedLowCoverage: distroIds.length < LOW_COVERAGE_THRESHOLD,
    };
};

const advancedQuestions = ALL_QUESTIONS.filter(isAdvancedQuestion);
const entries = advancedQuestions.flatMap((question) => question.options.map((option) => evaluateOptionCoverage(question, option)));
const lowCoverageEntries = entries.filter((entry) => entry.flaggedLowCoverage);

const reportJson = {
    threshold: LOW_COVERAGE_THRESHOLD,
    advancedQuestionIds: advancedQuestions.map((question) => question.id),
    totalOptionsAudited: entries.length,
    lowCoverageOptions: lowCoverageEntries.length,
    entries,
};

const toCode = (value: unknown): string => `\`${String(value)}\``;

const reportLines: string[] = [
    "# Phase 3 Coverage Audit",
    "",
    `Threshold for low coverage: < ${LOW_COVERAGE_THRESHOLD}`,
    `Advanced questions audited: ${advancedQuestions.length}`,
    `Options audited: ${entries.length}`,
    `Low coverage options: ${lowCoverageEntries.length}`,
    "",
    "## Flagged Options (<3 matches)",
    "",
];

if (lowCoverageEntries.length === 0) {
    reportLines.push("No low-coverage options found.");
    reportLines.push("");
} else {
    for (const entry of lowCoverageEntries) {
        reportLines.push(`- ${toCode(entry.questionId)} / ${toCode(entry.optionId)} -> ${entry.matchCount}`);
        reportLines.push(`  - Distros: ${entry.distroIds.length > 0 ? entry.distroIds.map(toCode).join(", ") : "(none)"}`);
        if (entry.unmappedConstraints.length > 0) {
            const unmapped = entry.unmappedConstraints.map((item) => `${item.field}=${String(item.value)}`).join(", ");
            reportLines.push(`  - Unmapped constraints: ${unmapped}`);
        }
    }
    reportLines.push("");
}

reportLines.push("## Full Option Coverage");
reportLines.push("");

for (const entry of entries) {
    const status = entry.flaggedLowCoverage ? "LOW" : "OK";
    reportLines.push(`- ${toCode(entry.questionId)} / ${toCode(entry.optionId)}: ${entry.matchCount} (${status})`);
    reportLines.push(`  - Distros: ${entry.distroIds.length > 0 ? entry.distroIds.map(toCode).join(", ") : "(none)"}`);
    if (entry.mappedConstraints.length > 0) {
        const mapped = entry.mappedConstraints.map((item) => `${item.field}=${String(item.value)}`).join(", ");
        reportLines.push(`  - Mapped constraints: ${mapped}`);
    }
    if (entry.unmappedConstraints.length > 0) {
        const unmapped = entry.unmappedConstraints.map((item) => `${item.field}=${String(item.value)}`).join(", ");
        reportLines.push(`  - Unmapped constraints: ${unmapped}`);
    }
}

mkdirSync(reportsDir, { recursive: true });
writeFileSync(jsonPath, `${JSON.stringify(reportJson, null, 2)}\n`, "utf-8");
writeFileSync(markdownPath, `${reportLines.join("\n")}\n`, "utf-8");

console.log(`✅ Wrote ${jsonPath}`);
console.log(`✅ Wrote ${markdownPath}`);
console.log(`⚠️ Low coverage options (<${LOW_COVERAGE_THRESHOLD}): ${lowCoverageEntries.length}`);
