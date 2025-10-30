import { Card, HStack, Icon, IconButton } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { LuImage } from 'react-icons/lu'

import { $createImageNode } from '../ImageNode'

const VERTICAL_GAP = 10
const HORIZONTAL_OFFSET = 5

export function setFloatingElemPositionForInsertToolbar(
  targetRect: DOMRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET
): void {
  const scrollerElem = anchorElem.parentElement

  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = '0'
    floatingElem.style.transform = 'translate(-10000px, -10000px)'
    return
  }

  const floatingElemRect = floatingElem.getBoundingClientRect()
  const anchorElementRect = anchorElem.getBoundingClientRect()
  const editorScrollerRect = scrollerElem.getBoundingClientRect()

  let top = targetRect.top - floatingElemRect.height - verticalGap
  let left = targetRect.left - horizontalOffset

  if (top < editorScrollerRect.top) {
    top += floatingElemRect.height + targetRect.height + verticalGap * 2
  }

  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset
  }

  top -= anchorElementRect.top
  left -= anchorElementRect.left

  floatingElem.style.opacity = '1'
  floatingElem.style.transform = `translate(-2px, ${top}px)`
}

function InsertToolbar({
  editor,
  anchorElem,
  setIsImageEditMode,
}: {
  editor: LexicalEditor
  anchorElem: HTMLElement
  setIsImageEditMode: Dispatch<boolean>
}): JSX.Element {
  const { t } = useTranslation()
  const popupInsertToolbarRef = useRef<HTMLDivElement | null>(null)

  const insertImage = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const imageNode = $createImageNode('https://', '')
        selection.insertNodes([imageNode])
        setIsImageEditMode(true)
      }
    })
  }, [editor, setIsImageEditMode])

  const updateInsertToolbar = useCallback(() => {
    const selection = $getSelection()

    const popupInsertToolbarElem = popupInsertToolbarRef.current
    const nativeSelection = window.getSelection()

    if (popupInsertToolbarElem === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = nativeSelection.getRangeAt(0).getBoundingClientRect()
      setFloatingElemPositionForInsertToolbar(rangeRect, popupInsertToolbarElem, anchorElem)
    }
  }, [editor, anchorElem])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateInsertToolbar()
      })
    }

    window.addEventListener('resize', update)
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update)
    }

    return () => {
      window.removeEventListener('resize', update)
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update)
      }
    }
  }, [editor, updateInsertToolbar, anchorElem])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateInsertToolbar()
    })
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateInsertToolbar()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateInsertToolbar()
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, updateInsertToolbar])

  return (
    <Card ref={popupInsertToolbarRef} position='absolute' top={0} left={0} p={1} zIndex='contents'>
      {editor.isEditable() && (
        <HStack>
          <IconButton
            icon={<Icon as={LuImage} />}
            aria-label={t('editor.image.title', 'Image')}
            variant='ghost'
            colorScheme='black'
            size='sm'
            onClick={insertImage}
          />
        </HStack>
      )}
    </Card>
  )
}

function useFloatingInsertToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  setIsImageEditMode: Dispatch<boolean>
): JSX.Element | null {
  const [isInsertToolbarVisible, setIsInsertToolbarVisible] = useState(false)

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return
      }
      const selection = $getSelection()
      const nativeSelection = window.getSelection()
      const rootElement = editor.getRootElement()

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) || rootElement === null || !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsInsertToolbarVisible(false)
        return
      }

      if (!$isRangeSelection(selection)) {
        return
      }

      // Show toolbar when editor is focused (selection can be collapsed or not)
      setIsInsertToolbarVisible(true)
    })
  }, [editor])

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup)
    return () => {
      document.removeEventListener('selectionchange', updatePopup)
    }
  }, [updatePopup])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup()
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsInsertToolbarVisible(false)
        }
      })
    )
  }, [editor, updatePopup])

  if (!isInsertToolbarVisible) {
    return null
  }

  return createPortal(
    <InsertToolbar editor={editor} anchorElem={anchorElem} setIsImageEditMode={setIsImageEditMode} />,
    anchorElem
  )
}

export default function FloatingInsertToolbarPlugin({
  anchorElem = document.body,
  setIsImageEditMode,
}: {
  anchorElem?: HTMLElement
  setIsImageEditMode: Dispatch<boolean>
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  return useFloatingInsertToolbar(editor, anchorElem, setIsImageEditMode)
}
