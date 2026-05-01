// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  ArrowLeft,
  Sparkle,
  Lightning,
  CheckCircle,
} from '@phosphor-icons/react'
import { loadTutorialData, type Part } from '@/data/tutorialContent'
import { useTrack } from '@/hooks/use-track'

export function FoundationHomePage() {
  const navigate = useNavigate()
  const { hasSelectedTrack, selectedTrack } = useTrack()
  const [parts, setParts] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTutorialData().then((data) => {
      setParts(data)
      setIsLoading(false)
    })
  }, [])

  const firstPart = parts[0]
  const startHref = firstPart
    ? `/learn/foundation/${firstPart.id}${firstPart.steps[0] ? `/${firstPart.steps[0].id}` : ''}`
    : '/examples'

  const handleStart = () => {
    if (!hasSelectedTrack) {
      navigate('/examples')
    } else {
      navigate(startHref)
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background" data-accent="electric">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Eyebrow + Back link */}
        <div className="mb-6">
          <Link
            to="/learn"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2" size={16} />
            All learning paths
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <Badge
              variant="outline"
              className="border-[var(--accent-edge)] bg-[var(--accent-soft)] px-4 py-1 text-sm tracking-wider text-[var(--accent-color)]"
            >
              <Sparkle className="mr-2" size={14} weight="fill" />
              Foundation Track · Beginner
            </Badge>
          </div>
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
            Build something that{' '}
            <span className="text-gradient-accent">works</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Your first AI-Native project, end to end. Pick an example, follow
            the prompts, and ship a real working app in about 2 hours.
          </p>
        </header>

        {/* Track / Start banner */}
        <Card className="mb-10 overflow-hidden p-5">
          {hasSelectedTrack ? (
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="text-3xl" aria-hidden>
                  {selectedTrack.icon}
                </span>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Your example project
                  </p>
                  <p className="font-heading text-base font-semibold text-foreground">
                    {selectedTrack.projectName}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleStart} className="gap-2">
                  <Lightning size={14} weight="fill" />
                  Start Part {firstPart?.number ?? 0}
                  <ArrowRight size={13} weight="bold" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/examples')}
                >
                  Switch project
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Pick an example to begin
                </p>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Foundation prompts adapt to whichever project you choose —
                  Todo app, recipe finder, fitness tracker, and more.
                </p>
              </div>
              <Button onClick={() => navigate('/examples')} className="gap-2">
                <Lightning size={14} weight="fill" />
                Choose an example
                <ArrowRight size={13} weight="bold" />
              </Button>
            </div>
          )}
        </Card>

        {/* Parts list */}
        <section className="mb-12">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {isLoading ? 'Loading…' : `${parts.length} parts · ~2 hours`}
            </h2>
          </div>

          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading parts…</div>
          ) : (
            <div className="grid gap-3">
              {parts.map((part) => (
                <Link
                  key={part.id}
                  to={`/learn/foundation/${part.id}`}
                  className="group block"
                >
                  <Card className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-edge)] hover:shadow-[var(--elev-2)]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="numeric flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-[var(--accent-soft)] font-mono text-base font-bold text-[var(--accent-color)]">
                          {part.number}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-color)]">
                            {part.title}
                          </h3>
                          <p className="truncate text-sm text-muted-foreground">
                            {part.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                        <span className="hidden sm:inline">
                          {part.steps.length} steps
                        </span>
                        <ArrowRight
                          size={18}
                          weight="bold"
                          className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent-color)]"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}

              {/* Summary */}
              <Link to="/learn/foundation/summary" className="group block">
                <Card className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-edge)] hover:shadow-[var(--elev-2)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-[var(--accent-soft)] text-[var(--accent-color)]">
                        <CheckCircle size={20} weight="duotone" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-color)]">
                          Summary & Reference
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          The complete AI-Native pattern at a glance
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={18}
                      weight="bold"
                      className="text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent-color)]"
                    />
                  </div>
                </Card>
              </Link>
            </div>
          )}
        </section>

        {/* Next steps */}
        <section className="mb-4">
          <h2 className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            What's next
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/learn/agentic" className="group block" data-accent="violet">
              <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-edge)]">
                <h3 className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-color)]">
                  Agentic Workflows →
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  MCP servers, custom agents, orchestration, AI testing.
                </p>
              </Card>
            </Link>
            <Link to="/learn/terminal" className="group block" data-accent="emerald">
              <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-edge)]">
                <h3 className="font-heading text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-color)]">
                  Terminal & CLI →
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drive AI from the terminal — Copilot CLI, Claude Code.
                </p>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
