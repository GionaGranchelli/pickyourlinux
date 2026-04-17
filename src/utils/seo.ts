export const SITE_NAME = "Pick Your Linux";
export const SITE_URL = "https://pickyourlinux.org";
export const SITE_DESCRIPTION = "A deterministic Linux distro picker built with explicit rules, transparent constraints, and zero ranking heuristics.";
export const SITE_DEFAULT_TITLE = "Deterministic Linux distro picker";
export const SITE_AUTHOR = "Pick Your Linux Project";
export const SITE_THEME_COLOR = "#0f172a";
export const SOCIAL_IMAGE_PATH = "/og-preview.svg";

export const INDEXABLE_ROUTES = [
  "/",
  "/how-it-works",
  "/transparency",
  "/manifesto",
  "/distros",
  "/data-sources",
  "/contact",
] as const;

export const SITE_KEYWORDS = [
  "linux distro picker",
  "linux distribution picker",
  "choose a linux distro",
  "linux distro comparison",
  "linux distro quiz",
  "deterministic decision engine",
  "linux compatibility tool",
  "open source linux selector",
] as const;

export const OG_LOCALE_BY_CODE: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  it: "it_IT",
  fr: "fr_FR",
  de: "de_DE",
  nl: "nl_NL",
  pt: "pt_PT",
};

export const toAbsoluteUrl = (siteUrl: string, path: string) => {
  return new URL(path, siteUrl).toString();
};
