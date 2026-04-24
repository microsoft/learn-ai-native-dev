---
name: content-rendering-debugger
description: Debug and fix tutorial content that doesn't render correctly in the browser. Use when markdown isn't rendering, template variables show as literal text, diagrams are missing, prompt boxes don't appear, collapsible sections are broken, or tabs aren't working. Use for questions like "why isn't this rendering?", "template variable not replaced", "diagram not showing", "prompt missing", "content looks wrong".
---

# Content Rendering Debugger

This skill diagnoses and fixes content rendering issues in the AI-Native tutorial. It documents the complete rendering pipeline from raw markdown → parsed blocks → React components, with common failure modes and their solutions.

## When to Use This Skill

- When content doesn't look right in the browser
- When `{{projectName}}` or other template variables appear literally
- When a `:::prompt`, `:::diagram`, `:::collapsible`, or `:::tabs` block doesn't render
- When markdown formatting (bold, links, lists, tables) breaks
- When content appears in the wrong order or is missing
- When adding a new custom block type to the parser

## Rendering Pipeline Overview

Content passes through 4 stages:

```
Stage 1: Raw Markdown File
  ↓ import.meta.glob (Vite eager import as raw string)
Stage 2: Data Parser (tutorialContent.ts / advancedContent.ts / terminalContent.ts)
  ↓ parseFrontmatter → parseSteps → parsePromptBlocks
  ↓ Prompt blocks extracted, replaced with :::prompt-placeholder:::
Stage 3: StepCard Component
  ↓ resolveContent() — template variable substitution (Foundation only)
  ↓ parseContentBlocks() — line-by-line state machine → ContentBlock[]
Stage 4: React Rendering
  ↓ renderBlock() — switch/case on block.type → JSX elements
  ↓ parseMarkdown() — inline formatting (bold, italic, code, links)
```

### File Locations

| Stage | File | Function |
|---|---|---|
| Raw import | Vite config + data module | `import.meta.glob` |
| Frontmatter + steps | `src/data/tutorialContent.ts` | `parseFrontmatter()`, `parseSteps()` |
| Prompt extraction | `src/data/tutorialContent.ts` | `parsePromptBlock()` |
| Multi-prompt extraction | `src/data/advancedContent.ts` | `parsePromptBlocks()` |
| Meta-prompt parsing | `src/data/terminalContent.ts` | `parsePromptBlocks()` with `===` |
| Template resolution | `src/data/tutorialContent.ts` | `resolveContent()`, `applyTemplate()` |
| Block parsing | `src/components/StepCard.tsx` | `parseContentBlocks()` |
| Block rendering | `src/components/StepCard.tsx` | `renderBlock()` |
| Inline markdown | `src/components/StepCard.tsx` | `parseMarkdown()` |

## ContentBlock Types

The `parseContentBlocks()` function produces blocks of these types:

| Type | Trigger | Renders As |
|---|---|---|
| `paragraph` | Default (non-special lines) | `<p>` |
| `heading` | `##`, `###`, `####` | `<h4>` |
| `code` | ` ``` ` fences | `<pre><code>` |
| `bullet-list` | `- `, `• `, `✓ `, `✅ `, `❌ ` | `<ul><li>` |
| `numbered-list` | `1. `, `2. ` | `<ol><li>` |
| `table` | `\| ... \|` rows | `<table>` |
| `callout` | `💡` prefix | Styled amber box |
| `celebration` | Contains `🎉` | Styled primary box |
| `blockquote` | `> ` prefix | `<blockquote>` |
| `collapsible` | `:::collapsible` | `<Collapsible>` (shadcn) |
| `diagram` | `:::diagram <name>` | Named diagram component |
| `tabs` | `:::tabs` | `<TabsBlock>` |
| `prompt-placeholder` | `:::prompt-placeholder:::` | `<PromptBox>` |
| `hr` | `---` (standalone) | `<hr>` |

## Common Failure Modes

### 1. Template Variables Appear as Literal Text

**Symptom:** `{{projectName}}` shows in the browser instead of "Deal Health Dashboard"

**Causes:**

| Cause | Fix |
|---|---|
| `isAdvanced={true}` passed to StepCard | Only Foundation track uses template resolution. Advanced/Terminal skip it by design. |
| No track selected | User hasn't visited `/select-track`. Check `useTrack()` returns a valid track. |
| Variable name misspelled | Check against valid variables in `buildTemplateContext()`. |
| Nested path wrong | `{{colorCoding.green}}` works, `{{colorCoding.Green}}` doesn't (case-sensitive). |
| Missing from ExampleTrack | The variable exists in markdown but the track doesn't have that field. |

**Valid template variables** — see `.github/reference/template-variables.md` for the full canonical list.

**Debug approach:**
1. Check which track is rendering (Foundation vs Advanced vs Terminal)
2. Search for the variable in `buildTemplateContext()` in `tutorialContent.ts`
3. Verify the ExampleTrack has the field populated

### 2. Prompt Box Not Appearing

**Symptom:** The `:::prompt` content is missing or renders as raw text

**Causes:**

| Cause | Fix |
|---|---|
| Prompt block not closed | Add closing `:::` on its own line |
| Missing `---` separator | Add `---` between metadata and prompt content |
| Spaces after `:::prompt` | Must be exactly `:::prompt` with newline, no trailing spaces |
| Windows line endings | `\r\n` may break regex. Data parsers call `normalizeLF()` first. |
| Foundation: second prompt in step | Foundation parser only extracts ONE prompt per step. Use Advanced/Terminal pattern for multiple. |

**How prompts flow:**

```
Markdown: :::prompt ... :::
  → Data parser extracts prompt, replaces with :::prompt-placeholder:::
    → parseContentBlocks() sees :::prompt-placeholder::: → { type: 'prompt-placeholder' }
      → renderBlock() renders <PromptBox> with the extracted prompt data
