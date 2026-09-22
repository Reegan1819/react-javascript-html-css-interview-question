import { useEffect, useState } from 'react'

// Generic localStorage-backed state. Falls back silently (no persistence)
// if storage is unavailable — private windows, blocked site data, etc.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable — value just won't persist across reloads
    }
  }, [key, value])

  return [value, setValue]
}
