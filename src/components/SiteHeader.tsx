// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useTrack } from '@/hooks/use-track'
import { Sparkle, Swap, GithubLogo } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const REPO_URL = 'https://github.com/microsoft/learn-ai-native-dev'

export function SiteHeader() {
  const { selectedTrack, hasSelectedTrack, clearSelectedTrack } = useTrack()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Terminal pages keep their themed dark style for continuity
  const isTerminalPage =
    location.pathname.startsWith('/terminal') || location.pathname.startsWith('/learn/terminal')

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors',
      isActive
        ? isTerminalPage
          ? 'bg-[#00ff41]/10 text-[#39e875]'
          : 'text-foreground after:absolute after:inset-x-2.5 after:-bottom-[11px] after:h-px after:bg-[var(--accent-color)] after:shadow-[0_0_8px_var(--accent-glow)]'
        : isTerminalPage
        ? 'text-[#6a9e7a] hover:bg-[#00ff41]/5 hover:text-[#b8d4be]'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isTerminalPage
          ? 'border-b border-[#00ff41]/15 bg-[#0c0c0c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0c0c0c]/80'
          : cn(
              'backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/55 bg-background/80',
              scrolled
                ? 'border-b border-border/70 shadow-[0_8px_32px_-12px_oklch(0_0_0/0.35)]'
                : 'border-b border-transparent'
            )
      )}
    >
      {/* Gradient hairline at bottom edge */}
      {!isTerminalPage && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
        />
      )}
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8 xl:max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className={cn(
            'flex items-center gap-2 font-heading text-lg font-bold transition-colors',
            isTerminalPage ? 'text-[#e0ffe0] hover:text-[#00ff41]' : 'text-foreground hover:text-primary'
          )}
          aria-label="Go to home page"
        >
          <Sparkle className={isTerminalPage ? 'text-[#00ff41]' : 'text-primary'} size={20} weight="fill" />
          <span className="hidden sm:inline">AI-Native Dev</span>
        </Link>

        {/* Primary nav */}
        <nav className="flex items-center gap-1" aria-label="Primary">
          <NavLink to="/learn" className={navLinkClass}>
            Learn
          </NavLink>
          <NavLink to="/examples" className={navLinkClass}>
            Examples
          </NavLink>
          <NavLink to="/contribute" className={navLinkClass}>
            Contribute
          </NavLink>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {hasSelectedTrack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearSelectedTrack()
                navigate('/examples')
              }}
              className="hidden h-8 gap-2 text-muted-foreground hover:text-foreground sm:inline-flex"
              aria-label={`Switch project (current: ${selectedTrack.projectName})`}
            >
              <span className="text-lg" aria-hidden>{selectedTrack.icon}</span>
              <span className="hidden text-xs md:inline">{selectedTrack.projectName}</span>
              <Swap size={14} className="opacity-60" />
            </Button>
          )}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              isTerminalPage
                ? 'text-[#6a9e7a] hover:bg-[#00ff41]/5 hover:text-[#b8d4be]'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            aria-label="View source on GitHub"
          >
            <GithubLogo size={18} weight="bold" />
          </a>
          {!isTerminalPage && <ThemeToggle />}
        </div>
      </div>
    </header>
  )
}
