// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Package, PencilSimple, BookOpen, GithubLogo, Robot, Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

type Shape = 'add-example' | 'fix-content' | 'refresh-content' | 'propose-topic'

interface ShapeDef {
  id: Shape
  title: string
  emoji: string
  effort: string
  summary: string
  agents: string[]
  issueTemplate: string
  prompt: string
  steps: string[]
  fields?: string[]
}

const SHAPES: Record<Shape, ShapeDef> = {
  'add-example': {
    id: 'add-example',
    title: 'Add an example project',
    emoji: '📦',
    effort: '~5 min · data only',
    summary:
      'Plug a new project example into the existing Foundation lessons. Pure data — no React or markdown changes needed.',
    agents: ['@track-generator'],
    issueTemplate: 'add-example.yml',
    prompt:
      '/add-example\n\nName: My Cool App\nAudience: developer\nIcon: 🛠\nWhat it shows green / yellow / red:\n  green: ...\n  yellow: ...\n  red: ...',
    steps: [
      'Open the "Add an example" issue (link below) and fill in the form.',
      'In your editor, run /add-example or @track-generator and paste the issue details.',
      'The agent appends a new entry to src/data/exampleTracks.ts and runs the build.',
      'Open a PR — a maintainer will verify and merge.',
    ],
    fields: ['name', 'audience', 'icon', 'industry', 'green/yellow/red meaning', 'data items'],
  },
  'fix-content': {
    id: 'fix-content',
    title: 'Fix or improve existing content',
    emoji: '✏️',
    effort: '~5–30 min · scoped edit',
    summary:
      'Typos, clarifications, missing context, version updates, or new diagrams. Surgical edits to existing files.',
    agents: ['@editor'],
    issueTemplate: 'improve-content.yml',
    prompt:
      '/fix-content\n\nFile: src/content/tutorial/part-3-teach-ai-your-rules.md\nIssue: <describe what is wrong>\nSuggested fix: <optional>',
    steps: [
      'Open the "Improve content" issue (link below) with file path + issue description.',
      'Run /fix-content or @editor with the same details in your editor.',
      'Agent edits the file, runs the build, and prepares the commit.',
      'Open a PR — maintainer verifies the change is faithful and on-brand.',
    ],
  },
  'refresh-content': {
    id: 'refresh-content',
    title: 'Report stale content',
    emoji: '🔄',
    effort: 'Triage only — agents do the rest',
    summary:
      'You spotted an outdated tool version, deprecated API, or broken link. Report it; @content-health and @researcher will refresh it.',
    agents: ['@content-health', '@researcher'],
    issueTemplate: 'report-stale-content.yml',
    prompt:
      '/refresh-content\n\nFile or URL: <where the staleness lives>\nWhat is outdated: <describe>\nEvidence: <release notes, migration guide, etc.>',
    steps: [
      'Open the "Report stale content" issue with the file/URL and what is outdated.',
      'Optionally run /refresh-content or @content-health to audit it yourself.',
      '@researcher validates and proposes the new wording; @editor applies it.',
      'PR opened with the fix and links to evidence.',
    ],
  },
  'propose-topic': {
    id: 'propose-topic',
    title: 'Propose a new topic',
    emoji: '📚',
    effort: '~1–4 hrs · new lesson or path',
    summary:
      'A new module in an existing path, or a brand-new community path on a fresh subject. Start with a proposal so we can align on scope first.',
    agents: ['@curriculum-designer', '@orchestrator'],
    issueTemplate: 'propose-topic.yml',
    prompt:
      '/propose-topic\n\nKind: (new module | new path)\nTarget path: <foundation | agentic | terminal | new>\nTopic: <one sentence>\nLearning objectives: <bullets>\nAudience: <beginner | intermediate | advanced>',
    steps: [
      'Open the "Propose a topic" issue first — agents help shape it in the thread.',
      '@curriculum-designer drafts learning objectives and structure.',
      'Once aligned, run /propose-topic or @orchestrator to scaffold files.',
      'Community paths land as status: community and can ship right away.',
    ],
  },
}

