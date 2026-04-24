import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Robot, 
  ShieldCheck, 
  TestTube, 
  BookOpen,
  ArrowRight,
  Target,
  Lightning,
  ListChecks,
  TreeStructure
} from '@phosphor-icons/react'

type PatternType = 'pipeline' | 'parallel' | 'hierarchical'

interface PatternInfo {
  id: PatternType
  name: string
  description: string
  bestFor: string
  example: string
}

const patterns: PatternInfo[] = [
  {
    id: 'pipeline',
    name: 'Pipeline (Sequential)',
    description: 'Each agent builds on the previous output. Results flow through a chain.',
    bestFor: 'Transformation workflows',
    example: 'Write code → Add tests → Document'
  },
  {
    id: 'parallel',
    name: 'Parallel Specialists',
    description: 'Multiple agents work on the same input simultaneously. Results are combined.',
    bestFor: 'Multi-perspective analysis',
    example: 'Security + Performance + Style review'
  },
  {
    id: 'hierarchical',
    name: 'Hierarchical (Orchestrator)',
    description: 'One agent controls others, delegating tasks and synthesizing results.',
    bestFor: 'Complex workflows with decision points',
    example: 'PR review orchestrator'
  }
]

function PipelineDiagram({ isActive }: { isActive: boolean }) {
  const steps = [
    { icon: <Robot size={18} />, label: 'Agent A', sublabel: 'Draft', color: 'text-blue-500 bg-blue-500/10' },
    { icon: <Robot size={18} />, label: 'Agent B', sublabel: 'Review', color: 'text-amber-500 bg-amber-500/10' },
    { icon: <Robot size={18} />, label: 'Agent C', sublabel: 'Polish', color: 'text-emerald-500 bg-emerald-500/10' }
  ]

  return (
    <div className={`p-4 rounded-lg transition-all ${isActive ? 'bg-primary/5' : 'bg-muted/30'}`}>
      <div className="flex items-center justify-center gap-2">
        <div className="px-3 py-2 rounded-lg bg-muted text-sm text-muted-foreground">
          Request
        </div>
        <ArrowRight size={16} className="text-muted-foreground" />
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${step.color}`}>
              {step.icon}
              <div className="text-left">
                <div className="text-xs font-medium">{step.label}</div>
                <div className="text-xs opacity-70">{step.sublabel}</div>
              </div>
            </div>
            {i < steps.length - 1 && <ArrowRight size={16} className="text-muted-foreground" />}
          </div>
        ))}
        <ArrowRight size={16} className="text-muted-foreground" />
        <div className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          Result
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-3">
        Each output feeds the next agent
      </div>
    </div>
  )
}

function ParallelDiagram({ isActive }: { isActive: boolean }) {
  const specialists = [
    { icon: <ShieldCheck size={18} />, label: 'Security', color: 'text-red-500 bg-red-500/10' },
    { icon: <TestTube size={18} />, label: 'Performance', color: 'text-amber-500 bg-amber-500/10' },
    { icon: <BookOpen size={18} />, label: 'Style', color: 'text-blue-500 bg-blue-500/10' }
  ]

  return (
    <div className={`p-4 rounded-lg transition-all ${isActive ? 'bg-primary/5' : 'bg-muted/30'}`}>
      <div className="flex items-center justify-center gap-6">
        {/* Input */}
        <div className="px-3 py-2 rounded-lg bg-muted text-sm text-muted-foreground">
          Request
        </div>
        
        {/* Branching arrows */}
        <div className="flex flex-col items-center gap-1">
          <ArrowRight size={16} className="text-muted-foreground -rotate-45" />
          <ArrowRight size={16} className="text-muted-foreground" />
          <ArrowRight size={16} className="text-muted-foreground rotate-45" />
        </div>

        {/* Parallel agents */}
        <div className="flex flex-col gap-2">
          {specialists.map((spec, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${spec.color}`}>
              {spec.icon}
              <span className="text-xs font-medium">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* Converging arrows */}
        <div className="flex flex-col items-center gap-1">
          <ArrowRight size={16} className="text-muted-foreground rotate-45" />
          <ArrowRight size={16} className="text-muted-foreground" />
          <ArrowRight size={16} className="text-muted-foreground -rotate-45" />
        </div>

        {/* Synthesizer */}
        <div className="px-3 py-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <div className="text-xs font-medium">Synthesizer</div>
        </div>

        <ArrowRight size={16} className="text-muted-foreground" />

        {/* Result */}
        <div className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          Result
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-3">
        All agents run simultaneously
      </div>
    </div>
  )
}

