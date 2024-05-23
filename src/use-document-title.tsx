import { useEffect, useRef } from 'react'

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