function ShapeCard({ shape }: { shape: ShapeDef }) {
  return (
    <Link to={`/contribute/${shape.id}`} className="group block">
      <Card className="h-full p-6 transition-all hover:border-primary/50 hover:shadow-md">
        <div className="flex items-start justify-between">
          <span className="text-3xl" aria-hidden>{shape.emoji}</span>
          <ArrowRight
            size={18}
            weight="bold"
            className="mt-1 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>
        <h3 className="mt-4 font-heading text-lg font-semibold group-hover:text-primary">
          {shape.title}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{shape.effort}</p>
        <p className="mt-3 text-sm text-muted-foreground">{shape.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {shape.agents.map((a) => (
            <Badge key={a} variant="secondary" className="font-mono text-xs">
              {a}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  )
}

export function ContributeHub() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-10 lg:py-14 xl:max-w-6xl">
        <header className="mb-10 text-center">
          <Badge variant="outline" className="mb-4">
            <GithubLogo size={12} className="mr-1.5" />
            Open Source
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight lg:text-4xl">
            Contribute to AI-Native Dev
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            This tutorial is community-driven. Whether you have 5 minutes or 5 hours,
            our agents do most of the heavy lifting — pick the shape that fits.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <ShapeCard shape={SHAPES['add-example']} />
          <ShapeCard shape={SHAPES['fix-content']} />
          <ShapeCard shape={SHAPES['refresh-content']} />
          <ShapeCard shape={SHAPES['propose-topic']} />
        </div>

        <section className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="font-heading text-base font-semibold">How a contribution flows</h2>
          <ol className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-4">
            <li className="rounded-md border border-border bg-background p-3">
              <span className="font-mono text-xs text-muted-foreground">1.</span>{' '}
              <strong className="text-foreground">Open issue</strong>
              <p className="mt-1">A form template guides you through the questions.</p>
            </li>
            <li className="rounded-md border border-border bg-background p-3">
              <span className="font-mono text-xs text-muted-foreground">2.</span>{' '}
              <strong className="text-foreground">Run an agent</strong>
              <p className="mt-1">A one-line prompt scaffolds files for you.</p>
            </li>
            <li className="rounded-md border border-border bg-background p-3">
              <span className="font-mono text-xs text-muted-foreground">3.</span>{' '}
              <strong className="text-foreground">Open PR</strong>
              <p className="mt-1">CI runs build + lint; @reviewer suggests refinements.</p>
            </li>
            <li className="rounded-md border border-border bg-background p-3">
              <span className="font-mono text-xs text-muted-foreground">4.</span>{' '}
              <strong className="text-foreground">Ship</strong>
              <p className="mt-1">Maintainer merges; community paths/examples ship live.</p>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}

export function ContributeShapePage() {
  const { shape } = useParams<{ shape: Shape }>()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  if (!shape || !(shape in SHAPES)) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Unknown contribution shape.</p>
        <Button className="mt-4" onClick={() => navigate('/contribute')}>
          Back to Contribute
        </Button>
      </div>
    )
  }

  const def = SHAPES[shape]
  const issueUrl = `https://github.com/microsoft/learn-ai-native-dev/issues/new?template=${def.issueTemplate}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(def.prompt)
    setCopied(true)
    toast.success('Prompt copied to clipboard')
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-10 lg:py-14">
        <Button variant="ghost" size="sm" onClick={() => navigate('/contribute')} className="mb-4">
          ← All contribution paths
        </Button>

        <header className="mb-8">
          <span className="text-4xl" aria-hidden>{def.emoji}</span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">{def.title}</h1>
          <p className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">{def.effort}</p>
          <p className="mt-3 text-base text-muted-foreground">{def.summary}</p>
        </header>

        {/* Step list */}
        <section className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-heading text-base font-semibold">What happens</h2>
          <ol className="space-y-3 text-sm">
            {def.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-mono font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Required fields */}
        {def.fields && def.fields.length > 0 && (
          <section className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-3 font-heading text-base font-semibold">What you'll need</h2>
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {def.fields.map((f) => (
                <li key={f} className="flex items-center gap-2 text-muted-foreground">
                  <Check size={14} className="text-primary" weight="bold" />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Agent prompt */}
        <section className="mb-8 rounded-lg border border-border bg-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold">Copy this prompt</h2>
            <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-md border border-border bg-muted/50 p-4 text-xs leading-relaxed">
            <code>{def.prompt}</code>
          </pre>
          <p className="mt-2 text-xs text-muted-foreground">
            Paste this into Copilot Chat in your editor. Powered by{' '}
            {def.agents.map((a) => (
              <span key={a} className="font-mono">{a}</span>
            ))}.
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="gap-2">
            <a href={issueUrl} target="_blank" rel="noopener noreferrer">
              <BookOpen size={16} weight="bold" />
              Open issue template
            </a>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a
              href="https://github.com/microsoft/learn-ai-native-dev/blob/main/.github/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Robot size={16} />
              Read the full contributor guide
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Re-exports so App.tsx can lazy-import each separately if desired.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _icons = { Package, PencilSimple, BookOpen }
