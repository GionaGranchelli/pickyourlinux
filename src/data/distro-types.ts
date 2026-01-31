import { z } from "zod";

export const InstallerExperienceEnum = z.enum(["GUI", "MANUAL"]);
export const MaintenanceStyleEnum = z.enum(["LOW_FRICTION", "HANDS_ON"]);
export const ProprietarySupportEnum = z.enum(["FULL", "OPTIONAL", "NONE"]);
export const GamingSupportEnum = z.enum(["NONE", "LIMITED", "GOOD"]);
export const PrivacyPostureEnum = z.enum(["DEFAULT", "STRONG"]);

export const DistroSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    installerExperience: InstallerExperienceEnum,
    maintenanceStyle: MaintenanceStyleEnum,
    proprietarySupport: ProprietarySupportEnum,
    suitableForOldHardware: z.boolean(),
    gamingSupport: GamingSupportEnum,
    privacyPosture: PrivacyPostureEnum,
});

export const DistroListSchema = z.array(DistroSchema);

export type Distro = z.infer<typeof DistroSchema>;
export type DistroList = z.infer<typeof DistroListSchema>;
