import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  Cloud,
  Code,
  GitBranch,
  Lightning,
  Info
} from '@phosphor-icons/react'

type ProviderId = 'interface' | 'anthropic' | 'openai'

interface ProviderInfo {
  id: ProviderId
  label: string
  sublabel: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  envVar: string
  models: string[]
  mapping: { method: string; detail: string }[]
}

const providers: ProviderInfo[] = [
  {
    id: 'interface',
    label: 'LLMProvider',
    sublabel: 'Your interface',
    icon: <Code size={22} weight="duotone" />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/30',
    description: 'The abstract interface that all providers implement. The agentic loop only ever talks to this interface — it never knows which LLM is behind it.',
    envVar: '—',
    models: ['Any model behind the interface'],
    mapping: [
      { method: 'chat()', detail: 'Send messages + tools, get response' },
      { method: 'name', detail: 'Provider identifier string' }
    ]
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    sublabel: 'Claude models',
    icon: <Cloud size={22} weight="duotone" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
    description: 'Maps the Anthropic Messages API to LLMProvider. Tool calls appear in response.content as blocks with type "tool_use"; results sent as "tool_result" messages.',
    envVar: 'ANTHROPIC_API_KEY',
    models: ['claude-sonnet-4-latest', 'claude-opus-4-latest'],
    mapping: [
      { method: 'messages.create()', detail: '→ chat()' },
      { method: 'stop_reason: "tool_use"', detail: '→ toolCalls[]' },
      { method: 'content[].text', detail: '→ response.text' }
    ]
  },
  {
    id: 'openai',
    label: 'OpenAI-Compatible',
    sublabel: 'GPT, GitHub Models',
    icon: <GitBranch size={22} weight="duotone" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    description: 'Maps the OpenAI Chat Completions API (used by GPT, GitHub Models, Azure OpenAI, and many local models) to LLMProvider. Tool calls appear in message.tool_calls array.',
    envVar: 'OPENAI_API_KEY',
    models: ['gpt-4o', 'gpt-4o-mini', 'GitHub Models'],
    mapping: [
      { method: 'chat.completions.create()', detail: '→ chat()' },
      { method: 'finish_reason: "tool_calls"', detail: '→ toolCalls[]' },
      { method: 'choices[0].message.content', detail: '→ response.text' }
    ]
  }
]

function ProviderBox({
  provider,
  isSelected,
  onClick
}: {
  provider: ProviderInfo
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 min-w-[120px]
        ${isSelected
          ? `${provider.bgColor} border-opacity-100 scale-105 shadow-lg`
          : 'bg-muted/30 border-border hover:border-muted-foreground/50'
        }
      `}
    >
      <div className={`p-3 rounded-lg ${provider.bgColor} ${provider.color}`}>
        {provider.icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-sm text-foreground">{provider.label}</div>
        <div className="text-xs text-muted-foreground">{provider.sublabel}</div>
      </div>
    </button>
  )
}

export function ProviderAbstractionDiagram() {
  const [selectedId, setSelectedId] = useState<ProviderId>('interface')
  const selected = providers.find(p => p.id === selectedId) || providers[0]

  return (
    <div
      className="my-6 space-y-4"
      role="figure"
      data-diagram="provider-abstraction"
      aria-label="Provider abstraction diagram showing how the LLMProvider interface sits between the agentic loop and multiple LLM backends (Anthropic, OpenAI). Click each layer to learn how API differences are normalized."
    >
      {/* Architecture */}
      <Card className="p-6 bg-muted/30 border-border">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Lightning size={18} weight="duotone" className="text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">
            Provider Abstraction
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Click a layer to explore
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* Top: Agentic Loop */}
          <div className="px-6 py-3 rounded-xl bg-muted/50 border-2 border-dashed border-border text-center">
            <div className="text-sm font-semibold text-foreground">Agentic Loop</div>
            <div className="text-xs text-muted-foreground">while (true) &#123; provider.chat(...) &#125;</div>
          </div>

          <ArrowRight size={18} className="text-muted-foreground rotate-90" />

          {/* Middle: Interface */}
          <ProviderBox
            provider={providers[0]}
            isSelected={selectedId === 'interface'}
            onClick={() => setSelectedId('interface')}
          />

          {/* Branching arrows */}
          <div className="flex items-center gap-16">
            <ArrowRight size={16} className="text-muted-foreground rotate-[135deg]" />
            <ArrowRight size={16} className="text-muted-foreground rotate-90" />
            <ArrowRight size={16} className="text-muted-foreground rotate-45" />
          </div>

          {/* Bottom: Implementations */}
          <div className="flex items-center gap-4">
            <ProviderBox
              provider={providers[1]}
              isSelected={selectedId === 'anthropic'}
              onClick={() => setSelectedId('anthropic')}
            />
            <ProviderBox
              provider={providers[2]}
              isSelected={selectedId === 'openai'}
              onClick={() => setSelectedId('openai')}
            />
          </div>
        </div>
      </Card>

      {/* Detail Panel */}
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

            {/* API Mapping Table */}
            <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {selected.id === 'interface' ? 'Interface Methods' : 'API Mapping'}
              </span>
              <div className="mt-2 space-y-1">
                {selected.mapping.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground border border-border">
                      {m.method}
                    </code>
                    <span className="text-muted-foreground">{m.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Models */}
            {selected.id !== 'interface' && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Env var:
                </span>
                <code className="text-xs rounded bg-muted px-1.5 py-0.5 font-mono text-foreground border border-border">
                  {selected.envVar}
                </code>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {selected.models.map((model, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-md bg-muted/80 text-foreground font-mono border border-border"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Key Insight */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Info size={20} className="text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>One interface, many models:</strong> Your agentic loop calls{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs border border-border">provider.chat()</code>{' '}
          without knowing which LLM responds. Switch providers by changing an environment variable — zero code changes.
        </p>
      </div>
    </div>
  )
}
