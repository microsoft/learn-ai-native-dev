export interface TerminalStep {
  id: string
  title: string
  content: string
  prompt?: {
    number: string
    title: string
    code: string
    metaPrompt?: string
  }
  prompts?: {
    number: string
    title: string
    code: string
    metaPrompt?: string
  }[]
}

export interface TerminalModule {
  id: string
  number: number
  title: string
  subtitle: string
  steps: TerminalStep[]
}

const moduleFiles = import.meta.glob<string>('../content/terminal/module-*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const normalizeLF = (text: string): string => text.replace(/\r\n/g, '\n')

const parseKeyValueBlock = (input: string): Record<string, string> => {
  const lines = input.split('\n').map((line) => line.trim()).filter(Boolean)
  return lines.reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return acc
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    acc[key] = value
    return acc
  }, {})
}

const parseFrontmatter = (markdown: string) => {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) throw new Error('Missing frontmatter in terminal module markdown file.')
  const data = parseKeyValueBlock(match[1])
  const body = markdown.slice(match[0].length)
  return { data, body }
}

const parsePromptBlocks = (input: string) => {
  const promptRegex = /:::prompt\s*\n([\s\S]*?)\n:::/g
  const prompts: { number: string; title: string; code: string; metaPrompt?: string }[] = []
  let content = input
  let match

  while ((match = promptRegex.exec(input)) !== null) {
    const promptBlock = match[1]
    const separator = '\n---\n'
    const separatorIndex = promptBlock.indexOf(separator)
    const metaBlock = separatorIndex === -1 ? promptBlock : promptBlock.slice(0, separatorIndex)
    let codeBlock = separatorIndex === -1 ? '' : promptBlock.slice(separatorIndex + separator.length)
    const meta = parseKeyValueBlock(metaBlock)

    // Check for meta-prompt separator (===)
    const metaSeparator = '\n===\n'
    const metaSepIndex = codeBlock.indexOf(metaSeparator)
    let metaPrompt: string | undefined
    if (metaSepIndex !== -1) {
      metaPrompt = codeBlock.slice(metaSepIndex + metaSeparator.length).trim()
      codeBlock = codeBlock.slice(0, metaSepIndex)
    }

    prompts.push({
      number: meta.number ?? '',
      title: meta.title ?? '',
      code: codeBlock.trim(),
      ...(metaPrompt ? { metaPrompt } : {})
    })
    content = content.replace(match[0], '\n:::prompt-placeholder:::')
  }

  if (prompts.length === 0) {
    return { prompt: undefined, prompts: undefined, content: input.trim() }
  }

  return { prompt: prompts[0], prompts, content: content.trim() }
}

