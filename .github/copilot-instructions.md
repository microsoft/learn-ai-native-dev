# GitHub Copilot Instructions

This is an **AI-Native Development Tutorial** website. See [AGENTS.md](../AGENTS.md) for project context, tech stack, structure, design guidelines, and deployment.

## Code Generation Rules

- TypeScript with proper type annotations; no `any`
- Functional components with hooks; named exports
- Import via `@/` alias (e.g., `@/components/ui/button`)
- Tailwind CSS only — no inline styles or CSS modules
- Prefer shadcn/ui components from `src/components/ui/`
- Use `cn()` from `@/lib/utils` for conditional classes

## Security

### Never Generate

- Hardcoded API keys, tokens, or secrets
- `eval()` or `Function()` with dynamic input
- `dangerouslySetInnerHTML` with unsanitized content

### Always Include

- Input validation for user-provided data
- Proper error handling with try/catch
- HTTPS for external resources

## Before Completing Code

1. `npm run build` succeeds (no TypeScript errors)
2. Imports are correct
3. Responsive design considered
4. Accessibility basics present (labels, alt text, ARIA)
