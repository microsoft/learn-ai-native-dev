import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Copy, Check, MagicWand, ListBullets } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface PromptBoxProps {
  number: number | string
  title: string
  code: string
  metaPrompt?: string
}

export function PromptBox({ number, title, code, metaPrompt }: PromptBoxProps) {
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<'full' | 'generate'>('full')

  const activeCode = mode === 'generate' && metaPrompt ? metaPrompt : code

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <Card
      className={cn(
        'group/prompt relative my-6 gap-0 overflow-hidden border-border/80 py-0',
        'shadow-[var(--elev-2)] transition-shadow duration-300 hover:shadow-[var(--elev-3)]'
      )}
    >
      {/* Window chrome — top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-gradient-to-b from-muted/70 to-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="hidden h-4 w-px bg-border/80 sm:block" />
          <span className="numeric inline-flex items-center rounded-md border border-border/70 bg-background/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Prompt {number}
          </span>
          <span className="font-heading text-sm font-semibold text-foreground">
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'group/copy relative inline-flex h-8 items-center gap-1.5 overflow-hidden rounded-md border px-3 text-xs font-semibold transition-all',
            copied
              ? 'border-[var(--accent-edge)] bg-[var(--accent-soft)] text-[var(--accent-color)] animate-pulse-accent'
              : 'border-border/80 bg-background/40 text-muted-foreground hover:border-[var(--accent-edge)] hover:bg-[var(--accent-soft)] hover:text-foreground'
          )}
          aria-label={copied ? 'Copied' : 'Copy prompt'}
        >
          <span className="relative h-3.5 w-3.5">
            <Copy
              className={cn(
                'absolute inset-0 transition-all duration-300',
                copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
              )}
              size={14}
            />
            <Check
              weight="bold"
              className={cn(
                'absolute inset-0 transition-all duration-300',
                copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              )}
              size={14}
            />
          </span>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Tabs (only when meta prompt available) */}
      {metaPrompt && (
        <div className="flex gap-1 border-b border-border/70 bg-muted/20 px-3 py-1.5">
          <button
            onClick={() => setMode('full')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              mode === 'full'
                ? 'border border-[var(--accent-edge)] bg-[var(--accent-soft)] text-[var(--accent-color)]'
                : 'border border-transparent text-muted-foreground hover:bg-background/40 hover:text-foreground'
            )}
          >
            <ListBullets size={14} />
            Full prompt
          </button>
          <button
            onClick={() => setMode('generate')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              mode === 'generate'
                ? 'border border-violet-400/50 bg-violet-500/10 text-violet-300'
                : 'border border-transparent text-muted-foreground hover:bg-background/40 hover:text-foreground'
            )}
          >
            <MagicWand size={14} />
            Generate with AI
          </button>
        </div>
      )}

      {/* Code body */}
      {mode === 'generate' && metaPrompt ? (
        <div>
          <div className="border-b border-violet-500/15 bg-violet-500/5 px-4 py-2">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Paste this into Claude, Copilot, or ChatGPT — it will generate the detailed prompt for you.
            </p>
          </div>
          <pre className="overflow-x-auto bg-background/60 p-4 md:p-5">
            <code className="font-mono text-[14.5px] leading-[1.65] text-foreground/90">
              {metaPrompt}
            </code>
          </pre>
        </div>
      ) : (
        <pre className="overflow-x-auto bg-background/60 p-4 md:p-5">
          <code className="font-mono text-[14.5px] leading-[1.65] text-foreground/90">
            {code}
          </code>
        </pre>
      )}
    </Card>
  )
}
