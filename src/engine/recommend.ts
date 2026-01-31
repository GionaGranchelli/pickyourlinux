import distrosData from "~/data/distros.json";
import { DistroListSchema, type Distro } from "~/data/distro-types";
import { evaluateCondition } from "~/engine/logic";
import type { Condition, UserIntent } from "~/data/types";
import { RecommendedDistroListSchema, type RecommendedDistro } from "~/data/recommendation-types";

export type DistroRecommendation = RecommendedDistro & { included: boolean };

type RuleCheck =
    | { op: "includes_intent"; distroField: "architectures"; intentField: "architecture" }
    | { op: "eq_value"; distroField: "installer" | "maintenance" | "proprietary"; value: string }
    | { op: "in_values"; distroField: "proprietary"; values: string[] }
    | { op: "lte_intent"; distroField: "minRam"; intentField: "minRam" }
    | { op: "tag_required"; tag: "Gaming" | "Privacy" | "Server" | "OldHardware" | "Work" };

type RecommendationRule = {
    id: string;
    when?: Condition;
    check: RuleCheck;
    includeReason: string;
    excludeReason: string;
    context?: Record<string, string | number | boolean>;
};

const RULES: RecommendationRule[] = [
    {
        id: "arch_support",
        check: { op: "includes_intent", distroField: "architectures", intentField: "architecture" },
        includeReason: "Supports {intent.architecture} architecture.",
        excludeReason: "Does not support {intent.architecture} architecture.",
    },
    {
        id: "min_ram",
        check: { op: "lte_intent", distroField: "minRam", intentField: "minRam" },
        includeReason: "Fits within {intent.minRam}GB RAM.",
        excludeReason: "Requires at least {distro.minRam}GB RAM.",
    },
    {
        id: "installer_gui",
        when: { field: "installation", op: "eq", value: "GUI" },
        check: { op: "eq_value", distroField: "installer", value: "GUI" },
        includeReason: "Offers a simple installer.",
        excludeReason: "Does not offer a simple installer.",
    },
    {
        id: "maintenance_no_terminal",
        when: { field: "maintenance", op: "eq", value: "NO_TERMINAL" },
        check: { op: "eq_value", distroField: "maintenance", value: "NO_TERMINAL" },
        includeReason: "Can be maintained without the terminal.",
        excludeReason: "Regular terminal use is expected.",
    },
    {
        id: "proprietary_avoid",
        when: { field: "proprietary", op: "eq", value: "AVOID" },
        check: { op: "eq_value", distroField: "proprietary", value: "AVOID" },
        includeReason: "Avoids proprietary software.",
        excludeReason: "Relies on proprietary software.",
    },
    {
        id: "proprietary_required",
        when: { field: "proprietary", op: "eq", value: "REQUIRED" },
        check: { op: "in_values", distroField: "proprietary", values: ["REQUIRED", "OPTIONAL"] },
        includeReason: "Supports proprietary software.",
        excludeReason: "Does not support proprietary software.",
    },
    {
        id: "tag_gaming",
        when: { field: "tags", op: "contains", value: "Gaming" },
        check: { op: "tag_required", tag: "Gaming" },
        includeReason: "Matches priority: {tag}.",
        excludeReason: "Does not match priority: {tag}.",
        context: { tag: "Gaming" },
    },
    {
        id: "tag_privacy",
        when: { field: "tags", op: "contains", value: "Privacy" },
        check: { op: "tag_required", tag: "Privacy" },
        includeReason: "Matches priority: {tag}.",
        excludeReason: "Does not match priority: {tag}.",
        context: { tag: "Privacy" },
    },
    {
        id: "tag_server",
        when: { field: "tags", op: "contains", value: "Server" },
        check: { op: "tag_required", tag: "Server" },
        includeReason: "Matches priority: {tag}.",
        excludeReason: "Does not match priority: {tag}.",
        context: { tag: "Server" },
    },
    {
        id: "tag_old_hardware",
        when: { field: "tags", op: "contains", value: "OldHardware" },
        check: { op: "tag_required", tag: "OldHardware" },
        includeReason: "Matches priority: {tag}.",
        excludeReason: "Does not match priority: {tag}.",
        context: { tag: "OldHardware" },
    },
    {
        id: "tag_work",
        when: { field: "tags", op: "contains", value: "Work" },
        check: { op: "tag_required", tag: "Work" },
        includeReason: "Matches priority: {tag}.",
        excludeReason: "Does not match priority: {tag}.",
        context: { tag: "Work" },
    },
];

const distros = DistroListSchema.parse(distrosData);

const renderTemplate = (
    template: string,
    intent: UserIntent,
    distro: Distro,
    context: Record<string, string | number | boolean> = {}
): string => {
    let output = template
        .replace(/\{intent\.([a-zA-Z0-9_]+)\}/g, (_, key) => String((intent as Record<string, unknown>)[key]))
        .replace(/\{distro\.([a-zA-Z0-9_]+)\}/g, (_, key) => String((distro as Record<string, unknown>)[key]));

    Object.entries(context).forEach(([key, value]) => {
        const pattern = new RegExp(`\\{${key}\\}`, "g");
        output = output.replace(pattern, String(value));
    });

    return output;
};

const evaluateCheck = (intent: UserIntent, distro: Distro, check: RuleCheck): boolean => {
    switch (check.op) {
        case "includes_intent":
            return distro[check.distroField].includes(intent[check.intentField]);
        case "eq_value":
            return distro[check.distroField] === check.value;
        case "in_values":
            return check.values.includes(distro[check.distroField]);
        case "lte_intent":
            return distro[check.distroField] <= intent[check.intentField];
        case "tag_required":
            return distro.tags.includes(check.tag);
        default:
            return false;
    }
};

const computeMatchedTags = (intent: UserIntent, distro: Distro): UserIntent["tags"] => {
    return intent.tags.filter((tag) => distro.tags.includes(tag));
};

export function recommendDistros(intent: UserIntent): DistroRecommendation[] {
    const recommendations = distros.map((distro) => {
        const includedReason: string[] = [];
        const excludedReason: string[] = [];

        RULES.forEach((rule) => {
            if (rule.when && !evaluateCondition(intent, rule.when)) return;

            const passed = evaluateCheck(intent, distro, rule.check);
            const reason = renderTemplate(
                passed ? rule.includeReason : rule.excludeReason,
                intent,
                distro,
                rule.context
            );

            if (passed) {
                includedReason.push(reason);
            } else {
                excludedReason.push(reason);
            }
        });

        const matchedTags = computeMatchedTags(intent, distro);
        const result: DistroRecommendation = {
            distroId: distro.id,
            includedReason,
            excludedReason,
            matchedTags,
            included: excludedReason.length === 0,
        };

        return result;
    });

    return RecommendedDistroListSchema.parse(
        recommendations.map(({ included, ...rest }) => rest)
    ).map((rec, index) => ({ ...rec, included: recommendations[index].included }));
}
