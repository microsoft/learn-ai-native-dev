// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useMemo, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'
import {
  MagnifyingGlass,
  ArrowRight,
  Sparkle,
  Rocket,
  Terminal,
  BookOpen,
  Lightning,
  Compass,
} from '@phosphor-icons/react'
import { officialPaths, type LearningPath } from '@/data/paths'
import { loadTutorialData, type Part } from '@/data/tutorialContent'
import { loadAdvancedData, type Module } from '@/data/advancedContent'
import { loadTerminalData, type TerminalModule } from '@/data/terminalContent'
import { cn } from '@/lib/utils'

type ItemKind = 'path' | 'module' | 'step' | 'page'

interface PaletteItem {
  id: string
  kind: ItemKind
  title: string
  subtitle?: string
  group: string
  href: string
  accent: 'electric' | 'violet' | 'emerald' | 'cyan'
  keywords: string
}

const PATH_ACCENT: Record<string, PaletteItem['accent']> = {
  foundation: 'electric',
  agentic: 'violet',
  terminal: 'emerald',
}

function buildStaticItems(): PaletteItem[] {
  const items: PaletteItem[] = []
  for (const p of officialPaths) {
    items.push({
      id: `path:${p.id}`,
      kind: 'path',
      title: p.title,
      subtitle: p.tagline,
      group: 'Paths',
      href: `/learn/${p.id}`,
      accent: PATH_ACCENT[p.id] ?? 'electric',
      keywords: `${p.title} ${p.tagline} ${p.topics.join(' ')} path`,
    })
  }
  items.push(
    {
      id: 'page:catalog',
      kind: 'page',
      title: 'Browse all paths',
      subtitle: 'Catalog · filter by level and status',
      group: 'Pages',
      href: '/learn',
      accent: 'cyan',
      keywords: 'catalog browse all paths learn',
    },
    {
      id: 'page:examples',
      kind: 'page',
      title: 'Pick an example project',
      subtitle: 'Examples · choose your project track',
      group: 'Pages',
      href: '/projects',
      accent: 'cyan',
      keywords: 'examples projects tracks',
    },
    {
      id: 'page:contribute',
      kind: 'page',
      title: 'Contribute',
      subtitle: 'Add an example, fix content, propose a topic',
      group: 'Pages',
      href: '/contribute',
      accent: 'cyan',
      keywords: 'contribute help add fix propose',
    }
  )
  return items
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const [foundation, setFoundation] = useState<Part[]>([])
  const [agentic, setAgentic] = useState<Module[]>([])
  const [terminal, setTerminal] = useState<TerminalModule[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // Global Cmd-K / Ctrl-K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isPaletteToggle =
        (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)
      if (isPaletteToggle) {
        e.preventDefault()
        setOpen((v) => !v)
        return
      }
      // Slash also opens, unless typing in a field
      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !(document.activeElement as HTMLElement | null)?.isContentEditable
      ) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lazy-load lesson content the first time the palette opens
  useEffect(() => {
    if (!open) return
    if (foundation.length === 0) loadTutorialData().then(setFoundation)
    if (agentic.length === 0) loadAdvancedData().then(setAgentic)
    if (terminal.length === 0) loadTerminalData().then(setTerminal)
    // Focus is handled via Radix autoFocus on input below
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [open, foundation.length, agentic.length, terminal.length])

  const allItems = useMemo<PaletteItem[]>(() => {
    const items = buildStaticItems()
    for (const part of foundation) {
      const subtitle =
        part.number === 0 ? 'Getting started' : `Foundation · Part ${part.number}`
      items.push({
        id: `mod:foundation:${part.id}`,
        kind: 'module',
        title: part.title,
        subtitle,
        group: 'Foundation',
        href: `/learn/foundation/${part.id}`,
        accent: 'electric',
        keywords: `${part.title} ${part.subtitle} foundation part ${part.number}`,
      })
      for (const step of part.steps) {
        items.push({
          id: `step:foundation:${part.id}:${step.id}`,
          kind: 'step',
          title: step.title,
          subtitle: `${part.title}${step.prompt ? ` · Prompt ${step.prompt.number}` : ''}`,
          group: 'Foundation',
          href: `/learn/foundation/${part.id}/${step.id}`,
          accent: 'electric',
          keywords: `${step.title} ${part.title} ${step.prompt?.title ?? ''}`,
        })
      }
    }
    for (const mod of agentic) {
      items.push({
        id: `mod:agentic:${mod.id}`,
        kind: 'module',
        title: mod.title,
        subtitle: `Agentic · Module ${mod.number}`,
        group: 'Agentic Workflows',
        href: `/learn/agentic/${mod.id}`,
        accent: 'violet',
        keywords: `${mod.title} ${mod.subtitle} agentic module ${mod.number} mcp`,
      })
      for (const step of mod.steps) {
        items.push({
          id: `step:agentic:${mod.id}:${step.id}`,
          kind: 'step',
          title: step.title,
          subtitle: `${mod.title}${step.prompt?.number ? ` · Prompt ${step.prompt.number}` : ''}`,
          group: 'Agentic Workflows',
          href: `/learn/agentic/${mod.id}/${step.id}`,
          accent: 'violet',
          keywords: `${step.title} ${mod.title} ${step.prompt?.title ?? ''}`,
        })
      }
    }
    for (const mod of terminal) {
      items.push({
        id: `mod:terminal:${mod.id}`,
        kind: 'module',
        title: mod.title,
        subtitle: `Terminal · Module ${mod.number}`,
        group: 'Terminal & CLI',
        href: `/learn/terminal/${mod.id}`,
        accent: 'emerald',
        keywords: `${mod.title} ${mod.subtitle} terminal cli module ${mod.number}`,
      })
      for (const step of mod.steps) {
        items.push({
          id: `step:terminal:${mod.id}:${step.id}`,
          kind: 'step',
          title: step.title,
          subtitle: `${mod.title}${step.prompt?.number ? ` · Prompt ${step.prompt.number}` : ''}`,
          group: 'Terminal & CLI',
          href: `/learn/terminal/${mod.id}/${step.id}`,
          accent: 'emerald',
          keywords: `${step.title} ${mod.title} ${step.prompt?.title ?? ''} terminal cli`,
        })
      }
    }
    return items
  }, [foundation, agentic, terminal])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      // No query: show paths + pages + first module of each path as a curated home
      const featured = allItems.filter(
        (it) => it.kind === 'path' || it.kind === 'page'
      )
      return featured
    }
    const tokens = q.split(/\s+/).filter(Boolean)
    const scored: Array<{ item: PaletteItem; score: number }> = []
    for (const item of allItems) {
      const hay = (item.title + ' ' + (item.keywords ?? '')).toLowerCase()
      let score = 0
      let matched = true
      for (const t of tokens) {
        if (!hay.includes(t)) {
          matched = false
          break
        }
        if (item.title.toLowerCase().startsWith(t)) score += 8
        else if (item.title.toLowerCase().includes(t)) score += 5
        else score += 1
      }
      if (matched) {
        if (item.kind === 'path') score += 6
        if (item.kind === 'page') score += 3
        if (item.kind === 'module') score += 2
        scored.push({ item, score })
      }
    }
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 50).map((s) => s.item)
  }, [query, allItems])

  // Keep activeIdx in range
  useEffect(() => {
    setActiveIdx(0)
  }, [query, open])

  const handleSelect = (item: PaletteItem) => {
    setOpen(false)
    setQuery('')
    navigate(item.href)
  }

  const groups = useMemo(() => {
    const map = new Map<string, PaletteItem[]>()
    for (const it of filtered) {
      if (!map.has(it.group)) map.set(it.group, [])
      map.get(it.group)!.push(it)
    }
    return Array.from(map.entries())
  }, [filtered])

  // Flat list for keyboard navigation
  const flatList = filtered

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-[14%] z-50 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/70 bg-popover/95 shadow-[var(--elev-3)] backdrop-blur-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActiveIdx((i) => Math.min(flatList.length - 1, i + 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActiveIdx((i) => Math.max(0, i - 1))
            } else if (e.key === 'Enter') {
              e.preventDefault()
              const item = flatList[activeIdx]
              if (item) handleSelect(item)
            }
          }}
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Dialog.Description className="sr-only">
            Jump to any path, module, or step
          </Dialog.Description>

          <div className="flex items-center gap-2 border-b border-border/60 px-4">
            <MagnifyingGlass size={16} className="shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search paths, modules, prompts…"
              aria-label="Search"
              className="h-12 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="numeric hidden rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
              esc
            </kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto py-2">
            {flatList.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                No results for{' '}
                <span className="font-medium text-foreground">"{query}"</span>
              </div>
            ) : (
              groups.map(([group, items]) => (
                <div key={group} className="px-2 pb-2">
                  <div className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {group}
                  </div>
                  <div className="flex flex-col">
                    {items.map((item) => {
                      const idx = flatList.indexOf(item)
                      const active = idx === activeIdx
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-accent={item.accent}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => handleSelect(item)}
                          className={cn(
                            'group flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors',
                            active
                              ? 'bg-[var(--accent-soft)] text-foreground'
                              : 'hover:bg-muted/40'
                          )}
                        >
                          <ItemIcon kind={item.kind} accent={item.accent} />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-foreground">
                              {item.title}
                            </div>
                            {item.subtitle && (
                              <div className="truncate text-[11px] text-muted-foreground">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                          <ArrowRight
                            size={14}
                            weight="bold"
                            className={cn(
                              'shrink-0 transition-all',
                              active
                                ? 'translate-x-0.5 text-[var(--accent-color)]'
                                : 'text-muted-foreground/40 opacity-0 group-hover:opacity-100'
                            )}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-4 py-2 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="numeric inline-flex items-center gap-1">
                <kbd className="rounded border border-border/70 bg-background/50 px-1.5 py-0.5 font-medium">
                  ↑↓
                </kbd>
                navigate
              </span>
              <span className="numeric inline-flex items-center gap-1">
                <kbd className="rounded border border-border/70 bg-background/50 px-1.5 py-0.5 font-medium">
                  ↵
                </kbd>
                select
              </span>
              <span className="numeric inline-flex items-center gap-1">
                <kbd className="rounded border border-border/70 bg-background/50 px-1.5 py-0.5 font-medium">
                  esc
                </kbd>
                close
              </span>
            </div>
            <span className="numeric">{flatList.length} results</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ItemIcon({
  kind,
  accent,
}: {
  kind: ItemKind
  accent: PaletteItem['accent']
}) {
  const Icon =
    kind === 'path'
      ? accent === 'violet'
        ? Rocket
        : accent === 'emerald'
        ? Terminal
        : Sparkle
      : kind === 'module'
      ? BookOpen
      : kind === 'step'
      ? Lightning
      : Compass
  return (
    <span
      data-accent={accent}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/70 bg-[var(--accent-soft)]"
    >
      <Icon size={14} weight="duotone" className="text-[var(--accent-color)]" />
    </span>
  )
}
