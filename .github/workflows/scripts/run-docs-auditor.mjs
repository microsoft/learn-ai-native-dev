// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Run the @docs-auditor agent in CI via @github/copilot-sdk and emit a
 * markdown drift report to stdout. Called from .github/workflows/agent-pr-review.yml.
 */

import { runAgentToStdout } from './sdk.mjs'

await runAgentToStdout({
  agentFile: '.github/agents/docs-auditor.agent.md',
  skills: ['docs-sync'],
  input: [
    'Diff src/ and .github/ against docs/ for the changes in this PR.',
    'Emit a Markdown drift report. If there is no drift, output a single line: "✅ docs are in sync".',
  ].join('\n'),
  tools: { allowAll: false, allow: ['read', 'search'] },
})
