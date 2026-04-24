# Step Map — Single Source of Truth

All skills that need step ranges or counts should reference this file rather than hardcoding values.

## Foundation Track

**Total Numbered Steps: 48** (Steps 1–48, sequential, no gaps)

| Part | File | Step Range | Count |
|------|------|-----------|-------|
| 0 | `part-0-getting-started.md` | None | 0 |
| 1 | `part-1-build-something-that-works.md` | 1–7 | 7 |
| 2 | `part-2-add-interactive-features.md` | 8–11 | 4 |
| 3 | `part-3-teach-ai-your-rules.md` | 12–15 | 4 |
| 4 | `part-4-path-specific-instructions.md` | 16–21 | 6 |
| 5 | `part-5-custom-agents.md` | 22–29 | 8 |
| 6 | `part-6-agent-skills.md` | 30–37 | 8 |
| 7 | `part-7-putting-it-all-together.md` | 38–43 | 6 |
| 8 | `part-8-troubleshooting-reference.md` | 44–48 | 5 |

### Unnumbered Steps

Parts 0, 2, 3, 4, 5, 6, and 7 also contain intro/checkpoint/milestone steps with no number (e.g., "Why This Part Matters", "✅ Checkpoint", "🎉 Milestone Complete").

### Step Format

```markdown
## step: step-id-here
### title: Step N: Human-Readable Title
```

- Step IDs: kebab-case, unique across the entire Foundation track
- Step numbers: sequential across all Parts

## Advanced Track

| Module | File | Step Prefix | Steps |
|--------|------|-------------|-------|
| A | `module-a-mcp-servers.md` | A | A1–A11 |
| B | `module-b-coding-agent.md` | B | B1–B9 |
| C | `module-c-agent-orchestration.md` | C | C1–C10 |
| D | `module-d-ai-testing.md` | D | D1–D8 |
| E | `module-e-capstone.md` | E | (check file) |

## Terminal Track

| Module | File | Step Prefix | Steps |
|--------|------|-------------|-------|
| F | `module-f-terminal-ai.md` | F | F1–F7 |
| G | `module-g-build-agent.md` | G | G0–G11 |
| H | `module-h-pipelines.md` | H | H0–H6 |

## Validation Command

```powershell
# Verify Foundation step count
$count = (Select-String -Path "src/content/tutorial/*.md" -Pattern "### title: Step \d+" | Measure-Object).Count
Write-Host "Foundation steps: $count (expected: 48)"

# List all step numbers in order
Select-String -Path "src/content/tutorial/*.md" -Pattern "### title: Step (\d+):" | ForEach-Object { if ($_.Line -match "Step (\d+):") { $matches[1] } } | Sort-Object { [int]$_ }
```
