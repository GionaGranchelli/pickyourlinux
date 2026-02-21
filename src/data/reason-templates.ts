import { z } from "zod";

export const InclusionReasonKeys = [
  "include_meets_requirements",
  "include_installer_gui_match",
  "include_maintenance_low_friction_match",
  "include_proprietary_none_match",
  "include_proprietary_supported",
  "include_secure_boot_supported",
  "include_nvidia_easy_match",
  "include_gaming_good",
  "include_gaming_limited",
  "include_privacy_strong",
  "include_old_hardware_suitable",
  "include_desktop_match",
  "include_release_model_match",
  "include_init_system_match",
  "include_package_manager_match",
  "include_immutable_match"
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
  "constraint_pkg_nix",
  "constraint_pkg_xbps",
  "constraint_pkg_portage",
  "constraint_immutable_prefer",
  "constraint_immutable_avoid"
] as const;

export const InclusionReasonKeySchema = z.enum(InclusionReasonKeys);
export const ExclusionReasonKeySchema = z.enum(ExclusionReasonKeys);
export const ConstraintKeySchema = z.enum(ConstraintKeys);

export type InclusionReasonKey = (typeof InclusionReasonKeys)[number];
export type ExclusionReasonKey = (typeof ExclusionReasonKeys)[number];
export type ConstraintKey = (typeof ConstraintKeys)[number];
