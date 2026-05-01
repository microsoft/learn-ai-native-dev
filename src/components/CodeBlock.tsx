// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useState } from 'react'
import { ensureLanguage, highlight, normalizeLang } from '@/lib/shiki'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

/**
 * Renders a syntax-highlighted code block via Shiki.
 * Falls back to plain mono pre while loading or when language is unknown.
 */
export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const { theme } = useTheme()
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const lang = normalizeLang(language)
    if (!lang) {
      setHtml(null)
      return
    }
    const isDark = theme !== 'light'
    ;(async () => {
      await ensureLanguage(lang)
      const out = await highlight(code, lang, isDark)
      if (!cancelled && out) setHtml(out)
    })()
    return () => {
      cancelled = true
    }
  }, [code, language, theme])

  return (
    <div className={cn('relative my-4', className)}>
      {language && (
        <div className="absolute right-2.5 top-1.5 z-10 rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
          {language}
        </div>
      )}
      {html ? (
        <div
          className="shiki-wrapper overflow-hidden rounded-lg border border-border/70 shadow-[var(--elev-1)] [&_pre]:!m-0 [&_pre]:overflow-x-auto [&_pre]:!bg-muted/40 [&_pre]:p-3.5 [&_pre]:text-[13.5px] [&_pre]:leading-[1.6] [&_pre>code]:font-mono"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto rounded-lg border border-border/70 bg-muted/40 p-3.5 text-[13.5px] shadow-[var(--elev-1)]">
          <code className="font-mono leading-[1.6] text-foreground/90">{code}</code>
        </pre>
      )}
      <div
        className="pointer-events-none absolute inset-y-px right-px w-6 rounded-r-lg bg-gradient-to-l from-muted/80 to-transparent md:hidden"
        aria-hidden="true"
      />
    </div>
  )
}
