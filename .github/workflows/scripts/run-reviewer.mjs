// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Run the @reviewer agent in CI via @github/copilot-sdk and emit a
 * markdown report to stdout. Called from .github/workflows/agent-pr-review.yml.
 *
 * The SDK is in public preview; we keep the surface narrow so a future
 * shape change is a one-file edit.
 */

import { runAgentToStdout } from './sdk.mjs'

const CHANGED = process.env.GITHUB_BASE_REF
  ? `git diff --name-only origin/${process.env.GITHUB_BASE_REF}...HEAD`
  : 'echo .'

await runAgentToStdout({
  agentFile: '.github/agents/reviewer.agent.md',
  skills: ['tutorial-content-qa', 'version-checker'],
  input: [
    'Run the pre-ship suite on the files changed in this PR.',
    'Return a Markdown report grouped by severity (Critical / Moderate / Minor).',
    'End with a single-line verdict: ✅ ship it / 🔄 needs work / ❌ block.',
    '',
    `Files changed (\`${CHANGED}\`): see git in the workspace.`,
  ].join('\n'),
  tools: { allowAll: false, allow: ['read', 'search', 'execute', 'git'] },
})
