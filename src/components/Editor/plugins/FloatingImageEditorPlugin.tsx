import { Card, HStack, Icon, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  BaseSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import * as React from 'react'
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { LuCheck, LuPencil, LuTrash2, LuX } from 'react-icons/lu'

import { $isImageNode, ImageNode } from '../ImageNode'

const VERTICAL_GAP = 10
const HORIZONTAL_OFFSET = 5

export function setFloatingElemPositionForImageEditor(
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

  let top = targetRect.bottom + verticalGap
  let left = targetRect.left - horizontalOffset

  // Flip to top if overlaps bottom
  if (top + floatingElemRect.height > editorScrollerRect.bottom) {
    top = targetRect.top - floatingElemRect.height - verticalGap
  }

  // Keep within right edge
  if (left + floatingElemRect.width > editorScrollerRect.right) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset
  }

  // Convert to relative coordinates
  top -= anchorElementRect.top
  left -= anchorElementRect.left

  floatingElem.style.opacity = '1'
  floatingElem.style.transform = `translate(${left}px, ${top}px)`
}

function FloatingImageEditor({
  editor,
  isImage,
  setIsImage,
  anchorElem,
  isImageEditMode,
  setIsImageEditMode,
}: {
  editor: LexicalEditor
  isImage: boolean
  setIsImage: Dispatch<boolean>
  anchorElem: HTMLElement
  isImageEditMode: boolean
  setIsImageEditMode: Dispatch<boolean>
}): JSX.Element {
  const { t } = useTranslation()
  const editorRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [editedSrc, setEditedSrc] = useState('https://')
  const [editedAlt, setEditedAlt] = useState('')
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(null)
  const [imageNode, setImageNode] = useState<ImageNode | null>(null)

  const updateImageEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const nodes = selection.getNodes()
      const foundImageNode = nodes.find((node) => $isImageNode(node))

      if (foundImageNode && $isImageNode(foundImageNode)) {
        setImageNode(foundImageNode)
        setImageSrc(foundImageNode.getSrc())
        setImageAlt(foundImageNode.getAltText())
      } else {
        setImageNode(null)
        setImageSrc('')
        setImageAlt('')
      }
    }

    const editorElem = editorRef.current
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()

    if (selection !== null && rootElement !== null && editor.isEditable() && imageNode) {
      // Get the DOM element for the image node
      const domNode = editor.getElementByKey(imageNode.getKey())
      if (domNode) {
        const domRect = domNode.getBoundingClientRect()
        setFloatingElemPositionForImageEditor(domRect, editorElem, anchorElem)
      }
      setLastSelection(selection)
    } else if (!activeElement) {
      if (rootElement !== null) {
        setFloatingElemPositionForImageEditor(null, editorElem, anchorElem)
      }
      setLastSelection(null)
      setIsImageEditMode(false)
      setImageSrc('')
      setImageAlt('')
    }

    return true
  }, [anchorElem, editor, setIsImageEditMode, isImageEditMode, imageNode])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateImageEditor()
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
  }, [anchorElem.parentElement, editor, updateImageEditor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateImageEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateImageEditor()
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isImage) {
            setIsImage(false)
            return true
          }
          return false
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor, updateImageEditor, setIsImage, isImage])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateImageEditor()
    })
  }, [editor, updateImageEditor])

  useEffect(() => {
    if (isImageEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isImageEditMode, isImage])

  const monitorInputInteraction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleImageSubmission()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setIsImageEditMode(false)
    }
  }

  const handleImageSubmission = () => {
    if (lastSelection !== null && imageNode) {
      const nodeKey = imageNode.getKey()
      editor.update(() => {
        const node = $getNodeByKey(nodeKey)
        if (node && $isImageNode(node)) {
          const writable = node.getWritable()
          writable.__src = editedSrc
          writable.__alt = editedAlt
        }
      })
      setEditedSrc('https://')
      setEditedAlt('')
      setIsImageEditMode(false)
    }
  }

  const handleImageDelete = () => {
    if (imageNode) {
      editor.update(() => {
        if ($isImageNode(imageNode)) {
          imageNode.remove()
        }
      })
      setIsImage(false)
    }
  }

  if (!isImage) {
    return null
  }

  return (
    <Card ref={editorRef} position='absolute' top={0} left={0} p={1} zIndex='contents'>
      {isImageEditMode ? (
        <VStack spacing={2} align='stretch' minW='300px'>
          <Input
            ref={inputRef}
            value={editedSrc}
            onChange={(e) => setEditedSrc(e.target.value)}
            onKeyDown={monitorInputInteraction}
            placeholder={t('editor.image.url_placeholder', { defaultValue: 'Enter image URL' })}
            size='sm'
          />
          <Input
            value={editedAlt}
            onChange={(e) => setEditedAlt(e.target.value)}
            onKeyDown={monitorInputInteraction}
            placeholder={t('editor.image.alt_placeholder', { defaultValue: 'Enter alt text' })}
            size='sm'
          />
          <HStack spacing={2} justifyContent='flex-end'>
            <IconButton
              icon={<Icon as={LuX} />}
              aria-label={t('editor.image.cancel', { defaultValue: 'Cancel' })}
              size='xs'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsImageEditMode(false)}
            />
            <IconButton
              icon={<Icon as={LuCheck} />}
              aria-label={t('editor.image.confirm', { defaultValue: 'Confirm' })}
              size='xs'
              colorScheme='black'
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleImageSubmission}
            />
          </HStack>
        </VStack>
      ) : (
        <HStack spacing={2}>
          <Text flex={1} fontSize='sm' noOfLines={1}>
            {imageSrc}
          </Text>
          <IconButton
            icon={<Icon as={LuPencil} />}
            aria-label={t('editor.image.edit', { defaultValue: 'Edit image' })}
            size='xs'
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setEditedSrc(imageSrc)
              setEditedAlt(imageAlt)
              setIsImageEditMode(true)
            }}
          />
          <IconButton
            icon={<Icon as={LuTrash2} />}
            aria-label={t('editor.image.remove', { defaultValue: 'Remove image' })}
            size='xs'
            colorScheme='red'
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleImageDelete}
          />
        </HStack>
      )}
    </Card>
  )
}

function useFloatingImageEditorToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  isImageEditMode: boolean,
  setIsImageEditMode: Dispatch<boolean>
): JSX.Element | null {
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isImage, setIsImage] = useState(false)

  useEffect(() => {
    function updateToolbar() {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes()
        const imageNodes = nodes.filter((node) => $isImageNode(node))

        // Only show editor if exactly one image is selected
        if (imageNodes.length === 1) {
          setIsImage(true)
        } else {
          setIsImage(false)
        }
      }
    }
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CLICK_COMMAND,
        () => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            const nodes = selection.getNodes()
            const imageNode = nodes.find((node) => $isImageNode(node))
            if (imageNode) {
              setIsImage(true)
              return true
            }
          }
          return false
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor])

  return createPortal(
    <FloatingImageEditor
      editor={activeEditor}
      isImage={isImage}
      anchorElem={anchorElem}
      setIsImage={setIsImage}
      isImageEditMode={isImageEditMode}
      setIsImageEditMode={setIsImageEditMode}
    />,
    anchorElem
  )
}

export default function FloatingImageEditorPlugin({
  anchorElem = document.body,
  isImageEditMode,
  setIsImageEditMode,
}: {
  anchorElem?: HTMLElement
  isImageEditMode: boolean
  setIsImageEditMode: Dispatch<boolean>
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  return useFloatingImageEditorToolbar(editor, anchorElem, isImageEditMode, setIsImageEditMode)
}
