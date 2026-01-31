import { z } from "zod";
import { TagEnum } from "~/data/types";

export const RecommendedDistroSchema = z.object({
    distroId: z.string(),
    includedReason: z.array(z.string()),
    excludedReason: z.array(z.string()),
    matchedTags: z.array(TagEnum),
});

export const RecommendedDistroListSchema = z.array(RecommendedDistroSchema);

export type RecommendedDistro = z.infer<typeof RecommendedDistroSchema>;
export type RecommendedDistroList = z.infer<typeof RecommendedDistroListSchema>;
