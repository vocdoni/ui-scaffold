import { useEffect, useRef } from 'react'

// From https://github.com/uidotdev/usehooks/blob/main/index.js#L265-L269

export function useDocumentTitle(title?: string) {
  const defaultTitleRef = useRef(document.title)

  useEffect(() => {
    if (title) {
      document.title = title
    } else {
      document.title = defaultTitleRef.current
    }

    return () => {
      document.title = defaultTitleRef.current
    }
  }, [title])
}
