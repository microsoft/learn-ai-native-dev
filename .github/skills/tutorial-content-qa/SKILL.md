---
name: tutorial-content-qa
description: Comprehensive quality assurance for AI-Native development tutorials across all tracks (Foundation, Advanced, Terminal). Use when reviewing content for accuracy, clarity, consistency, and completeness. Use for proofreading, checking errors, auditing content, or running QA checks before publishing.
allowed-tools: Bash(grep:*) Bash(find:*) Read
---

# Tutorial Content QA

Comprehensive quality assurance for **all tracks** — Foundation, Advanced, and Terminal.

## When to Use This Skill

- Before publishing new parts or modules
- After editing existing content
- When reviewing pull requests with content changes
- During periodic content audits
- Before shipping a new track

## Quick QA Check (All Tracks)

```powershell
param(
    [ValidateSet("foundation","advanced","terminal","all")]
    [string]$Track = "all"
)

function Test-Track {
    param([string]$Name, [string]$Path, [string]$StepPattern, [string]$PromptPattern)

    Write-Host "`n=== $Name TRACK ===" -ForegroundColor Cyan
    $files = Get-ChildItem $Path -ErrorAction SilentlyContinue
    if (-not $files) { Write-Host "  No files found at $Path" -ForegroundColor Red; return }

    # Step count
    $steps = (Select-String -Path $Path -Pattern $StepPattern | Measure-Object).Count
    Write-Host "  Steps: $steps"

    # Step IDs — check for duplicates
    $ids = Select-String -Path $Path -Pattern "^## step: (.+)$" | ForEach-Object { if ($_.Line -match "## step: (.+)$") { $matches[1] } }
    $idDupes = $ids | Group-Object | Where-Object { $_.Count -gt 1 }
    if ($idDupes) { Write-Host "  ❌ Duplicate step IDs: $($idDupes.Name -join ', ')" -ForegroundColor Red }
    else { Write-Host "  ✅ No duplicate step IDs" -ForegroundColor Green }

    # Prompt count
    $promptCount = 0
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -Raw
        $promptCount += ([regex]::Matches($content, ":::prompt")).Count
    }
    Write-Host "  Prompts: $promptCount"

    # Unclosed blocks — check :::prompt opens vs ::: closes
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -Raw
        $opens = ([regex]::Matches($content, ":::prompt")).Count
        $diagrams = ([regex]::Matches($content, ":::diagram")).Count
        $collapsibles = ([regex]::Matches($content, ":::collapsible")).Count
        $tabs = ([regex]::Matches($content, ":::tabs")).Count
        $expectedCloses = $opens + $diagrams + $collapsibles + $tabs
        $actualCloses = ([regex]::Matches($content, "(?m)^:::$")).Count
        if ($actualCloses -lt $expectedCloses) {
            Write-Host "  ❌ Unclosed block in $($f.Name): expected $expectedCloses closes, found $actualCloses" -ForegroundColor Red
        }
    }

    # Frontmatter check
    foreach ($f in $files) {
        $lines = Get-Content $f.FullName -First 10
        if ($lines[0] -ne "---") { Write-Host "  ❌ Missing opening --- in $($f.Name)" -ForegroundColor Red; continue }
        $fm = ($lines[1..9] | Where-Object { $_ -eq "---" } | Select-Object -First 1)
        if (-not $fm) { Write-Host "  ❌ Missing closing --- in $($f.Name)" -ForegroundColor Red }
    }

    # Code blocks — check balanced fences
    foreach ($f in $files) {
        $fences = (Select-String -Path $f.FullName -Pattern "^``````" | Measure-Object).Count
        if ($fences % 2 -ne 0) { Write-Host "  ❌ Odd code fences ($fences) in $($f.Name)" -ForegroundColor Red }
    }

    # Terminology
    $bad = Select-String -Path $Path -Pattern "VSCode|Visual Studio Code|\.chatmode\.md" -CaseSensitive -ErrorAction SilentlyContinue
    if ($bad) { $bad | ForEach-Object { Write-Host "  ⚠️ Deprecated term at $($_.Filename):$($_.LineNumber): $($_.Line.Trim())" -ForegroundColor Yellow } }
    else { Write-Host "  ✅ No deprecated terminology" -ForegroundColor Green }
}

# Foundation
if ($Track -eq "all" -or $Track -eq "foundation") {
    Test-Track -Name "Foundation" -Path "src/content/tutorial/part-*.md" `
        -StepPattern "### title: Step \d+:" -PromptPattern ":::prompt"
}

# Advanced
if ($Track -eq "all" -or $Track -eq "advanced") {
    Test-Track -Name "Advanced" -Path "src/content/advanced/module-*.md" `
        -StepPattern "### title: Step [A-E]\d+:" -PromptPattern ":::prompt"
}

