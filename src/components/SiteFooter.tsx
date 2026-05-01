// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useLocation } from 'react-router-dom'
import { GithubLogo } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const REPO_URL = 'https://github.com/microsoft/learn-ai-native-dev'
const AUTHOR_URL = 'https://github.com/vahidrostami'

/**
 * Global site footer. Stays subtle: thin top border, muted text, single line on
 * desktop. Adapts styling on terminal-themed routes for visual continuity.
 */
export function SiteFooter() {
  const location = useLocation()
  const isTerminalPage =
    location.pathname.startsWith('/terminal') || location.pathname.startsWith('/learn/terminal')

  return (
    <footer
      className={cn(
        'mt-16 border-t',
        isTerminalPage
          ? 'border-[#00ff41]/15 bg-transparent'
          : 'border-border/60 bg-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs sm:flex-row',
          isTerminalPage ? 'text-[#6a9e7a] font-mono' : 'text-muted-foreground',
        )}
      >
        <p className="inline-flex items-center gap-1.5">
          <span>Created by</span>
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1 font-medium transition-colors',
              isTerminalPage
                ? 'text-[#b8d4be] hover:text-[#39e875]'
                : 'text-foreground/80 hover:text-foreground',
            )}
          >
            <GithubLogo size={12} weight="fill" />
            Vahid Rostami
          </a>
        </p>
        <p className="inline-flex items-center gap-3">
          <span>MIT License</span>
          <span aria-hidden="true">·</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'transition-colors',
              isTerminalPage ? 'hover:text-[#39e875]' : 'hover:text-foreground',
            )}
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
