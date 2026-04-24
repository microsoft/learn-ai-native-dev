# Prompt Map — Single Source of Truth

All skills that need prompt numbers or counts should reference this file rather than hardcoding values.

## Foundation Track

**Total Prompts: 34** (numbered 1–34)

| Part | File | Prompt Range | Count |
|------|------|-------------|-------|
| 0 | `part-0-getting-started.md` | — | 0 |
| 1 | `part-1-build-something-that-works.md` | 1–4 | 4 |
| 2 | `part-2-add-interactive-features.md` | 5–8 | 4 |
| 3 | `part-3-teach-ai-your-rules.md` | 9–11 | 3 |
| 4 | `part-4-path-specific-instructions.md` | 12–16 | 5 |
| 5 | `part-5-custom-agents.md` | 17–23 | 7 |
| 6 | `part-6-agent-skills.md` | 24–29 | 6 |
| 7 | `part-7-putting-it-all-together.md` | 30–34 | 5 |
| 8 | `part-8-troubleshooting-reference.md` | — | 0 |

**Next available prompt number:** 35

## Advanced Track

Advanced modules use letter-prefixed prompt numbers (e.g., A1, B3, C2). Prompts are numbered per-module and each step can have multiple prompts.

## Terminal Track

Terminal modules use letter-prefixed prompt numbers (e.g., F1, G4, H2). Steps can have multiple prompts, and some prompts include a **meta-prompt** section separated by `===`.

## Prompt Block Syntax

```markdown
:::prompt
number: N
title: Short descriptive title
---
Prompt content here. Use {{templateVar}} for track-specific placeholders.
:::
```

- `number:` Sequential within the track
- `title:` Brief, action-oriented
- Body comes after the `---` separator
- Close with `:::` on its own line

## Validation Command

```powershell
# Count total prompts
Get-ChildItem src/content/tutorial/part-*.md | ForEach-Object {
  $file = $_.Name
  $content = Get-Content $_.FullName -Raw
  $m = [regex]::Matches($content, ":::prompt\s*\r?\nnumber:\s*(\d+)")
  $nums = $m | ForEach-Object { $_.Groups[1].Value }
  if ($nums.Count -gt 0) { Write-Host "$file : prompts $($nums -join ', ')" }
}
```
