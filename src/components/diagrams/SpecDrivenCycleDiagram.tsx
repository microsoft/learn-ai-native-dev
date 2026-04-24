import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  Hammer,
  ListChecks,
  TestTube,
  XCircle,
  Lightning,
  ArrowClockwise,
  Info
} from '@phosphor-icons/react'

type CyclePhase = 'spec' | 'build' | 'test' | 'verify'

interface PhaseInfo {
  id: CyclePhase
  label: string
  step: string
  icon: React.ReactNode
  color: string
  bgColor: string
  fileRef: string
  description: string
  actions: string[]
  outcome: string
}

const cyclePhases: PhaseInfo[] = [
  {
    id: 'spec',
    label: 'Spec',
    step: 'G0 / H0',
    icon: <ClipboardText size={24} weight="duotone" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    fileRef: 'specs/PRD.md + specs/Tasks.md',
    description: 'Define WHAT you\'re building before writing code. Create numbered requirements (R1, R2...) and map each to implementation tasks. This is your contract with yourself.',
    actions: [
      'Write product requirements document',
      'Number every requirement (R1–R27)',
      'Create task checklist mapped to requirements',
      'Define acceptance criteria'
    ],
    outcome: 'A clear blueprint AI can follow'
  },
  {
    id: 'build',
    label: 'Build',
    step: 'G1–G9 / H1–H5',
    icon: <Hammer size={24} weight="duotone" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
    fileRef: 'src/**/*.ts',
    description: 'Build each feature referencing specific requirements. Every prompt says "Satisfies: R#" so the AI knows exactly what it\'s implementing and why.',
    actions: [
      'Implement features in order',
      'Tag each step with requirement IDs',
      'Use checkpoints to verify progress',
      'Cross off tasks as completed'
    ],
    outcome: 'Working code tied to requirements'
  },
  {
    id: 'test',
    label: 'Test',
    step: 'G10',
    icon: <TestTube size={24} weight="duotone" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    fileRef: 'tests/**/*.test.ts',
    description: 'Generate test suites for every major subsystem. Tests are organized by requirement — each test file maps to specific R# values, ensuring nothing slips through.',
    actions: [
      'Generate tests per subsystem',
      'Map tests to requirements',
      'Cover happy paths + edge cases',
      'Run full suite and fix failures'
    ],
    outcome: 'Automated proof it works'
  },
  {
    id: 'verify',
    label: 'Verify',
    step: 'G11 / H6',
    icon: <ListChecks size={24} weight="duotone" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/30',
    fileRef: 'docs/VERIFICATION.md',
    description: 'Walk through every requirement from the PRD and check it against the running code. Generate a PASS/FAIL table. Any failures loop back to Build.',
    actions: [
      'Check each R# against running code',
      'Create PASS / FAIL table',
      'Identify gaps',
      'Loop back to fix failures'
    ],
    outcome: 'Documented proof of completeness'
  }
]

function PhaseNode({
  phase,
  isActive,
  onClick,
  status
}: {
  phase: PhaseInfo
  isActive: boolean
  onClick: () => void
  status?: 'pass' | 'fail'
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all duration-200 min-w-[100px]
        ${isActive
          ? `${phase.bgColor} border-opacity-100 scale-105 shadow-lg`
          : 'bg-muted/30 border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <div className={`p-3 rounded-lg ${phase.bgColor} ${phase.color}`}>
        {phase.icon}
      </div>
      <div className="text-center">
        <div className="font-bold text-sm text-foreground">{phase.label}</div>
        <div className="text-[10px] text-muted-foreground">{phase.step}</div>
      </div>
      {status && (
        <div className="absolute -top-2 -right-2">
          {status === 'pass' ? (
            <CheckCircle size={20} weight="fill" className="text-emerald-500" />
          ) : (
            <XCircle size={20} weight="fill" className="text-red-500" />
          )}
        </div>
      )}
    </button>
  )
}

export function SpecDrivenCycleDiagram() {
  const [activePhase, setActivePhase] = useState<CyclePhase>('spec')
  const [simResult, setSimResult] = useState<'pass' | 'fail' | null>(null)
  const selected = cyclePhases.find(p => p.id === activePhase) || cyclePhases[0]

  const getStatus = (phaseId: CyclePhase) => {
    if (!simResult) return undefined
    if (simResult === 'pass') return 'pass'
    if (phaseId === 'verify') return 'fail'
    if (phaseId === 'spec') return 'pass'
    return undefined
  }

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      data-diagram="spec-driven-cycle"
      aria-label="Spec-driven development cycle showing four phases: Spec (define requirements), Build (implement features), Test (generate test suites), Verify (check against PRD). Failed verification loops back to Build. Click each phase to learn more."
    >
      {/* Cycle Visualization */}
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Lightning size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            Spec-Driven Development Cycle
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a phase to explore
          </span>
        </div>

        {/* Cycle flow */}
        <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
          {cyclePhases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <PhaseNode
                phase={phase}
                isActive={activePhase === phase.id}
                onClick={() => setActivePhase(phase.id)}
                status={getStatus(phase.id)}
              />
              {index < cyclePhases.length - 1 && (
                <div className="flex items-center px-2 shrink-0">
                  <ArrowRight size={16} className="text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loop-back indicator */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <ArrowClockwise size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              Verify fails? → Loop back to Build
            </span>
          </div>
        </div>

        {/* Simulation buttons */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground mr-2">Simulate:</span>
          <button
            onClick={() => { setSimResult('pass'); setActivePhase('verify') }}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
          >
            All PASS ✓
          </button>
          <button
            onClick={() => { setSimResult('fail'); setActivePhase('verify') }}
            className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
          >
            Some FAIL ✗
          </button>
          <button
            onClick={() => { setSimResult(null); setActivePhase('spec') }}
            className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground border border-border hover:bg-muted/80 transition-colors"
          >
            Reset
          </button>
        </div>
      </Card>

      {/* Phase Detail */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${selected.bgColor} ${selected.color} shrink-0`}>
            {selected.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{selected.label}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {selected.step}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {selected.description}
            </p>

            {/* Actions */}
            <div className="mt-3 space-y-1">
              {selected.actions.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className={selected.color} />
                  <span className="text-foreground">{action}</span>
                </div>
              ))}
            </div>

            {/* File reference */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Files
              </span>
              <code className="text-xs rounded bg-muted px-1.5 py-0.5 font-mono text-foreground border border-border">
                {selected.fileRef}
              </code>
            </div>

            {/* Outcome */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Outcome
              </span>
              <span className="text-xs text-foreground font-medium">{selected.outcome}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>This is the methodology from Parts 1-2, applied for real.</strong> Spec-driven
          development isn't just for tutorials — it's how you ship reliable software with AI.
          The PRD is your contract. Verification is your proof.
        </p>
      </div>
    </div>
  )
}
