import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'interview-bench-progress-v1'

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// status per question id: 'confident' | 'shaky' | undefined (unseen)
export function useProgress() {
  const [progress, setProgress] = useState(readStored)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      // storage unavailable (private mode, quota, etc.) — progress just won't persist
    }
  }, [progress])

  const setStatus = useCallback((id, status) => {
    setProgress((prev) => {
      const next = { ...prev }
      if (!status) {
        delete next[id]
      } else {
        next[id] = status
      }
      return next
    })
  }, [])

  const resetProgress = useCallback(() => setProgress({}), [])

  return { progress, setStatus, resetProgress }
}
