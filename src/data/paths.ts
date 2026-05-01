// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Single source of truth for learning paths in the AI-Native tutorial.
 * A "path" is a coherent learning track (e.g., Foundation, Agentic, Terminal).
 * Paths can be official (curated by maintainers) or community (contributed).
 */

export type ContentStatus = 'draft' | 'community' | 'experimental' | 'official' | 'deprecated'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export interface LearningPath {
  /** URL-safe id used in routes: /learn/:pathId */
  id: string
  /** Display name */
  title: string
  /** Short one-line tagline */
  tagline: string
  /** Difficulty/audience level */
  level: Level
  /** Lifecycle status — see CONTENT_LIFECYCLE.md */
  status: ContentStatus
  /** Whether this path uses the example-track system (Foundation does; Agentic/Terminal do not) */
  supportsExamples: boolean
  /** Approximate time to complete in minutes */
  estimatedMinutes: number
  /** GitHub handle for community paths */
  contributedBy?: string
  /** Topic tags for catalog filtering */
  topics: string[]
  /** Phosphor icon name (string identifier — resolved in components) */
  iconName: 'sparkle' | 'rocket' | 'terminal' | 'compass' | 'book' | 'flask'
  /**
   * Internal hint for routing legacy content. Generic community paths use 'community'.
   * Used by App.tsx to redirect /learn/:id to the right legacy page until full unification.
   */
  legacyRoute?: 'foundation' | 'agentic' | 'terminal'
}

/**
 * Official paths shipped with the tutorial.
 * To add a community path, prefer the path.json manifest under
 * src/content/community/<your-path>/ — see CONTRIBUTING.md.
 */
export const officialPaths: LearningPath[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    tagline: 'Build something that works — your first AI-Native project, end to end.',
    level: 'beginner',
    status: 'official',
    supportsExamples: true,
    estimatedMinutes: 120,
    topics: ['prompting', 'requirements', 'tasks', 'agents', 'skills'],
    iconName: 'sparkle',
    legacyRoute: 'foundation',
  },
  {
    id: 'agentic',
    title: 'Agentic Workflows',
    tagline: 'MCP servers, custom agents, orchestration, AI testing, and a capstone.',
    level: 'advanced',
    status: 'official',
    supportsExamples: false,
    estimatedMinutes: 180,
    topics: ['mcp', 'agents', 'orchestration', 'testing'],
    iconName: 'rocket',
    legacyRoute: 'agentic',
  },
  {
    id: 'terminal',
    title: 'Terminal & CLI',
    tagline: 'Drive AI from the terminal — Copilot CLI, Claude Code, build pipelines.',
    level: 'advanced',
    status: 'official',
    supportsExamples: false,
    estimatedMinutes: 120,
    topics: ['cli', 'terminal', 'pipelines', 'automation'],
    iconName: 'terminal',
    legacyRoute: 'terminal',
  },
]

/**
 * All paths (official + community). Community paths are loaded lazily from
 * `src/content/community/<id>/path.json` by communityLoader.ts.
 */
let cachedAllPaths: LearningPath[] | null = null

export const getAllPaths = async (): Promise<LearningPath[]> => {
  if (cachedAllPaths) return cachedAllPaths
  const { loadCommunityPaths } = await import('./communityLoader')
  const community = await loadCommunityPaths()
  cachedAllPaths = [...officialPaths, ...community]
  return cachedAllPaths
}

export const getPathById = (paths: LearningPath[], id: string): LearningPath | undefined =>
  paths.find((p) => p.id === id)

export const getPathByLegacyRoute = (
  legacy: LearningPath['legacyRoute']
): LearningPath | undefined => officialPaths.find((p) => p.legacyRoute === legacy)
