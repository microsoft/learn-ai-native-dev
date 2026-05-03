// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Instructions linter.
 *
 * For each `.github/instructions/*.instructions.md`:
 *   1. Read the `applyTo` glob from frontmatter.
 *   2. Sample the most recent merged PRs that touched files matching the glob.
 *   3. Ask @reviewer to grade whether each diff respected the file's rules.
 *
 * Output is a Markdown report. "✅" on the first line means everything's
 * being followed and the workflow short-circuits.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { runAgentToStdout } from './sdk.mjs'

const INSTR_DIR = '.github/instructions'
const SAMPLE_PRS = 6

const files = readdirSync(INSTR_DIR).filter((f) => f.endsWith('.instructions.md'))

// For each instructions file, find recent commits matching its applyTo.
const audits = files.map((f) => {
  const content = readFileSync(`${INSTR_DIR}/${f}`, 'utf-8')
  const m = content.match(/applyTo:\s*['"]?([^'"\n]+)['"]?/)
  const applyTo = m?.[1]?.trim() ?? ''
  // Use git to find recent commits that touched matching files.
  const globs = applyTo
    .split(',')
    .map((g) => g.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
  let recentCommits = ''
  try {
    if (globs.length > 0) {
      recentCommits = execSync(
        `git log --merges -n ${SAMPLE_PRS} --pretty=format:%H%x09%s -- ${globs.join(' ')}`,
        { encoding: 'utf-8' },
      ).trim()
    }
  } catch {
    recentCommits = ''
  }
  return { file: f, applyTo, recentCommits }
})

const input = [
  'For each instructions file below, evaluate whether the listed recent merge commits respected its rules.',
  '',
  'Process:',
  '  1. Read the instructions file in full.',
  '  2. For each commit, run `git show <sha>` to read the diff.',
  '  3. Decide: did the diff follow the instructions, ignore them, or contradict them?',
  '',
  'Output a Markdown table:',
  '',
  '  | Instructions file | Commits sampled | Followed | Ignored | Contradicted | Recommendation |',
  '',
  'Recommendations should be one of: "keep" / "rewrite" / "retire (no recent diffs)" / "narrow scope".',
  '',
  'If every file is being followed, output exactly "✅ all instructions are being followed" on the first line and nothing else.',
  '',
  'Files to audit:',
  ...audits.map(
    (a) =>
      `\n## ${a.file}\napplyTo: ${a.applyTo || '(none)'}\n` +
      (a.recentCommits ? `Recent merge commits:\n${a.recentCommits}` : 'No recent merge commits matched.'),
  ),
].join('\n')

await runAgentToStdout({
  agentFile: '.github/agents/reviewer.agent.md',
  skills: [],
  input,
  tools: { allowAll: false, allow: ['read', 'search', 'execute'] },
})
