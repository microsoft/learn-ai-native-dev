// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { cn } from '@/lib/utils'
import type { ExampleAudience } from '@/data/projectShapes'

export type AudienceFilter = 'all' | ExampleAudience

interface Option {
  value: AudienceFilter
  label: string
  emoji: string
}

const OPTIONS: Option[] = [
  { value: 'all', label: 'All', emoji: '✨' },
  { value: 'researcher', label: 'Researcher', emoji: '🔬' },
  { value: 'developer', label: 'Developer', emoji: '🛠' },
  { value: 'business', label: 'Business', emoji: '📊' },
  { value: 'creative', label: 'Creative', emoji: '🎨' },
]

interface AudienceFilterBarProps {
  value: AudienceFilter
  onChange: (value: AudienceFilter) => void
  className?: string
}

export function AudienceFilterBar({ value, onChange, className }: AudienceFilterBarProps) {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-lg border border-border/70 bg-background/40 p-1 backdrop-blur',
        className
      )}
      role="tablist"
      aria-label="Filter by audience"
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-medium tracking-wide transition-all',
              active
                ? 'border border-[var(--accent-edge)] bg-[var(--accent-soft)] text-[var(--accent-color)] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.08)]'
                : 'border border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground'
            )}
          >
            <span aria-hidden>{opt.emoji}</span>
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
