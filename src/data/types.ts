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

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

const JsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
    z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.null(),
        z.array(JsonValueSchema),
        z.record(JsonValueSchema),
    ])
);

// --- 3. Logic Primitives (VM Instructions) ---
const IntentKeyEnum = z.enum(Object.keys(UserIntentSchema.shape) as [IntentKey, ...IntentKey[]]);

export type Condition =
    | { field: IntentKey; op: "eq"; value: JsonValue }
    | { field: IntentKey; op: "neq"; value: JsonValue }
    | { field: IntentKey; op: "in"; value: JsonValue[] }
    | { field: IntentKey; op: "contains"; value: JsonValue }
    | { op: "and"; conditions: Condition[] }
    | { op: "or"; conditions: Condition[] };

export const ConditionSchema: z.ZodType<Condition> = z.lazy(() =>
    z.union([
        // Leaf Nodes
        z.object({ field: IntentKeyEnum, op: z.literal("eq"), value: JsonValueSchema }),
        z.object({ field: IntentKeyEnum, op: z.literal("neq"), value: JsonValueSchema }),
        z.object({ field: IntentKeyEnum, op: z.literal("in"), value: z.array(JsonValueSchema).min(1) }), // scalar in set
        z.object({ field: IntentKeyEnum, op: z.literal("contains"), value: JsonValueSchema }), // array contains scalar

        // Logical Operators (Recursive)
        z.object({ op: z.literal("and"), conditions: z.array(ConditionSchema).min(1) }),
        z.object({ op: z.literal("or"), conditions: z.array(ConditionSchema).min(1) }),
    ])
);

export type Patch =
    | { op: "set"; field: IntentKey; value: JsonValue }
    | { op: "add_tag"; value: z.infer<typeof TagEnum> }
    | { op: "remove_tag"; value: z.infer<typeof TagEnum> };

export const PatchSchema: z.ZodType<Patch> = z.discriminatedUnion("op", [
    z.object({ op: z.literal("set"), field: IntentKeyEnum, value: JsonValueSchema }),
    z.object({ op: z.literal("add_tag"), value: TagEnum }),
    z.object({ op: z.literal("remove_tag"), value: TagEnum }),
]);

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
