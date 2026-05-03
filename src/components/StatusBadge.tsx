// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ContentStatus } from '@/data/paths'

const STATUS_STYLES: Record<ContentStatus, { label: string; className: string }> = {
  official: {
    label: 'Official',
    className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  },
  community: {
    label: 'Community',
    className: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  },
  experimental: {
    label: 'Experimental',
    className: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  },
  draft: {
    label: 'Draft',
    className: 'border-neutral-5 bg-neutral-3 text-muted-foreground',
  },
  deprecated: {
    label: 'Deprecated',
    className: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  },
}

interface StatusBadgeProps {
  status: ContentStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status]
  return (
    <Badge variant="outline" className={cn(style.className, className)}>
      {style.label}
    </Badge>
  )
}
