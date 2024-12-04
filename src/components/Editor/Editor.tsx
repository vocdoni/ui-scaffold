import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown'
import { OverflowNode } from '@lexical/overflow'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { useState } from 'react'
import { AutoLinkPlugin } from './plugins/AutoLinkPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin'
import OnChangeMarkdown from './plugins/OnChangeMarkdown'
import ReadOnlyPlugin from './plugins/ReadOnlyPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import exampleTheme from './theme'

import { Box } from '@chakra-ui/react'
import './styles.css'

function Placeholder(props: any) {
  return <div className='editor-placeholder'>{props.placeholder}</div>
}

type EditorProps = {
  isDisabled?: boolean
  maxLength?: number
  onChange: (value: string) => void
  placeholder?: string
  defaultValue?: string
}

const Editor = (props: EditorProps) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

  const settings = {
    editorState: () => $convertFromMarkdownString(props.defaultValue ?? '', TRANSFORMERS),
    namespace: '',
    // The editor theme
    theme: exampleTheme,
    // Handling of errors during update
    onError(error: any) {
      throw error
    },
    // Any custom nodes go here
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
      <Box
        className='editor-container'
        bg={'text_area.bg_light'}
        _dark={{
          bgColor: 'text_area.bg_dark',
          borderColor: 'text_area.border_dark',

          '.editor-placeholder': {
            color: 'text_area.placeholder',
          },

          '.toolbar': {
            bgColor: 'text_area.toolbar_dark.bg',
            borderColor: 'text_area.toolbar_dark.border',
          },

          '.toolbar .divider': {
            bgColor: 'text_area.toolbar_dark.border',
          },

          '.toolbar .toolbar-item:hover:not([disabled])': {
            bgColor: 'text_area.toolbar_dark.item_hover',
          },

          '.toolbar-item:not([disabled])': {
            bgColor: 'text_area.toolbar_dark.item_bg',
          },

          _hover: {
            outline: '1px solid',
            outlineColor: 'text_area.border_dark',
          },
          _focusWithin: {
            borderColor: 'transparent',
            outline: '2px solid',
            outlineColor: 'input.outline.dark',
          },
        }}
      >
        <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
        <div className='editor-inner'>
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={
              <div ref={onRef}>
                <ContentEditable className='editor-input' />
              </div>
            }
            placeholder={<Placeholder placeholder={props.placeholder} />}
          />
          <HistoryPlugin />
          <LexicalClickableLinkPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangeMarkdown onChange={props.onChange} transformers={TRANSFORMERS} />
          <ReadOnlyPlugin isDisabled={props.isDisabled} />
          <AutoLinkPlugin />
          {props.maxLength && props.maxLength > 0 && (
            <>
              <CharacterLimitPlugin maxLength={props.maxLength} charset='UTF-8' />
              <MaxLengthPlugin maxLength={props.maxLength} />
            </>
          )}
          {floatingAnchorElem && (
            <>
              <FloatingLinkEditorPlugin
                anchorElem={floatingAnchorElem}
                isLinkEditMode={isLinkEditMode}
                setIsLinkEditMode={setIsLinkEditMode}
              />
              <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
            </>
          )}
          <ListMaxIndentLevelPlugin maxDepth={3} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </Box>
    </LexicalComposer>
  )
}

export default Editor
