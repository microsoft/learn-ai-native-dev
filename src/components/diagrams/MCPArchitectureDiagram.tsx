import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Robot, 
  ArrowRight, 
  Cloud, 
  Code,
  Database,
  Lightning,
  Info
} from '@phosphor-icons/react'

interface MCPComponent {
  id: string
  label: string
  sublabel: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  examples: string[]
}

const components: MCPComponent[] = [
  {
    id: 'client',
    label: 'AI Client',
    sublabel: 'GitHub Copilot',
    icon: <Robot size={24} weight="duotone" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/30',
    description: 'The AI assistant that needs external data. It sends requests through MCP but never directly accesses external systems.',
    examples: ['GitHub Copilot', 'Claude Desktop', 'Any MCP-compatible AI']
  },
  {
    id: 'server',
    label: 'MCP Server',
    sublabel: 'Your Code',
    icon: <Code size={24} weight="duotone" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    description: 'A small program you write that exposes tools. It translates AI requests into API calls, database queries, or any external action.',
    examples: ['Weather server', 'Database connector', 'Custom API wrapper']
  },
  {
    id: 'external',
    label: 'External System',
    sublabel: 'APIs & Data',
    icon: <Cloud size={24} weight="duotone" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
    description: 'Any external service your MCP server connects to. The AI never talks to these directly — your server handles all communication.',
    examples: ['Weather APIs', 'Databases', 'Internal services', 'File systems']
  }
]

function Arrow({ animated = false }: { animated?: boolean }) {
  return (
    <div className="flex items-center justify-center px-2">
      <div className={`flex items-center gap-1 ${animated ? 'animate-pulse' : ''}`}>
        <div className="w-8 h-0.5 bg-gradient-to-r from-muted-foreground/50 to-muted-foreground" />
        <ArrowRight size={16} className="text-muted-foreground" />
      </div>
    </div>
  )
}

function ComponentBox({ 
  component, 
  isSelected, 
  onClick 
}: { 
  component: MCPComponent
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? `${component.bgColor} border-opacity-100 scale-105 shadow-lg` 
          : 'bg-muted/30 border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <div className={`p-3 rounded-lg ${component.bgColor} ${component.color}`}>
        {component.icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-sm text-foreground">{component.label}</div>
        <div className="text-xs text-muted-foreground">{component.sublabel}</div>
      </div>
    </button>
  )
}

export function MCPArchitectureDiagram() {
  const [selectedId, setSelectedId] = useState<string>('server')
  const selected = components.find(c => c.id === selectedId) || components[1]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      aria-label="MCP Architecture diagram showing the flow from AI Client (GitHub Copilot) through MCP Server (your code) to External Systems (APIs and data). Click components to learn more about each."
    >
      {/* Flow Diagram */}
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Lightning size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            MCP Architecture
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a component to learn more
          </span>
        </div>

        {/* Architecture Flow */}
        <div className="flex items-center justify-center gap-2 py-4">
          {components.map((component, index) => (
            <div key={component.id} className="flex items-center">
              <ComponentBox 
                component={component}
                isSelected={selectedId === component.id}
                onClick={() => setSelectedId(component.id)}
              />
              {index < components.length - 1 && <Arrow animated={selectedId === component.id} />}
            </div>
          ))}
        </div>

        {/* Bidirectional indicator */}
        <div className="flex justify-center mt-2">
          <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            ↔ Bidirectional communication
          </span>
        </div>
      </Card>

      {/* Details Panel */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${selected.bgColor} ${selected.color} shrink-0`}>
            {selected.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground">{selected.label}</h4>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {selected.description}
            </p>
            <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-background/50 border border-border">
              <Info size={16} className="shrink-0 mt-0.5 text-primary" />
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Examples
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
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
          </div>
        </div>
      </Card>

      {/* Key Insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Database size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>Why this matters:</strong> Instead of copy-pasting API responses into chat, 
          MCP lets AI fetch data directly. This keeps context accurate and saves you time.
        </p>
      </div>
    </div>
  )
}
