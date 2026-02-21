import { z } from "zod";

export const InstallerExperienceEnum = z.enum(["GUI", "MANUAL"]);
export const MaintenanceStyleEnum = z.enum(["LOW_FRICTION", "HANDS_ON"]);
export const ProprietarySupportEnum = z.enum(["FULL", "OPTIONAL", "NONE"]);
export const GamingSupportEnum = z.enum(["NONE", "LIMITED", "GOOD"]);
export const PrivacyPostureEnum = z.enum(["DEFAULT", "STRONG"]);
export const DesktopEnum = z.enum(["GNOME", "KDE", "XFCE", "CINNAMON", "MATE", "LXQT", "OTHER"]);
export const ReleaseModelEnum = z.enum(["FIXED", "ROLLING"]);
export const InitSystemEnum = z.enum(["SYSTEMD", "OPENRC", "RUNIT", "OTHER"]);
export const PackageManagerEnum = z.enum(["APT", "DNF", "PACMAN", "ZYPPER", "APK", "NIX", "XBPS", "PORTAGE", "OTHER"]);
export const NvidiaExperienceEnum = z.enum(["GOOD", "OK", "HARD", "UNKNOWN"]);

export const DistroSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().nullable().optional(),
    websiteUrl: z.string().nullable().optional(),
    documentationUrl: z.string().nullable().optional(),
    forumUrl: z.string().nullable().optional(),
    testDriveUrl: z.string().nullable().optional(),
    downloadUrl: z.string().nullable().optional(),
    distroSeaUrl: z.string().nullable().optional(),
    installerExperience: InstallerExperienceEnum,
    maintenanceStyle: MaintenanceStyleEnum,
    proprietarySupport: ProprietarySupportEnum,
    suitableForOldHardware: z.boolean(),
    gamingSupport: GamingSupportEnum,
    privacyPosture: PrivacyPostureEnum,
    supportedDesktops: z.array(DesktopEnum).min(1),
    releaseModel: ReleaseModelEnum,
    initSystem: InitSystemEnum,
    packageManager: PackageManagerEnum,
    immutable: z.boolean(),
    secureBootOutOfBox: z.boolean(),
    nvidiaExperience: NvidiaExperienceEnum,
});

export const DistroListSchema = z.array(DistroSchema);

export type Distro = z.infer<typeof DistroSchema>;
export type DistroList = z.infer<typeof DistroListSchema>;