```

**Debug approach:**
1. Check the raw markdown file for proper `:::prompt` / `:::` pairing
2. Add `console.log(step.prompt, step.prompts)` in StepCard to verify extraction
3. Check `parseContentBlocks()` output for `prompt-placeholder` blocks
4. Verify prompt count matches placeholder count

### 3. Diagram Not Rendering

**Symptom:** Nothing appears where `:::diagram name` is in the markdown

**Causes:**

| Cause | Fix |
|---|---|
| Name not in switch | Add case to `renderBlock()` diagram switch in StepCard.tsx |
| Component not exported | Add to `src/components/diagrams/index.ts` |
| Component not imported | Add import in StepCard.tsx |
| Typo in markdown name | Must exactly match the `case` string |

**Debug approach:**
1. Check `:::diagram <name>` in markdown — what name is used?
2. Look at StepCard.tsx `case 'diagram':` switch — is there a matching `case '<name>':`?
3. Check import at top of StepCard.tsx
4. Check export in `src/components/diagrams/index.ts`
5. Check component file exists

### 4. Collapsible Section Not Working

**Symptom:** Content inside `:::collapsible` renders as plain text or doesn't collapse

**Causes:**

| Cause | Fix |
|---|---|
| Missing `title:` line | Add `title: Your Title` after `:::collapsible` |
| Missing `---` separator | Add `---` between title and content |
| Nested `:::` blocks | Collapsible parser stops at first `:::` — nesting not supported |
| Empty content | Must have content after `---` separator |

**Collapsible syntax:**
```markdown
:::collapsible
title: Click to expand
---
Content goes here
:::
```

### 5. Tabs Not Rendering

**Symptom:** Tab labels or content not appearing, or tabs render as plain text

**Causes:**

| Cause | Fix |
|---|---|
| Missing `:::tabs` opener | Must be exactly `:::tabs` on its own line |
| Missing `tab:` labels | Each tab needs `tab: Label` line |
| Missing `---` after tab label | Separator required between label and content |
| Code block inside tab has `:::` | Parser may confuse closing fence with tab closer |
| No closing `:::` | Add closing `:::` on its own line |

**Tabs syntax:**
```markdown
:::tabs
tab: First Tab
---
Content for first tab
tab: Second Tab
---
Content for second tab
:::
```

**Note:** The parser tracks `inCodeBlock` state to avoid treating `:::` inside code fences as tab closers.

### 6. List Not Rendering as List

**Symptom:** Bullet or numbered items appear as a paragraph instead of a formatted list

**Causes:**

| Cause | Fix |
|---|---|
| Indented list items | Parser checks `lines[i].trim()` — deep nesting not fully supported |
| Mixed markers | All items must use same marker (`-` or `1.`) |
| No space after marker | `- item` works, `-item` doesn't |
| Sub-list items | Nested lists (indented `- `) get merged into parent paragraph |

**Supported list prefixes:**
- Bullet: `-`, `•`, `✓`, `✅`, `❌` (each followed by space)
- Numbered: `1.`, `2.`, etc. (digit + dot + space)

### 7. Table Not Rendering

**Symptom:** Table appears as plain text with pipe characters

**Causes:**

| Cause | Fix |
|---|---|
| Missing closing `\|` | Both first and last character must be `\|` |
| Missing separator row | Second row must be `\|---\|---\|` pattern |
| Only 1 row | Need at least header + separator (2 rows) |
| Extra whitespace | Trim is applied, but check for leading spaces |

### 8. Inline Markdown Not Formatting

**Symptom:** `**bold**` or `[link](url)` appears literally

**Cause:** The `parseMarkdown()` function uses regex on the final text. It handles:
- `**bold**` → `<strong>`
- `*italic*` and `_italic_` → `<em>`
- `` `code` `` → `<code>`
- `[text](url)` → `<a>`

**Common issues:**
- Nested formatting: `**bold _and italic_**` — may not work correctly
- Unmatched markers: odd number of `*` breaks the regex
- Content inside code blocks: inline markdown is NOT applied inside `<pre>` blocks (this is correct)

## Adding a New Custom Block Type

When you need a new block type beyond what exists:

### Step 1: Define the trigger syntax

Choose a `:::` prefix (e.g., `:::warning`) or a special line pattern.

### Step 2: Add to `ContentBlock` interface

In StepCard.tsx, extend the union type:

```typescript
interface ContentBlock {
  type: '...' | 'warning'  // Add new type
  content: string
  // Add any new fields needed
  warningLevel?: string
}
```

### Step 3: Add parsing logic in `parseContentBlocks()`

Add a new condition in the `while` loop, following the pattern of existing block parsers:

```typescript
// Warning blocks (:::warning ... :::)
if (trimmedLine.startsWith(':::warning')) {
  i++ // skip opening
  const warningLines: string[] = []
  while (i < lines.length && !lines[i].trim().startsWith(':::')) {
    warningLines.push(lines[i])
    i++
  }
  i++ // skip closing :::
  blocks.push({ type: 'warning', content: warningLines.join('\n').trim() })
  continue
}
```

**Important:** Place new `:::` block parsers BEFORE the generic `:::` skip at the bottom of the loop. The parser processes conditions top-to-bottom, and the generic skip (`if (trimmedLine.startsWith(':::'))`) will swallow unrecognized directives.

### Step 4: Add rendering in `renderBlock()`

```typescript
case 'warning':
  return (
    <div key={idx} className="my-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
      <p className="text-sm text-foreground"
         dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }} />
    </div>
  )
