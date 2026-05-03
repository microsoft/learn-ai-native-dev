// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sparkle,
  Rocket,
  Terminal,
  Compass,
  Book,
  Flask,
  Clock,
  ArrowRight,
} from '@phosphor-icons/react'
import type { LearningPath } from '@/data/paths'

const ICON_MAP = {
  sparkle: Sparkle,
  rocket: Rocket,
  terminal: Terminal,
  compass: Compass,
  book: Book,
  flask: Flask,
} as const

/**
 * Each path gets a chromatic accent that propagates via [data-accent].
 * Picked deliberately to feel cohesive across the trio.
 */
const ACCENT_MAP: Record<string, string> = {
  foundation: 'electric',
  agentic: 'violet',
  terminal: 'emerald',
}

interface PathCardProps {
  path: LearningPath
}

export function PathCard({ path }: PathCardProps) {
  const Icon = ICON_MAP[path.iconName] ?? Compass
  const accent = ACCENT_MAP[path.id] ?? 'electric'
  const cardRef = useRef<HTMLAnchorElement>(null)

  // Cursor-following spotlight via CSS vars (cheap, no React re-renders).
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Link
      ref={cardRef as unknown as React.Ref<HTMLAnchorElement>}
      to={`/learn/${path.id}`}
      className="group block"
      data-accent={accent}
      onMouseMove={handleMouseMove}
    >
      <Card
        className="card-spotlight relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-edge)] hover:shadow-[var(--elev-3)]"
      >
        {/* Cursor-following spotlight */}
        <div
          aria-hidden
          className="card-spotlight__halo pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Soft accent halo on hover (kept for ambient color) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        />
        <CardHeader className="relative flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="stroke-conic flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-[var(--accent-soft)]">
                <Icon
                  size={20}
                  weight="duotone"
                  className="text-[var(--accent-color)]"
                />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-lg transition-colors group-hover:text-[var(--accent-color)]">
                  {path.title}
                </CardTitle>
              </div>
            </div>
            <ArrowRight
              size={18}
              className="mt-1 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--accent-color)]"
              weight="bold"
            />
          </div>
          <CardDescription className="text-sm leading-relaxed">
            {path.tagline}
          </CardDescription>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="numeric inline-flex items-center gap-1">
              <Clock size={12} />~{Math.round(path.estimatedMinutes / 60)}h
            </span>
            {path.contributedBy && <span>by {path.contributedBy}</span>}
            {path.topics.length > 0 && (
              <span className="truncate">
                {path.topics.slice(0, 4).join(' · ')}
              </span>
            )}
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
