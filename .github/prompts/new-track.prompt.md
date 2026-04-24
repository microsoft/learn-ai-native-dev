---
description: "Scaffold a complete new content track with all required files — data parser, pages, routes, content, and navigation."
mode: "agent"
agent: "developer"
---

Scaffold a new content track called **${input:trackName:Track name (e.g., mobile, data, enterprise)}**.

Follow the content-track-scaffolder patterns to create:
1. Content markdown files in `src/content/${input:trackName}/`
2. Data parser module in `src/data/`
3. Home, Lesson, and Summary page components in `src/pages/`
4. Routes in `src/App.tsx`
5. Header navigation link in `src/components/SiteHeader.tsx`

Use the next available module letter prefix after the existing tracks.