```

### Step 5: Add to `CollapsibleBlockRenderer`

If the new block type can appear inside collapsible sections or tabs, add the same case to `CollapsibleBlockRenderer` as well. This is a separate render function used inside `Collapsible` and `TabsBlock` components.

## Parser Order of Operations

The `parseContentBlocks()` while-loop checks conditions in this order:

```
1. Empty line → skip
2. --- → hr
3. :::collapsible → collapsible block
4. :::diagram → diagram block
5. :::tabs → tabs block
6. :::prompt-placeholder::: → prompt placeholder
7. :::prompt → skip (already extracted by data parser)
8. ::: (unknown) → skip to avoid infinite loops
9. > → blockquote
10. ``` → code block
11. ##/###/#### → heading
12. N. → numbered list
13. -/•/✓/✅/❌ → bullet list
14. 💡 → callout
15. 🎉 → celebration
16. |...| → table
17. Default → paragraph (consumes consecutive non-special lines)
```

**Critical:** New `:::` directives must be added between positions 2-7 (before the generic `:::` skip at position 8).

## Debug Toolkit

### Browser DevTools

Open browser console and inspect rendered HTML:
- Missing `<div data-diagram="name">` → diagram not registered
- Literal `:::prompt-placeholder:::` in text → prompt extraction failed
- `{{variable}}` in text → template resolution not running

### Console Logging

Add temporary logging in StepCard.tsx:

```typescript
// In StepCard component, after parseContentBlocks:
const blocks = parseContentBlocks(content)
console.log('Step:', step.id, 'Blocks:', blocks.map(b => b.type))
console.log('Prompts:', resolvedPrompts)
```

### Content Comparison

Compare raw markdown with parsed output:

```powershell
# Show raw prompt blocks in a file
Select-String -Path "src/content/tutorial/part-1-*.md" -Pattern ":::prompt|:::$" -Context 0,2

# Count prompt-placeholder markers that should appear after parsing
# (These won't be in the .md file — they're created at parse time)
```

### Build-Time Validation

```powershell
# Full build catches import errors and type issues
npm run build 2>&1 | Select-Object -Last 20

# Dev server shows runtime errors in console
npm run dev
```

## Quick Reference: Symptom → Fix

| Symptom | Most Likely Cause | Where to Look |
|---|---|---|
| `{{projectName}}` literal | Wrong track or missing track selection | StepCard `isAdvanced` prop, `useTrack()` |
| Prompt box missing | Unclosed `:::prompt` or missing `---` | Raw markdown file |
| Second prompt in Foundation step missing | Foundation only supports 1 prompt/step | Use Advanced parser pattern |
| Diagram blank spot | Missing switch case | StepCard.tsx `case 'diagram':` switch |
| Collapsible shows as text | Missing `title:` or `---` | Raw markdown file |
| Tabs not switching | localStorage conflict or missing `---` | Browser devtools, raw markdown |
| List items in paragraph | Mixed markers or indentation | Raw markdown formatting |
| Table as plain text | Missing `\|` on both ends | Raw markdown formatting |
| Content appears twice | Duplicate step IDs | `## step:` IDs must be unique |
| Blank step card | Exception during parsing | Browser console for errors |
| Inline `**bold**` literal | Inside code block (correct) or unmatched `**` | Raw markdown for balanced markers |
| `:::` visible in output | Unknown directive not handled | Check parser order, add new case or fix typo |

## Checklist: Content Not Rendering Correctly

1. [ ] Check raw markdown syntax (open file, verify `:::` blocks are properly closed)
2. [ ] Check data parser output (add console.log to verify parsed structure)
3. [ ] Check `parseContentBlocks()` output (log block types)
4. [ ] Check `renderBlock()` has a case for the block type
5. [ ] Check `CollapsibleBlockRenderer` if block appears inside collapsible/tabs
6. [ ] Check template variables against `buildTemplateContext()` (Foundation only)
7. [ ] Check browser console for runtime errors
8. [ ] Run `npm run build` to catch compile-time issues
