// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { Highlighter, BundledLanguage, BundledTheme } from 'shiki'

/**
 * Lazy, single-instance Shiki highlighter.
 * Languages are loaded on demand to keep the initial bundle small.
 */

let highlighterPromise: Promise<Highlighter> | null = null
const loadedLangs = new Set<string>()

const THEMES: BundledTheme[] = ['github-dark-default', 'github-light-default']

const PRELOADED: BundledLanguage[] = [
  'tsx',
  'ts',
  'jsx',
  'js',
  'json',
  'bash',
  'shell',
  'markdown',
  'html',
  'css',
]

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then((shiki) =>
      shiki.createHighlighter({
        themes: THEMES,
        langs: PRELOADED,
      })
    )
    PRELOADED.forEach((l) => loadedLangs.add(l))
  }
  return highlighterPromise
}

const LANG_ALIASES: Record<string, BundledLanguage> = {
  shell: 'bash',
  sh: 'bash',
  zsh: 'bash',
  powershell: 'powershell',
  ps1: 'powershell',
  yml: 'yaml',
  py: 'python',
  rb: 'ruby',
  rs: 'rust',
  golang: 'go',
  cs: 'csharp',
  'c++': 'cpp',
  jsonc: 'json',
  text: 'text' as BundledLanguage,
  plaintext: 'text' as BundledLanguage,
  plain: 'text' as BundledLanguage,
  txt: 'text' as BundledLanguage,
}

export function normalizeLang(lang: string | undefined): BundledLanguage | null {
  if (!lang) return null
  const lower = lang.toLowerCase().trim()
  if (lower === '' || lower === 'text' || lower === 'plain' || lower === 'plaintext') return null
  return (LANG_ALIASES[lower] ?? (lower as BundledLanguage))
}

export async function ensureLanguage(lang: BundledLanguage): Promise<void> {
  if (loadedLangs.has(lang)) return
  const h = await getHighlighter()
  try {
    await h.loadLanguage(lang)
    loadedLangs.add(lang)
  } catch {
    /* unsupported language — caller should fall back to plain text */
  }
}

export async function highlight(
  code: string,
  lang: BundledLanguage,
  isDark: boolean
): Promise<string> {
  const h = await getHighlighter()
  try {
    return h.codeToHtml(code, {
      lang,
      theme: isDark ? 'github-dark-default' : 'github-light-default',
    })
  } catch {
    return ''
  }
}
