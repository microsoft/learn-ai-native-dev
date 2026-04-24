import { ExampleTrack } from './exampleTracks'

export interface Step {
  id: string
  title: string
  content: string
  prompt?: {
    number: number
    title: string
    code: string
    metaPrompt?: string
  }
}

export interface Part {
  id: string
  number: number
  title: string
  subtitle: string
  steps: Step[]
}

const partModules = import.meta.glob<string>('../content/tutorial/part-*.md', {
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
    throw new Error('Missing frontmatter in tutorial markdown file.')
  }
  const data = parseKeyValueBlock(match[1])
  const body = markdown.slice(match[0].length)
  return { data, body }
}

const parsePromptBlock = (input: string) => {
  const promptMatch = input.match(/:::prompt\s*\n([\s\S]*?)\n:::/)
  if (!promptMatch) {
    return { prompt: undefined, content: input.trim() }
  }

  const promptBlock = promptMatch[1]
  const separator = '\n---\n'
  const separatorIndex = promptBlock.indexOf(separator)
  const metaBlock = separatorIndex === -1 ? promptBlock : promptBlock.slice(0, separatorIndex)
  const codeBlock = separatorIndex === -1 ? '' : promptBlock.slice(separatorIndex + separator.length)
  const meta = parseKeyValueBlock(metaBlock)
  const prompt = {
    number: Number(meta.number),
    title: meta.title ?? '',
    code: codeBlock.trim()
  }

  // Replace prompt block with a placeholder marker to preserve its position
  const content = input.replace(promptMatch[0], '\n:::prompt-placeholder:::').trim()
  return { prompt, content }
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

    const { prompt, content } = parsePromptBlock(rest)

    return {
      id,
      title,
      content,
      ...(prompt ? { prompt } : {})
    }
  })
}

const parsePartMarkdown = (markdown: string): Part => {
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

const getValueByPath = (source: Record<string, unknown>, path: string) => {
  const tokens: Array<string | number> = []
  const regex = /([^.[\]]+)|\[(\d+)\]/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(path)) !== null) {
    if (match[1]) {
      tokens.push(match[1])
    } else if (match[2]) {
      tokens.push(Number(match[2]))
    }
  }

  return tokens.reduce<unknown>((acc, token) => {
    if (acc === undefined || acc === null) {
      return undefined
    }
    if (typeof token === 'number') {
      return Array.isArray(acc) ? acc[token] : undefined
    }
    if (typeof acc === 'object' && token in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[token]
    }
    return undefined
  }, source)
}

const capitalize = (value: string) => {
  if (!value) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const buildTemplateContext = (track: ExampleTrack) => ({
  projectName: track.projectName,
  projectNameLower: track.projectName.toLowerCase(),
  folderName: track.folderName,
  whatYouBuild: track.whatYouBuild,
  sampleDataDescription: track.sampleDataDescription,
  dataItems: track.dataItems,
  demoScriptContext: track.demoScriptContext,
  requirements: track.requirements,
  colorCoding: {
    ...track.colorCoding,
    greenCap: capitalize(track.colorCoding.green)
  }
})

const applyTemplate = (template: string, track: ExampleTrack) => {
  const context = buildTemplateContext(track)

  const withLists = template.replace(
    /\{\{list:([^}|]+)(\|indent=(\d+))?\}\}/g,
    (_, path: string, __: string, indentValue: string) => {
      const value = getValueByPath(context, path)
      if (!Array.isArray(value)) {
        return ''
      }
      const indent = Number(indentValue ?? 0)
      const prefix = `${' '.repeat(indent)}- `
      return value.map((item) => `${prefix}${item}`).join('\n')
    }
  )

  return withLists.replace(/\{\{([a-zA-Z0-9_.[\]]+)\}\}/g, (_, path: string) => {
    const value = getValueByPath(context, path)
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    return value !== undefined ? String(value) : ''
  })
}

export const resolveContent = (content: string, track: ExampleTrack): string => {
  return applyTemplate(content, track)
}

let cachedTutorialData: Part[] | null = null

