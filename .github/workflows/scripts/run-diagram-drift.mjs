// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Diagram drift check.
 *
 * For each diagram in src/components/diagrams/, find the markdown files
 * that reference it via `<Diagram name="..." />` and ask the agent whether
 * the diagram still illustrates what the markdown describes.
 *
 * Output is a Markdown report on stdout. If no drift, the very first line
 * is "✅ no drift" so the workflow can short-circuit.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { runAgentToStdout } from './sdk.mjs'

const DIAGRAM_DIR = 'src/components/diagrams'
const CONTENT_DIRS = ['src/content/tutorial', 'src/content/advanced', 'src/content/terminal']

const diagrams = readdirSync(DIAGRAM_DIR)
  .filter((f) => f.endsWith('.tsx') && f !== 'index.ts')
  .map((f) => f.replace(/\.tsx$/, ''))

// Find which markdown files reference each diagram.
const refs = new Map()
for (const dir of CONTENT_DIRS) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue
    const content = readFileSync(join(dir, file), 'utf-8')
    for (const d of diagrams) {
      const regex = new RegExp(`<Diagram\\s+name=["']${d}["']`)
      if (regex.test(content)) {
        if (!refs.has(d)) refs.set(d, [])
        refs.get(d).push(join(dir, file))
      }
    }
  }
}

const orphans = diagrams.filter((d) => !refs.has(d))
const targets = [...refs.entries()]

const input = [
  'Audit each diagram for drift against the markdown that references it.',
  '',
  'For each diagram below, read the diagram component AND the listed markdown file(s).',
  'Decide whether the diagram still accurately illustrates the markdown.',
  '',
  'Diagrams to audit:',
  ...targets.map(([d, files]) => `  • ${DIAGRAM_DIR}/${d}.tsx  ←  ${files.join(', ')}`),
  '',
  orphans.length > 0
    ? `Orphaned diagrams (no markdown reference): ${orphans.join(', ')}`
    : 'No orphaned diagrams.',
  '',
  'Output format:',
  '',
  '  • Start with "✅ no drift" on its own line if every pair agrees.',
  '  • Otherwise emit a Markdown table: | Diagram | Severity | What drifted | Suggested fix |',
  '  • Severity is 🔴 critical / 🟠 moderate / 🟡 minor.',
].join('\n')

await runAgentToStdout({
  agentFile: '.github/agents/docs-auditor.agent.md',
  skills: ['docs-sync'],
  input,
  tools: { allowAll: false, allow: ['read', 'search'] },
})
