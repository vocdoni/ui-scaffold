import { useEffect, useRef } from 'react'

export function useDocumentTitle(title?: string) {
  const defaultTitleRef = useRef(document.title)

  useEffect(() => {
    if (title) {
      let prepend = 'Vocdoni'
      if (import.meta.env.theme === 'onvote') {
        prepend = 'OnVote'
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
