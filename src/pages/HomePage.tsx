import { Link, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadTutorialData, Part } from '@/data/tutorialContent'
import { ArrowRight, Sparkle, Swap, Rocket } from '@phosphor-icons/react'
import { useTrack } from '@/hooks/use-track'
import { useEffect, useState } from 'react'

export function HomePage() {
  const { selectedTrack, hasSelectedTrack, clearSelectedTrack } = useTrack()
  const navigate = useNavigate()
  const [tutorialData, setTutorialData] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTutorialData().then((data) => {
      setTutorialData(data)
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
              className="border-neutral-6 px-4 py-1 text-sm tracking-wider"
            >
              <Sparkle className="mr-2" size={14} weight="fill" />
              Build Faster with AI
            </Badge>
          </div>
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
            AI Native
            <span className="text-neutral-11"> Development Tutorial</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Whether it's your first project or your hundredth — accelerate your workflow with AI-Native techniques
          </p>
        </header>

        {/* Track Selection / Continue Section */}
        {!hasSelectedTrack ? (
          // No track selected - show CTA
          <div className="text-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/select-track')}
              className="text-lg px-8 py-6"
            >
              Choose Your Project & Start Building
              <ArrowRight className="ml-2" size={20} weight="bold" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Pick from 4 projects — same AI-Native techniques, different examples
            </p>
          </div>
        ) : (
          // Track selected - show current project and lessons
          <>
            {/* Selected Track Banner */}
            <div className="mb-10 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedTrack.icon}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">You're building</p>
                    <p className="font-semibold text-foreground">{selectedTrack.projectName}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    clearSelectedTrack()
                    navigate('/select-track')
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Swap className="mr-2" size={16} />
                  Change Project
                </Button>
              </div>
            </div>

            {/* Lessons Grid */}
            <section className="mb-16">
              <h2 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Select a Lesson
              </h2>

              <div className="grid gap-4">
                {tutorialData.map((part) => (
                  <Link
                    key={part.id}
                    to={`/lesson/${part.id}`}
                    className="group block"
                  >
                    <Card className="border-neutral-6 bg-neutral-2/50 p-5 transition-all hover:border-neutral-5 hover:bg-neutral-3/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-6 bg-neutral-3 font-mono text-base font-bold text-foreground">
                            {part.number === 0 ? '•' : part.number}
                          </div>
                          <div>
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              {part.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {part.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">
                            {part.steps.length} steps
                          </span>
                          <ArrowRight
                            className="text-neutral-8 transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                            size={20}
                            weight="bold"
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}

                {/* Summary Link */}
                <Link to="/summary" className="group block">
                  <Card className="border-neutral-6 bg-neutral-2/50 p-5 transition-all hover:border-neutral-5 hover:bg-neutral-3/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-6 bg-neutral-3 font-mono text-base font-bold text-foreground">
                          ✓
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Summary
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Putting It All Together
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        className="text-neutral-8 transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                        size={20}
                        weight="bold"
                      />
                    </div>
                  </Card>
                </Link>
              </div>
            </section>

            {/* Advanced Track CTA */}
            <section className="mb-16">
              <h2 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Ready for More?
              </h2>
              <Link to="/advanced" className="group block">
                <Card className="border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5 p-6 transition-all hover:border-amber-500/40 hover:from-amber-500/10 hover:to-orange-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
                        <Rocket className="text-amber-600 dark:text-amber-400" size={24} weight="fill" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            Advanced Track
                          </h3>
                          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">
                            New
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          MCP servers, GitHub Coding Agent, multi-agent orchestration, AI testing
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className="text-amber-600/50 transition-transform group-hover:translate-x-1 group-hover:text-amber-600 dark:text-amber-400/50 dark:group-hover:text-amber-400"
                      size={24}
                      weight="bold"
                    />
                  </div>
                </Card>
              </Link>
            </section>
          </>
        )}

        {/* What You'll Master - Always visible */}
        <section className="mb-12">
          <h2 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
            What You'll Master
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏗️</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Create Anything
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Apps, documents, scripts, data analysis — describe what you want, AI builds it
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Control AI Behavior
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Set rules so AI stays on track — consistent style, formats, and constraints
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Create Custom Agents
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Build specialized AI personas for different tasks — writing, review, testing, analysis
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-neutral-6 bg-neutral-2/50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    10x Your Speed
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Go from idea to working prototype in hours — ship what used to take weeks
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Tutorial Overview - Only show when no track selected */}
        {!hasSelectedTrack && (
          <section className="mb-12">
            <h2 className="mb-4 text-center font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">
              8 Parts • ~2 Hours Total
            </h2>
            <div className="rounded-lg border border-neutral-6 bg-neutral-2/30 p-4">
              <div className="grid gap-2 text-sm md:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">0</span>
                  <span>Getting Started</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">1</span>
                  <span>Build Something That Works</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">2</span>
                  <span>Add Interactive Features</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">3</span>
                  <span>Teach AI Your Rules</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">4</span>
                  <span>Folder-Based Rules</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">5</span>
                  <span>Custom Agents</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">6</span>
                  <span>Agent Skills</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs text-neutral-8">7-8</span>
                  <span>Putting It Together & Reference</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center">
          <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-neutral-6 to-transparent" />
          <p className="text-sm text-muted-foreground">Created by Vahid Rostami • vahidrostami@microsoft.com</p>
          <p className="mt-2 text-xs text-neutral-8">
            Ready to start building? Open VS Code and let's go! 🚀
          </p>
        </footer>
      </div>
    </div>
  )
}
