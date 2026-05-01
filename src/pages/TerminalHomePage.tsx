import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadTerminalData, TerminalModule } from '@/data/terminalContent'
import { ArrowRight, ArrowLeft, Terminal, Lightning } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function TerminalHomePage() {
  const [terminalData, setTerminalData] = useState<TerminalModule[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTerminalData().then((data) => {
      setTerminalData(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="terminal-theme min-h-[calc(100vh-56px)] bg-[#0b0d0c] relative overflow-hidden">
      {/* Animated scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,232,117,0.02)_2px,rgba(57,232,117,0.02)_4px)] z-10" />
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 terminal-grid-overlay z-0" />
      {/* Glow gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(57,232,117,0.07),transparent_50%)] z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(88,181,232,0.04),transparent_50%)] z-0" />
      {/* CRT vignette */}
      <div className="pointer-events-none absolute inset-0 terminal-vignette z-10" />

      <div className="relative z-20 mx-auto max-w-4xl px-6 py-12 lg:px-12 lg:py-16 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <Badge
              variant="outline"
              className="border-[#39e875]/30 bg-[#39e875]/8 px-4 py-1 text-sm tracking-widest text-[#39e875] font-mono uppercase"
            >
              <Terminal className="mr-2" size={14} weight="fill" />
              Terminal Track
            </Badge>
          </div>
          <h1 className="terminal-glitch mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-[#e8f0eb] lg:text-5xl">
            <span className="text-[#39e875]">{'>'}</span> Terminal AI
            <span className="text-[#39e875]"> Development</span>
          </h1>
          <p className="mx-auto max-w-xl text-[#9aada2] font-mono text-sm">
            Build AI coding agents from scratch. Master Claude Code & GitHub Copilot CLI. Deploy autonomous pipelines.
          </p>
          {/* Blinking cursor */}
          <div className="mt-6 flex justify-center">
            <div className="font-mono text-sm text-[#7d9185] rounded-lg border border-[#39e875]/10 bg-[#0b0d0c]/90 px-4 py-2">
              <span className="text-[#30c060]">$</span> ./start-terminal-track
              <span className="terminal-cursor inline-block w-2 h-5 bg-[#39e875] ml-1 align-middle" />
            </div>
          </div>
        </header>

        {/* Back to Foundation Link */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center text-sm text-[#3abf65] hover:text-[#39e875] transition-colors font-mono">
            <ArrowLeft className="mr-2" size={16} />
            cd ../foundation
          </Link>
        </div>

        {/* Prerequisites Banner */}
        <div className="mb-10 rounded-lg border border-[#39e875]/20 bg-[#39e875]/5 p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <Lightning className="mt-0.5 text-[#39e875]" size={20} weight="fill" />
            <div>
              <p className="font-semibold text-[#e8f0eb] font-mono">Prerequisites</p>
              <p className="text-sm text-[#9aada2]">
                Complete Foundation Track (Parts 0-8). Module A (MCP Servers) recommended for Module G.
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Build */}
        <section className="mb-12">
          <h2 className="mb-6 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#6b8a75]">
            // What You'll Build
          </h2>
          <Card className="border-[#39e875]/15 bg-[#141816] p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl font-mono text-[#39e875]">{'>'}_</div>
              <div>
                <h3 className="font-mono text-xl font-bold text-[#e8f0eb] mb-2">Your Own AI Coding Agent</h3>
                <p className="text-[#9aada2] mb-4 text-sm">
                  A fully functional terminal coding agent — reads files, writes code, runs commands, connects to MCP servers — built from scratch.
                </p>
                <div className="font-mono text-xs bg-[#0b0d0c] rounded-lg p-4 border border-[#39e875]/10 text-[#8fdca0]">
                  <pre className="whitespace-pre-wrap">{`🤖 my-agent v1.0 | Project: devdash | 3 rules loaded
   ├─ Tools: read_file, write_file, run_command, search, git
   ├─ MCP: weather-server ✓, quote-server ✓
   └─ Ready. Type a message or /help

> Add error handling to the API endpoint
  [tool] read_file: src/server.ts
  [tool] search_files: "catch|error|throw"
  [tool] write_file: src/server.ts (confirm? y)
  ✓ Added try/catch with proper error responses`}</pre>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Modules Grid */}
        <section className="mb-16">
          <h2 className="mb-6 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#6b8a75]">
            // 3 Modules • ~4 Hours Total
          </h2>

          {isLoading ? (
            <div className="text-center text-[#3abf65] font-mono text-sm">Loading modules...</div>
          ) : (
            <div className="grid gap-3">
              {terminalData.map((module) => {
                const letter = String.fromCharCode(69 + module.number) // F, G, H
                return (
                  <Link
                    key={module.id}
                    to={`/learn/terminal/${module.id}`}
                    className="group block"
                  >
                    <Card className="border-[#39e875]/10 bg-[#141816]/90 p-5 transition-all duration-300 hover:border-[#39e875]/30 hover:bg-[#39e875]/5 hover:shadow-[0_0_30px_rgba(57,232,117,0.08),0_0_60px_rgba(57,232,117,0.03)] backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded border border-[#39e875]/25 bg-[#39e875]/10 font-mono text-base font-bold text-[#39e875]">
                            {letter}
                          </div>
                          <div>
                            <h3 className="font-mono text-base font-bold text-[#e8f0eb]">
                              {module.title}
                            </h3>
                            <p className="text-sm text-[#7d9185] font-mono">
                              {module.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#6b8a75] font-mono">
                            {module.steps.length} steps
                          </span>
                          <ArrowRight
                            className="text-[#4a7f5a] transition-transform group-hover:translate-x-1 group-hover:text-[#39e875]"
                            size={20}
                            weight="bold"
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}

              {/* Summary Link */}
              <Link to="/learn/terminal/summary" className="group block">
                <Card className="border-[#39e875]/10 bg-[#141816]/90 p-5 transition-all hover:border-[#39e875]/30 hover:bg-[#39e875]/5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded border border-[#39e875]/25 bg-[#39e875]/10 font-mono text-base font-bold text-[#39e875]">
                        ✓
                      </div>
                      <div>
                        <h3 className="font-mono text-base font-bold text-[#e8f0eb]">
                          Summary
                        </h3>
                        <p className="text-sm text-[#7d9185] font-mono">
                          Terminal Track Reference
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className="text-[#4a7f5a] transition-transform group-hover:translate-x-1 group-hover:text-[#39e875]"
                      size={20}
                      weight="bold"
                    />
                  </div>
                </Card>
              </Link>
            </div>
          )}
        </section>

        {/* Track Arc */}
        <section className="mb-12">
          <h2 className="mb-6 text-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#6b8a75]">
            // Learning Arc
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-[#39e875]/10 bg-[#141816]/90 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-2xl text-[#39e875]">F</span>
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#e8f0eb]">USE</h3>
                  <p className="text-xs text-[#7d9185] font-mono">
                    Master Claude Code & gh copilot as power-user tools
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-[#39e875]/10 bg-[#141816]/90 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-2xl text-[#39e875]">G</span>
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#e8f0eb]">BUILD</h3>
                  <p className="text-xs text-[#7d9185] font-mono">
                    Build your own AI coding agent from scratch
                  </p>
                </div>
              </div>
            </Card>
            <Card className="border-[#39e875]/10 bg-[#141816]/90 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="font-mono text-2xl text-[#39e875]">H</span>
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#e8f0eb]">DEPLOY</h3>
                  <p className="text-xs text-[#7d9185] font-mono">
                    Self-healing CI & embedded AI pipelines
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Start Button */}
        <div className="text-center mb-12">
          {terminalData.length > 0 && (
            <Link to={`/learn/terminal/${terminalData[0].id}`}>
              <Button size="lg" className="text-base px-8 py-6 bg-[#30c060] hover:bg-[#39e875] text-black font-mono font-bold tracking-wider border border-[#39e875]/30 shadow-[0_0_20px_rgba(57,232,117,0.2),0_0_40px_rgba(57,232,117,0.1)] hover:shadow-[0_0_30px_rgba(57,232,117,0.35),0_0_60px_rgba(57,232,117,0.15)] transition-all duration-300">
                ./start --module F
                <ArrowRight className="ml-2" size={20} weight="bold" />
              </Button>
            </Link>
          )}
        </div>


      </div>
    </div>
  )
}
