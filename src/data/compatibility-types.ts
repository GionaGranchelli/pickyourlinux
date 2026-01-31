import { z } from "zod";
import { ExclusionReasonKeySchema, InclusionReasonKeySchema } from "~/data/reason-templates";

export const CompatibilityResultSchema = z.object({
    distroId: z.string(),
    compatible: z.boolean(),
    includedBecause: z.array(InclusionReasonKeySchema),
    excludedBecause: z.array(ExclusionReasonKeySchema),
});

export const CompatibilityResultListSchema = z.array(CompatibilityResultSchema);

export type CompatibilityResult = z.infer<typeof CompatibilityResultSchema>;
export type CompatibilityResultList = z.infer<typeof CompatibilityResultListSchema>;
