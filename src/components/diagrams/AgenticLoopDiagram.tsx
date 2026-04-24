import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  ArrowClockwise,
  ArrowRight,
  Brain,
  ChatCircle,
  Code,
  Eye,
  Lightning,
  ListMagnifyingGlass,
  Stop,
  Wrench,
  Info
} from '@phosphor-icons/react'

type LoopPhase = 'prompt' | 'think' | 'tool-call' | 'execute' | 'observe' | 'done'

interface PhaseInfo {
  id: LoopPhase
  label: string
  sublabel: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  codeSnippet: string
}

const phases: PhaseInfo[] = [
  {
    id: 'prompt',
    label: 'Prompt',
    sublabel: 'User input',
    icon: <ChatCircle size={22} weight="duotone" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    description: 'The user types a natural language request. The agent prepends the system prompt (including instruction files and matched skills) and sends everything to the LLM.',
    codeSnippet: 'messages.push({ role: "user", content: userInput })'
  },
  {
    id: 'think',
    label: 'Think',
    sublabel: 'LLM reasons',
    icon: <Brain size={22} weight="duotone" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/30',
    description: 'The LLM receives messages + tool definitions and decides what to do. It either responds with text (done) or requests one or more tool calls.',
    codeSnippet: 'const response = await provider.chat(systemPrompt, messages, tools)'
  },
  {
    id: 'tool-call',
    label: 'Tool Call',
    sublabel: 'LLM requests action',
    icon: <Wrench size={22} weight="duotone" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
    description: 'The LLM returns a structured tool call — e.g., read_file({ path: "src/index.ts" }). The agent checks permissions before executing.',
    codeSnippet: 'if (response.toolCalls?.length > 0) { /* execute tools */ }'
  },
  {
    id: 'execute',
    label: 'Execute',
    sublabel: 'Agent acts',
    icon: <Code size={22} weight="duotone" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    description: 'The agent executes the tool (reads a file, runs a command, writes code) and captures the result. Dangerous operations require user approval.',
    codeSnippet: 'const result = await executeTool(call.name, call.input)'
  },
  {
    id: 'observe',
    label: 'Observe',
    sublabel: 'Feed result back',
    icon: <Eye size={22} weight="duotone" />,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10 border-cyan-500/30',
    description: 'The tool result is appended to the conversation and sent back to the LLM. The loop continues — the LLM reads the result and decides the next action.',
    codeSnippet: 'messages.push({ role: "tool", content: result })'
  },
  {
    id: 'done',
    label: 'Done',
    sublabel: 'Text response',
    icon: <Stop size={22} weight="duotone" />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10 border-rose-500/30',
    description: 'When the LLM has all the information it needs, it returns a text response with no tool calls. The loop breaks and the result is printed.',
    codeSnippet: 'if (!response.toolCalls) { console.log(response.text); break }'
  }
]

function PhaseNode({
  phase,
  isActive,
  onClick
}: {
  phase: PhaseInfo
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 min-w-[80px]
        ${isActive
          ? `${phase.bgColor} border-opacity-100 scale-105 shadow-lg`
          : 'bg-muted/30 border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <div className={`p-2 rounded-lg ${phase.bgColor} ${phase.color}`}>
        {phase.icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-xs text-foreground">{phase.label}</div>
        <div className="text-[10px] text-muted-foreground">{phase.sublabel}</div>
      </div>
    </button>
  )
}

function LoopArrow({ isReturn = false }: { isReturn?: boolean }) {
  if (isReturn) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 text-primary/60">
          <ArrowClockwise size={16} />
          <span className="text-[10px] font-medium">loop</span>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center px-1 shrink-0">
      <ArrowRight size={14} className="text-muted-foreground" />
    </div>
  )
}

export function AgenticLoopDiagram() {
  const [activePhase, setActivePhase] = useState<LoopPhase>('think')
  const selected = phases.find(p => p.id === activePhase) || phases[1]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      data-diagram="agentic-loop"
      aria-label="Agentic loop diagram showing the cycle: Prompt, Think, Tool Call, Execute, Observe, then loop back or finish with Done. Click each phase to learn more."
    >
      {/* Loop Visualization */}
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <ArrowClockwise size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            The Agentic Loop
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a phase to explore
          </span>
        </div>

        {/* Main loop flow */}
        <div className="flex items-center justify-center gap-1 py-4 overflow-x-auto">
          <PhaseNode phase={phases[0]} isActive={activePhase === 'prompt'} onClick={() => setActivePhase('prompt')} />
          <LoopArrow />
          <PhaseNode phase={phases[1]} isActive={activePhase === 'think'} onClick={() => setActivePhase('think')} />
          <LoopArrow />
          <PhaseNode phase={phases[2]} isActive={activePhase === 'tool-call'} onClick={() => setActivePhase('tool-call')} />
          <LoopArrow />
          <PhaseNode phase={phases[3]} isActive={activePhase === 'execute'} onClick={() => setActivePhase('execute')} />
          <LoopArrow />
          <PhaseNode phase={phases[4]} isActive={activePhase === 'observe'} onClick={() => setActivePhase('observe')} />
        </div>

        {/* Loop-back arrow + Done branch */}
        <div className="flex items-center justify-between px-8 mt-2">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <LoopArrow isReturn />
            <span className="text-xs text-muted-foreground">or</span>
            <PhaseNode phase={phases[5]} isActive={activePhase === 'done'} onClick={() => setActivePhase('done')} />
          </div>
          <div className="flex-1" />
        </div>
      </Card>

      {/* Phase Detail + Code */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${selected.bgColor} ${selected.color} shrink-0`}>
            {selected.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground">{selected.label}: {selected.sublabel}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {selected.description}
            </p>
            <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Code
              </span>
              <pre className="mt-1 text-xs font-mono overflow-x-auto">
                <code>{selected.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>

      {/* Key insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>Every AI coding agent is this loop.</strong> Claude Code, GitHub Copilot Agent Mode,
          Cursor — all are a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs border border-border">while(true)</code> loop
          checking for tool calls. The only differences are which tools are plugged in and how it's presented.
        </p>
      </div>
    </div>
  )
}
