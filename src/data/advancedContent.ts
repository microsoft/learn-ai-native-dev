export interface Step {
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

export interface Module {
  id: string
  number: number
  title: string
  subtitle: string
  steps: Step[]
}

const moduleFiles = import.meta.glob<string>('../content/advanced/module-*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

// Normalize line endings to LF
const normalizeLF = (text: string): string => text.replace(/\r\n/g, '\n')

const parseKeyValueBlock = (input: string): Record<string, string> => {
  const lines = input.split('\n').map((line) => line.trim()).filter(Boolean)
  return lines.reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      return acc
    }
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    acc[key] = value
    return acc
  }, {})
}

const parseFrontmatter = (markdown: string) => {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) {
    throw new Error('Missing frontmatter in advanced module markdown file.')
  }
  const data = parseKeyValueBlock(match[1])
  const body = markdown.slice(match[0].length)
  return { data, body }
}

const parsePromptBlocks = (input: string) => {
  const promptRegex = /:::prompt\s*\n([\s\S]*?)\n:::/g
  const prompts: { number: string; title: string; code: string }[] = []
  let content = input
  let match

  while ((match = promptRegex.exec(input)) !== null) {
    const promptBlock = match[1]
    const separator = '\n---\n'
    const separatorIndex = promptBlock.indexOf(separator)
    const metaBlock = separatorIndex === -1 ? promptBlock : promptBlock.slice(0, separatorIndex)
    const codeBlock = separatorIndex === -1 ? '' : promptBlock.slice(separatorIndex + separator.length)
    const meta = parseKeyValueBlock(metaBlock)
    prompts.push({
      number: meta.number ?? '',
      title: meta.title ?? '',
      code: codeBlock.trim()
    })
    // Replace each prompt block with a placeholder marker
    content = content.replace(match[0], '\n:::prompt-placeholder:::')
  }

  if (prompts.length === 0) {
    return { prompt: undefined, prompts: undefined, content: input.trim() }
  }

  // Keep backward compatibility: first prompt goes to 'prompt', all go to 'prompts'
  return { prompt: prompts[0], prompts, content: content.trim() }
}

const parseSteps = (body: string): Step[] => {
  const blocks = body.split(/^## step:\s*/m).filter((block) => block.trim())
  return blocks.map((block) => {
    const [idLine, ...restLines] = block.split('\n')
    const id = idLine.trim()
    let rest = restLines.join('\n').trim()

    const titleMatch = rest.match(/^### title:\s*(.+)\s*\n/)
    if (!titleMatch) {
      throw new Error(`Missing step title for step: ${id}`)
    }

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

const parseModuleMarkdown = (markdown: string): Module => {
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

let cachedAdvancedData: Module[] | null = null

export const loadAdvancedData = async (): Promise<Module[]> => {
  if (cachedAdvancedData) {
    return cachedAdvancedData
  }

  const modules = Object.values(moduleFiles).map((markdown) => {
    return parseModuleMarkdown(markdown)
  })

  cachedAdvancedData = modules.sort((a, b) => a.number - b.number)
  return cachedAdvancedData
}

export const advancedData: Module[] = []

export const advancedSummaryContent = {
  workflow: {
    title: 'The Advanced AI-Native Workflow',
    description: "You've mastered advanced techniques that extend AI beyond your codebase:",
    steps: [
      'CONNECT external data → MCP servers (tools, resources, prompts) fetch APIs, databases, services',
      'DELEGATE async tasks → GitHub Coding Agent works while you focus elsewhere',
      'ORCHESTRATE specialists → Multiple agents collaborate on complex reviews',
      'GENERATE tests → AI creates comprehensive test suites with edge cases',
      'INTEGRATE everything → MCP + Agents + Tests = Professional-grade workflow'
    ]
  },
  quickReference: {
    title: 'Quick Reference: Advanced Prompts',
    items: [
      { when: 'Set up MCP server', prompts: 'PROMPT A1, A2, A3' },
      { when: 'Build custom MCP tools & resources', prompts: 'PROMPT A4, A5, A6, A7, A8' },
      { when: 'Prepare repo for coding agent', prompts: 'PROMPT B1' },
      { when: 'Use coding agent workflow', prompts: 'Assign Copilot to issue' },
      { when: 'Create specialist agents', prompts: 'PROMPT C1, C2, C3' },
      { when: 'Build review orchestrator', prompts: 'PROMPT C4, C5' },
      { when: 'Add orchestrator features', prompts: 'PROMPT C6, C7, C8' },
      { when: 'Set up testing', prompts: 'PROMPT D1' },
      { when: 'Generate test suites', prompts: 'PROMPT D2, D3, D4, D5' },
      { when: 'Check coverage', prompts: 'PROMPT D6, D7, D8, D9' },
      { when: 'Capstone integration', prompts: 'PROMPT E1-E5' }
    ]
  },
  troubleshooting: {
    title: 'Advanced Troubleshooting',
    items: [
      {
        problem: 'MCP server not connecting',
        prevention: 'Check .vscode/mcp.json syntax',
        solution: 'Reload VS Code and check Output panel for MCP errors'
      },
      {
        problem: 'MCP tool not appearing',
        prevention: 'Ensure server is registered and running',
        solution: 'Test with MCP Inspector: npx @modelcontextprotocol/inspector node path/to/server/index.js'
      },
      {
        problem: 'Coding agent not responding',
        prevention: 'Ensure copilot-setup-steps.yml exists and issue has clear acceptance criteria',
        solution: 'Check that Copilot is assigned to the issue, not just labeled'
      },
      {
        problem: 'Orchestrator not calling specialists',
        prevention: 'Verify agent names match exactly in .agent.md files',
        solution: 'Check that specialist agents work independently before orchestrating'
      },
      {
        problem: 'Tests failing unexpectedly',
        prevention: 'Review AI-generated tests for realistic expectations',
        solution: 'Decide: fix the test OR fix the code based on intent'
      },
      {
        problem: 'Coverage not improving',
        prevention: 'Focus on uncovered branches, not just lines',
        solution: 'Ask AI to specifically target uncovered code paths'
      }
    ]
  },
  learned: {
    title: "What You've Mastered",
    items: [
      'MCP servers extend AI with tools (actions), resources (data), and prompts (templates)',
      'Secure inputs keep API keys out of code; MCP Inspector debugs servers visually',
      'GitHub Coding Agent handles async development through issue → plan → PR workflow',
      'Agent orchestration coordinates specialists for comprehensive reviews',
      'AI test generation catches edge cases humans typically miss',
      'Copilot Edits, Vision, and model selection enhance your daily workflow',
      'The DevDash CLI demonstrates all concepts in a working project'
    ],
    closing:
      'You now have enterprise-grade AI development capabilities. These patterns scale from personal projects to team-wide workflows. Share your agents, skills, and MCP servers to help your team level up!'
  }
}
