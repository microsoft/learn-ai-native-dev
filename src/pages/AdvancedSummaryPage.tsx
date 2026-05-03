import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { advancedSummaryContent } from '@/data/advancedContent'
import {
  CheckCircle,
  WarningCircle,
  BookOpen,
  ArrowLeft,
  Rocket,
} from '@phosphor-icons/react'

export function AdvancedSummaryPage() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(251,191,36,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,191,36,0.02),transparent_35%,rgba(0,0,0,0.25))]" />
      <div className="relative mx-auto max-w-4xl px-6 py-8 lg:px-12 lg:py-12 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Badge className="border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Rocket className="mr-2" size={12} weight="fill" />
              Advanced Summary
            </Badge>
            <Separator className="flex-1 bg-amber-500/20" />
          </div>
          <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Advanced Techniques Reference
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you learned in the Advanced Track, in one place
          </p>
        </header>

        <div className="space-y-8">
          {/* Workflow Card */}
          <Card className="border-amber-500/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(251,191,36,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <BookOpen className="text-amber-600 dark:text-amber-400" size={28} />
              {advancedSummaryContent.workflow.title}
            </h3>
            <p className="mb-6 text-muted-foreground">
              {advancedSummaryContent.workflow.description}
            </p>
            <div className="space-y-4">
              {advancedSummaryContent.workflow.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border border-amber-500/10 bg-neutral-3/60 p-4 shadow-[0_0_0_1px_rgba(251,191,36,0.02)]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-sm font-bold text-amber-600 dark:text-amber-400">
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
          <Card className="border-amber-500/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(251,191,36,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <BookOpen className="text-amber-600 dark:text-amber-400" size={28} />
              {advancedSummaryContent.quickReference.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-500/10">
                    <th className="pb-3 text-left font-heading text-sm font-semibold text-foreground">
                      When you want to...
                    </th>
                    <th className="pb-3 text-left font-heading text-sm font-semibold text-foreground">
                      Use these prompts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {advancedSummaryContent.quickReference.items.map((item, index) => (
                    <tr key={index} className="group hover:bg-amber-500/5">
                      <td className="py-3 pr-4 text-foreground/90">
                        {item.when}
                      </td>
                      <td className="py-3 font-mono text-sm font-semibold text-amber-600 dark:text-amber-400">
                        {item.prompts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Troubleshooting Card */}
          <Card className="border-amber-500/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(251,191,36,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <WarningCircle className="text-amber-600 dark:text-amber-400" size={28} />
              {advancedSummaryContent.troubleshooting.title}
            </h3>
            <div className="space-y-6">
              {advancedSummaryContent.troubleshooting.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-semibold text-foreground">
                    "{item.problem}"
                  </p>
                  {'prevention' in item && item.prevention && (
                    <p className="text-sm text-neutral-11">
                      <span className="font-medium">🛡️ Prevention:</span> {item.prevention}
                    </p>
                  )}
                  <p className="rounded-lg border border-amber-500/10 bg-neutral-3/60 p-3 text-sm text-foreground/80">
                    <span className="font-medium">💡 Solution:</span> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* What You've Mastered Card */}
          <Card className="border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-neutral-2/60 to-neutral-2/40 p-8 shadow-[0_0_0_1px_rgba(251,191,36,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <CheckCircle className="text-amber-600 dark:text-amber-400" size={28} />
              {advancedSummaryContent.learned.title}
            </h3>
            <div className="mb-6 space-y-3">
              {advancedSummaryContent.learned.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                    size={20}
                    weight="fill"
                  />
                  <p className="text-base text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium italic text-amber-600 dark:text-amber-400">
              {advancedSummaryContent.learned.closing}
            </p>
          </Card>

          {/* Your Toolkit */}
          <Card className="border-amber-500/10 bg-neutral-2/60 p-8 shadow-[0_0_0_1px_rgba(251,191,36,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h3 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
              <Rocket className="text-amber-600 dark:text-amber-400" size={28} weight="fill" />
              Your Complete Toolkit
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Foundation (Parts 0-8)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AGENTS.md for project context</li>
                  <li>• .github/copilot-instructions.md</li>
                  <li>• Path-specific instructions</li>
                  <li>• Custom agents (test, docs, review)</li>
                  <li>• Skills (verify-requirements, add-feature)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Advanced Track</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• MCP servers (fetch, quotes, weather, github)</li>
                  <li>• Copilot coding agent workflow</li>
                  <li>• Review orchestrator + specialists</li>
                  <li>• Test generation skill</li>
                  <li>• DevDash CLI with live data</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Footer */}
        <footer className="mt-16 flex items-center justify-between border-t border-amber-500/10 pt-8">
          <Link to="/learn/agentic/module-e">
            <Button
              variant="outline"
              className="border-amber-500/20 bg-transparent text-foreground hover:bg-amber-500/5 hover:text-foreground"
            >
              <ArrowLeft className="mr-2" size={18} weight="bold" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-medium">Capstone Project</div>
              </div>
            </Button>
          </Link>

          <div className="flex gap-3">
            <Link to="/advanced">
              <Button
                variant="outline"
                className="border-amber-500/20 bg-transparent text-foreground hover:bg-amber-500/5 hover:text-foreground"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                Advanced Track
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="border-amber-500/20 bg-transparent text-foreground hover:bg-amber-500/5 hover:text-foreground"
              >
                Foundation Track
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
