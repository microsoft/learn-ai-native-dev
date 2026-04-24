import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { List, CaretLeft, CaretRight } from '@phosphor-icons/react'
import type { Part } from '@/data/tutorialContent'
import { cn } from '@/lib/utils'

interface NavigationSidebarProps {
  parts: Part[]
  currentPartIndex: number
  totalSteps: number
  currentStepNumber: number
  progressPercent: number
  onPartSelect?: (partId: string) => void
}

export function NavigationSidebar({
  parts,
  currentPartIndex,
  totalSteps,
  currentStepNumber,
  progressPercent,
  onPartSelect
}: NavigationSidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const currentPart = parts[currentPartIndex]
  const currentStepLabel = useMemo(() => {
    if (!currentPart) {
      return 'Start'
    }
    const label = currentPart.number === 0 ? 'Start' : `Part ${currentPart.number}`
    return label
  }, [currentPart])

  useEffect(() => {
    if (!navRef.current || !currentPart) {
      return
    }
    const partButton = navRef.current.querySelector<HTMLButtonElement>(
      `[data-part-id="${currentPart.id}"]`
    )
    if (partButton) {
      partButton.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }, [currentPart?.id])

  const scrollToSection = (id: string | undefined) => {
    if (!id) {
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (isMobile) setOpen(false)
    }
  }

  const NavigationContent = () => (
    <div className="space-y-6">
      <div className="px-4">
        <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Tutorial Navigation
        </h3>
        <p className="text-xs text-muted-foreground">{currentStepLabel}</p>
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Overall progress</span>
          <span>
            {currentStepNumber} / {totalSteps}
          </span>
        </div>
        <div 
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={currentStepNumber}
          aria-valuemax={totalSteps}
          aria-label="Tutorial progress"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-260px)]">
        <nav className="space-y-1 px-2" ref={navRef}>
          {parts.map((part, partIndex) => (
            <div key={part.id} className="space-y-1">
              <button
                onClick={() => {
                  if (onPartSelect) {
                    onPartSelect(part.id)
                    return
                  }
                  scrollToSection(part.steps[0]?.id)
                }}
                data-part-id={part.id}
                className={cn(
                  'flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all hover:bg-muted',
                  partIndex === currentPartIndex && 'bg-primary/10 text-primary'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    partIndex < currentPartIndex
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary text-primary-foreground'
                  )}
                >
                  {partIndex < currentPartIndex ? '✓' : part.number === 0 ? '•' : part.number}
                </span>
                <div className="flex-1">
                  <div className="font-heading font-semibold">{part.title}</div>
                  <div className="text-xs text-muted-foreground">{part.subtitle}</div>
                </div>
              </button>

            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-[72px] z-40 lg:hidden shadow-lg border-border bg-background/95 backdrop-blur-sm hover:bg-muted"
            aria-label="Open navigation menu"
          >
            <List size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-6">
          <NavigationContent />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <>
      {/* Collapsed state - just show toggle button */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="fixed left-4 top-[72px] z-40 hidden lg:flex shadow-lg border-border bg-background/95 backdrop-blur-sm hover:bg-muted"
          aria-label="Open navigation"
        >
          <CaretRight size={20} weight="bold" />
        </Button>
      )}
      
      {/* Expanded sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-14 hidden h-[calc(100vh-56px)] w-80 border-r border-border bg-card p-6 lg:block transition-transform duration-300",
          isCollapsed && "-translate-x-full"
        )}
      >
        {/* Collapse button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
          className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label="Close navigation"
        >
          <CaretLeft size={18} weight="bold" />
        </Button>
        <NavigationContent />
      </aside>
    </>
  )
}
