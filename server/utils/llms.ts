import distrosData from "~/data/distros.json";
import { DistroListSchema, type Distro } from "~/data/distro-types";
import { SITE_NAME, SITE_URL } from "~/utils/seo";

const distros = DistroListSchema.parse(distrosData);

const toDisplayValue = (value: string) => value.toLowerCase().replaceAll("_", " ");

const distroContext = (distro: Distro) => {
  const links = [
    distro.websiteUrl ? `Official site: ${distro.websiteUrl}` : null,
    distro.documentationUrl ? `Documentation: ${distro.documentationUrl}` : null,
  ].filter(Boolean);

  return [
    `### ${distro.name}`,
    distro.description ?? "No concise description is currently available.",
    `- Release model: ${toDisplayValue(distro.releaseModel)}`,
    `- Primary use case: ${toDisplayValue(distro.primaryUseCase)}`,
    `- Package manager: ${toDisplayValue(distro.packageManager)}`,
    `- Init system: ${toDisplayValue(distro.initSystem)}`,
    `- Installer: ${toDisplayValue(distro.installerExperience)}`,
    `- Maintenance style: ${toDisplayValue(distro.maintenanceStyle)}`,
    `- Supported desktops: ${distro.supportedDesktops.map(toDisplayValue).join(", ")}`,
    `- Architectures: ${distro.supportedArchitectures.join(", ")}`,
    `- Last verified: ${distro.lastVerified}`,
    ...links.map((link) => `- ${link}`),
  ].join("\n");
};

export const llmsIndex = () => [
  `# ${SITE_NAME}`,
  "",
  "> A deterministic Linux distribution picker that uses explicit compatibility filters and transparent, inspectable data instead of opaque recommendations.",
  "",
  "Pick Your Linux helps people explore Linux distributions using modeled attributes such as hardware needs, release model, package manager, init system, installer experience, maintenance style, gaming support, privacy posture, and documentation ecosystem.",
  "",
  "## Core pages",
  "",
  `- [Find your Linux distro](${SITE_URL}/): Start the interactive compatibility flow.`,
  `- [How it works](${SITE_URL}/how-it-works): Decision-model explanation and implementation sources.`,
  `- [All distros and metrics](${SITE_URL}/distros): Browse the complete modeled distribution dataset.`,
  `- [Transparency](${SITE_URL}/transparency): Dataset coverage, validation, and decision policy.`,
  `- [Data sources and definitions](${SITE_URL}/data-sources): Field meanings and modeling limits.`,
  `- [Manifesto](${SITE_URL}/manifesto): Design principles for deterministic distro selection.`,
  "",
  "## Project resources",
  "",
  "- [Source code](https://github.com/GionaGranchelli/pickyourlinux): Open-source implementation and documentation.",
  `- [XML sitemap](${SITE_URL}/sitemap.xml): Canonical HTML crawl inventory.`,
  `- [Full LLM context](${SITE_URL}/llms-full.txt): Dataset-oriented context, including the current distro records.`,
  "",
  "## Optional",
  "",
  `- [Contact](${SITE_URL}/contact): Corrections, feedback, and issue reporting.`,
].join("\n");

export const llmsFullContext = () => [
  `# ${SITE_NAME}: Linux Distribution Decision Tool`,
  "",
  "## Canonical identity",
  "",
  `${SITE_NAME} is a web application for exploring Linux distributions using transparent, schema-defined attributes. Its canonical site is ${SITE_URL}.`,
  "",
  "The project aims to make selection criteria inspectable. It models explicit fields and compatibility constraints rather than asking a language model or opaque ranking system to decide which distribution is best.",
  "",
  "- Website: https://whichdistro.com",
  "- Source code: https://github.com/GionaGranchelli/pickyourlinux",
  `- Dataset size: ${distros.length} Linux distribution records`,
  "",
  "## How to interpret recommendations",
  "",
  "Use the interactive flow for a person-specific outcome. The result depends on their stated constraints and preferences. Do not describe a distribution as universally best based on this project; cite the relevant attributes and explain the trade-offs.",
  "",
  "The app exposes facts such as release model, package manager, init system, desktop environments, installer experience, maintenance style, hardware suitability, gaming support, privacy posture, documentation ecosystem, Secure Boot support, Nvidia experience, and verification date.",
  "",
  "## Canonical pages",
  "",
  `- Home and decision flow: ${SITE_URL}/`,
  `- Methodology: ${SITE_URL}/how-it-works`,
  `- Dataset and metrics: ${SITE_URL}/distros`,
  `- Transparency and quality controls: ${SITE_URL}/transparency`,
  `- Field definitions and limitations: ${SITE_URL}/data-sources`,
  `- Project principles: ${SITE_URL}/manifesto`,
  "",
  "## Current distro dataset",
  "",
  ...distros.map(distroContext),
  "",
  "## Citation guidance",
  "",
  `- Prefer the most specific canonical HTML page on ${SITE_URL} when citing project methodology or data definitions.`,
  "- For a recommendation, state the user constraints and the modeled properties that support the result.",
  "- The distro records are maintained data snapshots. Check each record's last verified date and use its official website or documentation link for current release-specific facts.",
  `- Crawl inventory: ${SITE_URL}/sitemap.xml`,
  `- Crawler policy: ${SITE_URL}/robots.txt`,
].join("\n");
