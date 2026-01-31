import { z } from "zod";
import { ArchitectureEnum, TagEnum } from "~/data/types";

export const DistroSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    architectures: z.array(ArchitectureEnum).min(1),
    installer: z.enum(["GUI", "CLI_OK"]),
    maintenance: z.enum(["NO_TERMINAL", "TERMINAL_OK"]),
    proprietary: z.enum(["REQUIRED", "OPTIONAL", "AVOID"]),
    minRam: z.number().min(0),
    tags: z.array(TagEnum).default([]),
});

export const DistroListSchema = z.array(DistroSchema);

export type Distro = z.infer<typeof DistroSchema>;
export type DistroList = z.infer<typeof DistroListSchema>;