function HierarchicalDiagram({ isActive }: { isActive: boolean }) {
  const specialists = [
    { icon: <ShieldCheck size={16} />, label: 'Security Scanner', color: 'text-red-500 bg-red-500/10' },
    { icon: <TestTube size={16} />, label: 'Test Analyzer', color: 'text-amber-500 bg-amber-500/10' },
    { icon: <BookOpen size={16} />, label: 'Docs Checker', color: 'text-blue-500 bg-blue-500/10' }
  ]

  return (
    <div className={`p-4 rounded-lg transition-all ${isActive ? 'bg-primary/5' : 'bg-muted/30'}`}>
      <div className="flex flex-col items-center gap-3">
        {/* Orchestrator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/30">
          <Target size={20} className="text-violet-500" />
          <div>
            <div className="text-sm font-semibold text-violet-600 dark:text-violet-400">Orchestrator</div>
            <div className="text-xs text-muted-foreground">Coordinates + synthesizes</div>
          </div>
        </div>

        {/* Connection lines */}
        <div className="flex items-center gap-8">
          <div className="w-px h-4 bg-border" />
          <div className="w-px h-4 bg-border" />
          <div className="w-px h-4 bg-border" />
        </div>

        {/* Specialists */}
        <div className="flex items-center gap-4">
          {specialists.map((spec, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${spec.color}`}>
              {spec.icon}
              <span className="text-xs font-medium">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* Connection lines */}
        <div className="flex items-center gap-8">
          <div className="w-px h-4 bg-border" />
          <div className="w-px h-4 bg-border" />
          <div className="w-px h-4 bg-border" />
        </div>

        {/* Unified report */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <ListChecks size={18} className="text-emerald-500" />
          <div>
            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Unified Report</div>
            <div className="text-xs text-muted-foreground">Combined findings</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AgentOrchestrationDiagram() {
  const [activePattern, setActivePattern] = useState<PatternType>('hierarchical')
  const selected = patterns.find(p => p.id === activePattern) || patterns[2]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      aria-label="Multi-agent orchestration patterns diagram showing three patterns: Pipeline (sequential agents A to B to C), Parallel (specialists run simultaneously), and Hierarchical (orchestrator delegates to specialists). Click tabs to explore each pattern."
    >
      {/* Pattern Selector */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <TreeStructure size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            Multi-Agent Patterns
          </span>
        </div>

        {/* Pattern tabs */}
        <div className="flex gap-2 mb-4">
          {patterns.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setActivePattern(pattern.id)}
              className={`
                px-3 py-1.5 rounded-lg text-sm transition-all
                ${activePattern === pattern.id 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }
              `}
            >
              {pattern.name}
            </button>
          ))}
        </div>

        {/* Active diagram */}
        <div className="overflow-x-auto">
          {activePattern === 'pipeline' && <PipelineDiagram isActive />}
          {activePattern === 'parallel' && <ParallelDiagram isActive />}
          {activePattern === 'hierarchical' && <HierarchicalDiagram isActive />}
        </div>
      </Card>

      {/* Pattern Details */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">{selected.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selected.description}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Best for
              </span>
              <span className="text-sm text-foreground">{selected.bestFor}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Example
              </span>
              <span className="text-sm text-foreground font-mono">{selected.example}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Lightning size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>We'll build the Hierarchical pattern:</strong> An orchestrator that delegates to specialists 
          and synthesizes results. This is the most powerful and flexible pattern for complex workflows.
        </p>
      </div>
    </div>
  )
}
