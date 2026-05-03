// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Translation pipeline.
 *
 * For each markdown file in the requested track's content folder, ask
 * @author to translate it to the target locale and emit
 *   src/content/<track>/<file>.<locale>.md
 *
 * Hard rules — translator must NOT touch:
 *   • frontmatter keys (only translate string values),
 *   • step IDs (`## step: …`),
 *   • prompt-block markers (`:::prompt`, `:::`),
 *   • code blocks,
 *   • diagram references (`<Diagram name="…" />`).
 *
 * Dry-run translates one module only so maintainers can sanity-check
 * before committing the agent to a full track.
 */

import { readdirSync, existsSync } from 'node:fs'
import { runAgentToStdout } from './sdk.mjs'

const track = process.env.INPUT_TRACK
const locale = process.env.INPUT_LOCALE
const dryRun = process.env.INPUT_DRY_RUN === 'true'

if (!track || !locale) {
  console.error('INPUT_TRACK and INPUT_LOCALE are required.')
  process.exit(2)
}

const trackDir =
  track === 'foundation'
    ? 'src/content/tutorial'
    : track === 'agentic'
      ? 'src/content/advanced'
      : 'src/content/terminal'

if (!existsSync(trackDir)) {
  console.error(`Track folder not found: ${trackDir}`)
  process.exit(2)
}

const files = readdirSync(trackDir)
  .filter((f) => f.endsWith('.md') && !f.includes('.' + locale + '.'))
  .sort()

const todo = dryRun ? files.slice(0, 1) : files

console.error(`Translating ${todo.length} file(s) to "${locale}"…`)

for (const file of todo) {
  const src = `${trackDir}/${file}`
  const dst = `${trackDir}/${file.replace(/\.md$/, `.${locale}.md`)}`
  console.error(`  • ${src}  →  ${dst}`)
  await runAgentToStdout({
    agentFile: '.github/agents/author.agent.md',
    skills: ['tutorial-content-qa'],
    input: [
      `Translate ${src} to locale "${locale}". Write the result to ${dst}.`,
      '',
      'HARD RULES:',
      '  • Translate prose ONLY. Preserve exactly:',
      '      - frontmatter keys (`title:`, `subtitle:`, etc.) — translate VALUES only',
      '      - step IDs (`## step: …`) — keep verbatim',
      '      - prompt-block markers (`:::prompt`, `:::`)',
      '      - code blocks (```…```)',
      '      - diagram references (`<Diagram name="…" />`)',
      '      - URLs and link targets',
      '  • Use the locale\'s natural phrasing. Do NOT machine-translate idioms literally.',
      '  • Preserve all whitespace and heading hierarchy.',
    ].join('\n'),
    tools: { allowAll: false, allow: ['read', 'edit'] },
  })
}
