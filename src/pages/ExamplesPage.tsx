// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ExampleCard } from '@/components/ExampleCard'
import { AudienceFilterBar, AudienceFilter } from '@/components/AudienceFilterBar'
import { exampleTracks } from '@/data/exampleTracks'
import { useTrack } from '@/hooks/use-track'
import { Shuffle, Plus, MagnifyingGlass } from '@phosphor-icons/react'

export function ExamplesPage() {
  const { setSelectedTrack } = useTrack()
  const navigate = useNavigate()
  const [audience, setAudience] = useState<AudienceFilter>('all')
  const [query, setQuery] = useState('')

  const visibleTracks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exampleTracks.filter((t) => {
      if (audience !== 'all' && (t.audience ?? 'business') !== audience) return false
      if (q) {
        const hay = `${t.name} ${t.industry} ${t.description} ${t.whatYouBuild}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [audience, query])

  const handleSelect = (trackId: string) => {
    setSelectedTrack(trackId)
    navigate('/learn/foundation/getting-started/what-youll-learn')
  }

  const handleSurprise = () => {
    if (visibleTracks.length === 0) return
    const pick = visibleTracks[Math.floor(Math.random() * visibleTracks.length)]
    handleSelect(pick.id)
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-background">
      <div aria-hidden className="mesh-aurora" style={{ height: '420px', opacity: 0.6 }} />

      <div className="relative mx-auto max-w-5xl px-6 py-10 lg:px-12 lg:py-12 xl:max-w-6xl">
        {/* Compact header */}
        <header className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)]" />
            <span>Step 01 · Pick a project</span>
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight lg:text-3xl">
            Choose your example
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Same Foundation lessons, different example project. Pick what excites you —
            you can switch later.
          </p>
        </header>

        {/* Sticky compact toolbar */}
        <div className="surface-glass sticky top-[56px] z-20 -mx-2 mb-5 flex flex-col gap-2 rounded-xl border border-border/60 px-2 py-2 lg:flex-row lg:items-center lg:gap-3">
          <div className="flex-1 lg:flex-none">
            <AudienceFilterBar value={audience} onChange={setAudience} />
          </div>

          <div className="hidden h-5 w-px bg-border/70 lg:block" />

          <div className="relative flex-1 lg:max-w-[220px]">
            <MagnifyingGlass
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search examples…"
              className="h-8 w-full rounded-md border border-border/70 bg-background/40 pl-7 pr-2.5 text-xs placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search examples"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="numeric hidden text-[11px] text-muted-foreground sm:inline">
              {visibleTracks.length} of {exampleTracks.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSurprise}
              disabled={visibleTracks.length === 0}
              className="h-8 gap-1.5 border-border/70 bg-background/40 text-xs"
            >
              <Shuffle size={12} weight="bold" />
              Surprise me
            </Button>
          </div>
        </div>

        {/* Dense grid */}
        {visibleTracks.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleTracks.map((track, i) => (
              <ExampleCard key={track.id} track={track} onSelect={handleSelect} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No examples match your filters — try widening or be the first to add one!
            </p>
          </div>
        )}

        {/* Slim contribute strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-border/70 bg-muted/15 px-5 py-3 sm:flex-row">
          <div>
            <h2 className="font-heading text-sm font-semibold">Don't see one that fits?</h2>
            <p className="text-xs text-muted-foreground">
              Add your own example in ~5 minutes — agents do most of the work.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-border/70 text-xs"
            onClick={() => navigate('/contribute/add-example')}
          >
            <Plus size={12} weight="bold" />
            Contribute an example
          </Button>
        </div>
      </div>
    </div>
  )
}
