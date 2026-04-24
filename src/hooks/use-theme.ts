import { useEffect, useState } from 'react'

type ThemePreference = 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

export function useTheme() {
  const [theme, setTheme] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'light' || stored === 'dark') {
        return stored
      }
    } catch {
      // Ignore storage access errors
    }
    return 'light'
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-appearance', theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore storage access errors
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}
