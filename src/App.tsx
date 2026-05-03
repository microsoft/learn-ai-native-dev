// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { TrackProvider } from '@/hooks/use-track'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { CommandPalette } from '@/components/CommandPalette'
import { ShortcutsOverlay } from '@/components/ShortcutsOverlay'

// ─────────────────────────────────────────────────────────────────────────
// Lazy-loaded pages — keeps initial bundle small.
// New IA pages live under /learn, /projects, /contribute.
// Legacy pages (LessonPage, AdvancedLessonPage, TerminalLessonPage) are kept
// to preserve the working content rendering; new /learn/:pathId routes
// proxy into them via PathRouter below.
// ─────────────────────────────────────────────────────────────────────────
const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const CatalogPage = lazy(() => import('@/pages/CatalogPage').then((m) => ({ default: m.CatalogPage })))
const ContributeHub = lazy(() => import('@/pages/ContributePages').then((m) => ({ default: m.ContributeHub })))
const ContributeShapePage = lazy(() => import('@/pages/ContributePages').then((m) => ({ default: m.ContributeShapePage })))

// Path home pages:
const FoundationHomePage = lazy(() => import('@/pages/FoundationHomePage').then((m) => ({ default: m.FoundationHomePage })))

// Legacy pages (preserved):
const LessonPage = lazy(() => import('@/pages/LessonPage').then((m) => ({ default: m.LessonPage })))
const SummaryPage = lazy(() => import('@/pages/SummaryPage').then((m) => ({ default: m.SummaryPage })))
const AdvancedHomePage = lazy(() => import('@/pages/AdvancedHomePage').then((m) => ({ default: m.AdvancedHomePage })))
const AdvancedLessonPage = lazy(() => import('@/pages/AdvancedLessonPage').then((m) => ({ default: m.AdvancedLessonPage })))
const AdvancedSummaryPage = lazy(() => import('@/pages/AdvancedSummaryPage').then((m) => ({ default: m.AdvancedSummaryPage })))
const TerminalHomePage = lazy(() => import('@/pages/TerminalHomePage').then((m) => ({ default: m.TerminalHomePage })))
const TerminalLessonPage = lazy(() => import('@/pages/TerminalLessonPage').then((m) => ({ default: m.TerminalLessonPage })))
const TerminalSummaryPage = lazy(() => import('@/pages/TerminalSummaryPage').then((m) => ({ default: m.TerminalSummaryPage })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])
  return null
}

/**
 * Routes /learn/:pathId/* into the appropriate legacy page based on pathId.
 * This keeps the URL surface unified while reusing the proven rendering pipeline.
 *
 * Unknown pathId values (including community paths whose content shape is the
 * generic Foundation parser) currently redirect to the catalog. Future work:
 * implement a generic PathLessonPage that renders any community path.
 */
function PathHomeRouter() {
  const { pathId } = useParams<{ pathId: string }>()
  if (pathId === 'foundation') return <FoundationHomePage />
  if (pathId === 'agentic') return <AdvancedHomePage />
  if (pathId === 'terminal') return <TerminalHomePage />
  return <Navigate to="/learn" replace />
}

function PathLessonRouter() {
  const { pathId } = useParams<{ pathId: string }>()
  if (pathId === 'foundation') return <LessonPage />
  if (pathId === 'agentic') return <AdvancedLessonPage />
  if (pathId === 'terminal') return <TerminalLessonPage />
  return <Navigate to="/learn" replace />
}

function PathSummaryRouter() {
  const { pathId } = useParams<{ pathId: string }>()
  if (pathId === 'foundation') return <SummaryPage />
  if (pathId === 'agentic') return <AdvancedSummaryPage />
  if (pathId === 'terminal') return <TerminalSummaryPage />
  return <Navigate to="/learn" replace />
}

/**
 * Wraps a page with a fade/slide transition keyed by the top-level route
 * segment. Keying on the first segment (instead of the full pathname) avoids
 * re-triggering the animation when a user navigates between steps inside the
 * same lesson page — which would feel jarring.
 */
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  // Group key: '/' | '/learn' | '/learn/foundation' | '/projects' | '/contribute' …
  // We animate on changes to the first two path segments so cross-section moves
  // (Home ↔ Catalog ↔ Path home) animate, while in-page step navigation does not.
  const segments = pathname.split('/').filter(Boolean)
  const key = '/' + segments.slice(0, 2).join('/')
  return (
    <div key={key} className="page-transition">
      {children}
    </div>
  )
}

function AppContent() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-background">
            <div className="text-muted-foreground">Loading…</div>
          </div>
        }
      >
        <PageTransition>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<HomePage />} />

          {/* New IA */}
          <Route path="/learn" element={<CatalogPage />} />
          <Route path="/learn/:pathId" element={<PathHomeRouter />} />
          <Route path="/learn/:pathId/summary" element={<PathSummaryRouter />} />
          <Route path="/learn/:pathId/:moduleId" element={<PathLessonRouter />} />
          <Route path="/learn/:pathId/:moduleId/:stepId" element={<PathLessonRouter />} />

          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/examples" element={<Navigate to="/projects" replace />} />

          <Route path="/contribute" element={<ContributeHub />} />
          <Route path="/contribute/:shape" element={<ContributeShapePage />} />

          {/* Legacy redirects (back-compat for any external links) */}
          <Route path="/select-track" element={<Navigate to="/projects" replace />} />
          <Route path="/lesson/:moduleId" element={<LegacyFoundationRedirect />} />
          <Route path="/lesson/:moduleId/:stepId" element={<LegacyFoundationRedirect />} />
          <Route path="/summary" element={<Navigate to="/learn/foundation/summary" replace />} />

          <Route path="/advanced" element={<Navigate to="/learn/agentic" replace />} />
          <Route path="/advanced/module/:moduleId" element={<LegacyAgenticRedirect />} />
          <Route path="/advanced/module/:moduleId/:stepId" element={<LegacyAgenticRedirect />} />
          <Route path="/advanced/summary" element={<Navigate to="/learn/agentic/summary" replace />} />

          <Route path="/terminal" element={<Navigate to="/learn/terminal" replace />} />
          <Route path="/terminal/module/:moduleId" element={<LegacyTerminalRedirect />} />
          <Route path="/terminal/module/:moduleId/:stepId" element={<LegacyTerminalRedirect />} />
          <Route path="/terminal/summary" element={<Navigate to="/learn/terminal/summary" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </PageTransition>
      </Suspense>
      <SiteFooter />
      <CommandPalette />
      <ShortcutsOverlay />
    </>
  )
}

function LegacyFoundationRedirect() {
  const { moduleId, stepId } = useParams<{ moduleId: string; stepId?: string }>()
  const target = stepId ? `/learn/foundation/${moduleId}/${stepId}` : `/learn/foundation/${moduleId}`
  return <Navigate to={target} replace />
}

function LegacyAgenticRedirect() {
  const { moduleId, stepId } = useParams<{ moduleId: string; stepId?: string }>()
  const target = stepId ? `/learn/agentic/${moduleId}/${stepId}` : `/learn/agentic/${moduleId}`
  return <Navigate to={target} replace />
}

function LegacyTerminalRedirect() {
  const { moduleId, stepId } = useParams<{ moduleId: string; stepId?: string }>()
  const target = stepId ? `/learn/terminal/${moduleId}/${stepId}` : `/learn/terminal/${moduleId}`
  return <Navigate to={target} replace />
}

function App() {
  return (
    <TrackProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <AppContent />
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </TrackProvider>
  )
}

export default App
