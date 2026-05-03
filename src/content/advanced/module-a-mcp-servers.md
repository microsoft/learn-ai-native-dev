---
id: module-a
number: 1
title: MCP Servers
subtitle: 45 minutes - Connect AI to external systems
---

## step: a-prerequisites
### title: Prerequisites

Before starting this module, ensure you have:

- [ ] **VS Code** with GitHub Copilot extension
- [ ] **Node.js 20+** installed ([nodejs.org](https://nodejs.org))
- [ ] **Python 3.10+** installed ([python.org](https://python.org))
- [ ] **UV package manager** — install with `curl -LsSf https://astral.sh/uv/install.sh | sh` or `brew install uv` (see [uv docs](https://docs.astral.sh/uv/getting-started/installation/))

> **Why Python?** The official MCP fetch server is written in Python. Your custom servers will use Node.js.

---

## step: why-mcp-matters
### title: Why This Module Matters

Throughout Parts 0-8, GitHub Copilot worked entirely within your codebase — reading files, writing code, running commands. But what if you need AI to fetch live data from an API, query a database, or interact with external services?

**Model Context Protocol (MCP)** solves this by creating a standardized way to connect AI assistants to external tools. Think of MCP as a "USB port" for AI — a universal connector that works across different AI tools and external services.

**In this module, you'll:**
• Understand how MCP architecture works
• Configure an existing MCP server
• Build a custom MCP server from scratch
• Integrate MCP data into the DevDash CLI project

---

## step: mcp-architecture
### title: Step A1: Understanding MCP Architecture

Before building anything, let's understand how the pieces fit together.

**The problem MCP solves:**
GitHub Copilot can read your files and run terminal commands. But it can't:
- Fetch live weather data from an API
- Query your production database
- Search your company's internal documentation
- Control external applications

**MCP creates a bridge:**

:::diagram mcp-architecture
:::

**Key concepts:**

| Component | Role | Example |
|-----------|------|---------|
| **Client** | The AI assistant that needs data | GitHub Copilot, Claude |
| **Server** | Your code that exposes tools | A Node.js script |
| **Tool** | A specific action the server provides | `get_weather`, `search_docs` |
| **Resource** | Data the server can read | Database tables, API endpoints |

**MCP is an open standard:**
- Created by Anthropic, adopted by GitHub, Google, and others
- Your MCP servers work with any compatible AI tool
- Servers you find online work with GitHub Copilot

💡 **Why this matters:** Instead of copy-pasting API responses into chat, MCP lets AI fetch the data directly. This keeps context accurate and saves you time.

---

## step: setup-devdash
### title: Step A2: Set Up the DevDash Project

For this advanced track, you'll build **DevDash** — a developer dashboard CLI that displays live data from multiple sources. This is different from the web app you built in Parts 0-8.

**Why a CLI?**
- No framework complexity (pure Node.js)
- Clear input/output for testing
- Natural fit for MCP (external data fetching)
- Demonstrates techniques in a new context

After this prompt, you'll have a DevDash project ready for MCP integration.

Copy this into GitHub Copilot chat:

:::prompt
number: A1
title: Create DevDash project
---
Create a new Node.js CLI project called "devdash" with this structure:

devdash/
├── package.json (with type: "module", name: "devdash")
├── src/
│   ├── index.js (entry point that imports and runs dashboard)
│   ├── dashboard.js (main dashboard display logic)
│   └── modules/
│       └── greeting.js (simple module that returns a greeting)
├── specs/
│   ├── PRD.md (describe DevDash as a CLI dashboard showing weather, quotes, stats)
│   └── Tasks.md (empty checklist for now)
└── README.md

The dashboard should:
- Clear the console and display a bordered box
- Show a greeting like "Welcome to DevDash v1.0.0"
- Have placeholder text for: Weather, Quote of the Day, GitHub Stats
- Use ASCII box drawing characters for borders

Make it runnable with: node src/index.js
:::

Test your new project:

```bash
cd devdash
node src/index.js
```

You should see a bordered dashboard with placeholder text.

---

## step: configure-fetch-server
### title: Step A3: Configure Your First MCP Server

Before building a custom server, let's configure an existing one. The `fetch` MCP server lets GitHub Copilot make HTTP requests to any URL.

**Configure the fetch server in VS Code:**

1. Open VS Code Settings (`Ctrl+,`)
2. Search for `mcp`
3. Click "Edit in settings.json" for MCP settings
4. Add this configuration to your **User settings** (or create a `.vscode/mcp.json` file for workspace-specific servers):

💡 **User vs Workspace settings:** User settings apply to all projects. Workspace settings (in `.vscode/`) only apply to the current project. For servers you'll use everywhere, choose User settings.

```json
{
  "mcp": {
    "servers": {
      "fetch": {
        "command": "uvx",
        "args": ["mcp-server-fetch"]
      }
    }
  }
}
```

:::collapsible
title: Alternative: Using Docker (no Python required)
---
```json
{
  "mcp": {
    "servers": {
      "fetch": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "mcp/fetch"]
      }
    }
  }
}
```
:::

5. Reload VS Code (Command Palette → "Developer: Reload Window")

**Test the fetch server:**

Copy this into GitHub Copilot chat:

:::prompt
number: A2
title: Test fetch MCP server
---
Use the fetch tool to get the current top stories from Hacker News.

Fetch this URL: https://hacker-news.firebaseio.com/v0/topstories.json

Then fetch the details of the first story and tell me its title.
:::

You should see GitHub Copilot make actual HTTP requests and return live data.

💡 **What just happened:** GitHub Copilot called the fetch MCP server, which made HTTP requests on its behalf. The AI never directly accessed the network — the MCP server handled that.

:::collapsible
title: Troubleshooting: Server not working?
---
| Problem | Solution |
|---------|----------|
| `uvx: command not found` | Install UV: `curl -LsSf https://astral.sh/uv/install.sh \| sh` then restart terminal |
| `Python not found` | Install Python 3.10+ from [python.org](https://python.org) |
| Server not appearing in Copilot | Check VS Code Output panel → select "MCP" from dropdown |
| Timeout errors | Try the Docker alternative (see above) |

**Verify UV is installed:**
```bash
uvx --version
```
:::

### ✅ Checkpoint

- [ ] Fetch MCP server configured in VS Code settings
- [ ] GitHub Copilot successfully fetched live Hacker News data
- [ ] You understand the client → server → external API flow

---

## step: build-quote-server
### title: Step A4: Build a Quote MCP Server

Now let's build a custom MCP server. This server will provide inspirational quotes that DevDash can display.

After this prompt, you'll have a working MCP server that GitHub Copilot can call.

Copy this into GitHub Copilot chat:

:::prompt
number: A3
title: Create quote MCP server
---
Create a custom MCP server that provides quotes. Create these files:

mcp-servers/quote-server/
├── package.json (with type: "module", dependencies: @modelcontextprotocol/sdk)
├── src/
│   └── index.js

The server should:
1. Use the MCP SDK to create a server
2. Expose a tool called "get_quote" that returns an inspirational quote
3. Include at least 10 hardcoded quotes from famous people about technology, creativity, or building things
4. Return a random quote each time the tool is called

Use the official MCP SDK pattern:
- Import { Server } from "@modelcontextprotocol/sdk/server/index.js"
- Import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
- Define tools using server.setRequestHandler for "tools/list" and "tools/call"
:::

Install dependencies and test the server:

```bash
cd mcp-servers/quote-server
npm install
```

---

## step: register-quote-server
### title: Step A5: Register Your MCP Server

Now let's tell VS Code about your new server so GitHub Copilot can use it.

**Add to VS Code settings.json:**

```json
{
  "mcp": {
    "servers": {
      "fetch": {
        "command": "uvx",
        "args": ["mcp-server-fetch"]
      },
      "quotes": {
        "command": "node",
        "args": ["${workspaceFolder}/mcp-servers/quote-server/src/index.js"]
      }
    }
  }
}
```

Reload VS Code, then test your custom server:

:::prompt
number: A4
title: Test quote MCP server
---
Use the get_quote tool from the quotes MCP server to get an inspirational quote.

Then get 3 more quotes and pick your favorite.
:::

You should see GitHub Copilot calling your custom tool and returning quotes.

💡 **You just extended GitHub Copilot:** Any tool you expose via MCP becomes available to AI. This is how you connect AI to internal systems, custom APIs, and specialized functionality.

### ✅ Checkpoint

- [ ] Quote MCP server created and installed
- [ ] Server registered in VS Code settings
- [ ] GitHub Copilot successfully calls your custom `get_quote` tool

---

## step: build-weather-server
### title: Step A6: Build a Weather MCP Server

Let's build a more practical server that fetches real weather data. This server will call a public weather API.

Copy this into GitHub Copilot chat:

:::prompt
number: A5
title: Create weather MCP server
---
Create another MCP server for weather data:

mcp-servers/weather-server/
├── package.json (with type: "module", dependencies: @modelcontextprotocol/sdk)
├── src/
│   └── index.js

The server should expose a tool called "get_weather" that:
1. Accepts a "city" parameter
2. Uses the Open-Meteo API (free, no API key needed)
   - Geocoding: https://geocoding-api.open-meteo.com/v1/search?name={city}
   - Weather: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
3. Returns temperature in Fahrenheit, weather description, and city name

Handle errors gracefully if the city isn't found.
:::

Register the weather server in settings.json:

```json
{
  "mcp": {
    "servers": {
      "weather": {
        "command": "node",
        "args": ["${workspaceFolder}/mcp-servers/weather-server/src/index.js"]
      }
    }
  }
}
```

Test it:

:::prompt
number: A6
title: Test weather MCP server
---
Use the weather tool to get the current weather in Seattle.

Then check the weather in Tokyo and compare the temperatures.
:::

---

## step: integrate-mcp-devdash
### title: Step A7: Integrate MCP Data into DevDash

Now let's update DevDash to display data from your MCP servers. You'll create modules that format MCP data for the CLI display.

Copy this into GitHub Copilot chat:

:::prompt
number: A7
title: Integrate MCP with DevDash
---
Update the DevDash project to display real data:

1. Create src/modules/weather.js
   - Export a function that formats weather data for display
   - Accept temperature, description, and city as parameters
   - Return formatted string like "🌤️ Weather: 72°F, Sunny in Seattle"

2. Create src/modules/quote.js
   - Export a function that formats a quote for display
   - Accept quote text and author as parameters
   - Return formatted string like '💬 "Quote text" — Author'

3. Update src/dashboard.js to:
   - Import the new modules
   - Accept weather and quote data as parameters
   - Display them in the dashboard box

4. Update src/index.js to:
   - Use sample data for now (we'll connect MCP in the next step)
   - Pass sample weather: { temp: 72, description: "Sunny", city: "Seattle" }
   - Pass sample quote: { text: "The best way to predict the future is to invent it.", author: "Alan Kay" }

Test by running: node src/index.js
:::

Test the updated dashboard:

```bash
node src/index.js
```

You should see the dashboard with formatted weather and quote data.

---

## step: mcp-workflow
### title: Step A8: The MCP Development Workflow

Now you can use MCP tools directly in your development workflow. Here's how to fetch live data and use it:

Copy this into GitHub Copilot chat:

:::prompt
number: A8
title: Use MCP in development workflow
---
Let's update DevDash with real data:

1. Use the weather tool to get the current weather in San Francisco
2. Use the quotes tool to get an inspirational quote
3. Update src/index.js to use this real data instead of the sample data
4. Make sure the dashboard displays the live information
:::

Run the dashboard and see live data!

### What You Learned

| Concept | What It Does |
|---------|--------------|
| **MCP Server** | Exposes tools that AI can call |
| **MCP Tool** | A specific action (get_weather, get_quote) |
| **Server Registration** | Telling VS Code where to find your server |
| **Tool Invocation** | AI calling your tools during conversation |

### ✅ Module Complete

- [ ] Configured the fetch MCP server
- [ ] Built a custom quote MCP server
- [ ] Built a weather MCP server with real API calls
- [ ] Integrated MCP data into the DevDash CLI
- [ ] Understand how to extend GitHub Copilot with custom tools

### 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Server not in agent picker | Reload VS Code (Command Palette → "Developer: Reload Window") |
| "Connection refused" error | Verify Node.js is in PATH; check server path is correct |
| Tool not found | Ensure server is registered in `mcp` settings with correct args |
| Server starts but no tools | Check your server exports tools with `server.tool()` |
| npx command fails | Run `npm cache clean --force` and try again |

---

## step: whats-next-mcp
### title: What's Next

You've extended GitHub Copilot with custom tools that fetch external data. In Module B, you'll learn about the **Copilot coding agent** — a cloud-based agent that can work asynchronously on your repository without VS Code open.

💡 **Keep your MCP servers:** You'll use the weather and quote servers throughout the rest of this track. The DevDash project will grow to include GitHub stats, multi-agent review, and comprehensive testing.
