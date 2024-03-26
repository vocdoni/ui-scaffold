import { useEffect } from 'react'

// From https://github.com/uidotdev/usehooks/blob/main/index.js#L265-L269

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])
}
