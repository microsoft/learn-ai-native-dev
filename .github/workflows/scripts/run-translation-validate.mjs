// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Validate the just-emitted translations: structural fields must survive
 * verbatim. Pedagogy correctness is a human review job — not in scope here.
 */

import { runAgentToStdout } from './sdk.mjs'

const track = process.env.INPUT_TRACK
const locale = process.env.INPUT_LOCALE

await runAgentToStdout({
  agentFile: '.github/agents/reviewer.agent.md',
  skills: ['tutorial-content-qa'],
  input: [
    `Compare each translated file (\`*.${locale}.md\`) in the ${track} track against its source file.`,
    '',
    'Verify that ALL of the following survived translation untouched:',
    '  • frontmatter keys',
    '  • step IDs (`## step: …`)',
    '  • prompt-block markers (`:::prompt`, `:::`)',
    '  • code blocks',
    '  • diagram references (`<Diagram name="…" />`)',
    '',
    'If anything was altered, fix the translated file in place. If a file fails validation and cannot be fixed safely, exit non-zero with a Markdown report of which files failed and why.',
  ].join('\n'),
  tools: { allowAll: false, allow: ['read', 'search', 'edit', 'execute'] },
})
