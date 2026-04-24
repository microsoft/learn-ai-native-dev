import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { terminalSummaryContent } from '@/data/terminalContent'
import {
  CheckCircle,
  WarningCircle,
  BookOpen,
  ArrowLeft,
  Terminal,
  RocketLaunch,
} from '@phosphor-icons/react'

export function TerminalSummaryPage() {
  return (
    <div className="terminal-theme relative min-h-[calc(100vh-56px)] bg-[#0b0d0c] overflow-hidden">
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,232,117,0.015)_2px,rgba(57,232,117,0.015)_4px)] z-10" />
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 terminal-grid-overlay z-0" />
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(57,232,117,0.06),transparent_70%)]" />
      {/* CRT vignette */}
      <div className="pointer-events-none absolute inset-0 terminal-vignette z-10" />

      <div className="relative z-20 mx-auto max-w-4xl px-6 py-8 lg:px-12 lg:py-12 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Badge className="border border-[#39e875]/25 bg-[#39e875]/10 text-[#39e875] font-mono">
              <Terminal className="mr-2" size={12} weight="fill" />
              Terminal Summary
            </Badge>
            <Separator className="flex-1 bg-[#39e875]/15" />
          </div>
          <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight text-[#e8f0eb] lg:text-5xl">
            Terminal Track Reference
          </h1>
          <p className="text-[#9aada2] font-mono text-sm">
            Everything you learned in the Terminal Track, in one place
          </p>
        </header>

        <div className="space-y-8">
          {/* Workflow Card */}
          <Card className="border-[#39e875]/10 bg-[#141816]/90 p-8 shadow-[0_0_0_1px_rgba(57,232,117,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xl font-bold text-[#e8f0eb]">
              <BookOpen className="text-[#39e875]" size={24} />
              {terminalSummaryContent.workflow.title}
            </h3>
            <p className="mb-6 text-[#9aada2] font-mono text-sm">
              {terminalSummaryContent.workflow.description}
            </p>
            <div className="space-y-4">
              {terminalSummaryContent.workflow.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded border border-[#39e875]/10 bg-[#0b0d0c]/90 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#39e875]/25 bg-[#39e875]/10 text-sm font-bold text-[#39e875] font-mono">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm font-mono text-[#c4cdc8]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Reference Card */}
          <Card className="border-[#39e875]/10 bg-[#141816]/90 p-8 shadow-[0_0_0_1px_rgba(57,232,117,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xl font-bold text-[#e8f0eb]">
              <BookOpen className="text-[#39e875]" size={24} />
              {terminalSummaryContent.quickReference.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-[#39e875]/15">
                    <th className="pb-3 text-left text-xs font-semibold text-[#39e875] uppercase tracking-wider">
                      When you want to...
                    </th>
                    <th className="pb-3 text-left text-xs font-semibold text-[#39e875] uppercase tracking-wider">
                      Use these prompts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#39e875]/10">
                  {terminalSummaryContent.quickReference.items.map((item, index) => (
                    <tr key={index} className="group hover:bg-[#39e875]/5">
                      <td className="py-3 pr-4 text-[#c4cdc8]">
                        {item.when}
                      </td>
                      <td className="py-3 font-bold text-[#39e875]">
                        {item.prompts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Troubleshooting Card */}
          <Card className="border-[#39e875]/10 bg-[#141816]/90 p-8 shadow-[0_0_0_1px_rgba(57,232,117,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xl font-bold text-[#e8f0eb]">
              <WarningCircle className="text-[#e8b83a]" size={24} />
              {terminalSummaryContent.troubleshooting.title}
            </h3>
            <div className="space-y-6">
              {terminalSummaryContent.troubleshooting.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-semibold text-[#e8f0eb] font-mono text-sm">
                    "{item.problem}"
                  </p>
                  {'prevention' in item && item.prevention && (
                    <p className="text-xs font-mono text-[#9aada2]">
                      <span className="text-[#39e875]">Prevention:</span> {item.prevention}
                    </p>
                  )}
                  <p className="rounded border border-[#39e875]/10 bg-[#0b0d0c]/90 p-3 text-xs font-mono text-[#c4cdc8]">
                    <span className="text-[#39e875]">Solution:</span> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* What You've Mastered Card */}
          <Card className="border-[#39e875]/10 bg-gradient-to-br from-[#39e875]/5 via-[#141816]/80 to-[#141816]/40 p-8 shadow-[0_0_0_1px_rgba(57,232,117,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xl font-bold text-[#e8f0eb]">
              <CheckCircle className="text-[#39e875]" size={24} />
              {terminalSummaryContent.learned.title}
            </h3>
            <div className="mb-6 space-y-3">
              {terminalSummaryContent.learned.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 shrink-0 text-[#39e875]"
                    size={18}
                    weight="fill"
                  />
                  <p className="text-sm font-mono text-[#c4cdc8]">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-mono italic text-[#3abf65]">
              {terminalSummaryContent.learned.closing}
            </p>
          </Card>

          {/* Architecture Recap */}
          <Card className="border-[#39e875]/10 bg-[#141816]/90 p-8 shadow-[0_0_0_1px_rgba(57,232,117,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xl font-bold text-[#e8f0eb]">
              <Terminal className="text-[#39e875]" size={24} weight="fill" />
              Your Agent Architecture
            </h3>
            <div className="font-mono text-xs bg-[#0b0d0c] rounded-lg p-5 border border-[#39e875]/10 text-[#8fdca0] overflow-x-auto">
              <pre className="whitespace-pre">{`USER INPUT
    │
[REPL / Headless]  ← index.ts
    │
[CONTEXT LOADER]   ← loader.ts
    │ reads AGENT.md, CLAUDE.md
[SYSTEM PROMPT]
    │
[AGENTIC LOOP]     ← agent.ts ← THE CORE
    │
    ├→ [TOOL CALL] → [PERMISSION] → [EXECUTE]
    │   registry.ts   registry.ts    read-file.ts
    │                                write-file.ts
    │                                run-command.ts
    │
    ├→ [MCP CALL]  → [MCP CLIENT]  → [MCP SERVER]
    │   registry.ts   client.ts       (Module A)
    │
    └→ [RESPONSE]  → stdout`}</pre>
            </div>
          </Card>

          {/* Next Steps Card */}
          <Card className="border-[#39e875]/10 bg-[#141816]/90 p-8 shadow-[0_0_0_1px_rgba(57,232,117,0.04),0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xl font-bold text-[#e8f0eb]">
              <RocketLaunch className="text-[#39e875]" size={24} weight="fill" />
              Next Steps
            </h3>
            <p className="mb-5 text-sm font-mono text-[#9aada2]">
              You&apos;ve built a portfolio-worthy project. Here&apos;s how to keep going:
            </p>
            <div className="space-y-3">
              {[
                'Push your agent to GitHub — it\'s a standout portfolio piece',
                'Add more skills: security-review, performance-audit, documentation',
                'Build team-shared command libraries in .claude/commands/',
                'Connect more MCP servers for specialized capabilities',
                'Create custom CI workflows for different project types',
                'Explore the Advanced Track for MCP servers, orchestration, and testing',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#39e875]/20 bg-[#39e875]/8 text-xs font-bold text-[#39e875] font-mono">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm font-mono text-[#c4cdc8]">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Navigation Footer */}
        <footer className="mt-16 flex items-center justify-between border-t border-[#39e875]/10 pt-8">
          <Link to="/terminal/module/module-h">
            <Button
              variant="outline"
              className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
            >
              <ArrowLeft className="mr-2" size={18} weight="bold" />
              <div className="text-left">
                <div className="text-xs text-[#6b8a75]">Previous</div>
                <div className="font-medium">Autonomous Pipelines</div>
              </div>
            </Button>
          </Link>

          <div className="flex gap-3">
            <Link to="/terminal">
              <Button
                variant="outline"
                className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
              >
                <ArrowLeft className="mr-2" size={18} weight="bold" />
                Terminal Track
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="border-[#39e875]/15 bg-transparent text-[#e8f0eb] hover:bg-[#39e875]/10 hover:text-[#e8f0eb] font-mono"
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
