import { z } from "zod";

export const InclusionReasonKeys = [
  "include_meets_requirements",
  "include_gaming_good",
  "include_gaming_limited",
  "include_privacy_strong",
  "include_old_hardware_suitable"
] as const;

export const ExclusionReasonKeys = [
  "exclude_installer_manual",
  "exclude_maintenance_hands_on",
  "exclude_proprietary_required",
  "exclude_proprietary_missing",
  "exclude_old_hardware_unsuitable"
] as const;

export const ConstraintKeys = [
  "constraint_installer_gui",
  "constraint_maintenance_low_friction",
  "constraint_proprietary_none",
  "constraint_proprietary_allowed",
  "constraint_old_hardware",
  "constraint_gaming_support",
  "constraint_privacy_strong"
] as const;

export const InclusionReasonKeySchema = z.enum(InclusionReasonKeys);
export const ExclusionReasonKeySchema = z.enum(ExclusionReasonKeys);
export const ConstraintKeySchema = z.enum(ConstraintKeys);

export type InclusionReasonKey = (typeof InclusionReasonKeys)[number];
export type ExclusionReasonKey = (typeof ExclusionReasonKeys)[number];
export type ConstraintKey = (typeof ConstraintKeys)[number];

export const InclusionReasonTemplates: Record<InclusionReasonKey, string> = {
  include_meets_requirements: "Meets your required constraints.",
  include_gaming_good: "Gaming support is good.",
  include_gaming_limited: "Gaming support is limited but available.",
  include_privacy_strong: "Has a strong privacy posture.",
  include_old_hardware_suitable: "Suitable for older hardware."
};

export const ExclusionReasonTemplates: Record<ExclusionReasonKey, string> = {
  exclude_installer_manual: "Requires a manual installer.",
  exclude_maintenance_hands_on: "Requires hands-on maintenance.",
  exclude_proprietary_required: "Relies on proprietary software.",
  exclude_proprietary_missing: "Does not support proprietary software.",
  exclude_old_hardware_unsuitable: "Not suitable for older hardware."
};

export const ConstraintTemplates: Record<ConstraintKey, string> = {
  constraint_installer_gui: "You want a graphical installer.",
  constraint_maintenance_low_friction: "You want low-friction maintenance without the terminal.",
  constraint_proprietary_none: "You want to avoid proprietary software.",
  constraint_proprietary_allowed: "You need access to proprietary software.",
  constraint_old_hardware: "You need support for older hardware.",
  constraint_gaming_support: "You care about gaming support.",
  constraint_privacy_strong: "You want strong privacy defaults."
};
