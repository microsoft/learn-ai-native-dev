// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { LearningPath } from './paths'

/**
 * Loads community-contributed paths from src/content/community/*\/path.json.
 *
 * Each community path lives in its own folder under src/content/community/ and
 * must include a path.json manifest matching the LearningPath interface
 * (minus the cached fields). Markdown modules in the same folder are picked up
 * by the lesson loader on demand.
 *
 * Returning an empty array is the expected baseline — community paths are
 * additive and the catalog renders fine without them.
 */
const manifestModules = import.meta.glob<unknown>('../content/community/*/path.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

function isValidManifest(value: unknown): value is LearningPath {
  if (!value || typeof value !== 'object') return false
  const m = value as Record<string, unknown>
  return (
    typeof m.id === 'string' &&
    typeof m.title === 'string' &&
    typeof m.tagline === 'string' &&
    typeof m.level === 'string' &&
    typeof m.status === 'string' &&
    Array.isArray(m.topics)
  )
}

export const loadCommunityPaths = async (): Promise<LearningPath[]> => {
  const paths: LearningPath[] = []
  for (const manifest of Object.values(manifestModules)) {
    if (isValidManifest(manifest)) {
      const m = manifest as Partial<LearningPath> & LearningPath
      paths.push({
        ...m,
        // Apply safe baselines for fields the manifest may omit.
        supportsExamples: m.supportsExamples ?? false,
        estimatedMinutes: m.estimatedMinutes ?? 60,
        iconName: m.iconName ?? 'compass',
        status: m.status ?? 'community',
      })
    } else {
      // Surface bad manifests early during dev — never silently drop.
      console.warn('[communityLoader] Skipping invalid path.json manifest:', manifest)
    }
  }
  return paths
}
