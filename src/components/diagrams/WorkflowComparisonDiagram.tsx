import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Desktop, 
  Cloud, 
  ChatCircle, 
  GitPullRequest,
  ArrowDown,
  ArrowsLeftRight,
  Lightning,
  Clock,
  CheckCircle,
  User
} from '@phosphor-icons/react'

type WorkflowType = 'local' | 'cloud'

interface WorkflowStep {
  icon: React.ReactNode
  label: string
  description: string
}

const localWorkflow: WorkflowStep[] = [
  {
    icon: <User size={20} weight="duotone" />,
    label: 'You',
    description: 'Type in chat'
  },
  {
    icon: <ArrowsLeftRight size={16} className="text-emerald-500" />,
    label: '',
    description: ''
  },
  {
    icon: <ChatCircle size={20} weight="duotone" />,
    label: 'Chat Window',
    description: 'Real-time response'
  },
  {
    icon: <ArrowsLeftRight size={16} className="text-emerald-500" />,
    label: '',
    description: ''
  },
  {
    icon: <CheckCircle size={20} weight="duotone" />,
    label: 'Instant Edit',
    description: 'Code changes immediately'
  }
]

const cloudWorkflow: WorkflowStep[] = [
  {
    icon: <User size={20} weight="duotone" />,
    label: 'Create Issue',
    description: 'Define the task'
  },
  {
    icon: <ArrowDown size={16} className="text-violet-500" />,
    label: '',
    description: ''
  },
  {
    icon: <Cloud size={20} weight="duotone" />,
    label: 'Agent Works',
    description: 'Async in cloud'
  },
  {
    icon: <ArrowDown size={16} className="text-violet-500" />,
    label: '',
    description: ''
  },
  {
    icon: <GitPullRequest size={20} weight="duotone" />,
    label: 'PR Created',
    description: 'Review when ready'
  }
]

interface UseCaseItem {
  local: string
  cloud: string
}

const useCases: UseCaseItem[] = [
  { local: "You're actively exploring a problem", cloud: "The task is clearly defined" },
  { local: "You need immediate back-and-forth", cloud: "You want to work on something else" },
  { local: "Context requires live debugging", cloud: "The issue has clear acceptance criteria" },
  { local: "You're prototyping or experimenting", cloud: "You want a PR to review" }
]

function WorkflowColumn({ 
  type, 
  isActive, 
  onClick 
}: { 
  type: WorkflowType
  isActive: boolean
  onClick: () => void
}) {
  const isLocal = type === 'local'
  const workflow = isLocal ? localWorkflow : cloudWorkflow
  const color = isLocal ? 'emerald' : 'violet'
  
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 p-4 rounded-xl border-2 transition-all duration-200 text-left
        ${isActive 
          ? `bg-${color}-500/10 border-${color}-500/50 shadow-lg` 
          : 'bg-muted/30 border-border hover:border-muted-foreground/30'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        {isLocal ? (
          <Desktop size={20} weight="duotone" className="text-emerald-500" />
        ) : (
          <Cloud size={20} weight="duotone" className="text-violet-500" />
        )}
        <div>
          <div className="font-semibold text-sm text-foreground">
            {isLocal ? 'VS Code Agents' : 'Copilot Coding Agent'}
          </div>
          <div className="text-xs text-muted-foreground">
            {isLocal ? 'Real-time collaboration' : 'Async delegation'}
          </div>
        </div>
        {isActive && (
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full bg-${color}-500/20 text-${color}-600 dark:text-${color}-400`}>
            Selected
          </span>
        )}
      </div>

      {/* Workflow Steps */}
      <div className="flex flex-col items-center gap-1">
        {workflow.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {step.label ? (
              <div className={`
                flex items-center gap-2 px-3 py-2 rounded-lg w-full
                ${isActive ? `bg-${color}-500/10` : 'bg-muted/50'}
              `}>
                <span className={isLocal ? 'text-emerald-500' : 'text-violet-500'}>
                  {step.icon}
                </span>
                <div>
                  <div className="text-sm font-medium text-foreground">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
            ) : (
              <div className="py-1">{step.icon}</div>
            )}
          </div>
        ))}
      </div>

      {/* Timing indicator */}
      <div className={`
        flex items-center justify-center gap-2 mt-4 pt-3 border-t border-border
        text-xs text-muted-foreground
      `}>
        <Clock size={14} />
        {isLocal ? 'Instant feedback' : '1-5 minutes'}
      </div>
    </button>
  )
}

export function WorkflowComparisonDiagram() {
  const [activeType, setActiveType] = useState<WorkflowType>('local')

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      aria-label="Workflow comparison diagram contrasting VS Code Agents (real-time collaboration with instant feedback) versus Copilot Coding Agent (async delegation via issues and PRs). Click to compare workflows."
    >
      {/* Main Comparison */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Lightning size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            Choose Your Workflow
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click to compare
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <WorkflowColumn 
            type="local" 
            isActive={activeType === 'local'}
            onClick={() => setActiveType('local')}
          />
          <WorkflowColumn 
            type="cloud" 
            isActive={activeType === 'cloud'}
            onClick={() => setActiveType('cloud')}
          />
        </div>
      </Card>

      {/* When to Use */}
      <Card className="p-4 bg-muted/30 border-border overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-heading font-semibold text-sm text-foreground">
            When to Use Each
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Local column */}
          <div className={`
            p-3 rounded-lg transition-all duration-200
            ${activeType === 'local' ? 'bg-emerald-500/10 ring-1 ring-emerald-500/30' : 'bg-muted/50'}
          `}>
            <div className="flex items-center gap-2 mb-2">
              <Desktop size={16} className="text-emerald-500" />
              <span className="text-sm font-medium text-foreground">Use VS Code Agent when...</span>
            </div>
            <ul className="space-y-1">
              {useCases.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  {item.local}
                </li>
              ))}
            </ul>
          </div>

          {/* Cloud column */}
          <div className={`
            p-3 rounded-lg transition-all duration-200
            ${activeType === 'cloud' ? 'bg-violet-500/10 ring-1 ring-violet-500/30' : 'bg-muted/50'}
          `}>
            <div className="flex items-center gap-2 mb-2">
              <Cloud size={16} className="text-violet-500" />
              <span className="text-sm font-medium text-foreground">Use Coding Agent when...</span>
            </div>
            <ul className="space-y-1">
              {useCases.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-violet-500 shrink-0 mt-0.5" />
                  {item.cloud}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Key Insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <ArrowsLeftRight size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>They complement each other:</strong> Use VS Code agents for exploration and active work, 
          then create issues for the coding agent to handle well-defined tasks in the background.
        </p>
      </div>
    </div>
  )
}
