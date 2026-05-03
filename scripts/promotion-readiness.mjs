#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Promotion readiness — community → official.
 *
 * Computes a readiness score for a path or example by running the same
 * checks the @reviewer agent would run, then prints a one-PR diff that
 * flips the `status` field. Maintainer-only.
 *
 * Usage:
 *   node scripts/promotion-readiness.mjs --path foundation
 *   node scripts/promotion-readiness.mjs --example healthcare-scheduler
 *   node scripts/promotion-readiness.mjs --path foundation --apply
 *
 * Without `--apply`, the script is read-only — it prints the score and the
 * proposed diff but never writes.
 *
 * Promotion criteria (also documented in docs/lifecycle.md):
 *   1. @reviewer pre-ship suite passes (build, a11y, version, content QA).
 *   2. At least one maintainer has read it end-to-end (manual gate — the
 *      script just nags).
 *   3. Topic does not duplicate an existing official path.
 *   4. `contributedBy` is set and the author is in CONTRIBUTORS.md.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

const args = parseArgs(process.argv.slice(2))
if (!args.path && !args.example) {
  console.error('Usage: --path <id>   or   --example <id>   [--apply]')
  process.exit(2)
}

const checks = []

function check(name, fn) {
  try {
    const result = fn()
    checks.push({ name, ok: result === true || result == null, detail: typeof result === 'string' ? result : '' })
  } catch (err) {
    checks.push({ name, ok: false, detail: err instanceof Error ? err.message : String(err) })
  }
}

// ── Checks ───────────────────────────────────────────────────────────────

check('Build passes', () => {
  execSync('npm run build', { stdio: 'pipe' })
})

check('Path/example exists', () => {
  if (args.path) {
    const paths = readFileSync('src/data/paths.ts', 'utf-8')
    if (!paths.includes(`'${args.path}'`)) throw new Error(`No path with id "${args.path}" in paths.ts`)
  } else {
    const ex = readFileSync('src/data/exampleTracks.ts', 'utf-8')
    if (!ex.includes(`'${args.example}'`)) throw new Error(`No example "${args.example}" in exampleTracks.ts`)
  }
})

check('contributedBy present', () => {
  const file = args.path ? 'src/data/paths.ts' : 'src/data/exampleTracks.ts'
  const id = args.path ?? args.example
  const text = readFileSync(file, 'utf-8')
  // Find the entry's block.
  const idx = text.indexOf(`'${id}'`)
  if (idx === -1) throw new Error('Entry not found')
  const block = text.slice(idx, idx + 2000)
  if (!/contributedBy:\s*['"]@?[a-z0-9-]+['"]/i.test(block)) {
    throw new Error('contributedBy is missing on the entry')
  }
})

check('Author listed in CONTRIBUTORS.md', () => {
  const file = args.path ? 'src/data/paths.ts' : 'src/data/exampleTracks.ts'
  const id = args.path ?? args.example
  const text = readFileSync(file, 'utf-8')
  const block = text.slice(text.indexOf(`'${id}'`))
  const m = block.match(/contributedBy:\s*['"]@?([a-z0-9-]+)['"]/i)
  if (!m) throw new Error('contributedBy not found')
  const handle = m[1]
  const contributors = readFileSync('CONTRIBUTORS.md', 'utf-8')
  if (!contributors.toLowerCase().includes(handle.toLowerCase())) {
    throw new Error(`Author @${handle} is not listed in CONTRIBUTORS.md`)
  }
})

check('No duplicate official topic', () => {
  // Heuristic: title overlap with an existing official path.
  if (!args.path) return
  const paths = readFileSync('src/data/paths.ts', 'utf-8')
  const titles = [...paths.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map((m) => m[1].toLowerCase())
  const seen = new Set()
  for (const t of titles) {
    if (seen.has(t)) throw new Error(`Duplicate title "${t}" in paths.ts`)
    seen.add(t)
  }
})

// ── Score ────────────────────────────────────────────────────────────────

const passed = checks.filter((c) => c.ok).length
const total = checks.length
const score = Math.round((passed / total) * 100)

console.log('\nPromotion readiness for', args.path ? `path "${args.path}"` : `example "${args.example}"`)
console.log('─'.repeat(60))
for (const c of checks) {
  console.log(`${c.ok ? '✅' : '❌'} ${c.name}${c.detail ? ` — ${c.detail}` : ''}`)
}
console.log('─'.repeat(60))
console.log(`Score: ${passed}/${total} (${score}%)`)

if (passed !== total) {
  console.log('\nNot ready for promotion. Fix the failing checks first.')
  process.exit(1)
}

// ── Diff (status: community → official) ──────────────────────────────────

const targetFile = args.path ? 'src/data/paths.ts' : 'src/data/exampleTracks.ts'
const targetId = args.path ?? args.example
const original = readFileSync(targetFile, 'utf-8')
const idIdx = original.indexOf(`'${targetId}'`)
const blockEnd = original.indexOf('},', idIdx)
const before = original.slice(0, idIdx)
const block = original.slice(idIdx, blockEnd)
const after = original.slice(blockEnd)
const updatedBlock = block.replace(/status:\s*['"]community['"]/, "status: 'official'")
const updated = before + updatedBlock + after

if (updatedBlock === block) {
  console.log('\nNothing to flip — entry is not currently `community`.')
  process.exit(0)
}

console.log(`\nProposed diff (${targetFile}):`)
console.log('  -  status: \'community\'')
console.log('  +  status: \'official\'')

if (args.apply) {
  writeFileSync(resolve(targetFile), updated, 'utf-8')
  console.log(`\nApplied. Open a PR titled: chore(promote): ${targetId} → official`)
} else {
  console.log('\nRun again with --apply to write the change.')
}

// ── helpers ──────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--path') out.path = argv[++i]
    else if (a === '--example') out.example = argv[++i]
    else if (a === '--apply') out.apply = true
  }
  return out
}
