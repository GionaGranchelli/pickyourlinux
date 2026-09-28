import { DistroSchema, type Distro } from "../src/data/distro-types";

export type InvariantViolation = {
    code: string;
    message: string;
    distroIds: string[];
};

export type InvariantOptions = {
    /** Used for the freshness ratchet; defaults to today. */
    now?: Date;
    /** How old a lastVerified date may be before the ratchet fires. */
    staleMonths?: number;
    /** Source text of the compare view, checked against the distro schema keys. */
    compareViewSource?: string;
};

const CORE_LINK_FIELDS: Array<keyof Distro> = [
    "description",
    "imageUrl",
    "websiteUrl",
    "documentationUrl",
    "downloadUrl",
];

/** Distros in the same archive/shim family must not disagree about inherited facts. */
const UBUNTU_FAMILY = ["ubuntu", "kubuntu", "xubuntu", "lubuntu", "ubuntu_budgie", "ubuntu_studio"];

const UEFI_ARCHITECTURES = ["x86_64", "arm64"];

/** A stated answer must be satisfiable by at least one entry, or the picker lies to the user. */
const SATISFIABLE_ANSWERS: Array<{
    code: string;
    message: string;
    matches: (distro: Distro) => boolean;
}> = [
    {
        code: "proprietary_none_unsatisfiable",
        message: 'No distro has proprietarySupport="NONE", so "avoid proprietary software" can never be satisfied.',
        matches: (distro) => distro.proprietarySupport === "NONE",
    },
    {
        code: "secure_boot_unsatisfiable",
        message: 'No distro has secureBootOutOfBox=true, so "I need Secure Boot" can never be satisfied.',
        matches: (distro) => distro.secureBootOutOfBox,
    },
    {
        code: "old_hardware_unsatisfiable",
        message: 'No distro has suitableForOldHardware=true, so "I have old hardware" can never be satisfied.',
        matches: (distro) => distro.suitableForOldHardware,
    },
];

const monthsBetween = (from: Date, to: Date): number =>
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());

const isNonEmptyString = (value: unknown): boolean => typeof value === "string" && value.trim().length > 0;

/**
 * Semantic invariants for the distro dataset. Shape is already enforced by the Zod
 * schema; these catch the claims the schema cannot express.
 */
export function findInvariantViolations(distros: Distro[], options: InvariantOptions = {}): InvariantViolation[] {
    const violations: InvariantViolation[] = [];
    const now = options.now ?? new Date();
    const staleMonths = options.staleMonths ?? 18;

    const invalidLastVerified = distros.filter(
        (distro) => !isNonEmptyString(distro.lastVerified) || !/^\d{4}-\d{2}-\d{2}$/.test(distro.lastVerified)
    );
    if (invalidLastVerified.length > 0) {
        violations.push({
            code: "invalid_last_verified",
            message: "lastVerified must be a YYYY-MM-DD string.",
            distroIds: invalidLastVerified.map((distro) => distro.id),
        });
    }

    const unknownNvidia = distros.filter((distro) => distro.nvidiaExperience === "UNKNOWN");
    if (unknownNvidia.length > 0) {
        violations.push({
            code: "nvidia_unknown",
            message: "nvidiaExperience must be verified, not UNKNOWN.",
            distroIds: unknownNvidia.map((distro) => distro.id),
        });
    }

    const byName = new Map<string, string[]>();
    distros.forEach((distro) => {
        const key = distro.name.trim().toLowerCase();
        byName.set(key, [...(byName.get(key) ?? []), distro.id]);
    });
    const duplicateNames = [...byName.entries()].filter(([, ids]) => ids.length > 1);
    if (duplicateNames.length > 0) {
        violations.push({
            code: "duplicate_name",
            message: `Two entries describe the same distro: ${duplicateNames
                .map(([name, ids]) => `${name} (${ids.join(", ")})`)
                .join("; ")}.`,
            distroIds: duplicateNames.flatMap(([, ids]) => ids),
        });
    }

    const stale = distros.filter((distro) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(distro.lastVerified)) return false;
        return monthsBetween(new Date(distro.lastVerified), now) > staleMonths;
    });
    if (stale.length > 0) {
        violations.push({
            code: "stale_verification",
            message: `Verified more than ${staleMonths} months ago — re-verify the values or extend the window deliberately.`,
            distroIds: stale.map((distro) => distro.id),
        });
    }

    const missingCoreData = distros.filter((distro) =>
        CORE_LINK_FIELDS.some((field) => !isNonEmptyString(distro[field]))
    );
    if (missingCoreData.length > 0) {
        violations.push({
            code: "missing_core_data",
            message: `Missing one of: ${CORE_LINK_FIELDS.join(", ")}.`,
            distroIds: missingCoreData.map((distro) => distro.id),
        });
    }

    // Secure Boot is a UEFI feature: claiming it without a UEFI-capable architecture is wrong.
    const secureBootWithoutUefi = distros.filter(
        (distro) =>
            distro.secureBootOutOfBox && !distro.supportedArchitectures.some((arch) => UEFI_ARCHITECTURES.includes(arch))
    );
    if (secureBootWithoutUefi.length > 0) {
        violations.push({
            code: "secure_boot_without_uefi_arch",
            message: `secureBootOutOfBox=true without a UEFI architecture (${UEFI_ARCHITECTURES.join("/")}).`,
            distroIds: secureBootWithoutUefi.map((distro) => distro.id),
        });
    }

    // The engine only consults x86_64 / arm64 / x86 (eliminate.ts). A different spelling
    // (aarch64, armv7, i686) silently makes an architecture answer miss the entry.
    const ARCHITECTURE_VOCABULARY = ["x86_64", "arm64", "x86"];
    const unknownArchitectures = distros.filter((distro) =>
        distro.supportedArchitectures.some((arch) => !ARCHITECTURE_VOCABULARY.includes(arch))
    );
    if (unknownArchitectures.length > 0) {
        violations.push({
            code: "unknown_architecture",
            message: `supportedArchitectures must use the engine vocabulary (${ARCHITECTURE_VOCABULARY.join(", ")}).`,
            distroIds: unknownArchitectures.map((distro) => distro.id),
        });
    }

    const family = distros.filter((distro) => UBUNTU_FAMILY.includes(distro.id));
    if (family.length > 1) {
        const reference = family[0];
        const drifted = family.filter(
            (distro) =>
                distro.secureBootOutOfBox !== reference.secureBootOutOfBox ||
                distro.proprietarySupport !== reference.proprietarySupport
        );
        if (drifted.length > 0) {
            violations.push({
                code: "ubuntu_family_drift",
                message: `These share Ubuntu's archive and signed shim, so secureBootOutOfBox and proprietarySupport must agree with ${reference.id}.`,
                distroIds: drifted.map((distro) => distro.id),
            });
        }
    }

    SATISFIABLE_ANSWERS.forEach((rule) => {
        if (!distros.some(rule.matches)) {
            violations.push({ code: rule.code, message: rule.message, distroIds: [] });
        }
    });

    if (options.compareViewSource) {
        const schemaKeys = new Set(Object.keys(DistroSchema.shape));
        const renderedKeys = [...options.compareViewSource.matchAll(/\{\s*key:\s*"([^"]+)"/g)].map(
            (match) => match[1]
        );
        const unknownKeys = [...new Set(renderedKeys)].filter((key) => !schemaKeys.has(key));
        if (unknownKeys.length > 0) {
            violations.push({
                code: "compare_field_not_modelled",
                message: `The compare view renders keys that no distro entry can have: ${unknownKeys.join(", ")}.`,
                distroIds: [],
            });
        }
    }

    return violations;
}
