import { $convertToMarkdownString } from '@lexical/markdown'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import type { EditorState } from 'lexical'
import type { Dispatch, SetStateAction } from 'react'

export type OnChangeMarkdownType = Dispatch<SetStateAction<string>> | ((value: string) => void)

export default function OnChangeMarkdown({
  onChange,
  transformers,
  __UNSAFE_debounceTime,
}: {
  transformers: any
  onChange: OnChangeMarkdownType
  __UNSAFE_debounceTime?: number
}) {
  return <OnChangePlugin onChange={(state) => transformState(state, onChange, transformers)} ignoreSelectionChange />
}

function transformState(editorState: EditorState, onChange: OnChangeMarkdownType, transformers: any) {
  editorState.read(() => {
    const markdown = $convertToMarkdownString(transformers)

    const withBrs = markdown
      // https://github.com/markedjs/marked/issues/190#issuecomment-865303317
      // .replace(/\n(?=\n)/g, '\n\n<br>\n')
      // When escape(markdown) with block quotes we end up with the following:
      // '&gt; block quote text'
      // and need to convert it back to the original, so the markdown is respected
      .replace(/^(&gt\;)(?=\s)(?!.*&lt\;)/gm, '>')

    onChange(withBrs)
  })
}
