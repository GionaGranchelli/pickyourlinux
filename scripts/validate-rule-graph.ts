#!/usr/bin/env ts-node
/**
 * validate-rule-graph.ts
 *
 * Rule Graph Validator for PickYourLinux DSL
 *
 * What this does:
 *   1. Parses the question DSL to build a directed dependency graph
 *   2. Detects cycles in question dependencies
 *   3. Finds unreachable showIf conditions (field consumed before set)
 *   4. Checks distro reachability (dead distros)
 *   5. Audits Phase 3 option coverage (trap UX detection)
 *   6. Outputs: reports/rule_graph.json, reports/rule_graph.md, reports/rule_graph.dot
 *
 * Usage:
 *   node scripts/validate-rule-graph.js
 *   Exit 1 = cycle detected (hard error)
 *   Exit 0 = passed (warnings may still be printed)
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";

// Imports from the project
import { type Condition, type Question, type QuestionOption, type IntentKey } from "~/data/types";
import { type Distro } from "~/data/distro-types";
import { ALL_QUESTIONS } from "~/data/questions";
import distrosData from "~/data/distros.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distros = distrosData as Distro[];

// ---------------------------------------------------------------------------
// Graph structures
// ---------------------------------------------------------------------------

interface GraphNode {
  id: string;
  phase: "PHASE_0" | "PHASE_1" | "PHASE_2" | "PHASE_3" | "UNKNOWN";
  setsFields: string[];       // fields set by patches in this question's options
  consumesFields: string[];   // fields referenced in showIf
}

interface GraphEdge {
  from: string;   // question that sets a field
  to: string;     // question that consumes that field in showIf
  via: string;    // the field name creating the dependency
}

interface CycleReport {
  path: string[];
  via: string;
}

interface DistroReachability {
  distroId: string;
  distroName: string;
  reachable: boolean;
  matchingPaths: number;
  warning?: string;
}

interface CoverageReport {
  questionId: string;
  optionId: string;
  field: string;
  value: unknown;
  matchCount: number;
  distroIds: string[];
  isTrap: boolean; // true if matchCount < 3
}

interface GraphReport {
  nodes: GraphNode[];
  edges: GraphEdge[];
  mermaid?: string;
  cycles: CycleReport[];
  unreachableConditions: string[];
  deadDistros: DistroReachability[];
  narrowDistros: DistroReachability[];
  coverageReport: CoverageReport[];
  summary: {
    totalQuestions: number;
    totalDistros: number;
    totalEdges: number;
    cycleCount: number;
    deadDistroCount: number;
    narrowDistroCount: number;
    trapOptionCount: number;
    passed: boolean;
  };
}

// ---------------------------------------------------------------------------
// Helpers: Condition parsing
// ---------------------------------------------------------------------------

function extractFieldsFromCondition(condition: Condition): string[] {
  if ("field" in condition) {
    return [condition.field];
  }
  if ("conditions" in condition) {
    return condition.conditions.flatMap(extractFieldsFromCondition);
  }
  return [];
}

function extractPatchedFields(options: QuestionOption[]): string[] {
  const fields: string[] = [];
  for (const option of options) {
    for (const patch of option.patches) {
      if (patch.op === "set") {
        fields.push(patch.field);
      }
    }
  }
  return [...new Set(fields)];
}

// ---------------------------------------------------------------------------
// Phase inference
// ---------------------------------------------------------------------------

function inferPhase(question: Question): GraphNode["phase"] {
  if (!question.showIf) return "PHASE_1";

  const condStr = JSON.stringify(question.showIf);

  if (condStr.includes('"ADVANCED"')) return "PHASE_3";
  if (
    condStr.includes('"INTERMEDIATE"') &&
    !condStr.includes('"ADVANCED"')
  )
    return "PHASE_2";
  if (condStr.includes('"BEGINNER"')) return "PHASE_2";

  return "UNKNOWN";
}

// ---------------------------------------------------------------------------
// Graph builder
// ---------------------------------------------------------------------------

function buildGraph(questions: Question[]): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  fieldSetBy: Map<string, string[]>; // field -> [questionId, ...]
} {
  const nodes: GraphNode[] = [];
  const fieldSetBy = new Map<string, string[]>();

  // First pass: build nodes and record which questions set which fields
  for (const q of questions) {
    const setsFields = extractPatchedFields(q.options);
    const consumesFields = q.showIf
      ? extractFieldsFromCondition(q.showIf)
      : [];

    nodes.push({
      id: q.id,
      phase: inferPhase(q),
      setsFields,
      consumesFields,
    });

    for (const field of setsFields) {
      if (!fieldSetBy.has(field)) fieldSetBy.set(field, []);
      fieldSetBy.get(field)!.push(q.id);
    }
  }

  // Second pass: build edges (A -> B if A sets a field that B's showIf consumes)
  const edges: GraphEdge[] = [];
  for (const node of nodes) {
    for (const consumedField of node.consumesFields) {
      const setters = fieldSetBy.get(consumedField) ?? [];
      for (const setterId of setters) {
        if (setterId !== node.id) {
          edges.push({ from: setterId, to: node.id, via: consumedField });
        }
      }
    }
  }

  return { nodes, edges, fieldSetBy };
}

// ---------------------------------------------------------------------------
// Cycle detection (DFS with coloring)
// ---------------------------------------------------------------------------

function detectCycles(
  nodes: GraphNode[],
  edges: GraphEdge[]
): CycleReport[] {
  const adjacency = new Map<string, { to: string; via: string }[]>();
  for (const node of nodes) adjacency.set(node.id, []);
  for (const edge of edges) {
    adjacency.get(edge.from)?.push({ to: edge.to, via: edge.via });
  }

  // 0 = white (unvisited), 1 = gray (in stack), 2 = black (done)
  const color = new Map<string, number>();
  const parent = new Map<string, { from: string; via: string }>();
  for (const node of nodes) color.set(node.id, 0);

  const cycles: CycleReport[] = [];

  function dfs(nodeId: string) {
    color.set(nodeId, 1);
    for (const { to, via } of adjacency.get(nodeId) ?? []) {
      if (color.get(to) === 1) {
        // Back edge found — reconstruct cycle path
        const cyclePath: string[] = [];
        let cur = nodeId;
        while (cur !== to) {
          cyclePath.unshift(cur);
          const p = parent.get(cur);
          if (!p) break;
          cur = p.from;
        }
        cyclePath.unshift(to);
        cyclePath.push(to);
        cycles.push({ path: cyclePath, via });
      } else if (color.get(to) === 0) {
        parent.set(to, { from: nodeId, via });
        dfs(to);
      }
    }
    color.set(nodeId, 2);
  }

  for (const node of nodes) {
    if (color.get(node.id) === 0) dfs(node.id);
  }

  return cycles;
}

// ---------------------------------------------------------------------------
// Unreachable condition detection
// ---------------------------------------------------------------------------

function detectUnreachableConditions(
  questions: Question[],
  fieldSetBy: Map<string, string[]>
): string[] {
  const unreachable: string[] = [];

  for (const q of questions) {
    if (!q.showIf) continue;
    const consumed = extractFieldsFromCondition(q.showIf);
    for (const field of consumed) {
      // Skip tag fields and experience (set by initial question)
      if (field === "tags" || field === "experience") continue;
      if (!fieldSetBy.has(field) || fieldSetBy.get(field)!.length === 0) {
        unreachable.push(
          `Question "${q.id}" consumes field "${field}" which is never set by any question`
        );
      }
    }
  }

  return unreachable;
}

// ---------------------------------------------------------------------------
// Distro reachability
// ---------------------------------------------------------------------------

function checkDistroReachability(
  questions: Question[],
  distros: Distro[]
): { reachability: DistroReachability[] } {
  const fieldPatchValues = new Map<string, Set<unknown>>();

  for (const q of questions) {
    for (const opt of q.options) {
      for (const patch of opt.patches) {
        if (patch.op === "set") {
          if (!fieldPatchValues.has(patch.field))
            fieldPatchValues.set(patch.field, new Set());
          fieldPatchValues.get(patch.field)!.add(patch.value);
        }
      }
    }
  }

  const checkableFields: (keyof Distro)[] = [
    "installerExperience",
    "maintenanceStyle",
    "proprietarySupport",
    "releaseModel",
    "initSystem",
    "packageManager",
    "nvidiaExperience",
  ];

  const reachability: DistroReachability[] = distros.map((distro) => {
    let matchingPaths = 0;
    let unmatchedCriticalFields = 0;

    for (const field of checkableFields) {
      const distroValue = distro[field];
      const patchedValues = fieldPatchValues.get(field as string);

      if (!patchedValues) continue;

      if (patchedValues.has(distroValue)) {
        matchingPaths++;
      } else {
        if (["initSystem", "packageManager"].includes(field as string)) {
          unmatchedCriticalFields++;
        }
      }
    }

    const reachable = matchingPaths > 0;
    const warning =
      unmatchedCriticalFields > 0
        ? `${unmatchedCriticalFields} critical field(s) (initSystem/packageManager) ` +
          `have values not produced by any DSL patch — distro may be unreachable via Phase 3`
        : undefined;

    return {
      distroId: distro.id,
      distroName: distro.name,
      reachable,
      matchingPaths,
      warning,
    };
  });

  return { reachability };
}

// ---------------------------------------------------------------------------
// Coverage audit (trap UX detection)
// ---------------------------------------------------------------------------

function auditCoverage(
  questions: Question[],
  distros: Distro[]
): CoverageReport[] {
  const reports: CoverageReport[] = [];

  const phase3Questions = questions.filter((q) => {
    if (!q.showIf) return false;
    return JSON.stringify(q.showIf).includes('"ADVANCED"');
  });

  const fieldToDistroKey: Record<string, keyof Distro> = {
    installation: "installerExperience",
    maintenance: "maintenanceStyle",
    proprietary: "proprietarySupport",
    releaseModel: "releaseModel",
    initSystem: "initSystem",
    packageManager: "packageManager",
    gpu: "nvidiaExperience",
    secureBootNeeded: "secureBootOutOfBox",
    desktopPreference: "supportedDesktops",
  };

  const valueMap: Record<string, Record<string, unknown>> = {
    installation: { GUI: "GUI", CLI_OK: "MANUAL" },
    maintenance: { NO_TERMINAL: "LOW_FRICTION", TERMINAL_OK: "HANDS_ON" },
    proprietary: {
      REQUIRED: "FULL",
      OPTIONAL: "OPTIONAL",
      AVOID: "NONE",
      NONE: "NONE",
    },
    releaseModel: { FIXED: "FIXED", ROLLING: "ROLLING" },
    initSystem: {
      SYSTEMD: "SYSTEMD",
      OPENRC: "OPENRC",
      RUNIT: "RUNIT",
    },
    packageManager: {
      APT: "APT",
      DNF: "DNF",
      PACMAN: "PACMAN",
      ZYPPER: "ZYPPER",
      APK: "APK",
      NIX: "NIX",
      XBPS: "XBPS",
      PORTAGE: "PORTAGE"
    },
  };

  for (const q of phase3Questions) {
    for (const opt of q.options) {
      // Skip neutral options that don't imply a narrowing choice
      if (["no_preference", "not_sure", "still_unsure"].includes(opt.id)) continue;
      if (opt.patches.length === 0) continue;

      for (const patch of opt.patches) {
        if (patch.op !== "set") continue;

        // Skip context-only fields that don't narrow the distro list
        if (patch.field === "gpu") continue;

        const distroKey = fieldToDistroKey[patch.field];
        if (!distroKey) continue;

        const distroValue =
          valueMap[patch.field]?.[String(patch.value)] ?? patch.value;

        const matchingDistros = distros.filter((d) => {
          const dv = d[distroKey];
          if (Array.isArray(dv)) {
            return (dv as unknown[]).includes(distroValue);
          }
          return dv === distroValue;
        });

        reports.push({
          questionId: q.id,
          optionId: opt.id,
          field: patch.field,
          value: patch.value,
          matchCount: matchingDistros.length,
          distroIds: matchingDistros.map((d) => d.id),
          isTrap: matchingDistros.length < 3,
        });
      }
    }
  }

  return reports;
}

// ---------------------------------------------------------------------------
// Output generators
// ---------------------------------------------------------------------------

function generateDot(nodes: GraphNode[], edges: GraphEdge[]): string {
  const phaseColors: Record<GraphNode["phase"], string> = {
    PHASE_0: "#e8f4f8",
    PHASE_1: "#d4edda",
    PHASE_2: "#fff3cd",
    PHASE_3: "#f8d7da",
    UNKNOWN: "#e2e3e5",
  };

  const lines: string[] = [
    "digraph RuleGraph {",
    '  rankdir=TB;',
    '  node [shape=box, style=filled, fontname="Helvetica", fontsize=10];',
    "",
    "  // Nodes by phase",
  ];

  for (const node of nodes) {
    const color = phaseColors[node.phase];
    const label = node.id.replace(/^q_/, "");
    lines.push(
      `  "${node.id}" [label="${label}", fillcolor="${color}"];`
    );
  }

  lines.push("", "  // Dependency edges");
  for (const edge of edges) {
    lines.push(
      `  "${edge.from}" -> "${edge.to}" [label="${edge.via}", fontsize=8];`
    );
  }

  lines.push("", "  // Legend");
  lines.push('  subgraph cluster_legend {');
  lines.push('    label="Legend";');
  lines.push(`    "Phase 0" [fillcolor="${phaseColors.PHASE_0}"];`);
  lines.push(`    "Phase 1" [fillcolor="${phaseColors.PHASE_1}"];`);
  lines.push(`    "Phase 2" [fillcolor="${phaseColors.PHASE_2}"];`);
  lines.push(`    "Phase 3" [fillcolor="${phaseColors.PHASE_3}"];`);
  lines.push('  }');

  lines.push("}");
  return lines.join("\n");
}

function generateMermaid(nodes: GraphNode[], edges: GraphEdge[]): string {
  const lines: string[] = ["graph TD"];

  for (const node of nodes) {
    const label = node.id.replace(/^q_/, "");
    lines.push(`  ${node.id}["${label}"]`);
  }

  for (const edge of edges) {
    lines.push(`  ${edge.from} -->|${edge.via}| ${edge.to}`);
  }

  // Add phase classes
  lines.push("");
  lines.push("  classDef phase1 fill:#d4edda,stroke:#28a745");
  lines.push("  classDef phase2 fill:#fff3cd,stroke:#ffc107");
  lines.push("  classDef phase3 fill:#f8d7da,stroke:#dc3545");

  const p1 = nodes.filter(n => n.phase === "PHASE_1").map(n => n.id);
  const p2 = nodes.filter(n => n.phase === "PHASE_2").map(n => n.id);
  const p3 = nodes.filter(n => n.phase === "PHASE_3").map(n => n.id);

  if (p1.length) lines.push(`  class ${p1.join(",")} phase1`);
  if (p2.length) lines.push(`  class ${p2.join(",")} phase2`);
  if (p3.length) lines.push(`  class ${p3.join(",")} phase3`);

  return lines.join("\n");
}

function generateMarkdown(report: GraphReport): string {
  const { summary } = report;
  const status = summary.passed ? "✅ PASSED" : "❌ FAILED";

  const lines: string[] = [
    "# Rule Graph Validation Report",
    "",
    `**Status:** ${status}`,
    `**Generated:** ${new Date().toISOString()}`,
    "",
    "---",
    "",
    "## Summary",
    "",
    `| Metric | Value |`,
    `|--------|-------|`,
    `| Total Questions | ${summary.totalQuestions} |`,
    `| Total Distros | ${summary.totalDistros} |`,
    `| Dependency Edges | ${summary.totalEdges} |`,
    `| Cycles Detected | ${summary.cycleCount} |`,
    `| Dead Distros | ${summary.deadDistroCount} |`,
    `| Narrow-Path Distros (<3 routes) | ${summary.narrowDistroCount} |`,
    `| Trap Options (Phase 3, <3 distro matches) | ${summary.trapOptionCount} |`,
    "",
    "---",
    "",
  ];

  lines.push("## Cycle Detection");
  if (report.cycles.length === 0) {
    lines.push("", "✅ No cycles detected.", "");
  } else {
    lines.push("", "❌ **Cycles found — these are hard errors:**", "");
    for (const cycle of report.cycles) {
      lines.push(`- \`${cycle.path.join(" → ")}\` (via field: \`${cycle.via}\`)`);
    }
    lines.push("");
  }

  lines.push("## Unreachable Conditions");
  if (report.unreachableConditions.length === 0) {
    lines.push("", "✅ All consumed fields are set by at least one question.", "");
  } else {
    lines.push("", "⚠️ **Unreachable conditions found:**", "");
    for (const u of report.unreachableConditions) {
      lines.push(`- ${u}`);
    }
    lines.push("");
  }

  lines.push("## Phase 3 Coverage Audit (Trap UX Detection)");
  lines.push("");

  const traps = report.coverageReport.filter((r) => r.isTrap);
  const safe = report.coverageReport.filter((r) => !r.isTrap);

  if (traps.length === 0) {
    lines.push("✅ All Phase 3 options match 3+ distros.", "");
  } else {
    lines.push(
      `⚠️ **${traps.length} option(s) match fewer than 3 distros — potential trap UX:**`,
      ""
    );
    lines.push(
      "| Question | Option | Field | Value | Matches | Distros |",
      "|----------|--------|-------|-------|---------|---------|"
    );
    for (const trap of traps) {
      lines.push(
        `| \`${trap.questionId}\` | \`${trap.optionId}\` | ${trap.field} | ${trap.value} | **${trap.matchCount}** | ${trap.distroIds.join(", ") || "none"} |`
      );
    }
    lines.push("");
  }

  if (safe.length > 0) {
    lines.push("<details><summary>✅ Safe options (3+ matches)</summary>", "");
    lines.push(
      "| Question | Option | Field | Value | Matches |",
      "|----------|--------|-------|-------|---------|"
    );
    for (const s of safe) {
      lines.push(
        `| \`${s.questionId}\` | \`${s.optionId}\` | ${s.field} | ${s.value} | ${s.matchCount} |`
      );
    }
    lines.push("", "</details>", "");
  }

  lines.push("## Distro Reachability");
  lines.push("");

  const dead = report.deadDistros;
  const narrow = report.narrowDistros;

  if (dead.length === 0 && narrow.length === 0) {
    lines.push("✅ All distros are reachable via at least one question path.", "");
  } else {
    if (dead.length > 0) {
      lines.push(`❌ **${dead.length} dead distro(s) — never reachable:**`, "");
      for (const d of dead) {
        lines.push(`- \`${d.distroId}\` (${d.distroName})`);
      }
      lines.push("");
    }
    if (narrow.length > 0) {
      lines.push(
        `⚠️ **${narrow.length} distro(s) with narrow reachability or field warnings:**`,
        ""
      );
      for (const d of narrow) {
        lines.push(`- \`${d.distroId}\` (${d.distroName}): ${d.warning}`);
      }
      lines.push("");
    }
  }

  lines.push("## Dependency Graph");
  lines.push("");
  lines.push("| From | To | Via Field |");
  lines.push("|------|----|-----------|");
  for (const edge of report.edges) {
    lines.push(`| \`${edge.from}\` | \`${edge.to}\` | \`${edge.via}\` |`);
  }
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const outputDir = path.resolve(process.cwd(), "reports");

  console.log("🔍 PickYourLinux — Rule Graph Validator");
  console.log("=========================================");
  console.log(`✓ Loaded ${distros.length} distros`);
  console.log(`✓ Loaded ${ALL_QUESTIONS.length} questions`);

  fs.mkdirSync(outputDir, { recursive: true });

  console.log("\n📐 Building dependency graph...");
  const { nodes, edges, fieldSetBy } = buildGraph(ALL_QUESTIONS as any);
  console.log(`   ${nodes.length} nodes, ${edges.length} edges`);

  console.log("\n🔄 Detecting cycles...");
  const cycles = detectCycles(nodes, edges);
  if (cycles.length > 0) {
    console.error(`   ❌ ${cycles.length} cycle(s) found:`);
    for (const c of cycles) {
      console.error(`      ${c.path.join(" → ")} (via: ${c.via})`);
    }
  } else {
    console.log("   ✅ No cycles detected");
  }

  console.log("\n🔎 Checking unreachable conditions...");
  const unreachable = detectUnreachableConditions(ALL_QUESTIONS as any, fieldSetBy);
  if (unreachable.length > 0) {
    console.warn(`   ⚠️  ${unreachable.length} unreachable condition(s):`);
    for (const u of unreachable) console.warn(`      ${u}`);
  } else {
    console.log("   ✅ All conditions are reachable");
  }

  console.log("\n📊 Auditing Phase 3 option coverage...");
  const coverageReport = auditCoverage(ALL_QUESTIONS as any, distros);
  const traps = coverageReport.filter((r) => r.isTrap);
  if (traps.length > 0) {
    console.warn(`   ⚠️  ${traps.length} trap option(s) with <3 distro matches:`);
    for (const t of traps) {
      console.warn(
        `      ${t.questionId} / ${t.optionId}: ${t.matchCount} match(es) [${t.distroIds.join(", ") || "none"}]`
      );
    }
  } else {
    console.log("   ✅ All Phase 3 options have 3+ distro matches");
  }

  console.log("\n🗺️  Checking distro reachability...");
  const { reachability } = checkDistroReachability(ALL_QUESTIONS as any, distros);
  const dead = reachability.filter((r) => !r.reachable);
  const narrow = reachability.filter((r) => r.reachable && r.warning);

  if (dead.length > 0) {
    console.warn(`   ⚠️  ${dead.length} dead distro(s):`);
    for (const d of dead) console.warn(`      ${d.distroId} (${d.distroName})`);
  }
  if (narrow.length > 0) {
    console.warn(`   ⚠️  ${narrow.length} distro(s) with reachability warnings:`);
    for (const d of narrow) console.warn(`      ${d.distroId}: ${d.warning}`);
  }
  if (dead.length === 0 && narrow.length === 0) {
    console.log("   ✅ All distros reachable");
  }

  const passed = cycles.length === 0;
  const mermaid = generateMermaid(nodes, edges);

  const report: GraphReport = {
    nodes,
    edges,
    mermaid,
    cycles,
    unreachableConditions: unreachable,
    deadDistros: dead,
    narrowDistros: narrow,
    coverageReport,
    summary: {
      totalQuestions: ALL_QUESTIONS.length,
      totalDistros: distros.length,
      totalEdges: edges.length,
      cycleCount: cycles.length,
      deadDistroCount: dead.length,
      narrowDistroCount: narrow.length,
      trapOptionCount: traps.length,
      passed,
    },
  };

  const jsonOut = path.join(outputDir, "rule_graph.json");
  const mdOut = path.join(outputDir, "rule_graph.md");
  const dotOut = path.join(outputDir, "rule_graph.dot");
  const mmdOut = path.join(outputDir, "rule_graph.mmd");

  fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));
  fs.writeFileSync(mdOut, generateMarkdown(report));
  fs.writeFileSync(dotOut, generateDot(nodes, edges));
  fs.writeFileSync(mmdOut, mermaid);

  console.log("\n📁 Reports written:");
  console.log(`   ${jsonOut}`);
  console.log(`   ${mdOut}`);
  console.log(`   ${dotOut}`);
  console.log(`   ${mmdOut}`);

  console.log(`\n${"=".repeat(45)}`);
  console.log(`Result: ${passed ? "✅ PASSED" : "❌ FAILED (cycles detected)"}`);

  if (!passed) process.exit(1);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
