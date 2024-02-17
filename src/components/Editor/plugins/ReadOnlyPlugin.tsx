import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

// When isDisabled truthy, set active editor in ReadOnly mode preventing changes
export default function ReadOnlyPlugin({ isDisabled = false }: { isDisabled?: boolean }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.setEditable(!isDisabled)
  }, [editor, isDisabled])

  return null
}
