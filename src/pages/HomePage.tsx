// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { officialPaths } from '@/data/paths'
import { PathCard } from '@/components/PathCard'
import { useTrack } from '@/hooks/use-track'

const DISCIPLINES = [
  'Spec-Driven Development',
  'Agentic Engineering',
  'Agentic Harness Engineering',
  'Context Engineering',
]

/**
 * Landing page — minimal, education-first.
 * Single hero, learning paths as primary content, small tertiary nav.
 */
export function HomePage() {
  const navigate = useNavigate()
  const { hasSelectedTrack, selectedTrack, clearSelectedTrack } = useTrack()
  const [wordIdx, setWordIdx] = useState(0)
  const [typed, setTyped] = useState('')

  // Typewriter cycle (purely decorative; layout reserves a fixed line)
  useEffect(() => {
    const word = DISCIPLINES[wordIdx]
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (i <= word.length) {
        setTyped(word.slice(0, i))
        i++
        timer = setTimeout(tick, 45)
      } else {
        timer = setTimeout(() => {
          setWordIdx((p) => (p + 1) % DISCIPLINES.length)
        }, 2200)
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [wordIdx])

  return (
    <div className="relative min-h-[calc(100vh-56px)] overflow-hidden bg-background">
      {/* ============== HERO ============== */}
      <section className="relative isolate overflow-hidden">
        {/* Backdrop layers — restrained, single focal point */}
        <div aria-hidden className="mesh-aurora" />
        <div aria-hidden className="grid-floor" data-accent="electric" />

        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-20 text-center lg:px-12 lg:pb-28 lg:pt-28">
          {/* Eyebrow */}
          <div className="mb-10 flex animate-reveal-up justify-center">
            <div className="surface-glass numeric inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-[11px] font-medium tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-color)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" />
              </span>
              <span className="text-muted-foreground">An open tutorial · Microsoft</span>
            </div>
          </div>

          {/* Headline — big, stable; cycling discipline lives on its own line */}
          <h1 className="animate-reveal-up-delay-1 text-display">
            <span className="block text-foreground">Learn</span>
            <span className="block text-gradient-accent">AI-Native development</span>
          </h1>

          {/* Cycling discipline — fixed-height line, no layout shift */}
          <div
            className="mx-auto mt-6 flex animate-reveal-up-delay-2 items-center justify-center gap-2 font-mono text-sm tracking-tight text-muted-foreground sm:text-base"
            style={{ minHeight: '1.6em' }}
            aria-live="polite"
          >
            <span className="text-[var(--accent-color)]">›</span>
            <span className="text-foreground">{typed || '\u00A0'}</span>
            <span aria-hidden className="typewriter-caret" />
          </div>

          {/* Subtitle — educational, no marketing */}
          <p className="mx-auto mt-5 max-w-xl animate-reveal-up-delay-2 text-lede">
            A hands-on tutorial for anyone learning to build with AI
            assistants — from your first prompt to shipping agents.
          </p>

          {/* Discipline chips — make the curriculum visible at a glance */}
          <ul className="mx-auto mt-8 flex animate-reveal-up-delay-3 flex-wrap items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {DISCIPLINES.map((d) => (
              <li
                key={d}
                className="surface-glass rounded-full border border-border/60 px-2.5 py-1"
              >
                {d}
              </li>
            ))}
          </ul>

          {/* CTAs — single primary, single quiet secondary */}
          <div className="mt-10 flex animate-reveal-up-delay-2 flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => navigate('/learn')}
              className="group h-11 gap-2 px-5 text-sm font-semibold shadow-[0_8px_28px_-8px_var(--accent-glow)]"
            >
              Start learning
              <ArrowRight
                size={13}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate('/projects')}
              className="h-11 gap-2 px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pick an example project
            </Button>
          </div>
        </div>

        {/* Bottom hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-edge)] to-transparent"
        />
      </section>

      {/* ============== BODY ============== */}
      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-14 lg:px-12 lg:pb-28 xl:max-w-6xl">
        {/* Continue banner — compact, only when applicable */}
        {hasSelectedTrack && (
          <div className="surface-card mb-12 rounded-xl p-3.5 ring-accent">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{selectedTrack.icon}</span>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Continue building
                  </p>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {selectedTrack.projectName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => navigate('/learn/foundation')}>
                  Resume
                  <ArrowRight className="ml-1.5" size={13} weight="bold" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    clearSelectedTrack()
                    navigate('/projects')
                  }}
                >
                  Switch project
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Learning paths — the primary content */}
        <section>
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <h2 className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Learning paths
            </h2>
            <span className="hairline hidden flex-1 sm:block" />
            <span className="numeric text-[11px] text-muted-foreground">
              {String(officialPaths.length).padStart(2, '0')}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officialPaths.map((p) => (
              <PathCard key={p.id} path={p} />
            ))}
          </div>
        </section>

        {/* Tertiary nav — quiet links, not marketing cards */}
        <section className="mt-16">
          <div className="hairline mb-8" />
          <div className="grid gap-4 text-sm sm:grid-cols-3">
            <TertiaryLink
              to="/learn"
              label="Browse all paths"
              meta="Foundation · Agentic · Terminal · Community"
            />
            <TertiaryLink
              to="/projects"
              label="Example projects"
              meta="Pick a project to follow the Foundation track"
            />
            <TertiaryLink
              to="/contribute"
              label="Contribute"
              meta="Add an example, fix content, or propose a topic"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

interface TertiaryLinkProps {
  to: string
  label: string
  meta: string
}

function TertiaryLink({ to, label, meta }: TertiaryLinkProps) {
  return (
    <Link
      to={to}
      className="group flex items-start justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:border-border/60 hover:bg-[var(--accent-soft)]"
    >
      <div className="min-w-0">
        <div className="font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-[var(--accent-color)]">
          {label}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">{meta}</div>
      </div>
      <ArrowUpRight
        size={14}
        weight="bold"
        className="mt-1 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-color)]"
      />
    </Link>
  )
}
