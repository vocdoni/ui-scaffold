import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown'
import { OverflowNode } from '@lexical/overflow'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
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
import { ParagraphNode } from 'lexical'
import {
  ChakraHeadingNode,
  ChakraLinkNode,
  ChakraListItemNode,
  ChakraListNode,
  ChakraTextNode,
} from './nodes/ChakraNodes'
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
    theme: exampleTheme,
    onError(error: any) {
      throw error
    },
    nodes: [
      // Base nodes needed for transformers
      HeadingNode,
      ParagraphNode,
      ListNode,
      ListItemNode,
      LinkNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      OverflowNode,
      // Node replacements
      {
        replace: ParagraphNode,
        with: (node: ParagraphNode) => {
          const chakraNode = new ChakraTextNode()
          chakraNode.__format = node.__format
          chakraNode.__indent = node.__indent
          chakraNode.__dir = node.__dir
          return chakraNode
        },
        withKlass: ChakraTextNode,
      },
      {
        replace: HeadingNode,
        with: (node: HeadingNode) => {
          const chakraNode = new ChakraHeadingNode(node.getTag())
          chakraNode.__format = node.__format
          chakraNode.__indent = node.__indent
          chakraNode.__dir = node.__dir
          return chakraNode
        },
        withKlass: ChakraHeadingNode,
      },
      {
        replace: ListNode,
        with: (node: ListNode) => {
          const chakraNode = new ChakraListNode(node.getListType())
          chakraNode.__format = node.__format
          chakraNode.__indent = node.__indent
          chakraNode.__dir = node.__dir
          return chakraNode
        },
        withKlass: ChakraListNode,
      },
      {
        replace: ListItemNode,
        with: (node: ListItemNode) => {
          const chakraNode = new ChakraListItemNode(node.getValue(), node.getChecked())
          chakraNode.__format = node.__format
          chakraNode.__indent = node.__indent
          chakraNode.__dir = node.__dir
          return chakraNode
        },
        withKlass: ChakraListItemNode,
      },
      {
        replace: LinkNode,
        with: (node: LinkNode) => {
          const chakraNode = new ChakraLinkNode(node.getURL(), {
            rel: node.getRel(),
            target: node.getTarget(),
            title: node.getTitle(),
          })
          chakraNode.__format = node.__format
          chakraNode.__indent = node.__indent
          chakraNode.__dir = node.__dir
          return chakraNode
        },
        withKlass: ChakraLinkNode,
      },
      // Our custom nodes
      ChakraTextNode,
      ChakraHeadingNode,
      ChakraListNode,
      ChakraListItemNode,
      ChakraLinkNode,
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

          '.toolbar button.toolbar-item i.format': {
            filter: 'invert(1)',
          },

          '.toolbar .divider': {
            bgColor: 'text_area.toolbar_dark.border',
          },

          '.toolbar .toolbar-item:hover:not([disabled])': {
            bgColor: 'text_area.toolbar_dark.item_hover',
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
