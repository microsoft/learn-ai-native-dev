import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { StepCard } from '@/components/StepCard'
import { loadTutorialData, Part } from '@/data/tutorialContent'
import { ArrowLeft, ArrowRight, House } from '@phosphor-icons/react'
import { useTrack } from '@/hooks/use-track'
import { NavigationSidebar } from '@/components/NavigationSidebar'

const parseMinutes = (subtitle: string) => {
  const match = subtitle.match(/(\d+)\s*minutes?/i)
  return match ? Number(match[1]) : 15
}

const formatMinutes = (minutes: number) => {
  if (minutes <= 0) {
    return '0m'
  }
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  if (hours <= 0) {
    return `${mins}m`
  }
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function LessonPage() {
  const { moduleId, stepId } = useParams<{ moduleId: string; stepId?: string }>()
  const navigate = useNavigate()
  const { hasSelectedTrack } = useTrack()
  const [tutorialData, setTutorialData] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeStepId, setActiveStepId] = useState('')
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    loadTutorialData().then((data) => {
      setTutorialData(data)
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

  const currentIndex = tutorialData.findIndex((part) => part.id === moduleId)
  const part = tutorialData[currentIndex]

  const totalSteps = useMemo(
    () => tutorialData.reduce((sum, item) => sum + item.steps.length, 0),
    [tutorialData]
  )

  const totalMinutes = useMemo(
    () => tutorialData.reduce((sum, item) => sum + parseMinutes(item.subtitle), 0),
    [tutorialData]
  )

  const partMinutes = part ? parseMinutes(part.subtitle) : 0

  useEffect(() => {
    if (!part) {
      return
    }
    setActiveStepId(part.steps[0]?.id ?? '')
    setActiveStepIndex(0)
  }, [part?.id])

  useEffect(() => {
    if (!part) {
      return
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const stepIdToIndex = new Map(part.steps.map((step, index) => [step.id, index]))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = stepIdToIndex.get(entry.target.id)
            if (stepIndex !== undefined) {
              setActiveStepId(entry.target.id)
              setActiveStepIndex(stepIndex)
            }
          }
        })
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )

    part.steps.forEach((step) => {
      const element = document.getElementById(step.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [part])

  const completedStepsBefore = useMemo(() => {
    if (!part) {
      return 0
    }
    const stepsBefore = tutorialData
      .slice(0, Math.max(0, currentIndex))
      .reduce((sum, item) => sum + item.steps.length, 0)
    return stepsBefore + activeStepIndex
  }, [activeStepIndex, currentIndex, part, tutorialData])

  const currentStepNumber = Math.min(totalSteps, completedStepsBefore + 1)
  const progressPercent = totalSteps ? (currentStepNumber / totalSteps) * 100 : 0

  const remainingMinutes = useMemo(() => {
    if (!part) {
      return 0
    }
    const stepsRemainingInPart = part.steps.length - activeStepIndex
    const minutesRemainingInPart =
      part.steps.length > 0 ? (partMinutes * stepsRemainingInPart) / part.steps.length : 0
    const minutesRemainingInLaterParts = tutorialData
      .slice(currentIndex + 1)
      .reduce((sum, item) => sum + parseMinutes(item.subtitle), 0)
    return minutesRemainingInPart + minutesRemainingInLaterParts
  }, [activeStepIndex, currentIndex, part, partMinutes, tutorialData])

  // Redirect to track selection if no track selected
  if (!hasSelectedTrack) {
    return <Navigate to="/examples" replace />
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading lesson...</div>
      </div>
    )
  }

  if (!part) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="border-neutral-7 bg-neutral-2 p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Lesson Not Found
          </h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <House className="mr-2" size={20} />
            Back to Home
          </Button>
        </Card>
      </div>
    )
  }

  const prevPart = currentIndex > 0 ? tutorialData[currentIndex - 1] : null
  const nextPart =
    currentIndex < tutorialData.length - 1
      ? tutorialData[currentIndex + 1]
      : null

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <NavigationSidebar
        parts={tutorialData}
        currentPartIndex={currentIndex}
        totalSteps={totalSteps}
        currentStepNumber={currentStepNumber}
        progressPercent={progressPercent}
        onPartSelect={(partId) => navigate(`/learn/foundation/${partId}`)}
      />

      <div className="px-6 py-8 lg:pl-80 lg:pr-12 lg:py-12 transition-[padding] duration-300">
        <div className="mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        {/* Sticky Progress Header - Shows on all screens when scrolling */}
        <div className="sticky top-14 z-30 mb-6 flex items-center justify-between gap-3 rounded-b-lg border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md shadow-sm">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-foreground truncate">
              {part?.number === 0 ? 'Getting Started' : `Part ${part?.number}: ${part?.title}`}
            </div>
            <div className="text-[11px] text-muted-foreground truncate">
              Step {activeStepIndex + 1}: {part?.steps[activeStepIndex]?.title ?? ''}
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
            aria-label="Tutorial progress"
          >
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        </div>

        {/* Lesson Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Badge className="border border-neutral-6 bg-neutral-3 text-foreground">
              {part.number === 0 ? 'Start Here' : `Part ${part.number}`}
            </Badge>
            <Separator className="flex-1 bg-neutral-6" />
          </div>
          <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            {part.title}
          </h1>
          <p className="text-lg text-muted-foreground">{part.subtitle}</p>
        </header>

        {/* Steps */}
        <div className="space-y-8">
          {part.steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              partNumber={part.number}
              index={index}
            />
          ))}
        </div>

        {[2, 4, 6].includes(part.number) && nextPart && (
          <Card className="mt-12 border border-primary/20 bg-primary/5 p-6 text-center">
            <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
              🎉 {part.number === 2 ? 'Phase 1 complete — you built something that works!' : part.number === 4 ? 'Phase 2 complete — AI now follows your rules!' : 'Phase 3 complete — you have custom agents and skills!'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {part.number === 2 ? 'You just built your first interactive feature set. Take a breath, then keep going.' : part.number === 4 ? 'Your project has instructions, folder-based rules, and structured guidance. Nice work.' : 'You\'ve created specialized agents and reusable skills. Almost there!'}
            </p>
          </Card>
        )}

        {!nextPart && (
          <Card className="mt-12 border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
              🎉 Tutorial complete!
            </h2>
            <p className="text-sm text-muted-foreground">
              You finished the full AI-native workflow. Celebrate, then head to your summary.
            </p>
          </Card>
        )}

        {/* Navigation Footer */}
        <footer className="mt-16 flex items-center justify-between border-t border-neutral-6 pt-8">
          {prevPart ? (
            <Button
              variant="outline"
              onClick={() => navigate(`/learn/foundation/${prevPart.id}`)}
              className="border-neutral-6 bg-transparent text-foreground hover:bg-neutral-3 hover:text-foreground"
            >
              <ArrowLeft className="mr-2" size={18} weight="bold" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-medium">{prevPart.title}</div>
              </div>
            </Button>
          ) : (
            <div />
          )}

          {nextPart ? (
            <Button
              variant="outline"
              onClick={() => navigate(`/learn/foundation/${nextPart.id}`)}
              className="border-neutral-6 bg-transparent text-foreground hover:bg-neutral-3 hover:text-foreground"
            >
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="font-medium">{nextPart.title}</div>
              </div>
              <ArrowRight className="ml-2" size={18} weight="bold" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate('/learn/foundation/summary')}
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
