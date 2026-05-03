# Component Contracts

Shared UI components are the **rendering substrate** for tutorial content. Their
contracts are part of the website's design spec.

> Implementation rules (TypeScript, Tailwind, named exports, `@/` alias, no
> inline styles) live in
> [`react-components.instructions.md`](../.github/instructions/react-components.instructions.md).
> This file describes **what** each component must do, not how it is coded.

## Authoring substrate

| Component | File | Responsibility |
|---|---|---|
| `StepCard` | [`src/components/StepCard.tsx`](../src/components/StepCard.tsx) | Parses a markdown step, renders prose + custom blocks, owns step numbering and progress markers. |
| `PromptBox` | [`src/components/PromptBox.tsx`](../src/components/PromptBox.tsx) | Renders a `:::prompt` block: title, body, copy-to-clipboard, visual feedback. |
| `CodeBlock` | [`src/components/CodeBlock.tsx`](../src/components/CodeBlock.tsx) | Shiki-highlighted code with horizontal scroll on mobile. |
| `Diagram*` | [`src/components/diagrams/`](../src/components/diagrams) | One file per diagram; lazy-loaded via the barrel `index.ts`. |

When parsing or numbering rules change, update **both** `StepCard` and
[`content-architecture.md`](content-architecture.md) §5.

## Navigation substrate

| Component | File | Responsibility |
|---|---|---|
| `SiteHeader` / `SiteFooter` | `src/components/SiteHeader.tsx`, `SiteFooter.tsx` | Global chrome; consistent across pages. |
| `NavigationSidebar` | `src/components/NavigationSidebar.tsx` | Module/step list with progress; collapses to a hamburger drawer below 768 px. |
| `TrackSelector` | `src/components/TrackSelector.tsx` | Foundation example-track switcher. |
| `CommandPalette` / `ShortcutsOverlay` | matching files | Power-user navigation; must be keyboard-only friendly. |
| `PathStatusBanner` | `src/components/PathStatusBanner.tsx` | Surfaces lifecycle status (draft/community/experimental/deprecated). |

## Cards & badges

| Component | Used for |
|---|---|
| `PathCard` | Catalog cells; reflects status, level, time. |
| `ProjectCard` | One per project shape on `/projects`. |
| `StatusBadge` | Color-coded status pill; the only component that renders status. |

## shadcn/ui primitives

Files under [`src/components/ui/`](../src/components/ui) are vendored from
shadcn/ui. **Do not edit them as a side effect of a feature change** —
`protect-ui-primitives.json` enforces this.

If a primitive needs upgrading:

1. Open a dedicated PR.
2. Re-run shadcn's add command.
3. Diff manually; confirm no consumer breakage.

## Diagrams

Adding a diagram is a four-step contract:

1. New component in `src/components/diagrams/<Name>Diagram.tsx`.
2. Export from `src/components/diagrams/index.ts`.
3. Register the lookup name in `StepCard`'s diagram resolver.
4. Reference it from markdown: `<Diagram name="…" />`.

The [`diagram-scaffolder` skill](../.github/skills/diagram-scaffolder/SKILL.md)
performs all four. The Docs Auditor flags any diagram present in the barrel
that is unreferenced (or vice versa).

## Hooks

| Hook | Purpose |
|---|---|
| `useAnimateIn` | Scroll-triggered fade/slide; respects `prefers-reduced-motion`. |
| `useTheme` | Dark/light/system; persists to `localStorage`. |
| `useTrack` | Foundation example-track context provider. |

New cross-cutting hooks belong in [`src/hooks/`](../src/hooks). Page-local
state stays in the page.

## Component-change checklist

Before merging a component change:

- [ ] No new primitive added under `ui/` outside of a shadcn upgrade PR.
- [ ] Keyboard interaction tested (`Tab`, `Shift+Tab`, `Enter`, `Esc`).
- [ ] Visible focus ring in both themes.
- [ ] Mobile layout verified at ≤ 375 px and 768 px breakpoints.
- [ ] No new color literal — Tailwind token only.
- [ ] If markdown parsing changed, [`content-architecture.md`](content-architecture.md) updated.
- [ ] If a diagram added, [`tracks/*.md`](tracks) note updated where it appears.
