import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { StepCard } from '@/components/StepCard'
import { loadTerminalData, TerminalModule } from '@/data/terminalContent'
import { ArrowLeft, ArrowRight, House, Terminal } from '@phosphor-icons/react'

export function TerminalLessonPage() {
  const { moduleId, stepId } = useParams<{ moduleId: string; stepId?: string }>()
  const navigate = useNavigate()
  const [terminalData, setTerminalData] = useState<TerminalModule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  useEffect(() => {
    loadTerminalData().then((data) => {
      setTerminalData(data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!stepId) return
    const target = document.getElementById(stepId)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [moduleId, stepId])

  const currentIndex = terminalData.findIndex((mod) => mod.id === moduleId)
  const module = terminalData[currentIndex]

  const totalSteps = useMemo(
    () => terminalData.reduce((sum, item) => sum + item.steps.length, 0),
    [terminalData]
  )

  useEffect(() => {
    if (!module) return
    setActiveStepIndex(0)
  }, [module?.id])

  useEffect(() => {
    if (!module || typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const stepIdToIndex = new Map(module.steps.map((step, index) => [step.id, index]))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = stepIdToIndex.get(entry.target.id)
            if (stepIndex !== undefined) setActiveStepIndex(stepIndex)
          }
        })
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )

    module.steps.forEach((step) => {
      const element = document.getElementById(step.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [module])

  const completedStepsBefore = useMemo(() => {
    if (!module) return 0
    const stepsBefore = terminalData
      .slice(0, Math.max(0, currentIndex))
      .reduce((sum, item) => sum + item.steps.length, 0)
    return stepsBefore + activeStepIndex
  }, [activeStepIndex, currentIndex, module, terminalData])

  const currentStepNumber = Math.min(totalSteps, completedStepsBefore + 1)
  const progressPercent = totalSteps ? (currentStepNumber / totalSteps) * 100 : 0

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0d0c]">
        <div className="text-[#3abf65] font-mono text-sm">Loading module...</div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0d0c]">
        <Card className="border-[#39e875]/15 bg-[#141816] p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#e8f0eb] font-mono">
            Module Not Found
          </h1>
          <Button onClick={() => navigate('/terminal')} variant="outline" className="border-[#39e875]/25 text-[#39e875] hover:bg-[#39e875]/10">
            <House className="mr-2" size={20} />
            Back to Terminal Track
          </Button>
        </Card>
      </div>
    )
  }

  const prevModule = currentIndex > 0 ? terminalData[currentIndex - 1] : null
  const nextModule = currentIndex < terminalData.length - 1 ? terminalData[currentIndex + 1] : null

  const moduleLetter = String.fromCharCode(69 + module.number) // F, G, H

  return (
    <div className="terminal-theme min-h-[calc(100vh-56px)] bg-[#0b0d0c] relative overflow-hidden">
      {/* Scanlines */}
      <div className="pointer-events-none fixed inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,232,117,0.015)_2px,rgba(57,232,117,0.015)_4px)] z-10" />
      {/* Grid overlay */}
      <div className="pointer-events-none fixed inset-0 terminal-grid-overlay z-0" />
      {/* CRT vignette */}
      <div className="pointer-events-none fixed inset-0 terminal-vignette z-10" />

      {/* Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-14 lg:flex lg:h-[calc(100vh-56px)] lg:w-72 lg:flex-col lg:border-r lg:border-[#39e875]/10 lg:bg-[#0b0d0c]/95 lg:backdrop-blur-sm z-30">
        <div className="flex flex-col gap-1 p-4">
          <Link to="/terminal" className="text-sm text-[#3abf65] hover:text-[#39e875] transition-colors flex items-center gap-2 mb-4 font-mono">
            <ArrowLeft size={14} />
            Terminal Track
          </Link>

          {terminalData.map((mod) => {
            const isActive = mod.id === moduleId
            const letter = String.fromCharCode(69 + mod.number)
            return (
              <button
                key={mod.id}
                onClick={() => navigate(`/learn/terminal/${mod.id}`)}
                className={`flex items-center gap-3 rounded px-3 py-2 text-left transition-colors font-mono ${
                  isActive
                    ? 'bg-[#39e875]/10 text-[#39e875] border border-[#39e875]/20'
                    : 'text-[#6b8a75] hover:bg-[#39e875]/5 hover:text-[#a3c4b0] border border-transparent'
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded text-xs font-bold ${
                  isActive
                    ? 'border border-[#39e875]/35 bg-[#39e875]/15 text-[#39e875]'
                    : 'border border-[#39e875]/10 bg-[#39e875]/5 text-[#5a8f6a]'
                }`}>
                  {letter}
                </div>
                <span className="text-sm">{mod.title}</span>
              </button>
            )
          })}

          <Link
            to="/learn/terminal/summary"
            className="flex items-center gap-3 rounded px-3 py-2 text-left text-[#6b8a75] hover:bg-[#39e875]/5 hover:text-[#a3c4b0] transition-colors mt-2 font-mono border border-transparent"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded border border-[#39e875]/10 bg-[#39e875]/5 text-xs font-bold text-[#5a8f6a]">
              ✓
            </div>
            <span className="text-sm">Summary</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="mt-auto border-t border-[#39e875]/10 p-4">
          <div className="text-xs text-[#6b8a75] mb-2 font-mono">
            Progress: {currentStepNumber} / {totalSteps} steps
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#39e875]/10">
            <div
              className="h-full rounded-full bg-[#39e875] transition-all duration-300 terminal-progress-glow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </aside>

      <div className="relative z-20 px-6 py-8 lg:pl-80 lg:pr-12 lg:py-12 transition-[padding] duration-300">
        <div className="mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          {/* Sticky Progress Header */}
          <div className="sticky top-14 z-30 mb-6 flex items-center justify-between gap-3 rounded-b-lg border-b border-[#39e875]/15 bg-[#0b0d0c]/95 px-4 py-3 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-[#e8f0eb] truncate flex items-center gap-2 font-mono">
                <Terminal className="text-[#39e875]" size={12} weight="fill" />
                Module {moduleLetter}: {module.title}
              </div>
              <div className="text-[11px] text-[#6b8a75] truncate font-mono">
                Step {activeStepIndex + 1}: {module.steps[activeStepIndex]?.title ?? ''}
              </div>
            </div>
            <div className="text-right text-xs text-[#6b8a75] shrink-0 font-mono">
              {currentStepNumber} / {totalSteps}
            </div>
            <div
              className="absolute bottom-0 left-0 h-0.5 w-full bg-[#39e875]/10"
              role="progressbar"
              aria-valuenow={currentStepNumber}
              aria-valuemax={totalSteps}
              aria-label="Module progress"
            >
              <div
                className="h-full bg-[#39e875] transition-all duration-300 terminal-progress-glow"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
          </div>

          {/* Mobile back link */}
          <div className="lg:hidden mb-6">
            <Link to="/terminal" className="text-sm text-[#3abf65] hover:text-[#39e875] transition-colors flex items-center gap-2 font-mono">
              <ArrowLeft size={14} />
              Terminal Track
            </Link>
          </div>

          {/* Module Header */}
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <Badge className="border border-[#39e875]/25 bg-[#39e875]/10 text-[#39e875] font-mono">
                Module {moduleLetter}
              </Badge>
              <Separator className="flex-1 bg-[#39e875]/10" />
            </div>
            <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight text-[#e8f0eb] lg:text-5xl">
              {module.title}
            </h1>
            <p className="text-[#9aada2] font-mono text-sm">{module.subtitle}</p>
          </header>

          {/* Steps */}
          <div className="space-y-8 terminal-steps">
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

          {module.number === 3 && (
            <Card className="mt-12 border border-[#39e875]/20 bg-[#39e875]/5 p-6 text-center">
              <h2 className="mb-2 font-mono text-2xl font-bold text-[#e8f0eb]">
                {'>'} Terminal Track Complete!
              </h2>
              <p className="text-sm text-[#9aada2] font-mono">
                You've built an AI coding agent from scratch and deployed it in production pipelines.
              </p>
            </Card>
          )}

          {/* Navigation Footer */}
          <footer className="mt-16 flex items-center justify-between border-t border-[#39e875]/10 pt-8">
            {prevModule ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/learn/terminal/${prevModule.id}`)}
                className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                <div className="text-left">
                  <div className="text-xs text-[#6b8a75]">Previous</div>
                  <div className="font-medium">{prevModule.title}</div>
                </div>
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/terminal')}
                className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                <div className="text-left">
                  <div className="text-xs text-[#6b8a75]">Back to</div>
                  <div className="font-medium">Terminal Track</div>
                </div>
              </Button>
            )}

            {nextModule ? (
              <Button
                variant="outline"
                onClick={() => navigate(`/learn/terminal/${nextModule.id}`)}
                className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
              >
                <div className="text-right">
                  <div className="text-xs text-[#6b8a75]">Next</div>
                  <div className="font-medium">{nextModule.title}</div>
                </div>
                <ArrowRight className="ml-2" size={18} weight="bold" />
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/learn/terminal/summary')}
                className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
              >
                <div className="text-right">
                  <div className="text-xs text-[#6b8a75]">Next</div>
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
