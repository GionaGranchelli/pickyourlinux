import { z } from "zod";

export const InclusionReasonKeys = [
  "include_meets_requirements",
  "include_gaming_good",
  "include_gaming_limited",
  "include_privacy_strong",
  "include_old_hardware_suitable",
  "include_desktop_match",
  "include_release_model_match",
  "include_init_system_match",
  "include_package_manager_match"
] as const;

export const ExclusionReasonKeys = [
  "exclude_installer_manual",
  "exclude_maintenance_hands_on",
  "exclude_proprietary_required",
  "exclude_proprietary_missing",
  "exclude_old_hardware_unsuitable",
  "exclude_secure_boot_unavailable",
  "exclude_nvidia_hard",
  "exclude_nvidia_proprietary_required"
] as const;

export const ConstraintKeys = [
  "constraint_installer_gui",
  "constraint_maintenance_low_friction",
  "constraint_proprietary_none",
  "constraint_proprietary_allowed",
  "constraint_old_hardware",
  "constraint_gaming_support",
  "constraint_privacy_strong",
  "constraint_secure_boot_required",
  "constraint_nvidia_easy",
  "constraint_nvidia_avoid_proprietary",
  "constraint_desktop_gnome",
  "constraint_desktop_kde",
  "constraint_desktop_xfce",
  "constraint_desktop_cinnamon",
  "constraint_desktop_mate",
  "constraint_desktop_lxqt",
  "constraint_release_fixed",
  "constraint_release_rolling",
  "constraint_init_systemd",
  "constraint_init_openrc",
  "constraint_init_runit",
  "constraint_pkg_apt",
  "constraint_pkg_dnf",
  "constraint_pkg_pacman",
  "constraint_pkg_zypper",
  "constraint_pkg_apk",
  "constraint_pkg_nix"
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
  include_old_hardware_suitable: "Suitable for older hardware.",
  include_desktop_match: "Matches your desktop preference.",
  include_release_model_match: "Matches your release model preference.",
  include_init_system_match: "Matches your init system preference.",
  include_package_manager_match: "Matches your package manager preference."
};

export const ExclusionReasonTemplates: Record<ExclusionReasonKey, string> = {
  exclude_installer_manual: "Requires a manual installer.",
  exclude_maintenance_hands_on: "Requires hands-on maintenance.",
  exclude_proprietary_required: "Relies on proprietary software.",
  exclude_proprietary_missing: "Does not support proprietary software.",
  exclude_old_hardware_unsuitable: "Not suitable for older hardware.",
  exclude_secure_boot_unavailable: "Does not support Secure Boot out of the box.",
  exclude_nvidia_hard: "NVIDIA setup is likely to be hands-on.",
  exclude_nvidia_proprietary_required: "Likely requires proprietary NVIDIA drivers."
};

export const ConstraintTemplates: Record<ConstraintKey, string> = {
  constraint_installer_gui: "You want a graphical installer.",
  constraint_maintenance_low_friction: "You want low-friction maintenance without the terminal.",
  constraint_proprietary_none: "You want to avoid proprietary software.",
  constraint_proprietary_allowed: "You need access to proprietary software.",
  constraint_old_hardware: "You need support for older hardware.",
  constraint_gaming_support: "You care about gaming support.",
  constraint_privacy_strong: "You want strong privacy defaults.",
  constraint_secure_boot_required: "You need Secure Boot to work out of the box.",
  constraint_nvidia_easy: "You want NVIDIA to be easy to set up.",
  constraint_nvidia_avoid_proprietary: "You want to avoid proprietary NVIDIA drivers.",
  constraint_desktop_gnome: "You prefer the GNOME desktop.",
  constraint_desktop_kde: "You prefer the KDE desktop.",
  constraint_desktop_xfce: "You prefer the Xfce desktop.",
  constraint_desktop_cinnamon: "You prefer the Cinnamon desktop.",
  constraint_desktop_mate: "You prefer the MATE desktop.",
  constraint_desktop_lxqt: "You prefer the LXQt desktop.",
  constraint_release_fixed: "You prefer fixed releases.",
  constraint_release_rolling: "You prefer rolling releases.",
  constraint_init_systemd: "You prefer systemd.",
  constraint_init_openrc: "You prefer OpenRC.",
  constraint_init_runit: "You prefer runit.",
  constraint_pkg_apt: "You prefer the APT package manager.",
  constraint_pkg_dnf: "You prefer the DNF package manager.",
  constraint_pkg_pacman: "You prefer the pacman package manager.",
  constraint_pkg_zypper: "You prefer the Zypper package manager.",
  constraint_pkg_apk: "You prefer the APK package manager.",
  constraint_pkg_nix: "You prefer the Nix package manager."
};
