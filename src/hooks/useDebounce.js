import { useEffect, useState } from 'react'

// Delays reacting to a fast-changing value (e.g. keystrokes) until it
// settles for `delay`ms, so filtering doesn't re-run on every keypress.
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
