// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Tiny shared helper used by every CI agent script in this folder.
 *
 * Goals:
 *   • Single import surface for the `@github/copilot-sdk` (which is in
 *     public preview — pinning the call site here means a future shape
 *     change is a one-file edit, not eight).
 *   • Consistent stdout contract: write tokens to stdout, log diagnostics
 *     to stderr, never crash the workflow on a missing optional event.
 */

import { runAgent } from '@github/copilot-sdk'

/**
 * Run an agent and pipe its tokens to stdout. Returns the full text after
 * the stream ends so callers can post-process (e.g., write a report file).
 */
export async function runAgentToStdout(args) {
  let collected = ''
  const stream = runAgent({
    agentFile: args.agentFile,
    skills: args.skills ?? [],
    promptFile: args.promptFile,
    input: args.input,
    tools: args.tools ?? { allowAll: false, allow: ['read', 'search'] },
  })

  for await (const chunk of stream) {
    if (chunk.type === 'token') {
      process.stdout.write(chunk.value)
      collected += chunk.value
    } else if (chunk.type === 'tool') {
      process.stderr.write(`[tool ${chunk.name} ${chunk.status}]\n`)
    }
  }
  return collected
}
