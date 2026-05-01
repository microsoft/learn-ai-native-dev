# Content Lifecycle

Every learning path and example in AI-Native Dev has a **status** that signals readiness and how it was reviewed. Statuses are visible to readers as badges so they can self-calibrate.

## Statuses

| Status | Badge | Visibility | Meaning |
|---|---|---|---|
| `draft` | gray | Hidden from catalog by default; reachable by direct URL | Work-in-progress. Not advertised to readers. |
| `community` | blue | Listed in **Community** section | Contributed by a community member. Built and merged but not yet curriculum-reviewed. |
| `experimental` | amber | Listed with a "may change" note | Tracking a fast-moving topic where the API/tool surface is unstable. |
| `official` | green | Listed in **Official** section, top of catalog | Maintainer-curated, reviewed by `@reviewer`, follows the full editorial standard. |
| `deprecated` | muted | Hidden by default with a banner on the lesson | Superseded or no longer accurate. Kept reachable for old links. |

## Where status is set

- **Paths:** `status` field in [`src/data/paths.ts`](../src/data/paths.ts) (official) or in `path.json` under `src/content/community/<id>/` (community).
- **Examples:** `status` field on each entry in [`src/data/exampleTracks.ts`](../src/data/exampleTracks.ts).

## Promotion

Promotion is a separate, lightweight PR that flips one field.

### `community` → `official`

Required:

1. `@reviewer` pre-ship check passes (build + accessibility + version currency + content review).
2. At least one maintainer has read it end-to-end.
3. Topic fits the curriculum — no major overlap with existing official paths.
4. Author is credited via `contributedBy` and listed in `CONTRIBUTORS.md`.

The PR changes only the `status` field (and possibly removes `contributedBy` if the path becomes maintainer-owned by mutual agreement).

### `official` → `deprecated`

Required:

1. Issue describing why and what supersedes it.
2. Banner added to the path home page pointing to the replacement.
3. `deprecated` flag flipped.

The content stays reachable for old links — we don't delete history.

## What never changes status

Bug fixes, typo corrections, version bumps, and refresh PRs **must not** change a path's status. If a refactor is so large it requires re-review, that's a signal to land it as a new community path and let it earn promotion.

## Default landing status

| Contribution shape | Default status |
|---|---|
| Add an example | `community` (unless author is a maintainer) |
| Improve content | unchanged |
| Refresh stale content | unchanged |
| New module in existing path | inherits the path's status |
| New path | `community` |

This means **community contributions ship live on merge** without curriculum gatekeeping — readers see the badge and self-calibrate.
