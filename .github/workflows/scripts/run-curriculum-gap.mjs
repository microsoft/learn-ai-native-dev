// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Curriculum gap finder.
 *
 * @researcher scans recent release notes for the tools we teach, compares
 * against our content, and emits a JSON array of gaps on the last line of
 * stdout. The workflow consumes that JSON to file individual issues.
 *
 * The strict trailing-line contract keeps the parsing trivial — any prose
 * the agent emits before is ignored.
 */

import { runAgentToStdout } from './sdk.mjs'

const TOOLS_WE_TEACH = [
  { name: 'GitHub Copilot (VS Code + Chat)', changelog: 'https://code.visualstudio.com/updates' },
  { name: 'GitHub Copilot CLI', changelog: 'https://github.com/github/copilot-cli/releases' },
  { name: 'Claude Code', changelog: 'https://docs.anthropic.com/claude-code/changelog' },
  { name: 'Anthropic Agent Skills standard', changelog: 'https://agentskills.io/' },
  { name: 'Model Context Protocol (MCP)', changelog: 'https://modelcontextprotocol.io/' },
  { name: 'GitHub Copilot SDK', changelog: 'https://github.com/github/copilot-sdk/releases' },
]

const input = [
  'Identify topics taught by the latest releases of the tools below that are NOT yet covered in our tutorial content under src/content/.',
  '',
  'Tools to scan:',
  ...TOOLS_WE_TEACH.map((t) => `  • ${t.name}  (${t.changelog})`),
  '',
  'Process:',
  '  1. For each tool, fetch the changelog and scan the most recent ~3 months of releases.',
  '  2. For each notable feature / API / pattern, search src/content/ for coverage.',
  '  3. Anything covered: skip.',
  '  4. Anything NOT covered: add to the gap list.',
  '',
  'Cap the gap list at 8 entries — pick the highest-leverage ones (developer-facing, stable, on-brand).',
  '',
  'Output format — emit any prose you want, but the LAST line of stdout MUST be a single JSON array:',
  '',
  '  [',
  '    {',
  '      "tool": "Claude Code",',
  '      "topic": "Subagent observability",',
  '      "source": "https://docs.anthropic.com/claude-code/release-2.4",',
  '      "rationale": "Released Mar 2026; learners hit this when chaining > 3 agents.",',
  '      "outline": ["Why observability", "The new --trace flag", "Reading a trace", "Exercise"]',
  '    }',
  '  ]',
].join('\n')

await runAgentToStdout({
  agentFile: '.github/agents/researcher.agent.md',
  skills: ['version-checker'],
  input,
  tools: { allowAll: false, allow: ['read', 'search', 'web'] },
})
