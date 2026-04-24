import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Cloud,
  CloudSun,
  Quotes,
  GithubLogo,
  Broadcast,
  Desktop,
  GitPullRequest,
  Robot,
  TestTube,
  ArrowDown,
  Lightning,
  CheckCircle,
  Terminal
} from '@phosphor-icons/react'

type LayerType = 'mcp' | 'cli' | 'workflow'

interface LayerInfo {
  id: LayerType
  label: string
  module: string
  description: string
  icon: React.ReactNode
  color: string
}

const layers: LayerInfo[] = [
  {
    id: 'mcp',
    label: 'MCP Servers',
    module: 'Module A',
    description: 'External data sources connected via Model Context Protocol',
    icon: <Broadcast size={20} weight="duotone" />,
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/30'
  },
  {
    id: 'cli',
    label: 'DevDash CLI',
    module: 'Core Project',
    description: 'Your CLI dashboard that displays all the data',
    icon: <Terminal size={20} weight="duotone" />,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'workflow',
    label: 'AI Workflows',
    module: 'Modules B-D',
    description: 'Coding agent, orchestration, and testing capabilities',
    icon: <Robot size={20} weight="duotone" />,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
  }
]

const mcpServers = [
  { icon: <CloudSun size={18} />, label: 'Weather', color: 'text-sky-500 bg-sky-500/10' },
  { icon: <Quotes size={18} />, label: 'Quote', color: 'text-pink-500 bg-pink-500/10' },
  { icon: <GithubLogo size={18} />, label: 'GitHub', color: 'text-gray-500 bg-gray-500/10' },
  { icon: <Cloud size={18} />, label: 'Fetch', color: 'text-blue-500 bg-blue-500/10' }
]

const workflowTools = [
  { icon: <GitPullRequest size={18} />, label: 'Coding Agent', module: 'B', color: 'text-violet-500 bg-violet-500/10' },
  { icon: <Robot size={18} />, label: 'Orchestrator', module: 'C', color: 'text-amber-500 bg-amber-500/10' },
  { icon: <TestTube size={18} />, label: 'AI Testing', module: 'D', color: 'text-emerald-500 bg-emerald-500/10' }
]

function DashboardPreview() {
  return (
    <div className="font-mono text-[10px] leading-tight p-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 overflow-hidden">
      <pre className="text-gray-500">╔════════════════════════════════════════════╗</pre>
      <pre className="text-gray-500">║<span className="text-emerald-400 font-bold">           DevDash v1.0.0                  </span>║</pre>
      <pre className="text-gray-500">╠════════════════════════════════════════════╣</pre>
      <pre className="text-gray-500">║<span className="text-sky-300">  🌤️  Weather: 72°F, Sunny in Seattle      </span>║</pre>
      <pre className="text-gray-500">║<span className="text-amber-300">  📊 GitHub: 42 repos, 1,337 stars         </span>║</pre>
      <pre className="text-gray-500">║<span className="text-pink-300">  💬 "The future is already here."         </span>║</pre>
      <pre className="text-gray-500">╚════════════════════════════════════════════╝</pre>
    </div>
  )
}

export function CapstoneArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<LayerType>('mcp')
  const selected = layers.find(l => l.id === activeLayer) || layers[0]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      aria-label="Capstone architecture diagram showing three layers: MCP Servers (Weather, Quote, GitHub, Fetch) feeding into DevDash CLI, supported by AI Workflows (Coding Agent, Orchestrator, AI Testing). Click layers to explore."
    >
      {/* Main Architecture */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Lightning size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            Your Advanced Workflow
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a layer to explore
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Left: Architecture layers */}
          <div className="md:col-span-2 space-y-3">
            {/* MCP Layer */}
            <button
              onClick={() => setActiveLayer('mcp')}
              className={`
                w-full p-3 rounded-xl border-2 transition-all text-left
                ${activeLayer === 'mcp' 
                  ? 'bg-violet-500/10 border-violet-500/50 shadow-lg' 
                  : 'bg-muted/30 border-border hover:border-muted-foreground/30'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <Broadcast size={18} className="text-violet-500" />
                <span className="text-sm font-semibold text-foreground">MCP Servers</span>
                <span className="text-xs text-muted-foreground">(Module A)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mcpServers.map((server, i) => (
                  <div key={i} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${server.color}`}>
                    {server.icon}
                    <span className="text-xs font-medium">{server.label}</span>
                  </div>
                ))}
              </div>
            </button>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowDown size={20} className="text-muted-foreground" />
            </div>

            {/* CLI Layer */}
            <button
              onClick={() => setActiveLayer('cli')}
              className={`
                w-full p-3 rounded-xl border-2 transition-all text-left
                ${activeLayer === 'cli' 
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg' 
                  : 'bg-muted/30 border-border hover:border-muted-foreground/30'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={18} className="text-emerald-500" />
                <span className="text-sm font-semibold text-foreground">DevDash CLI</span>
                <span className="text-xs text-muted-foreground">(Core Project)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Displays all data from MCP servers in a beautiful terminal dashboard
              </p>
            </button>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowDown size={20} className="text-muted-foreground" />
            </div>

            {/* Workflow Layer */}
            <button
              onClick={() => setActiveLayer('workflow')}
              className={`
                w-full p-3 rounded-xl border-2 transition-all text-left
                ${activeLayer === 'workflow' 
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-lg' 
                  : 'bg-muted/30 border-border hover:border-muted-foreground/30'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <Robot size={18} className="text-amber-500" />
                <span className="text-sm font-semibold text-foreground">AI Workflows</span>
                <span className="text-xs text-muted-foreground">(Modules B-D)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {workflowTools.map((tool, i) => (
                  <div key={i} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${tool.color}`}>
                    {tool.icon}
                    <span className="text-xs font-medium">{tool.label}</span>
                  </div>
                ))}
              </div>
            </button>
          </div>

          {/* Right: Preview */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Final Result
            </div>
            <DashboardPreview />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle size={14} className="text-emerald-500" />
              Live data from all sources
            </div>
          </div>
        </div>
      </Card>

      {/* Layer Details */}
      <Card className="p-4 bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg border ${selected.color}`}>
            {selected.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{selected.label}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {selected.module}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {selected.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Workflow Summary */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Desktop size={20} className="text-primary shrink-0" />
        <div className="text-sm text-foreground">
          <strong>Your complete workflow:</strong>{' '}
          <span className="text-muted-foreground">
            Define feature → Implement (coding agent) → Review (orchestrator) → Test (AI tests) → Ship!
          </span>
        </div>
      </div>
    </div>
  )
}
