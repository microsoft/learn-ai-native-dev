// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Weekly @content-health cron entrypoint. Run via the
 * `content-health-cron.yml` workflow.
 *
 * Strategy:
 *   1. Audit all content under src/content/.
 *   2. Hand obvious refreshes (version bumps with primary-source evidence)
 *      to @author for application.
 *   3. Anything ambiguous is left for the next manual triage; the workflow
 *      simply commits whatever changed and opens a PR.
 */

import { runAgentToStdout } from './sdk.mjs'

await runAgentToStdout({
  agentFile: '.github/agents/content-health.agent.md',
  skills: ['version-checker', 'tutorial-content-qa'],
  input: [
    'Audit all content under src/content/ for staleness.',
    'For any item where the primary source confirms an outdated version, command, or API:',
    '  • apply the minimum-diff fix in place via @author quick-edit mode,',
    '  • cite the source in the commit body.',
    'Skip items requiring pedagogy changes — flag them in a TODO file at /tmp/agent-refresh-todo.md.',
  ].join('\n'),
  tools: { allowAll: false, allow: ['read', 'search', 'edit', 'execute', 'web', 'git'] },
})
