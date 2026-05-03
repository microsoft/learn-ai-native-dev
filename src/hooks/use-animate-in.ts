// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useEffect, useRef, useState } from 'react'

/**
 * Adds an entrance animation to an element when it scrolls into view.
 * Pair with the [data-animate-in] CSS rules in index.css.
 *
 * Usage:
 *   const { ref } = useAnimateIn<HTMLDivElement>()
 *   return <div ref={ref} data-animate-in>...</div>
 */
export function useAnimateIn<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  useEffect(() => {
    const el = ref.current
    if (el && visible) {
      el.setAttribute('data-state', 'visible')
    }
  }, [visible])

  return { ref, visible }
}