export const loadTutorialData = async (): Promise<Part[]> => {
  if (cachedTutorialData) {
    return cachedTutorialData
  }

  const parts = Object.values(partModules).map((markdown) => {
    return parsePartMarkdown(markdown)
  })

  cachedTutorialData = parts.sort((a, b) => a.number - b.number)
  return cachedTutorialData
}

export const tutorialData: Part[] = []

export const summaryContent = {
  workflow: {
    title: 'The AI-Native Development Pattern',
    description: "Here's the complete pattern you've mastered:",
    steps: [
      'DESCRIBE what you want → AI writes requirements for you',
      'ASK for a task list → AI breaks it into steps',
      'PROMPT one task at a time → AI builds each feature',
      'VERIFY in your browser → refresh and test',
      'SET RULES once → AI follows them automatically',
      'USE AGENTS → Specialized AI personas for specific tasks',
      'CREATE SKILLS → Reusable workflows AI loads automatically'
    ]
  },
  quickReference: {
    title: 'Quick Reference: All Prompts',
    items: [
      { when: 'Start a new project', prompts: 'PROMPT 1, 2, 3' },
      { when: 'Build the first version', prompts: 'PROMPT 4' },
      { when: 'Add new features', prompts: 'PROMPT 5, 6' },
      { when: 'Build features one by one', prompts: 'PROMPT 7 (repeat)' },
      { when: 'Check everything works', prompts: 'PROMPT 8' },
      { when: 'Teach AI your rules', prompts: 'PROMPT 9, 10, 11' },
      { when: 'Set up path-specific rules', prompts: 'PROMPT 12, 13, 14, 15, 16' },
      { when: 'Create custom agents', prompts: 'PROMPT 17, 18, 20, 21' },
      { when: 'Use agents for tasks', prompts: 'PROMPT 19, 22, 23' },
      { when: 'Create agent skills', prompts: 'PROMPT 24, 25, 26, 27' },
      { when: 'Test and use skills', prompts: 'PROMPT 28, 29' },
      { when: 'Complete feature exercise', prompts: 'PROMPT 30, 31, 32, 33, 34' }
    ]
  },
  troubleshooting: {
    title: 'Quick Fixes',
    items: [
      {
        problem: 'AI made too many changes',
        prevention: 'Ask for one task at a time',
        solution: 'Click Discard and try a more specific prompt'
      },
      {
        problem: 'The page looks broken',
        prevention: 'Test after each prompt',
        solution: 'Ask AI: "What did you change?" then "Fix [specific issue]"'
      },
      {
        problem: "AI isn't following rules",
        prevention: 'Create .github/copilot-instructions.md',
        solution: 'Say: "First, read .github/copilot-instructions.md"'
      },
      {
        problem: 'Want to start over',
        prevention: 'Test often so you catch issues early',
        solution: 'Delete app/index.html contents and run PROMPT 4 again'
      },
      {
        problem: 'A feature broke',
        prevention: 'Test ALL features after each change',
        solution: 'Tell AI exactly what broke and when: "[Feature] stopped working after [last change]"'
      },
      {
        problem: 'Custom agent not working',
        prevention: 'Check file is in .github/agents/',
        solution: 'Make sure @agent-name matches the name: field exactly'
      },
      {
        problem: 'Skill not loading',
        prevention: 'File must be named SKILL.md (uppercase)',
        solution: 'Be more explicit in your prompt about what you want'
      },
      {
        problem: 'Path instructions ignored',
        prevention: 'Check applyTo: matches folder path',
        solution: 'Restart Copilot chat to reload instructions'
      }
    ]
  },
  learned: {
    title: "What You've Learned",
    items: [
      'You can build software by describing what you want in plain English',
      'AI writes requirements, creates tasks, and builds code — you just prompt',
      'One task at a time keeps things simple and working',
      'Rules in special files make AI follow your guidelines automatically',
      'Path-specific instructions give different rules to different folders',
      'Custom agents are specialized AI personas you invoke with @name',
      'Agent skills are reusable workflows AI loads automatically when relevant',
      'You can combine all these tools to build complete features professionally'
    ],
    closing:
      'You now have a professional-grade setup for AI-assisted development. This same structure scales from personal projects to team environments — commit these files to git and everyone benefits!'
  }
}
