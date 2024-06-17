import { useEffect, useRef } from 'react'

export function useDocumentTitle(title?: string) {
  const defaultTitleRef = useRef(
    import.meta.env.theme === 'onvote'
      ? 'ONVOTE - Anonymous Gasless and Modular voting for Web3'
      : 'Vocdoni - The voice of digital voting'
  )

  useEffect(() => {
    if (title) {
      let prepend = 'Vocdoni'
      if (import.meta.env.theme === 'onvote') {
        prepend = 'ONVOTE'
      }
      document.title = `${prepend} - ${title}`
    } else {
      document.title = defaultTitleRef.current
    }

    return () => {
      document.title = defaultTitleRef.current
    }
  }, [title])
}
