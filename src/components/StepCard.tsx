import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { PromptBox } from './PromptBox'
import { 
  FileHierarchyDiagram,
  MCPArchitectureDiagram,
  WorkflowComparisonDiagram,
  AgentOrchestrationDiagram,
  AITestingFlowDiagram,
  CapstoneArchitectureDiagram,
  AgenticLoopDiagram,
  ProviderAbstractionDiagram,
  SkillSystemFlowDiagram,
  SpecDrivenCycleDiagram
} from './diagrams'
import type { Step } from '@/data/tutorialContent'
import { resolveContent } from '@/data/tutorialContent'
import { useTrack } from '@/hooks/use-track'
import { CaretRight } from '@phosphor-icons/react'

interface StepCardProps {
  step: Step | { id: string; title: string; content: string; prompt?: { number: string; title: string; code: string; metaPrompt?: string }; prompts?: { number: string; title: string; code: string; metaPrompt?: string }[] }
  partNumber: number
  index: number
  isAdvanced?: boolean
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function parseMarkdown(text: string): string {
  let result = escapeHtml(text)
  
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')

  result = result.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em class="italic text-foreground">$2</em>')

  result = result.replace(/(^|[^_])_([^_]+)_(?!_)/g, '$1<em class="italic text-foreground">$2</em>')
  
  result = result.replace(/`([^`]+)`/g, '<code class="rounded bg-muted px-2 py-0.5 font-mono text-sm text-foreground border border-border">$1</code>')
  
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
  
  return result
}

function CollapsibleBlock({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Parse the collapsible content as blocks
  const blocks = parseContentBlocks(content)
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="my-4">
      <CollapsibleTrigger className="flex w-full items-center gap-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground">
        <CaretRight 
          size={14} 
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        />
        <span dangerouslySetInnerHTML={{ __html: parseMarkdown(title) }} />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
        <div className="ml-5 border-l border-border pl-4 pt-1 pb-2">
          {blocks.map((block, idx) => (
            <CollapsibleBlockRenderer key={idx} block={block} idx={idx} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Separate renderer for collapsible content to avoid circular dependency with renderBlock
function CollapsibleBlockRenderer({ block, idx }: { block: ContentBlock; idx: number }) {
  switch (block.type) {
    case 'code':
      return (
        <div key={idx} className="relative my-3">
          {block.language && (
            <div className="absolute right-3 top-2 z-10 rounded bg-muted px-2 py-0.5 text-[11px] font-mono font-medium text-muted-foreground">
              {block.language}
            </div>
          )}
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-[15px] shadow-sm">
            <code className="text-foreground font-mono leading-[1.6]">{block.content}</code>
          </pre>
        </div>
      )
    case 'heading':
      return (
        <h4
          key={idx}
          className="mb-2 mt-4 font-heading text-base font-bold text-foreground"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
        />
      )
    case 'numbered-list':
      return (
        <ol key={idx} className="my-2 ml-6 list-decimal space-y-1 marker:font-semibold marker:text-primary">
          {block.items?.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="text-base leading-[1.7] text-foreground pl-1"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
            />
          ))}
        </ol>
      )
    case 'bullet-list':
      return (
        <ul className="my-2 ml-6 list-disc space-y-1 marker:text-primary">
          {block.items?.map((item, itemIdx) => (
            <li
              key={itemIdx}
              className="text-base leading-[1.7] text-foreground"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
            />
          ))}
        </ul>
      )
    case 'table':
      return (
        <div key={idx} className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {block.headers?.map((header, headerIdx) => (
                  <th
                    key={headerIdx}
                    className="px-3 py-2 text-left font-semibold text-foreground"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(header) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-border last:border-b-0">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-3 py-2 text-foreground"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'callout':
      return (
        <div
          key={idx}
          className="my-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm leading-[1.6] text-foreground"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
        />
      )
    case 'blockquote':
      return (
        <blockquote
          key={idx}
          className="my-3 border-l-4 border-primary/30 bg-muted/30 py-2 pl-4 pr-3 italic text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
        />
      )
    case 'tabs':
      return block.tabs ? (
        <TabsBlock key={idx} tabs={block.tabs} />
      ) : null
    case 'tip':
      return (
        <div key={idx} className="my-3 flex gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm leading-[1.6]">
          <span className="shrink-0 mt-0.5">💡</span>
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
        </div>
      )
    case 'note':
      return (
        <div key={idx} className="my-3 flex gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-sm leading-[1.6]">
          <span className="shrink-0 mt-0.5">ℹ️</span>
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
        </div>
      )
    case 'warning':
      return (
        <div key={idx} className="my-3 flex gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm leading-[1.6]">
          <span className="shrink-0 mt-0.5">⚠️</span>
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
        </div>
      )
    case 'caution':
      return (
        <div key={idx} className="my-3 flex gap-2.5 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-sm leading-[1.6]">
          <span className="shrink-0 mt-0.5">🛑</span>
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
        </div>
      )
    case 'verify':
      return (
        <div key={idx} className="my-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm leading-[1.6]">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span>✅</span> You Should See
          </div>
          <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
        </div>
      )
    case 'paragraph':
    default:
      return (
        <p
          key={idx}
          className="my-2 text-base leading-[1.7] text-foreground"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
        />
      )
  }
}

interface ContentBlock {
  type: 'paragraph' | 'numbered-list' | 'bullet-list' | 'code' | 'heading' | 'callout' | 'celebration' | 'table' | 'collapsible' | 'blockquote' | 'hr' | 'prompt-placeholder' | 'diagram' | 'tabs' | 'tip' | 'warning' | 'note' | 'caution' | 'verify'
  content: string
  items?: string[]
  headers?: string[]
  rows?: string[][]
  collapsibleTitle?: string
  diagramName?: string
  language?: string
  tabs?: { label: string; content: string }[]
}

// Subtle brand accent for known providers/tools in tab labels
function getTabAccent(label: string): { hex: string; rgba: string } | null {
  const l = label.toLowerCase()
  if (l.includes('anthropic') || l.includes('claude'))
    return { hex: '#e8900c', rgba: 'rgba(232, 144, 12, 0.10)' }
  if (l.includes('copilot'))
    return { hex: '#6366f1', rgba: 'rgba(99, 102, 241, 0.10)' }
  if (l.includes('openai') || l.includes('gpt'))
    return { hex: '#10b981', rgba: 'rgba(16, 185, 129, 0.10)' }
  if (l.includes('custom'))
    return { hex: '#a855f7', rgba: 'rgba(168, 85, 247, 0.10)' }
  return null
}

function TabsBlock({ tabs }: { tabs: { label: string; content: string }[] }) {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const stored = localStorage.getItem('preferred-provider-tab')
      if (stored) {
        const idx = tabs.findIndex(t => t.label === stored)
        if (idx !== -1) return idx
      }
    } catch { /* localStorage unavailable */ }
    return 0
  })

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    try { localStorage.setItem('preferred-provider-tab', tabs[index].label) } catch { /* ignore */ }
  }

  const blocks = parseContentBlocks(tabs[activeTab].content)
  const activeAccent = getTabAccent(tabs[activeTab].label)

  return (
    <div
      className="my-5 rounded-xl overflow-hidden backdrop-blur-sm"
      style={{
        border: `1px solid ${activeAccent ? activeAccent.hex + '18' : 'var(--color-neutral-a4, rgba(255,255,255,0.08))'}`,
        background: activeAccent ? activeAccent.rgba.replace('0.10', '0.03') : 'rgba(255,255,255,0.02)'
      }}
    >
      <div
        className="flex gap-1 p-1.5"
        style={{ borderBottom: `1px solid ${activeAccent ? activeAccent.hex + '15' : 'var(--color-neutral-a3, rgba(255,255,255,0.06))'}`, background: 'rgba(255,255,255,0.02)' }}
      >
        {tabs.map((tab, index) => {
          const accent = getTabAccent(tab.label)
          const isActive = index === activeTab
          return (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                isActive
                  ? 'shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={isActive ? {
                backgroundColor: accent ? accent.rgba : 'rgba(255,255,255,0.06)',
                color: accent ? accent.hex : 'var(--color-fg, #f0f0f0)'
              } : undefined}
            >
              {accent && (
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-opacity duration-150"
                  style={{
                    backgroundColor: accent.hex,
                    opacity: isActive ? 1 : 0.3
                  }}
                />
              )}
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="px-5 py-4">
        {blocks.map((block, idx) => (
          <CollapsibleBlockRenderer key={`${activeTab}-${idx}`} block={block} idx={idx} />
        ))}
      </div>
    </div>
  )
}

function parseContentBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const lines = content.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Skip empty lines
    if (!trimmedLine) {
      i++
      continue
    }

    // Horizontal rules (--- on its own line, not in frontmatter)
    if (trimmedLine === '---') {
      blocks.push({ type: 'hr', content: '' })
      i++
      continue
    }

    // Collapsible blocks (:::collapsible ... :::)
    if (trimmedLine.startsWith(':::collapsible')) {
      i++ // skip opening :::collapsible
      let title = ''
      const collapsibleLines: string[] = []
      let inContent = false
      
      while (i < lines.length && !lines[i].trim().startsWith(':::')) {
        const currentLine = lines[i]
        if (currentLine.trim().startsWith('title:')) {
          title = currentLine.trim().replace(/^title:\s*/, '')
        } else if (currentLine.trim() === '---') {
          inContent = true
        } else if (inContent) {
          collapsibleLines.push(currentLine)
        }
        i++
      }
      i++ // skip closing :::
      blocks.push({ type: 'collapsible', content: collapsibleLines.join('\n').trim(), collapsibleTitle: title })
      continue
    }

    // Diagram blocks (:::diagram name :::)
    if (trimmedLine.startsWith(':::diagram')) {
      const diagramName = trimmedLine.replace(':::diagram', '').trim()
      i++ // skip opening line
      // Skip any content until closing :::
      while (i < lines.length && !lines[i].trim().startsWith(':::')) {
        i++
      }
      i++ // skip closing :::
      blocks.push({ type: 'diagram', content: '', diagramName })
      continue
    }

    // Tabs blocks (:::tabs ... :::)
    if (trimmedLine === ':::tabs') {
      i++ // skip opening :::tabs
      const tabsData: { label: string; content: string }[] = []
      let currentLabel = ''
      let currentTabLines: string[] = []
      let pastSeparator = false
      let inCodeBlock = false

      while (i < lines.length) {
        const currentLine = lines[i]
        const trimmed = currentLine.trim()

        if (trimmed.startsWith('```')) inCodeBlock = !inCodeBlock

