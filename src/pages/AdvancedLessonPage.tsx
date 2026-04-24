import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { StepCard } from '@/components/StepCard'
import { loadAdvancedData, Module } from '@/data/advancedContent'
import { ArrowLeft, ArrowRight, House, Rocket } from '@phosphor-icons/react'

const parseMinutes = (subtitle: string) => {
  const match = subtitle.match(/(\d+)\s*minutes?/i)
  return match ? Number(match[1]) : 30
}

export function AdvancedLessonPage() {
  const { moduleId, stepId } = useParams<{ moduleId: string; stepId?: string }>()
  const navigate = useNavigate()
  const [advancedData, setAdvancedData] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    loadAdvancedData().then((data) => {
      setAdvancedData(data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!stepId) {
      return
    }
    const target = document.getElementById(stepId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [moduleId, stepId])

  const currentIndex = advancedData.findIndex((mod) => mod.id === moduleId)
  const module = advancedData[currentIndex]

  const totalSteps = useMemo(
    () => advancedData.reduce((sum, item) => sum + item.steps.length, 0),
    [advancedData]
  )

  useEffect(() => {
    if (!module) {
      return
    }
    setActiveStepIndex(0)
  }, [module?.id])

  useEffect(() => {
    if (!module) {
      return
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const stepIdToIndex = new Map(module.steps.map((step, index) => [step.id, index]))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = stepIdToIndex.get(entry.target.id)
            if (stepIndex !== undefined) {
              setActiveStepIndex(stepIndex)
            }
          }
        })
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )

    module.steps.forEach((step) => {
      const element = document.getElementById(step.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [module])

  const completedStepsBefore = useMemo(() => {
    if (!module) {
      return 0
    }
    const stepsBefore = advancedData
      .slice(0, Math.max(0, currentIndex))
      .reduce((sum, item) => sum + item.steps.length, 0)
    return stepsBefore + activeStepIndex
  }, [activeStepIndex, currentIndex, module, advancedData])

  const currentStepNumber = Math.min(totalSteps, completedStepsBefore + 1)
  const progressPercent = totalSteps ? (currentStepNumber / totalSteps) * 100 : 0

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading module...</div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="border-neutral-7 bg-neutral-2 p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Module Not Found
          </h1>
          <Button onClick={() => navigate('/advanced')} variant="outline">
            <House className="mr-2" size={20} />
            Back to Advanced Track
          </Button>
        </Card>
      </div>
    )
  }

  const prevModule = currentIndex > 0 ? advancedData[currentIndex - 1] : null
  const nextModule =
    currentIndex < advancedData.length - 1
      ? advancedData[currentIndex + 1]
      : null

  const moduleLetter = String.fromCharCode(64 + module.number)

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-14 lg:flex lg:h-[calc(100vh-56px)] lg:w-72 lg:flex-col lg:border-r lg:border-neutral-6 lg:bg-neutral-1">
        <div className="flex flex-col gap-1 p-4">
          <Link to="/advanced" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-4">
            <ArrowLeft size={14} />
            Advanced Track
          </Link>
          
          {advancedData.map((mod) => {
            const isActive = mod.id === moduleId
            const letter = String.fromCharCode(64 + mod.number)
            return (
              <button
                key={mod.id}
                onClick={() => navigate(`/advanced/module/${mod.id}`)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'text-muted-foreground hover:bg-neutral-3 hover:text-foreground'
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
                  isActive 
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                    : 'border-neutral-6 bg-neutral-3'
                }`}>
                  {letter}
                </div>
                <span className="text-sm font-medium">{mod.title}</span>
              </button>
            )
          })}
          
          <Link
            to="/advanced/summary"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-muted-foreground hover:bg-neutral-3 hover:text-foreground transition-colors mt-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-6 bg-neutral-3 text-xs font-bold">
              ✓
            </div>
            <span className="text-sm font-medium">Summary</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="mt-auto border-t border-neutral-6 p-4">
          <div className="text-xs text-muted-foreground mb-2">
            Progress: {currentStepNumber} / {totalSteps} steps
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-3">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </aside>

      <div className="px-6 py-8 lg:pl-80 lg:pr-12 lg:py-12 transition-[padding] duration-300">
        <div className="mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          {/* Sticky Progress Header */}
          <div className="sticky top-14 z-30 mb-6 flex items-center justify-between gap-3 rounded-b-lg border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md shadow-sm">
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-foreground truncate flex items-center gap-2">
                <Rocket className="text-amber-600 dark:text-amber-400" size={12} weight="fill" />
                Module {moduleLetter}: {module.title}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                Step {activeStepIndex + 1}: {module.steps[activeStepIndex]?.title ?? ''}
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground shrink-0 font-medium">
              {currentStepNumber} / {totalSteps}
            </div>
            <div 
              className="absolute bottom-0 left-0 h-0.5 w-full bg-muted"
              role="progressbar"
              aria-valuenow={currentStepNumber}
              aria-valuemax={totalSteps}
              aria-label="Module progress"
            >
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
          </div>

          {/* Mobile back link */}
          <div className="lg:hidden mb-6">
            <Link to="/advanced" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <ArrowLeft size={14} />
              Advanced Track
            </Link>
          </div>

          {/* Module Header */}
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <Badge className="border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                Module {moduleLetter}
              </Badge>
              <Separator className="flex-1 bg-neutral-6" />
            </div>
            <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {module.title}
            </h1>
            <p className="text-lg text-muted-foreground">{module.subtitle}</p>
          </header>

          {/* Steps */}
          <div className="space-y-8">
            {module.steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                partNumber={module.number}
                index={index}
                isAdvanced
              />
            ))}
          </div>

          {module.number === 5 && (
            <Card className="mt-12 border border-amber-500/20 bg-amber-500/5 p-6 text-center">
              <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
                🎉 Advanced Track Complete!
              </h2>
              <p className="text-sm text-muted-foreground">
                You've mastered MCP, agent orchestration, and AI testing. Check out the summary for a quick reference.
              </p>
            </Card>
          )}

          {/* Navigation Footer */}
          <footer className="mt-16 flex items-center justify-between border-t border-neutral-6 pt-8">
            {prevModule ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/advanced/module/${prevModule.id}`)}
                className="border-neutral-6 bg-transparent text-foreground hover:bg-neutral-3 hover:text-foreground"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium">{prevModule.title}</div>
                </div>
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/advanced')}
                className="border-neutral-6 bg-transparent text-foreground hover:bg-neutral-3 hover:text-foreground"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Back to</div>
                  <div className="font-medium">Advanced Track</div>
                </div>
              </Button>
            )}

            {nextModule ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/advanced/module/${nextModule.id}`)}
                className="border-neutral-6 bg-transparent text-foreground hover:bg-neutral-3 hover:text-foreground"
              >
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-medium">{nextModule.title}</div>
                </div>
                <ArrowRight className="ml-2" size={18} weight="bold" />
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/advanced/summary')}
                className="border-neutral-6 bg-transparent text-foreground hover:bg-neutral-3 hover:text-foreground"
              >
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="font-medium">Summary</div>
                </div>
                <ArrowRight className="ml-2" size={18} weight="bold" />
              </Button>
            )}
          </footer>
        </div>
      </div>
    </div>
  )
}
