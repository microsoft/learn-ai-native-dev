import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useTrack } from '@/hooks/use-track'
import { Sparkle, Swap, Rocket, Terminal } from '@phosphor-icons/react'

export function SiteHeader() {
  const { selectedTrack, hasSelectedTrack, clearSelectedTrack } = useTrack()
  const navigate = useNavigate()
  const location = useLocation()

  const isTrackSelectorPage = location.pathname === '/select-track'
  const isAdvancedPage = location.pathname.startsWith('/advanced')
  const isTerminalPage = location.pathname.startsWith('/terminal')

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur ${
      isTerminalPage
        ? 'border-[#00ff41]/15 bg-[#0c0c0c]/95 supports-[backdrop-filter]:bg-[#0c0c0c]/80'
        : 'border-border bg-background/95 supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 lg:px-8 xl:max-w-6xl 2xl:max-w-7xl">
        {/* Logo / Home Link */}
        <Link 
          to="/" 
          className={`flex items-center gap-2 font-heading text-lg font-bold transition-colors ${
            isTerminalPage
              ? 'text-[#e0ffe0] hover:text-[#00ff41]'
              : 'text-foreground hover:text-primary'
          }`}
          aria-label="Go to home page"
        >
          <Sparkle className={isTerminalPage ? 'text-[#00ff41]' : 'text-primary'} size={20} weight="fill" />
          <span className="hidden sm:inline">AI Native Dev</span>
        </Link>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Advanced Track Link */}
          <Link
            to="/advanced"
            className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors ${
              isAdvancedPage 
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                : isTerminalPage
                  ? 'text-[#6a9e7a] hover:bg-[#00ff41]/5 hover:text-[#b8d4be]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Rocket size={14} weight={isAdvancedPage ? 'fill' : 'regular'} />
            <span className="hidden sm:inline">Advanced</span>
          </Link>

          {/* Terminal Track Link */}
          <Link
            to="/terminal"
            className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors ${
              isTerminalPage
                ? 'bg-[#00ff41]/10 text-[#00ff41]'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Terminal size={14} weight={isTerminalPage ? 'fill' : 'regular'} />
            <span className="hidden sm:inline">Terminal</span>
          </Link>

          {/* Current Track Badge (only show when track selected and not on selector page) */}
          {hasSelectedTrack && !isTrackSelectorPage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearSelectedTrack()
                navigate('/select-track')
              }}
              className="h-8 gap-2 text-muted-foreground hover:text-foreground"
            >
              <span className="text-lg">{selectedTrack.icon}</span>
              <span className="hidden text-xs sm:inline">{selectedTrack.projectName}</span>
              <Swap size={14} className="opacity-60" />
            </Button>
          )}

          {!isTerminalPage && <ThemeToggle />}
        </div>
      </div>
    </header>
  )
}
