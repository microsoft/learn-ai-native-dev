import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { summaryContent, tutorialData } from '@/data/tutorialContent'
import {
  CheckCircle,
  WarningCircle,
  BookOpen,
  ArrowLeft,
} from '@phosphor-icons/react'
import { useTrack } from '@/hooks/use-track'

export function SummaryPage() {
  const { hasSelectedTrack } = useTrack()
  const navigate = useNavigate()
  const lastLesson = tutorialData[tutorialData.length - 1]

  // Redirect to track selection if no track selected
  useEffect(() => {
    if (!hasSelectedTrack) {
      navigate('/projects', { replace: true })
    }
  }, [hasSelectedTrack, navigate])

  if (!hasSelectedTrack) {
    return null
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)] bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_35%,rgba(0,0,0,0.25))]" />
      <div className="relative mx-auto max-w-4xl px-6 py-8 lg:px-12 lg:py-12 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Badge className="border border-white/10 bg-white/5 text-foreground">
              Summary
            </Badge>
            <Separator className="flex-1 bg-white/10" />
          </div>
          <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Putting It All Together
          </h1>
        </header>

        <div className="space-y-8">
          {/* Workflow Card */}
          <Card className="border-white/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <BookOpen className="text-neutral-11" size={28} />
              {summaryContent.workflow.title}
            </h3>
            <p className="mb-6 text-muted-foreground">
              {summaryContent.workflow.description}
            </p>
            <div className="space-y-4">
              {summaryContent.workflow.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-white/10 bg-neutral-3/60 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-5 bg-neutral-4 text-sm font-bold text-foreground">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-base font-medium text-foreground">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Reference Card */}
          <Card className="border-white/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <BookOpen className="text-neutral-11" size={28} />
              {summaryContent.quickReference.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-left font-heading text-sm font-semibold text-foreground">
                      When you want to...
                    </th>
                    <th className="pb-3 text-left font-heading text-sm font-semibold text-foreground">
                      Use this prompt number
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {summaryContent.quickReference.items.map((item, index) => (
                    <tr key={index} className="group hover:bg-white/5">
                      <td className="py-3 pr-4 text-foreground/90">
                        {item.when}
                      </td>
                      <td className="py-3 font-mono text-sm font-semibold text-neutral-11">
                        {item.prompts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Troubleshooting Card */}
          <Card className="border-white/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <WarningCircle className="text-neutral-11" size={28} />
              {summaryContent.troubleshooting.title}
            </h3>
            <div className="space-y-6">
              {summaryContent.troubleshooting.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-semibold text-foreground">
                    "{item.problem}"
                  </p>
                  {'prevention' in item && item.prevention && (
                    <p className="text-sm text-neutral-11">
                      <span className="font-medium">🛡️ Prevention:</span> {item.prevention}
                    </p>
                  )}
                  <p className="rounded-lg border border-white/10 bg-neutral-3/60 p-3 text-sm text-foreground/80">
                    <span className="font-medium">💡 Solution:</span> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* What You've Learned Card */}
          <Card className="border-white/10 bg-gradient-to-br from-neutral-3/60 via-neutral-2/60 to-neutral-2/40 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <CheckCircle className="text-neutral-11" size={28} />
              {summaryContent.learned.title}
            </h3>
            <div className="mb-6 space-y-3">
              {summaryContent.learned.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 shrink-0 text-neutral-11"
                    size={20}
                    weight="fill"
                  />
                  <p className="text-base text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium italic text-neutral-11">
              {summaryContent.learned.closing}
            </p>
          </Card>
        </div>

        {/* Navigation Footer */}
        <footer className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          {lastLesson ? (
            <Link to={`/learn/foundation/${lastLesson.id}`}>
              <Button
                variant="outline"
                className="border-white/10 bg-transparent text-foreground hover:bg-white/5 hover:text-foreground"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium">{lastLesson.title}</div>
                </div>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          <Link to="/">
            <Button
              variant="outline"
              className="border-white/10 bg-transparent text-foreground hover:bg-white/5 hover:text-foreground"
            >
              <ArrowLeft className="mr-2" size={18} weight="bold" />
              Back to Home
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  )
}
