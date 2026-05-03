// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PathCard } from '@/components/PathCard'
import {
  officialPaths,
  getAllPaths,
  type LearningPath,
} from '@/data/paths'
import { Plus, MagnifyingGlass } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export function CatalogPage() {
  const navigate = useNavigate()
  const [paths, setPaths] = useState<LearningPath[]>(officialPaths)
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
    if (!q) return paths
    return paths.filter((p) => {
      const hay = `${p.title} ${p.tagline} ${p.topics.join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
  }, [paths, query])

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-background">
      <div aria-hidden className="mesh-aurora" style={{ height: '380px', opacity: 0.55 }} />

      <div className="relative mx-auto max-w-5xl px-6 py-10 lg:px-12 lg:py-12 xl:max-w-6xl">
        <header className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)]" />
            <span>Tracks · pick what interests you</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight lg:text-3xl">
                Three independent tracks
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Foundation, Agentic Workflows, and Terminal &amp; CLI are peer topics — start with whichever sounds useful.
              </p>
            </div>
            <span className="numeric text-[11px] text-muted-foreground">
              {String(filtered.length).padStart(2, '0')} / {String(paths.length).padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Search */}
        <div className="surface-glass sticky top-[56px] z-20 -mx-2 mb-5 rounded-xl border border-border/60 px-3 py-2">
          <div className="relative">
            <MagnifyingGlass
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tracks…"
              className="h-8 w-full rounded-md border border-border/70 bg-background/40 pl-7 pr-2.5 text-xs placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search tracks"
            />
          </div>
        </div>

        {/* All tracks in one grid */}
        {filtered.length > 0 ? (
          <section className="mb-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PathCard key={p.id} path={p} />
              ))}
            </div>
          </section>
        ) : (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/15 p-10 text-center">
            <p className="text-sm text-muted-foreground">No tracks match your search.</p>
          </div>
        )}

        {/* Slim contribute strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-border/70 bg-muted/15 px-5 py-3 sm:flex-row">
          <div>
            <h2 className="font-heading text-sm font-semibold">Want to teach a topic?</h2>
            <p className="text-xs text-muted-foreground">
              Add a module to an existing track, or propose a brand-new one.
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
