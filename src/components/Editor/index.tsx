import { Box, chakra, Input, Text } from '@chakra-ui/react'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown'
import { OverflowNode } from '@lexical/overflow'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { useState } from 'react'

import { FloatingLinkEditorPlugin, FloatingTextFormatToolbarPlugin } from './plugins'
import OnChangeMarkdown from './plugins/OnChangeMarkdown'

type EditorProps = {
  isDisabled?: boolean
  maxLength?: number
  onChange: (value: string) => void
  placeholder?: string
  defaultValue?: string
}

const ChakraContentEditable = chakra(ContentEditable)

const theme = {
  text: {
    bold: 'lexical-bold',
    italic: 'lexical-italic',
    underline: 'lexical-underline',
    strikethrough: 'lexical-strikethrough',
  },
  list: {
    ul: 'lexical-ul',
    ol: 'lexical-ol',
    listitem: 'lexical-li',
  },
  link: 'lexical-link',
}

const Editor = (props: EditorProps) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

  const settings = {
    editorState: () => $convertFromMarkdownString(props.defaultValue ?? '', TRANSFORMERS),
    namespace: '',
    theme,
    onError(error: any) {
      throw error
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      OverflowNode,
    ],
  }

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <LexicalComposer initialConfig={settings}>
      <Box position='relative'>
        <RichTextPlugin
          contentEditable={
            <Box ref={onRef}>
              <Input px={0} variant='unstyled' as={ChakraContentEditable} />
            </Box>
          }
          aria-placeholder={props.placeholder}
          placeholder={
            <Text position='absolute' top='2' color='texts.dark' pointerEvents='none'>
              {props.placeholder}
            </Text>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </Box>
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
      <OnChangeMarkdown onChange={props.onChange} transformers={TRANSFORMERS} />
      {props.maxLength && props.maxLength > 0 && <CharacterLimitPlugin maxLength={props.maxLength} charset='UTF-8' />}
      {floatingAnchorElem && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
          <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} setIsLinkEditMode={setIsLinkEditMode} />
        </>
      )}
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
  )
}

export default Editor
