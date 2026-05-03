// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/StatusBadge'
import { ArrowRight, Hammer } from '@phosphor-icons/react'
import type { ProjectShape } from '@/data/projectShapes'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  shape: ProjectShape
  onSelect: (id: string) => void
  index?: number
}

const ACCENTS = ['electric', 'violet', 'emerald', 'amber', 'rose', 'cyan'] as const

export function ProjectCard({ shape, onSelect, index = 0 }: ProjectCardProps) {
  const status = shape.status ?? 'official'
  const accent = ACCENTS[index % ACCENTS.length]

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`Select ${shape.name} project`}
      data-accent={accent}
      onClick={() => onSelect(shape.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(shape.id)
        }
      }}
      className={cn(
        'group/example relative cursor-pointer overflow-hidden p-4',
        'transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-edge)] hover:shadow-[var(--elev-3)]',
        'focus-visible:border-[var(--accent-edge)]'
      )}
    >
      {/* Accent corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-0 blur-2xl transition-opacity duration-500 group-hover/example:opacity-70"
      />

      <div className="relative flex items-start gap-3">
        {/* Icon tile */}
        <div className="stroke-conic flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-[var(--accent-soft)] text-xl">
          <span aria-hidden>{shape.icon}</span>
        </div>

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-heading text-sm font-semibold leading-tight text-foreground transition-colors group-hover/example:text-[var(--accent-color)]">
              {shape.name}
            </h3>
            <ArrowRight
              size={14}
              weight="bold"
              className="mt-0.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover/example:translate-x-0.5 group-hover/example:text-[var(--accent-color)]"
            />
          </div>

          {/* Meta row */}
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <Badge
              variant="secondary"
              className="h-4 px-1.5 text-[10px] font-medium tracking-wide"
            >
              {shape.industry}
            </Badge>
            {status !== 'official' && <StatusBadge status={status} />}
            {shape.contributedBy && (
              <span className="text-[10px] text-muted-foreground">by {shape.contributedBy}</span>
            )}
          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-xs leading-snug text-muted-foreground">
            {shape.description}
          </p>

          {/* What you'll build */}
          <div className="mt-2.5 flex items-start gap-1.5 border-t border-border/60 pt-2 text-[11px]">
            <Hammer size={12} weight="bold" className="mt-0.5 shrink-0 text-[var(--accent-color)]" />
            <span className="line-clamp-1 text-muted-foreground">
              <span className="font-medium text-foreground">Build: </span>
              {shape.whatYouBuild}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
