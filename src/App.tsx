import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { TrackProvider } from '@/hooks/use-track'
import { SiteHeader } from '@/components/SiteHeader'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const LessonPage = lazy(() => import('@/pages/LessonPage').then(m => ({ default: m.LessonPage })))
const SummaryPage = lazy(() => import('@/pages/SummaryPage').then(m => ({ default: m.SummaryPage })))
const TrackSelector = lazy(() => import('@/components/TrackSelector').then(m => ({ default: m.TrackSelector })))
const AdvancedHomePage = lazy(() => import('@/pages/AdvancedHomePage').then(m => ({ default: m.AdvancedHomePage })))
const AdvancedLessonPage = lazy(() => import('@/pages/AdvancedLessonPage').then(m => ({ default: m.AdvancedLessonPage })))
const AdvancedSummaryPage = lazy(() => import('@/pages/AdvancedSummaryPage').then(m => ({ default: m.AdvancedSummaryPage })))
const TerminalHomePage = lazy(() => import('@/pages/TerminalHomePage').then(m => ({ default: m.TerminalHomePage })))
const TerminalLessonPage = lazy(() => import('@/pages/TerminalLessonPage').then(m => ({ default: m.TerminalLessonPage })))
const TerminalSummaryPage = lazy(() => import('@/pages/TerminalSummaryPage').then(m => ({ default: m.TerminalSummaryPage })))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

function AppContent() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={
        <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-background">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-track" element={<TrackSelector />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/lesson/:lessonId/:stepId" element={<LessonPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/advanced" element={<AdvancedHomePage />} />
          <Route path="/advanced/module/:moduleId" element={<AdvancedLessonPage />} />
          <Route path="/advanced/module/:moduleId/:stepId" element={<AdvancedLessonPage />} />
          <Route path="/advanced/summary" element={<AdvancedSummaryPage />} />
          <Route path="/terminal" element={<TerminalHomePage />} />
          <Route path="/terminal/module/:moduleId" element={<TerminalLessonPage />} />
          <Route path="/terminal/module/:moduleId/:stepId" element={<TerminalLessonPage />} />
          <Route path="/terminal/summary" element={<TerminalSummaryPage />} />
        </Routes>
      </Suspense>
    </>
  )
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