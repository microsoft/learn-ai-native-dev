import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Code, 
  Robot, 
  TestTube,
  CheckCircle,
  Warning,
  Lightning,
  ArrowRight,
  Sparkle,
  ListChecks
} from '@phosphor-icons/react'

interface TestCategory {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  examples: string[]
}

const testCategories: TestCategory[] = [
  {
    id: 'happy',
    label: 'Happy Path',
    icon: <CheckCircle size={18} weight="duotone" />,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    examples: ['Valid inputs', 'Expected behavior', 'Normal usage']
  },
  {
    id: 'edge',
    label: 'Edge Cases',
    icon: <Warning size={18} weight="duotone" />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    examples: ['Empty strings', 'Null/undefined', 'Very long inputs', 'Special characters']
  },
  {
    id: 'error',
    label: 'Error Handling',
    icon: <Warning size={18} weight="duotone" />,
    color: 'text-red-500 bg-red-500/10 border-red-500/30',
    examples: ['Invalid types', 'Network failures', 'Missing params', 'API errors']
  },
  {
    id: 'boundary',
    label: 'Boundary Values',
    icon: <TestTube size={18} weight="duotone" />,
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/30',
    examples: ['Zero', 'Max values', 'Min values', 'Off-by-one']
  }
]

function CoverageBar({ percentage }: { percentage: number }) {
  const getColor = () => {
    if (percentage >= 80) return 'bg-emerald-500'
    if (percentage >= 60) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-sm font-mono font-semibold ${
        percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-amber-500' : 'text-red-500'
      }`}>
        {percentage}%
      </span>
    </div>
  )
}

export function AITestingFlowDiagram() {
  const [selectedCategory, setSelectedCategory] = useState<string>('edge')
  const [coverage, setCoverage] = useState(85)
  const selected = testCategories.find(c => c.id === selectedCategory) || testCategories[1]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      aria-label="AI-powered testing flow diagram showing source code processed by AI to generate four test categories: Happy Path, Edge Cases, Error Handling, and Boundary Values, resulting in a comprehensive test suite with high coverage."
    >
      {/* Main Flow Diagram */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Sparkle size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            AI-Powered Testing Flow
          </span>
        </div>

        {/* Flow visualization */}
        <div className="flex items-center justify-between gap-4 py-4 overflow-x-auto">
          {/* Source Code */}
          <div className="flex flex-col items-center gap-2 min-w-[100px]">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <Code size={28} className="text-blue-500" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">Your Code</div>
              <div className="text-xs text-muted-foreground">Source files</div>
            </div>
          </div>

          <ArrowRight size={20} className="text-muted-foreground shrink-0" />

          {/* AI Generator */}
          <div className="flex flex-col items-center gap-2 min-w-[120px]">
            <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 relative">
              <Robot size={28} className="text-violet-500" />
              <Sparkle size={14} className="absolute -top-1 -right-1 text-violet-400" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">AI Generates</div>
              <div className="text-xs text-muted-foreground">Comprehensive tests</div>
            </div>
          </div>

          <ArrowRight size={20} className="text-muted-foreground shrink-0" />

          {/* Test Categories */}
          <div className="flex flex-col gap-2 min-w-[160px]">
            {testCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-left
                  ${selectedCategory === cat.id 
                    ? cat.color + ' border-current' 
                    : 'bg-muted/50 border-transparent hover:bg-muted'
                  }
                `}
              >
                <span className={selectedCategory === cat.id ? '' : 'text-muted-foreground'}>
                  {cat.icon}
                </span>
                <span className={`text-xs font-medium ${selectedCategory === cat.id ? '' : 'text-muted-foreground'}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          <ArrowRight size={20} className="text-muted-foreground shrink-0" />

          {/* Test Suite */}
          <div className="flex flex-col items-center gap-2 min-w-[120px]">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <ListChecks size={28} className="text-emerald-500" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">Test Suite</div>
              <div className="text-xs text-muted-foreground">High coverage</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Details */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg border ${selected.color}`}>
            {selected.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{selected.label} Tests</h4>
            <p className="text-sm text-muted-foreground mt-1">
              AI systematically generates tests for these scenarios:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selected.examples.map((example, i) => (
                <span 
                  key={i}
                  className="text-xs px-2 py-1 rounded-md bg-muted text-foreground"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Coverage Indicator */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Test Coverage</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCoverage(Math.max(0, coverage - 20))}
              className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80"
            >
              Before AI
            </button>
            <button 
              onClick={() => setCoverage(85)}
              className="text-xs px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30"
            >
              After AI
            </button>
          </div>
        </div>
        <CoverageBar percentage={coverage} />
        <p className="text-xs text-muted-foreground mt-2">
          {coverage >= 80 
            ? '✓ Target coverage achieved (80%+)' 
            : coverage >= 60 
              ? '⚠ Good progress, keep adding tests' 
              : '✗ Critical coverage gaps exist'
          }
        </p>
      </Card>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { icon: <Lightning size={18} />, title: 'Fast', desc: 'Dozens of tests in seconds' },
          { icon: <CheckCircle size={18} />, title: 'Systematic', desc: 'Never misses edge cases' },
          { icon: <TestTube size={18} />, title: 'Consistent', desc: 'Follows best practices' }
        ].map((benefit, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
            <span className="text-primary">{benefit.icon}</span>
            <div>
              <div className="text-sm font-medium text-foreground">{benefit.title}</div>
              <div className="text-xs text-muted-foreground">{benefit.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
