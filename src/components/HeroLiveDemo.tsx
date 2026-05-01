// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useRef, useState } from 'react'
import { Sparkle, User, ArrowsClockwise } from '@phosphor-icons/react'

/**
 * Animated AI exchange — fakes a Copilot-style prompt + streamed response.
 * Loops continuously, respects prefers-reduced-motion.
 */

interface Exchange {
  prompt: string
  response: string[]
}

const EXCHANGES: Exchange[] = [
  {
    prompt: 'Build a deal-health dashboard',
    response: [
      "I'll scaffold a React + Vite app with:",
      '  • <span class="text-[var(--accent-color)]">DealCard</span> component (status, stage, age)',
      '  • <span class="text-[var(--accent-color)]">DealList</span> with filter pills',
      '  • Color logic: green/yellow/red by age',
      '',
      '<span class="text-emerald-400">✓</span> 12 files created · <span class="numeric">1.4s</span>',
    ],
  },
  {
    prompt: 'Add an MCP server for weather',
    response: [
      'Generating <span class="text-[var(--accent-color)]">weather-mcp</span>:',
      '  • <span class="text-foreground">get_forecast(city)</span>',
      '  • <span class="text-foreground">get_alerts(state)</span>',
      '  • Registered in <span class="text-foreground">mcp.json</span>',
      '',
      '<span class="text-emerald-400">✓</span> Server live · <span class="numeric">3 tools</span>',
    ],
  },
  {
    prompt: 'Write tests for the auth flow',
    response: [
      'Generated 7 test cases:',
      '  • login (happy path + 4 error states)',
      '  • token refresh',
      '  • logout cleanup',
      '',
      '<span class="text-emerald-400">✓</span> All passing · <span class="numeric">128ms</span>',
    ],
  },
]

function useTypewriter(text: string, speed = 18, start = true): string {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!start) return
    setOut('')
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, start])
  return out
}

export function HeroLiveDemo() {
  const [idx, setIdx] = useState(0)
  const [stage, setStage] = useState<'prompting' | 'thinking' | 'responding' | 'rest'>('prompting')
  const [responseLines, setResponseLines] = useState<string[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const exchange = EXCHANGES[idx]
  const promptText = useTypewriter(exchange.prompt, 24, stage === 'prompting')

  // Stage machine
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (stage === 'prompting') {
      const promptDuration = exchange.prompt.length * 24 + 200
      timerRef.current = setTimeout(() => setStage('thinking'), promptDuration)
    } else if (stage === 'thinking') {
      timerRef.current = setTimeout(() => {
        setResponseLines([])
        setStage('responding')
      }, 700)
    } else if (stage === 'responding') {
      // Reveal lines one at a time
      let i = 0
      const reveal = () => {
        setResponseLines(exchange.response.slice(0, i + 1))
        i++
        if (i < exchange.response.length) {
          timerRef.current = setTimeout(reveal, 220)
        } else {
          timerRef.current = setTimeout(() => setStage('rest'), 2200)
        }
      }
      reveal()
    } else if (stage === 'rest') {
      timerRef.current = setTimeout(() => {
        setIdx((p) => (p + 1) % EXCHANGES.length)
        setResponseLines([])
        setStage('prompting')
      }, 600)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, idx])

  return (
    <div
      className="surface-glass relative overflow-hidden rounded-xl border border-border/60 shadow-[var(--elev-3)]"
      data-accent="electric"
      role="img"
      aria-label="Animated AI demo"
    >
      {/* Top window chrome */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-gradient-to-b from-muted/60 to-muted/20 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="numeric text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
          ai-native ~ live
        </span>
        <ArrowsClockwise
          size={11}
          className="text-muted-foreground/60"
          style={{ animation: 'spin 6s linear infinite' }}
        />
      </div>

      {/* Body */}
      <div className="space-y-3 px-4 py-4 font-mono text-[12.5px] leading-[1.55]">
        {/* Prompt line */}
        <div className="flex items-start gap-2">
          <User
            size={14}
            weight="bold"
            className="mt-0.5 shrink-0 text-muted-foreground"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              You
            </div>
            <div className="mt-0.5 text-foreground/90">
              {promptText}
              {stage === 'prompting' && (
                <span aria-hidden className="typewriter-caret" style={{ height: '0.95em' }} />
              )}
            </div>
          </div>
        </div>

        {/* Response */}
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm bg-[var(--accent-soft)]">
            <Sparkle
              size={9}
              weight="fill"
              className="text-[var(--accent-color)]"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Assistant</span>
              {stage === 'thinking' && (
                <span className="inline-flex items-center gap-1 normal-case tracking-normal text-[var(--accent-color)]">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-color)]" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-color)] [animation-delay:200ms]" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-color)] [animation-delay:400ms]" />
                  thinking
                </span>
              )}
            </div>
            <div className="mt-0.5 min-h-[5.5em] space-y-0.5">
              {responseLines.map((line, i) => (
                <div
                  key={`${idx}-${i}`}
                  className="animate-reveal-up text-foreground/85"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="relative h-0.5 overflow-hidden bg-border/40">
        <div
          key={`${idx}-${stage}`}
          className="absolute inset-y-0 left-0 bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)]"
          style={{
            animation:
              stage === 'rest' ? 'none' : 'progress-fill 5s cubic-bezier(0.2,0,0,1) forwards',
          }}
        />
      </div>

      {/* Spin keyframes inline-fallback (uses Tailwind already) */}
      <style>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
