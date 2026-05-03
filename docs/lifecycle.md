# Content Lifecycle

This file is a **summary**. The authoritative policy is
[`.github/CONTENT_LIFECYCLE.md`](../.github/CONTENT_LIFECYCLE.md). When the two
disagree, that file wins — and the Docs Auditor will flag the drift.

## Statuses (at a glance)

| Status | Visibility | Who applies it |
|---|---|---|
| `draft` | Hidden by default; reachable by URL | Authors during work-in-progress. |
| `community` | Listed under **Community** in the catalog | Default for community paths on merge. |
| `experimental` | Listed with a "may change" note | Maintainers, when the underlying tool surface is unstable. |
| `official` | Top of the catalog under **Official** | Maintainers, after `@reviewer` pre-ship. |
| `deprecated` | Hidden from catalog; banner on lesson | Maintainers, with a replacement linked. |

## Where status lives

- **Paths:** `status` field in
  [`src/data/paths.ts`](../src/data/paths.ts) (official) or in
  `src/content/community/<id>/path.json` (community).
- **Examples:** `status` field in
  [`src/data/exampleTracks.ts`](../src/data/exampleTracks.ts).

## Default landing status

| Contribution shape | Default status |
|---|---|
| Add an example | `community` (unless author is a maintainer). |
| Improve content | unchanged. |
| Refresh stale content | unchanged. |
| New module in existing path | inherits the path's status. |
| New path | `community`. |

## Promotion

Promotion is **a separate, lightweight PR that flips one field** — never
combine it with content edits. The [`scripts/promotion-readiness.mjs`](../scripts/promotion-readiness.mjs)
helper runs the same checks `@reviewer` runs and prepares the diff:

```
npm run promotion-readiness -- --path foundation         # report only
npm run promotion-readiness -- --path foundation --apply # write the flip
```

**`community` → `official`** requires:
1. `@reviewer` pre-ship check passes (build + a11y + version currency + content review).
2. At least one maintainer has read it end-to-end.
3. Topic fits the curriculum (no major overlap with an existing official path).
4. Author credited via `contributedBy` and listed in
   [`CONTRIBUTORS.md`](../CONTRIBUTORS.md).

The script enforces 1, 3, and 4 deterministically; criterion 2 is a manual
maintainer check the script reminds you about.

**`official` → `deprecated`** requires:
1. Issue describing why and what supersedes it.
2. Banner on the path home page pointing to the replacement.
3. `deprecated` flag flipped. Content is **kept reachable** — old links must
   not 404.

## What never changes status

Bug fixes, typo corrections, version bumps, and refresh PRs **must not** alter
a path's status. If a refactor is large enough to require re-review, ship it as
a new community path and let it earn promotion.
