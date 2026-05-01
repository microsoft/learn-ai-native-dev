// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Info } from '@phosphor-icons/react'
import type { ContentStatus } from '@/data/paths'

interface PathStatusBannerProps {
  status: ContentStatus
  contributedBy?: string
}

/**
 * Renders a slim banner above lesson content for non-official paths.
 * Returns null for official paths so it has zero impact on the canonical experience.
 */
export function PathStatusBanner({ status, contributedBy }: PathStatusBannerProps) {
  if (status === 'official') return null

  const messages: Record<Exclude<ContentStatus, 'official'>, string> = {
    community: contributedBy
      ? `Community contribution by ${contributedBy} — not yet promoted to Official.`
      : 'Community contribution — not yet promoted to Official.',
    experimental: 'Experimental content — interfaces and recommendations may change.',
    draft: 'Draft content — work in progress.',
    deprecated: 'This content is deprecated and may be removed in a future update.',
  }

  return (
    <div
      role="status"
      className="mb-6 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 px-4 py-2 text-sm text-amber-800 dark:text-amber-300"
    >
      <Info size={16} weight="fill" className="mt-0.5 shrink-0" />
      <span>{messages[status]}</span>
    </div>
  )
}