        if (!inCodeBlock) {
          if (trimmed === ':::') break

          if (trimmed.startsWith('tab:')) {
            if (currentLabel) {
              tabsData.push({ label: currentLabel, content: currentTabLines.join('\n').trim() })
            }
            currentLabel = trimmed.replace(/^tab:\s*/, '')
            currentTabLines = []
            pastSeparator = false
            i++
            continue
          }

          if (trimmed === '---' && !pastSeparator) {
            pastSeparator = true
            i++
            continue
          }
        }

        if (pastSeparator) currentTabLines.push(currentLine)
        i++
      }

      if (currentLabel) {
        tabsData.push({ label: currentLabel, content: currentTabLines.join('\n').trim() })
      }
      if (i < lines.length) i++ // skip closing :::

      if (tabsData.length > 0) {
        blocks.push({ type: 'tabs', content: '', tabs: tabsData })
      }
      continue
    }

    // Prompt placeholder - marks where the PromptBox should be rendered inline
    if (trimmedLine === ':::prompt-placeholder:::') {
      blocks.push({ type: 'prompt-placeholder', content: '' })
      i++
      continue
    }

    // Prompt blocks (:::prompt ... :::) - should be stripped earlier, but skip defensively
    if (trimmedLine.startsWith(':::prompt')) {
      i++ // skip opening :::prompt
      while (i < lines.length && !lines[i].trim().startsWith(':::')) {
        i++
      }
      i++ // skip closing :::
      continue
    }

    // Callout blocks (:::tip, :::warning, :::note, :::caution)
    if (/^:::(tip|warning|note|caution)\b/.test(trimmedLine)) {
      const calloutType = trimmedLine.match(/^:::(\w+)/)?.[1] as 'tip' | 'warning' | 'note' | 'caution'
      i++
      const calloutLines: string[] = []
      while (i < lines.length && lines[i].trim() !== ':::') {
        calloutLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      blocks.push({ type: calloutType, content: calloutLines.join('\n').trim() })
      continue
    }

    // Verify blocks (:::verify)
    if (trimmedLine.startsWith(':::verify')) {
      i++
      const verifyLines: string[] = []
      while (i < lines.length && lines[i].trim() !== ':::') {
        verifyLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      blocks.push({ type: 'verify', content: verifyLines.join('\n').trim() })
      continue
    }

    // Unknown ::: directives - skip to avoid infinite loops
    if (trimmedLine.startsWith(':::')) {
      i++
      continue
    }

    // Blockquotes (> text)
    if (trimmedLine.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''))
        i++
      }
      blocks.push({ type: 'blockquote', content: quoteLines.join(' ') })
      continue
    }

    // Code blocks
    if (trimmedLine.startsWith('```')) {
      const language = trimmedLine.slice(3).trim() || undefined
      const codeLines: string[] = []
      i++ // skip opening ```
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      blocks.push({ type: 'code', content: codeLines.join('\n'), language })
      continue
    }

    // Headings (##, ###, ####)
    if (/^#{2,4}\s/.test(trimmedLine)) {
      blocks.push({ type: 'heading', content: trimmedLine.replace(/^#{2,4}\s*/, '') })
      i++
      continue
    }

    // Numbered lists (1. 2. 3. etc.)
    if (/^\d+\.\s/.test(trimmedLine)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s*/, ''))
        i++
      }
      blocks.push({ type: 'numbered-list', content: '', items })
      continue
    }

    // Bullet lists (- or • or ✓ or ✅ or ❌)
    if (/^[-•✓✅❌]\s/.test(trimmedLine)) {
      const items: string[] = []
      while (i < lines.length && /^[-•✓✅❌]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-•✓✅❌]\s*/, ''))
        i++
      }
      blocks.push({ type: 'bullet-list', content: '', items })
      continue
    }

    // Callouts (💡 tips)
    if (trimmedLine.startsWith('💡')) {
      blocks.push({ type: 'callout', content: trimmedLine })
      i++
      continue
    }

    // Celebration paragraphs
    if (trimmedLine.includes('🎉')) {
      blocks.push({ type: 'celebration', content: trimmedLine })
      i++
      continue
    }

    // Tables (lines starting with |)
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }
      if (tableLines.length >= 2) {
        // Parse header row
        const headers = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map(cell => cell.trim())
        
        // Skip the separator row (index 1) and parse data rows
        const rows = tableLines.slice(2).map(row =>
          row.split('|').slice(1, -1).map(cell => cell.trim())
        )
        
        blocks.push({ type: 'table', content: '', headers, rows })
      }
      continue
    }

    // Regular paragraph - collect consecutive non-special lines
    const paragraphLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !/^#{2,4}\s/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !/^[-•✓✅❌]\s/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('💡') &&
      !lines[i].trim().includes('🎉') &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) &&
      !lines[i].trim().startsWith(':::') &&
      !lines[i].trim().startsWith('>') &&
      lines[i].trim() !== '---'
    ) {
      paragraphLines.push(lines[i].trim())
      i++
    }
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', content: paragraphLines.join(' ') })
    }
  }

  return blocks
}

