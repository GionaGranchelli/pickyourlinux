import { z } from "zod";

// --- 1. Enums (Legal Moves Only) ---
export const TagEnum = z.enum(["Gaming", "Privacy", "Server", "OldHardware", "Work"]);
export const ArchitectureEnum = z.enum(["x86_64", "arm64"]);

// --- 2. User Intent (The State) ---
export const UserIntentSchema = z.object({
    installation: z.enum(["GUI", "CLI_OK"]),
    maintenance: z.enum(["NO_TERMINAL", "TERMINAL_OK"]),
    proprietary: z.enum(["REQUIRED", "OPTIONAL", "AVOID"]),
    architecture: ArchitectureEnum,
    minRam: z.number().min(0),
    tags: z.array(TagEnum).default([]),
});
export type UserIntent = z.infer<typeof UserIntentSchema>;
export type IntentKey = keyof UserIntent;

// --- 3. Logic Primitives (VM Instructions) ---
const IntentKeyEnum = z.enum(Object.keys(UserIntentSchema.shape) as [IntentKey, ...IntentKey[]]);

export type Condition =
    | { field: IntentKey; op: "eq"; value: unknown }
    | { field: IntentKey; op: "neq"; value: unknown }
    | { field: IntentKey; op: "in"; value: unknown[] }
    | { field: IntentKey; op: "contains"; value: unknown }
    | { op: "and"; conditions: Condition[] }
    | { op: "or"; conditions: Condition[] };

export const ConditionSchema: z.ZodType<Condition> = z.lazy(() =>
    z.union([
        // Leaf Nodes
        z.object({ field: IntentKeyEnum, op: z.literal("eq"), value: z.any() }),
        z.object({ field: IntentKeyEnum, op: z.literal("neq"), value: z.any() }),
        z.object({ field: IntentKeyEnum, op: z.literal("in"), value: z.array(z.any()).min(1) }), // scalar in set
        z.object({ field: IntentKeyEnum, op: z.literal("contains"), value: z.any() }), // array contains scalar

        // Logical Operators (Recursive)
        z.object({ op: z.literal("and"), conditions: z.array(ConditionSchema).min(1) }),
        z.object({ op: z.literal("or"), conditions: z.array(ConditionSchema).min(1) }),
    ])
);

export const PatchSchema = z.discriminatedUnion("op", [
    z.object({ op: z.literal("set"), field: IntentKeyEnum, value: z.any() }),
    z.object({ op: z.literal("add_tag"), value: TagEnum }),
    z.object({ op: z.literal("remove_tag"), value: TagEnum }),
]);
export type Patch = z.infer<typeof PatchSchema>;

// --- 4. Question DSL ---
export const QuestionSchema = z.object({
    id: z.string(),
    text: z.string(),
    showIf: ConditionSchema.optional(),
    options: z
        .array(
            z.object({
                id: z.string(),
                label: z.string(),
                description: z.string().optional(),
                patches: z.array(PatchSchema),
                isDisqualifier: z.boolean().default(false),
            })
        )
        .min(1),
});

export type Question = z.infer<typeof QuestionSchema>;
export type QuestionOption = Question["options"][number];