const parseSteps = (body: string): TerminalStep[] => {
  const blocks = body.split(/^## step:\s*/m).filter((block) => block.trim())
  return blocks.map((block) => {
    const [idLine, ...restLines] = block.split('\n')
    const id = idLine.trim()
    let rest = restLines.join('\n').trim()

    const titleMatch = rest.match(/^### title:\s*(.+)\s*\n/)
    if (!titleMatch) throw new Error(`Missing step title for step: ${id}`)

    const title = titleMatch[1].trim()
    rest = rest.replace(/^### title:.*\n/, '').trim()

    const { prompt, prompts, content } = parsePromptBlocks(rest)

    return {
      id,
      title,
      content,
      ...(prompt ? { prompt } : {}),
      ...(prompts && prompts.length > 1 ? { prompts } : {})
    }
  })
}

const parseModuleMarkdown = (markdown: string): TerminalModule => {
  const normalized = normalizeLF(markdown)
  const { data, body } = parseFrontmatter(normalized)
  const steps = parseSteps(body)
  return {
    id: data.id,
    number: Number(data.number),
    title: data.title,
    subtitle: data.subtitle,
    steps
  }
}

let cachedTerminalData: TerminalModule[] | null = null

export const loadTerminalData = async (): Promise<TerminalModule[]> => {
  if (cachedTerminalData) return cachedTerminalData

  const modules = Object.values(moduleFiles).map((markdown) =>
    parseModuleMarkdown(markdown)
  )

  cachedTerminalData = modules.sort((a, b) => a.number - b.number)
  return cachedTerminalData
}

export const terminalSummaryContent = {
  workflow: {
    title: 'The Terminal AI Workflow',
    description: "You've mastered terminal-native AI development — from spec to deployment:",
    steps: [
      'SPEC first → PRD.md with requirements, Tasks.md with implementation plan (G0, H0)',
      'CONFIGURE project context → Comprehensive CLAUDE.md / copilot-instructions.md (F4)',
      'CREATE custom commands → .claude/commands/*.md for reusable workflows (F6)',
      'BUILD the agentic loop → while(toolCalls) { execute → feed back → repeat } (G3)',
      'IMPLEMENT tools → File I/O, search, permissions with auto/confirm/block gates (G4-G5)',
      'ADD skills → Pattern-match queries, lazy-load SKILL.md content (G8)',
      'CONNECT MCP → Client-side integration with your Module A servers (G7)',
      'TEST → Jest test suite with 80%+ coverage (G10)',
      'VERIFY → Check implementation against PRD requirements (G11, H6)',
      'DEPLOY in CI → Self-healing pipelines with spec-defined safety constraints (H1-H5)'
    ]
  },
  quickReference: {
    title: 'Quick Reference: Terminal Track Prompts',
    items: [
      { when: 'Spec the agent (PRD + Tasks)', prompts: 'PROMPT G0' },
      { when: 'Set up comprehensive CLAUDE.md', prompts: 'PROMPT F1' },
      { when: 'Create custom commands', prompts: 'PROMPT F2' },
      { when: 'Scaffold agent project', prompts: 'PROMPT G1' },
      { when: 'Connect LLM API', prompts: 'PROMPT G2' },
      { when: 'Build agentic loop', prompts: 'PROMPT G3' },
      { when: 'Build tool system', prompts: 'PROMPT G4' },
      { when: 'Add permissions', prompts: 'PROMPT G5' },
      { when: 'Load project context', prompts: 'PROMPT G6' },
      { when: 'Add MCP client', prompts: 'PROMPT G7' },
      { when: 'Build skill system', prompts: 'PROMPT G8' },
      { when: 'Polish & ship', prompts: 'PROMPT G9' },
      { when: 'Generate tests', prompts: 'PROMPT G10' },
      { when: 'Verify against PRD', prompts: 'PROMPT G11' },
      { when: 'Spec the pipeline', prompts: 'PROMPT H0' },
      { when: 'Production headless mode', prompts: 'PROMPT H1' },
      { when: 'GitHub Actions workflow', prompts: 'PROMPT H2' },
      { when: 'Self-healing CI', prompts: 'PROMPT H3' },
      { when: 'Embeddable SDK', prompts: 'PROMPT H4' },
      { when: 'Audit & cost controls', prompts: 'PROMPT H5' },
      { when: 'Verify pipeline spec', prompts: 'PROMPT H6' }
    ]
  },
  troubleshooting: {
    title: 'Terminal Track Troubleshooting',
    items: [
      {
        problem: 'Claude Code not authenticating',
        prevention: 'Ensure you have a Claude subscription or ANTHROPIC_API_KEY set in your environment',
        solution: 'Run `claude` to re-authenticate via browser login, API key, or third-party provider'
      },
      {
        problem: 'Agent stuck in infinite loop',
        prevention: 'Set --max-turns flag and add safety limit in agentic loop',
        solution: 'Check that the stop_reason handling covers both "tool_use" and "end_turn" (or equivalent for your provider)'
      },
      {
        problem: 'MCP server not connecting',
        prevention: 'Verify server runs standalone first: node mcp-servers/weather-server/src/index.js',
        solution: 'Check .mcp.json paths are absolute or relative to project root'
      },
      {
        problem: 'Permission prompts not appearing',
        prevention: 'Verify tool permission field is set to "confirm"',
        solution: 'Check ToolRegistry.executeTool() permission checking logic'
      },
      {
        problem: 'Skill not activating',
        prevention: 'Ensure skill name/description matches query keywords',
        solution: 'Check src/skills/matcher.ts pattern matching logic; add debug logging'
      },
      {
        problem: 'Self-healing CI runs forever',
        prevention: 'Set max attempts guard (check github.run_attempt)',
        solution: 'Add explicit attempt counter and exit if exceeded'
      },
      {
        problem: 'Cost exceeding budget',
        prevention: 'Use --max-cost flag and CostGuard class',
        solution: 'Review /cost output, reduce --max-turns, use smaller model for simple tasks'
      },
      {
        problem: 'Provider not detected',
        prevention: 'Set ANTHROPIC_API_KEY or OPENAI_API_KEY in your environment',
        solution: 'Check env vars are exported (not just set), or use AGENT_PROVIDER to force selection'
      },
      {
        problem: 'Tests failing after implementation',
        prevention: 'Run tests after each step, not just at the end',
        solution: 'Use G10 test patterns; mock external dependencies; check for async timing issues'
      },
      {
        problem: 'Verification shows FAIL status',
        prevention: 'Implement requirements incrementally with verification after each',
        solution: 'Review the specific requirement, check the evidence column, fix the gap'
      }
    ]
  },
  learned: {
    title: "What You've Mastered",
    items: [
      'Spec-driven development applied to terminal tools (PRD → Build → Test → Verify)',
      'Comprehensive CLAUDE.md and copilot-instructions.md instruction files',
      'Custom commands (.claude/commands/) for reusable workflows',
      'Claude Code and GitHub Copilot CLI as full agentic terminal coding agents',
      'LLMProvider abstraction — one interface supporting Anthropic, OpenAI, and any compatible API',
      'The agentic loop pattern — the core engine behind every AI coding agent',
      'Tool systems with JSON schemas for LLM function calling',
      'Permission gates (auto/confirm/block) for safe autonomous execution',
      'Context loading from project instruction files into system prompts',
      'Skill system with pattern matching and lazy loading',
      'MCP client implementation — connecting to external tool servers',
      'Jest test suite with mocks for AI components',
      'Verification against requirements with PASS/FAIL tables',
      'Headless mode for CI/CD and scripting automation',
      'Multiple CI approaches — custom agent, Copilot CLI, or Claude Code in pipelines',
      'Self-healing pipelines with spec-defined safety guardrails',
      'Embeddable AI SDK for building custom developer tools'
    ],
    closing:
      'The methodology IS the product. You used spec-driven development to build a spec-driven development tool. Every concept from the entire tutorial now has a mechanical explanation. Build on this foundation — add new skills, create team-shared command libraries, and share your patterns with others.'
  }
}
