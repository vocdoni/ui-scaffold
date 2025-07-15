import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

export default function ReadOnlyPlugin({ isDisabled = false }: { isDisabled?: boolean }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.setEditable(!isDisabled)
  }, [editor, isDisabled])

  return null
}
