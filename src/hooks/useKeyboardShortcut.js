import { useEffect } from 'react'

// Registers a single global key handler for the life of the component.
// `keyMap` is { key: handler }, e.g. { '/': focusSearch, Escape: closeCard }.
// Ignores keystrokes typed into inputs/textareas so shortcuts don't fight typing.
export function useKeyboardShortcut(keyMap) {
  useEffect(() => {
    function onKeyDown(event) {
      const handler = keyMap[event.key]
      if (!handler) return

      const target = event.target
      const isTyping = target instanceof HTMLElement && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      if (isTyping && event.key !== 'Escape') return

      handler(event)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [keyMap])
}
