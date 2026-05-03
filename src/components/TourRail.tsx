// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface TourStep {
  id: string
  title: string
  href: string
}

interface TourRailProps {
  /** Title of the lesson/part the rail belongs to */
  title: string
  steps: TourStep[]
  activeIndex: number
  /** Optional accent override; otherwise inherits from ancestor data-accent */
  accent?: 'electric' | 'violet' | 'emerald' | 'cyan' | 'rose' | 'amber'
  className?: string
}

/**
 * Compact, sticky right-rail navigation that mirrors the structure of a lesson
 * as a numbered tour. Inspired by the guided tour rail in tools like
 * Understand-Anything's dashboard.
 *
 * Visible only on xl+ screens; on smaller breakpoints the existing sticky
 * mobile progress header in lesson pages already covers progress.
 */
export function TourRail({
  title,
  steps,
  activeIndex,
  accent,
  className,
}: TourRailProps) {
  if (steps.length === 0) return null

  const completed = activeIndex
  const total = steps.length
  const pct = total > 0 ? ((completed + 1) / total) * 100 : 0

  return (
    <aside
      data-accent={accent}
      className={cn(
        'pointer-events-none fixed right-6 top-24 z-20 hidden w-56 xl:block',
        className
      )}
      aria-label="Tour rail"
    >
      <div className="surface-glass pointer-events-auto rounded-xl border border-border/60 p-3 shadow-[var(--elev-2)]">
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <div className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            On this page
          </div>
          <span className="numeric text-[10px] text-muted-foreground">
            {String(activeIndex + 1).padStart(2, '0')}/
            {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="mb-2 truncate text-xs font-semibold text-foreground">
          {title}
        </div>

        {/* Progress bar */}
        <div className="mb-3 h-1 overflow-hidden rounded-full bg-muted/50">
          <div
            className="h-full rounded-full bg-[var(--accent-color)] transition-all duration-500"
            style={{ width: `${pct}%`, boxShadow: '0 0 12px var(--accent-glow)' }}
          />
        </div>

        <ol className="relative">
          {/* Vertical line */}
          <span
            aria-hidden
            className="absolute left-[7px] top-1 bottom-1 w-px bg-border/60"
          />
          {steps.map((step, idx) => {
            const state =
              idx < activeIndex ? 'done' : idx === activeIndex ? 'active' : 'todo'
            return (
              <li key={step.id} className="relative">
                <Link
                  to={step.href}
                  className={cn(
                    'group flex items-start gap-2 rounded-md py-1 pr-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    state === 'active'
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  aria-current={state === 'active' ? 'step' : undefined}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'relative mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-all',
                      state === 'done' &&
                        'border-[var(--accent-edge)] bg-[var(--accent-color)]',
                      state === 'active' &&
                        'border-[var(--accent-edge)] bg-[var(--accent-soft)] shadow-[0_0_0_3px_var(--accent-glow)]',
                      state === 'todo' && 'border-border bg-background'
                    )}
                  >
                    {state === 'active' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" />
                    )}
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 line-clamp-2 text-[11px] leading-snug',
                      state === 'active' && 'font-semibold text-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </aside>
  )
}
