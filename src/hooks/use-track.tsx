import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ExampleTrack, exampleTracks, getTrackById } from '@/data/exampleTracks'

interface TrackContextType {
  selectedTrack: ExampleTrack
  setSelectedTrack: (trackId: string) => void
  clearSelectedTrack: () => void
  hasSelectedTrack: boolean
}

const TrackContext = createContext<TrackContextType | undefined>(undefined)

const STORAGE_KEY = 'tutorial-selected-track'

export function TrackProvider({ children }: { children: ReactNode }) {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY)
    }
    return null
  })

  const selectedTrack = selectedTrackId ? getTrackById(selectedTrackId) : exampleTracks[0]
  const hasSelectedTrack = selectedTrackId !== null

  useEffect(() => {
    if (selectedTrackId) {
      localStorage.setItem(STORAGE_KEY, selectedTrackId)
    }
  }, [selectedTrackId])

  const setSelectedTrack = (trackId: string) => {
    setSelectedTrackId(trackId)
  }

  const clearSelectedTrack = () => {
    setSelectedTrackId(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <TrackContext.Provider value={{ selectedTrack, setSelectedTrack, clearSelectedTrack, hasSelectedTrack }}>
      {children}
    </TrackContext.Provider>
  )
}

export function useTrack() {
  const context = useContext(TrackContext)
  if (context === undefined) {
    throw new Error('useTrack must be used within a TrackProvider')
  }
  return context
}
