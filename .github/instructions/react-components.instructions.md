---
description: "Use when creating or editing React components, pages, or hooks. Covers component patterns, imports, and styling conventions for the tutorial website."
applyTo: "src/components/**,src/pages/**,src/hooks/**"
---
# React Component Guidelines

## Component Pattern

```tsx
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  className?: string;
}

export function MyComponent({ title, className }: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {title}
    </div>
  );
}
```

- Functional components with named exports
- Props interface defined above the component
- Use `cn()` from `@/lib/utils` for conditional classes
- Import UI primitives from `@/components/ui/` (e.g., `@/components/ui/button`)

## Styling

- Tailwind CSS only — no inline styles or CSS modules
- Section padding: `py-24 px-8` (mobile: `py-12 px-4`)
- Card padding: `p-6`
- Use CSS variables for theme colors: `text-foreground`, `bg-background`, `bg-muted`
- Responsive: mobile-first, use `md:` and `lg:` breakpoints

## Imports

- Use `@/` alias for all project imports
- Group: React → external libs → `@/components/ui` → `@/components` → `@/lib` → `@/data`

## Accessibility

- All interactive elements need labels or aria-labels
- Images need alt text
- Use semantic HTML (`<nav>`, `<main>`, `<section>`)
- Focus management for modals and drawers
