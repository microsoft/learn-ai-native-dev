// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PathCard } from '@/components/PathCard'
import {
  officialPaths,
  getAllPaths,
  type LearningPath,
  type Level,
  type ContentStatus,
} from '@/data/paths'
import { Plus, MagnifyingGlass } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const LEVELS: Array<Level | 'all'> = ['all', 'beginner', 'intermediate', 'advanced']
const STATUSES: Array<ContentStatus | 'all'> = ['all', 'official', 'community', 'experimental']

interface PillProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function Pill({ active, onClick, children }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-7 items-center rounded-md px-2.5 text-[11px] font-medium capitalize tracking-wide transition-all',
        active
          ? 'border border-[var(--accent-edge)] bg-[var(--accent-soft)] text-[var(--accent-color)]'
          : 'border border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

export function CatalogPage() {
  const navigate = useNavigate()
  const [paths, setPaths] = useState<LearningPath[]>(officialPaths)
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [status, setStatus] = useState<ContentStatus | 'all'>('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    getAllPaths().then((all) => {
      if (!cancelled) setPaths(all)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return paths.filter((p) => {
      if (level !== 'all' && p.level !== level) return false
      if (status !== 'all' && p.status !== status) return false
      if (q) {
        const hay = `${p.title} ${p.tagline} ${p.topics.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [paths, level, status, query])

  const official = filtered.filter((p) => p.status === 'official')
  const community = filtered.filter((p) => p.status !== 'official')

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-background">
      <div aria-hidden className="mesh-aurora" style={{ height: '380px', opacity: 0.55 }} />

      <div className="relative mx-auto max-w-5xl px-6 py-10 lg:px-12 lg:py-12 xl:max-w-6xl">
        <header className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)]" />
            <span>Learning paths · Catalog</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight lg:text-3xl">
                Browse all paths
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Every learning path on the site, filterable by level and status.
              </p>
            </div>
            <span className="numeric text-[11px] text-muted-foreground">
              {String(filtered.length).padStart(2, '0')} / {String(paths.length).padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Sticky toolbar */}
        <div className="surface-glass sticky top-[56px] z-20 -mx-2 mb-5 flex flex-col gap-2 rounded-xl border border-border/60 px-2 py-2 lg:flex-row lg:items-center lg:gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/40 p-1">
            <span className="px-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Level
            </span>
            {LEVELS.map((l) => (
              <Pill key={l} active={level === l} onClick={() => setLevel(l)}>
                {l}
              </Pill>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/40 p-1">
            <span className="px-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Status
            </span>
            {STATUSES.map((s) => (
              <Pill key={s} active={status === s} onClick={() => setStatus(s)}>
                {s}
              </Pill>
            ))}
          </div>

          <div className="relative flex-1 lg:ml-auto lg:max-w-[220px]">
            <MagnifyingGlass
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search paths…"
              className="h-8 w-full rounded-md border border-border/70 bg-background/40 pl-7 pr-2.5 text-xs placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search learning paths"
            />
          </div>
        </div>

        {/* Sections */}
        {official.length > 0 && (
          <section className="mb-8">
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Official
                </h2>
                <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                  {official.length}
                </Badge>
              </div>
              <span className="hairline mx-4 hidden flex-1 sm:block" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {official.map((p) => (
                <PathCard key={p.id} path={p} />
              ))}
            </div>
          </section>
        )}

        {community.length > 0 && (
          <section className="mb-8">
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Community
                </h2>
                <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                  {community.length}
                </Badge>
              </div>
              <span className="hairline mx-4 hidden flex-1 sm:block" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {community.map((p) => (
                <PathCard key={p.id} path={p} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/15 p-10 text-center">
            <p className="text-sm text-muted-foreground">No paths match your filters.</p>
          </div>
        )}

        {/* Slim contribute strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-border/70 bg-muted/15 px-5 py-3 sm:flex-row">
          <div>
            <h2 className="font-heading text-sm font-semibold">Want to teach a topic?</h2>
            <p className="text-xs text-muted-foreground">
              Add a module to an existing path, or propose a brand-new one.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-border/70 text-xs"
            onClick={() => navigate('/contribute/propose-topic')}
          >
            <Plus size={12} weight="bold" />
            Propose a topic
          </Button>
        </div>
      </div>
    </div>
  )
}