export function StepCard({ step, partNumber, index, isAdvanced = false }: StepCardProps) {
  const { selectedTrack } = useTrack()

  // Resolve dynamic content based on selected track (only for non-advanced content)
  const content = isAdvanced ? step.content : resolveContent(step.content, selectedTrack)

  // Get all prompts (prefer prompts array, fall back to single prompt)
  const allPrompts = (step as { prompts?: { number: string; title: string; code: string; metaPrompt?: string }[] }).prompts ?? (step.prompt ? [step.prompt] : [])
  const resolvedPrompts = allPrompts.map(p => ({
    ...p,
    code: isAdvanced ? p.code : resolveContent(p.code, selectedTrack)
  }))

  const blocks = parseContentBlocks(content)

  // Track which prompt placeholder we're on
  let promptIndex = 0

  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case 'code':
        return (
          <div key={idx} className="relative my-5">
            {block.language && (
              <div className="absolute right-3 top-2 z-10 rounded bg-muted px-2 py-0.5 text-[11px] font-mono font-medium text-muted-foreground">
                {block.language}
              </div>
            )}
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-[15px] shadow-sm">
              <code className="text-foreground font-mono leading-[1.6]">{block.content}</code>
            </pre>
            <div className="pointer-events-none absolute inset-y-px right-px w-6 rounded-r-lg bg-gradient-to-l from-muted/80 to-transparent md:hidden" aria-hidden="true" />
          </div>
        )

      case 'heading':
        return (
          <h4
            key={idx}
            className="mb-3 mt-6 font-heading text-lg font-bold text-foreground tracking-tight md:text-xl"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
          />
        )

      case 'numbered-list':
        return (
          <ol key={idx} className="my-4 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-primary">
            {block.items?.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="text-base leading-[1.7] text-foreground pl-2"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
              />
            ))}
          </ol>
        )

      case 'bullet-list':
        return (
          <ul key={idx} className="my-4 ml-6 list-disc space-y-2 marker:text-primary">
            {block.items?.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="text-base leading-[1.7] text-foreground pl-2"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
              />
            ))}
          </ul>
        )

      case 'callout':
        return (
          <div
            key={idx}
            className="my-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-[15px] leading-[1.6] text-foreground"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
          />
        )

      case 'celebration':
        return (
          <p
            key={idx}
            className="my-5 rounded-lg border border-primary/20 bg-primary/5 p-4 text-base font-semibold text-foreground shadow-sm md:p-5 md:text-lg"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
          />
        )

      case 'table':
        return (
          <div key={idx} className="my-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {block.headers?.map((header, headerIdx) => (
                    <th
                      key={headerIdx}
                      className="px-4 py-3 text-left font-semibold text-foreground"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(header) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows?.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="px-4 py-3 text-foreground"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(cell) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'collapsible':
        return (
          <CollapsibleBlock
            key={idx}
            title={block.collapsibleTitle || 'Details'}
            content={block.content}
          />
        )

      case 'blockquote':
        return (
          <blockquote
            key={idx}
            className="my-4 border-l-4 border-primary/30 bg-muted/30 py-3 pl-4 pr-4 italic text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
          />
        )

      case 'hr':
        return (
          <hr key={idx} className="my-8 border-t border-border" />
        )

      case 'prompt-placeholder':
        // Render the PromptBox inline where it appeared in the original markdown
        if (resolvedPrompts.length > 0 && promptIndex < resolvedPrompts.length) {
          const currentPrompt = resolvedPrompts[promptIndex]
          promptIndex++
          return (
            <div key={idx} className="my-5">
              <PromptBox
                number={currentPrompt.number}
                title={currentPrompt.title}
                code={currentPrompt.code}
                metaPrompt={currentPrompt.metaPrompt}
              />
            </div>
          )
        }
        return null

      case 'diagram':
        // Render named diagram components
        switch (block.diagramName) {
          case 'file-hierarchy':
            return <FileHierarchyDiagram key={idx} />
          case 'mcp-architecture':
            return <MCPArchitectureDiagram key={idx} />
          case 'workflow-comparison':
            return <WorkflowComparisonDiagram key={idx} />
          case 'agent-orchestration':
            return <AgentOrchestrationDiagram key={idx} />
          case 'ai-testing-flow':
            return <AITestingFlowDiagram key={idx} />
          case 'capstone-architecture':
            return <CapstoneArchitectureDiagram key={idx} />
          case 'agentic-loop':
            return <AgenticLoopDiagram key={idx} />
          case 'provider-abstraction':
            return <ProviderAbstractionDiagram key={idx} />
          case 'skill-system-flow':
            return <SkillSystemFlowDiagram key={idx} />
          case 'spec-driven-cycle':
            return <SpecDrivenCycleDiagram key={idx} />
          default:
            return null
        }

      case 'tabs':
        return block.tabs ? (
          <TabsBlock key={idx} tabs={block.tabs} />
        ) : null

      case 'tip':
        return (
          <div key={idx} className="my-4 flex gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-[15px] leading-[1.6]">
            <span className="shrink-0 mt-0.5 text-lg">💡</span>
            <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
          </div>
        )

      case 'note':
        return (
          <div key={idx} className="my-4 flex gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-[15px] leading-[1.6]">
            <span className="shrink-0 mt-0.5 text-lg">ℹ️</span>
            <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
          </div>
        )

      case 'warning':
        return (
          <div key={idx} className="my-4 flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-[15px] leading-[1.6]">
            <span className="shrink-0 mt-0.5 text-lg">⚠️</span>
            <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
          </div>
        )

      case 'caution':
        return (
          <div key={idx} className="my-4 flex gap-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-4 text-[15px] leading-[1.6]">
            <span className="shrink-0 mt-0.5 text-lg">🛑</span>
            <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
          </div>
        )

      case 'verify':
        return (
          <div key={idx} className="my-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-[15px] leading-[1.6]">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span>✅</span> You Should See
            </div>
            <div className="text-foreground" dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
          </div>
        )

      case 'paragraph':
      default:
        return (
          <p
            key={idx}
            className="my-4 text-base leading-[1.7] text-foreground"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
          />
        )
    }
  }

  return (
    <div id={step.id} className="scroll-mt-28">
      <Card className="overflow-hidden border border-border bg-card shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
        {/* Step Header */}
        <div className="border-b border-border bg-muted/30 px-6 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Step {index + 1}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {Math.max(1, Math.round(content.split(/\s+/).length / 200))} min read
            </span>
          </div>
          <h3 className="mt-3 font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {step.title}
          </h3>
        </div>

        {/* Step Content */}
        <div className="px-6 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-2xl">
            {blocks.map((block, idx) => renderBlock(block, idx))}
          </div>
        </div>
      </Card>
    </div>
  )
}
