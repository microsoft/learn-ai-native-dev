import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  Brain,
  File,
  FolderOpen,
  Lightning,
  ListMagnifyingGlass,
  MagnifyingGlass,
  Sparkle,
  Info
} from '@phosphor-icons/react'

type SkillPhase = 'index' | 'match' | 'load' | 'inject'

interface PhaseInfo {
  id: SkillPhase
  label: string
  sublabel: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  codeSnippet: string
  timing: string
}

const skillPhases: PhaseInfo[] = [
  {
    id: 'index',
    label: 'Index',
    sublabel: 'At startup',
    icon: <FolderOpen size={22} weight="duotone" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
    description: 'When the agent starts, it scans the skills/ directory and reads only the name + description from each SKILL.md file. The full content is NOT loaded yet — this keeps startup fast.',
    codeSnippet: 'const index = scanSkillsDirectory("skills/")\n// → [{ name, description, path }, ...]',
    timing: 'Once at startup'
  },
  {
    id: 'match',
    label: 'Match',
    sublabel: 'Each query',
    icon: <MagnifyingGlass size={22} weight="duotone" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
    description: 'When a user types a query, the matcher compares it against every indexed skill\'s name and description. If keywords or semantic overlap is found, the skill is selected. Multiple skills can match.',
    codeSnippet: 'const match = findMatchingSkill(query, index)\n// "refactor this function" → matches "refactor" skill',
    timing: 'Every user query'
  },
  {
    id: 'load',
    label: 'Load',
    sublabel: 'On demand',
    icon: <File size={22} weight="duotone" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    description: 'Only when a skill matches does the agent read its full SKILL.md content from disk. This lazy loading pattern means skills with large instruction files don\'t slow down unrelated queries.',
    codeSnippet: 'const content = await loadSkillContent(match.path)\n// Reads full SKILL.md only when needed',
    timing: 'Only when matched'
  },
  {
    id: 'inject',
    label: 'Inject',
    sublabel: 'Into prompt',
    icon: <Brain size={22} weight="duotone" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/30',
    description: 'The loaded skill content is injected into the system prompt for this specific request. The LLM now has specialized expertise. After the response, the skill content is discarded from the prompt.',
    codeSnippet: 'systemPrompt += `\\n## Active Skill\\n${content}`\n// LLM gains specialized knowledge',
    timing: 'This request only'
  }
]

const exampleSkills = [
  { name: 'refactor', trigger: '"refactor this function"', color: 'text-emerald-500 bg-emerald-500/10' },
  { name: 'explain', trigger: '"explain this code"', color: 'text-blue-500 bg-blue-500/10' },
  { name: 'test', trigger: '"write tests for this"', color: 'text-amber-500 bg-amber-500/10' },
  { name: 'security', trigger: '"check for vulnerabilities"', color: 'text-red-500 bg-red-500/10' }
]

function PhaseCard({
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
        flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 min-w-[90px]
        ${isActive
          ? `${phase.bgColor} border-opacity-100 scale-105 shadow-lg`
          : 'bg-muted/30 border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <div className={`p-2.5 rounded-lg ${phase.bgColor} ${phase.color}`}>
        {phase.icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-xs text-foreground">{phase.label}</div>
        <div className="text-[10px] text-muted-foreground">{phase.sublabel}</div>
      </div>
    </button>
  )
}

export function SkillSystemFlowDiagram() {
  const [activePhase, setActivePhase] = useState<SkillPhase>('match')
  const selected = skillPhases.find(p => p.id === activePhase) || skillPhases[1]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      data-diagram="skill-system-flow"
      aria-label="Skill system flow diagram showing four phases: Index skills at startup, Match user query to skill, Lazy-Load full skill content, Inject into system prompt. Click each phase to learn more."
    >
      {/* Flow Visualization */}
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Sparkle size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            Skill System Flow
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a phase to explore
          </span>
        </div>

        {/* Phase Flow */}
        <div className="flex items-center justify-center gap-2 py-4 overflow-x-auto">
          {skillPhases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <PhaseCard
                phase={phase}
                isActive={activePhase === phase.id}
                onClick={() => setActivePhase(phase.id)}
              />
              {index < skillPhases.length - 1 && (
                <div className="flex items-center px-2 shrink-0">
                  <ArrowRight size={14} className="text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timing Indicators */}
        <div className="flex justify-center gap-4 mt-2">
          {skillPhases.map(phase => (
            <span
              key={phase.id}
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activePhase === phase.id
                  ? `${phase.bgColor} ${phase.color} font-medium`
                  : 'bg-muted/30 text-muted-foreground'
              }`}
            >
              {phase.timing}
            </span>
          ))}
        </div>
      </Card>

      {/* Phase Detail */}
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
              <pre className="mt-1 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                <code>{selected.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>

      {/* Example Skills */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-3">
          <ListMagnifyingGlass size={16} weight="duotone" className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Example Skills</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {exampleSkills.map(skill => (
            <div key={skill.name} className={`flex flex-col gap-1 p-3 rounded-lg ${skill.color}`}>
              <span className="text-xs font-semibold font-mono">{skill.name}/</span>
              <span className="text-[10px] text-muted-foreground">{skill.trigger}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>This is how GitHub Copilot skills work.</strong> In Part 6, you created{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs border border-border">.github/skills/*/SKILL.md</code>{' '}
          files and they "just activated." Step G8 builds the code that makes that happen — index, match, load, inject.
        </p>
      </div>
    </div>
  )
}
