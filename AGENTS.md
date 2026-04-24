# AI Agent Instructions

This file provides context and guidelines for AI agents (GitHub Copilot, Claude, etc.) working on this codebase.

## Project Overview

**AI-Native Development Tutorial Website** - An interactive tutorial teaching anyone how to accelerate their workflow using AI-Native development techniques.

### Goal

Teach developers — from beginners to professionals — how to leverage AI assistance effectively. While this tutorial uses a web app as the example project, the structured approaches work for any creation task: apps, documents, automation scripts, data analysis, and more.

### Live Deployment

- **Production URL**: https://lemon-mud-0ea992703.4.azurestaticapps.net
- **Hosting**: Azure Static Web Apps
- **Resource Group**: `tutorials`
- **App Name**: `learn-ai-first-dev`

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (Radix primitives)
- **Icons**: Phosphor Icons, Heroicons
- **State**: React Query for async state

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── content/         # Tutorial markdown content
│   └── tutorial/    # Part 0-8 tutorial files
├── data/            # Static data and content mappings
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components (HomePage, LessonPage, SummaryPage)
└── styles/          # Global styles and theme
```

## Experience Qualities

When making changes, maintain these qualities:

1. **Empowering** - Every section reinforces that anyone can create faster with AI
2. **Crystalline** - Complex processes broken into obvious, numbered steps with clear visual hierarchy
3. **Inviting** - Warm, friendly design that feels approachable rather than technical

## Design Guidelines

### Visual Language

The design should feel like a modern, premium developer tool—professional but not corporate. Think Linear, Vercel, or Arc Browser: clean lines, purposeful use of space, subtle depth through shadows and gradients.

### Typography

- **H1**: Space Grotesk Bold/48px (36px mobile)
- **H2**: 28px mobile
- **Body**: Inter/16px/1.6 line-height (15px mobile)

### Spacing

- Section padding: `py-24 px-8` (mobile: `py-12 px-4`)
- Card padding: `p-6`
- Step gaps: `gap-12`
- Inline gaps: `gap-4`

### Mobile Responsiveness

- Sidebar → hamburger menu with slide-in drawer below 768px
- Two-column layouts stack to single column
- Code blocks get horizontal scroll for long lines

## Key Features

1. **Sidebar Navigation** - Expandable sections with progress tracking
2. **Copy-friendly Code Prompts** - One-click copy with visual feedback
3. **Step Progress Indicators** - Visual markers showing current position
4. **Collapsible Sections** - Focus on current content without distraction

## Deployment

### Manual Deployment to Azure Static Web Apps

GitHub Actions hosted runners are disabled for this repository. Deploy manually:

```powershell
# 1. Build the project
npm run build

# 2. Get deployment token
$token = az staticwebapp secrets list --name learn-ai-first-dev --resource-group tutorials --query "properties.apiKey" -o tsv

# 3. Deploy to Azure
swa deploy ./dist --deployment-token $token --env production
```

### Prerequisites

- Azure CLI (`az login`)
- SWA CLI (`npm install -g @azure/static-web-apps-cli`)

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## When Making Changes

1. **Understand the existing pattern** - Read related components first
2. **Maintain consistency** - Follow established conventions
3. **Test responsively** - Check both desktop and mobile views
4. **Build before committing** - Run `npm run build` to catch errors
