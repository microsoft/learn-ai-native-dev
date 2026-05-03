// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Keyboard } from '@phosphor-icons/react'

interface Shortcut {
  keys: string[]
  description: string
}

const SHORTCUTS: { group: string; items: Shortcut[] }[] = [
  {
    group: 'Navigation',
    items: [
      { keys: ['⌘', 'K'], description: 'Open command palette' },
      { keys: ['/'], description: 'Open command palette (quick)' },
      { keys: ['?'], description: 'Show this shortcuts overlay' },
      { keys: ['Esc'], description: 'Close any overlay' },
    ],
  },
  {
    group: 'Inside a lesson',
    items: [
      { keys: ['j'], description: 'Next step' },
      { keys: ['k'], description: 'Previous step' },
      { keys: ['g', 'h'], description: 'Go to lesson home' },
    ],
  },
  {
    group: 'Reading',
    items: [
      { keys: ['c'], description: 'Copy current prompt' },
      { keys: ['t'], description: 'Toggle theme' },
    ],
  },
]

export function ShortcutsOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '?') return
      // Don't trigger when typing in inputs
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      setOpen((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border/70 bg-popover/95 shadow-[var(--elev-3)] backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
            <Keyboard size={16} className="text-muted-foreground" />
            <Dialog.Title className="font-heading text-sm font-semibold tracking-tight">
              Keyboard shortcuts
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Available keyboard shortcuts
            </Dialog.Description>
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-2">
            {SHORTCUTS.map((g) => (
              <div key={g.group}>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {g.group}
                </div>
                <ul className="space-y-1.5">
                  {g.items.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="text-foreground">{s.description}</span>
                      <span className="flex items-center gap-1">
                        {s.keys.map((k, idx) => (
                          <kbd
                            key={idx}
                            className="numeric rounded border border-border/70 bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {k}
                          </kbd>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/60 bg-muted/20 px-5 py-2 text-[10px] text-muted-foreground">
            Press{' '}
            <kbd className="numeric rounded border border-border/70 bg-background/50 px-1.5 py-0.5 font-medium">
              ?
            </kbd>{' '}
            anywhere to toggle this overlay.
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
