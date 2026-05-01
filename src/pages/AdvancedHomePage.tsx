import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadAdvancedData, Module } from '@/data/advancedContent'
import { ArrowRight, ArrowLeft, Rocket, Lightning } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function AdvancedHomePage() {
  const [advancedData, setAdvancedData] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAdvancedData().then((data) => {
      setAdvancedData(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 px-4 py-1 text-sm tracking-wider text-amber-600 dark:text-amber-400"
            >
              <Rocket className="mr-2" size={14} weight="fill" />
              Advanced Track
            </Badge>
          </div>
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
            AI Native
            <span className="text-amber-600 dark:text-amber-400"> Advanced Techniques</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Extend AI beyond your codebase — connect to external systems, orchestrate multi-agent workflows, and generate comprehensive test suites
          </p>
        </header>

        {/* Back to Foundation Link */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2" size={16} />
            Back to Foundation Track
          </Link>
        </div>

        {/* Prerequisites Banner */}
        <div className="mb-10 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3">
            <Lightning className="mt-0.5 text-amber-600 dark:text-amber-400" size={20} weight="fill" />
            <div>
              <p className="font-semibold text-foreground">Prerequisites</p>
              <p className="text-sm text-muted-foreground">
                Complete Parts 0-8 of the Foundation Track first. This track builds on custom agents, skills, and the spec-driven workflow.
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Build */}
        <section className="mb-12">
          <h2 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
            What You'll Build
          </h2>
          <Card className="border-neutral-6 bg-neutral-2/50 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">🖥️</div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">DevDash CLI</h3>
                <p className="text-muted-foreground mb-4">
                  A developer dashboard CLI that fetches live data from external APIs, uses multi-agent review pipelines, and has comprehensive test coverage.
                </p>
                <div className="font-mono text-sm bg-neutral-3 rounded-lg p-4 border border-neutral-6">
                  <pre className="text-neutral-11 whitespace-pre-wrap">{`╔════════════════════════════════════════════╗
║           DevDash v1.0.0                  ║
╠════════════════════════════════════════════╣
║  🌤️  Weather: 72°F, Sunny in Seattle      ║
║  📊 GitHub: 42 repos, 1,337 stars         ║
║  💬 "The future is already here."         ║
╚════════════════════════════════════════════╝`}</pre>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Modules Grid */}
        <section className="mb-16">
          <h2 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
            5 Modules • ~3 Hours Total
          </h2>

          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading modules...</div>
          ) : (
            <div className="grid gap-4">
              {advancedData.map((module) => (
                <Link
                  key={module.id}
                  to={`/learn/agentic/${module.id}`}
                  className="group block"
                >
                  <Card className="border-neutral-6 bg-neutral-2/50 p-5 transition-all hover:border-amber-500/30 hover:bg-amber-500/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-base font-bold text-amber-600 dark:text-amber-400">
                          {String.fromCharCode(64 + module.number)}
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            {module.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {module.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          {module.steps.length} steps
                        </span>
                        <ArrowRight
                          className="text-neutral-8 transition-transform group-hover:translate-x-1 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                          size={20}
                          weight="bold"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}

              {/* Summary Link */}
              <Link to="/learn/agentic/summary" className="group block">
                <Card className="border-neutral-6 bg-neutral-2/50 p-5 transition-all hover:border-amber-500/30 hover:bg-amber-500/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-base font-bold text-amber-600 dark:text-amber-400">
                        ✓
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          Summary
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Advanced Techniques Reference
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className="text-neutral-8 transition-transform group-hover:translate-x-1 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                      size={20}
                      weight="bold"
                    />
                  </div>
                </Card>
              </Link>
            </div>
          )}
        </section>

        {/* What You'll Master */}
        <section className="mb-12">
          <h2 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
            What You'll Master
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔌</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    MCP Servers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Connect AI to external APIs, databases, and services
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">☁️</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    GitHub Coding Agent
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Delegate tasks via issues while you focus on other work
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎭</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Agent Orchestration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Multi-agent workflows where specialists collaborate
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧪</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    AI-Powered Testing
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate comprehensive test suites with edge case coverage
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Start Button */}
        <div className="text-center mb-12">
          {advancedData.length > 0 && (
            <Link to={`/learn/agentic/${advancedData[0].id}`}>
              <Button size="lg" className="text-lg px-8 py-6 bg-amber-600 hover:bg-amber-700 text-white">
                Start Advanced Track
                <ArrowRight className="ml-2" size={20} weight="bold" />
              </Button>
            </Link>
          )}
        </div>


      </div>
    </div>
  )
}