# Terminal
if ($Track -eq "all" -or $Track -eq "terminal") {
    Test-Track -Name "Terminal" -Path "src/content/terminal/module-*.md" `
        -StepPattern "### title: Step [F-H]\d+:" -PromptPattern ":::prompt"

    # Terminal-specific: check meta-prompt === separators are inside prompt blocks
    Write-Host "  --- Terminal-specific checks ---"
    foreach ($f in Get-ChildItem "src/content/terminal/module-*.md") {
        $content = Get-Content $f.FullName -Raw
        $metaCount = ([regex]::Matches($content, "\n===\n")).Count
        if ($metaCount -gt 0) { Write-Host "    $($f.Name): $metaCount meta-prompt separators" }
    }
}

# Diagram wiring (all tracks)
Write-Host "`n=== DIAGRAM AUDIT ===" -ForegroundColor Cyan
$diagramRefs = Select-String -Path "src/content/**/*.md" -Pattern "^:::diagram\s+(\S+)" | ForEach-Object { if ($_.Line -match ":::diagram\s+(\S+)") { $matches[1] } } | Sort-Object -Unique
$stepCard = Get-Content "src/components/StepCard.tsx" -Raw
$diagramRefs | ForEach-Object {
    if ($stepCard -match "case '$_':") { Write-Host "  ✅ :::diagram $_ → registered" -ForegroundColor Green }
    else { Write-Host "  ❌ :::diagram $_ → MISSING CASE in StepCard.tsx" -ForegroundColor Red }
}

Write-Host "`n=== QA COMPLETE ===" -ForegroundColor Cyan
```

## Track-Specific Details

### Foundation Track

- Steps: numeric (`Step 1:`, `Step 2:`, ..., `Step 48:`)
- Prompts: numeric (`number: 1` through `number: 34`)
- Template variables: `{{projectName}}`, etc. (resolved at render time)
- Canonical counts in `.github/reference/step-map.md` and `.github/reference/prompt-map.md`

### Advanced Track

- Steps: letter-prefixed (`Step A1:`, `Step B3:`, `Step C7:`)
- Prompts: letter-prefixed (`number: A1`, `number: B2`)
- Multiple prompts per step
- No template variables

### Terminal Track

- Steps: letter-prefixed (`Step F1:`, `Step G0:`, `Step H3:`)
- Prompts: letter-prefixed (`number: F1`, `number: G4`)
- Multiple prompts per step
- Meta-prompts: `===` separator inside prompt blocks (content before = copyable prompt, after = instructional context)
- No template variables

## Individual Checks

### Frontmatter

Every content file must have:

```yaml
---
id: module-f        # or part-N
number: 1
title: Module Title
subtitle: X minutes — Description
---
```

### Step Headers

```markdown
## step: step-id-here
### title: Step F1: Human-Readable Title
```

### Prompt Blocks

```markdown
:::prompt
number: F3
title: Action title
---
Prompt content
:::
```

### Template Variables (Foundation Only)

See `.github/reference/template-variables.md` for the canonical list.

```powershell
Select-String -Path "src/content/tutorial/*.md" -Pattern "\{\{[^}]+\}\}" -AllMatches | ForEach-Object { $_.Matches.Value } | Sort-Object -Unique
```

### Terminology

| Term | Correct | Incorrect |
|------|---------|-----------|
| GitHub Copilot | "GitHub Copilot" (first use) | "Copilot" alone |
| Agent mode | "Agent mode" | "agent mode", "Agent Mode" |
| VS Code | "VS Code" | "VSCode", "Visual Studio Code" |

### Code Block Balance

```powershell
# Check all tracks at once
Get-ChildItem "src/content" -Recurse -Filter "*.md" | ForEach-Object {
    $fences = (Select-String -Path $_.FullName -Pattern "^``````" | Measure-Object).Count
    if ($fences % 2 -ne 0) { Write-Host "❌ $($_.Name): $fences fences (unclosed)" -ForegroundColor Red }
}
```

## Pre-Ship Checklist

Complete these checks before publishing:

- [ ] Run Quick QA Check (above) — all tracks pass
- [ ] **Version check (use `version-checker` skill)** — CLI commands and tool references are current
- [ ] Accessibility check (use `accessibility-checker` skill) — content is beginner-friendly
- [ ] Build succeeds: `npm run build`

### Version Currency (Critical for Terminal Track)

The Terminal track (Modules F-H) references rapidly-evolving CLI tools. **Before shipping:**

1. Verify Claude Code install command: `npm install -g @anthropic-ai/claude-code`
2. Verify GitHub Copilot CLI: `gh extension install github/gh-copilot`
3. Check official docs for breaking changes

See the **`version-checker`** skill for the full verification process.
