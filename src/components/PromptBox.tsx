import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, MagicWand, ListBullets } from '@phosphor-icons/react'
import { toast } from 'sonner'

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
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  return (
    <Card className="overflow-hidden border border-border bg-muted/30">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Prompt {number}
          </span>
          <span className="font-heading text-sm font-semibold text-foreground">
            {title}
          </span>
        </div>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="outline"
          className={`shrink-0 border-border transition-all hover:scale-105 ${copied ? 'bg-primary/10 text-primary' : 'bg-transparent hover:bg-muted'}`}
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-4 w-4" weight="bold" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      {metaPrompt && (
        <div className="flex gap-1 border-b border-border bg-muted/30 px-4 py-2">
          <button
            onClick={() => setMode('full')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              mode === 'full'
                ? 'bg-primary/10 text-primary shadow-sm border border-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/40 border border-transparent'
            }`}
          >
            <ListBullets size={14} />
            Full Prompt
          </button>
          <button
            onClick={() => setMode('generate')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              mode === 'generate'
                ? 'bg-violet-500/10 text-violet-400 shadow-sm border border-violet-500/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/40 border border-transparent'
            }`}
          >
            <MagicWand size={14} />
            Generate with AI
          </button>
        </div>
      )}

      {mode === 'generate' && metaPrompt ? (
        <div>
          <div className="border-b border-violet-500/10 bg-violet-500/5 px-4 py-2">
            <p className="text-xs text-muted-foreground">
              Paste this into Claude, Copilot, or ChatGPT — it will generate the detailed prompt for you.
            </p>
          </div>
          <pre className="overflow-x-auto bg-background/50 p-4 md:p-5">
            <code className="font-mono text-[15px] leading-[1.6] text-foreground">{metaPrompt}</code>
          </pre>
        </div>
      ) : (
        <pre className="overflow-x-auto bg-background/50 p-4 md:p-5">
          <code className="font-mono text-[15px] leading-[1.6] text-foreground">{code}</code>
        </pre>
      )}
    </Card>
  )
}
