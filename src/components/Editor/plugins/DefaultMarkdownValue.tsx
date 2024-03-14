import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { $createParagraphNode, $createTextNode, $getRoot, $getSelection } from 'lexical'

export default function DefaultMarkdownValue({ mdString }: { mdString?: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (mdString) {
      editor.update(() => {
        const root = $getRoot()
        if (root.getTextContent().length === 0) {
          const p = $createParagraphNode()
          p.append($createTextNode(mdString))
          root.append(p)
        }
      })
    }
  }, [editor])

  return null
}
