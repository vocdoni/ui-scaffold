import { Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
import { LinkNode } from '@lexical/link'
import { ListItemNode, ListNode, ListType, SerializedListItemNode, SerializedListNode } from '@lexical/list'
import { HeadingNode, HeadingTagType } from '@lexical/rich-text'
import {
  $createTextNode,
  DOMConversionMap,
  DOMConversionOutput,
  NodeKey,
  ParagraphNode,
  SerializedElementNode,
  SerializedParagraphNode,
} from 'lexical'
import { ReactNode } from 'react'

type SerializedChakraTextNode = SerializedParagraphNode
type SerializedChakraHeadingNode = SerializedElementNode & { tag: HeadingTagType }
type SerializedChakraListNode = SerializedListNode
type SerializedChakraLinkNode = SerializedElementNode & { url: string }

export class ChakraTextNode extends ParagraphNode {
  constructor(key?: NodeKey) {
    super(key)
  }

  static getType(): string {
    return 'chakra-text'
  }

  static clone(node: ChakraTextNode): ChakraTextNode {
    const clone = new ChakraTextNode(node.__key)
    clone.__format = node.__format
    clone.__indent = node.__indent
    clone.__dir = node.__dir
    return clone
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('p')
    dom.className = 'chakra-text'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return {
      p: () => ({
        conversion: convertParagraphElement,
        priority: 1,
      }),
    }
  }

  exportJSON(): SerializedChakraTextNode {
    return {
      ...super.exportJSON(),
      type: 'chakra-text',
      version: 1,
      textFormat: 0,
      textStyle: '',
    }
  }

  static importJSON(serializedNode: SerializedChakraTextNode): ChakraTextNode {
    const node = new ChakraTextNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  decorate(): ReactNode {
    return <Text>{this.getTextContent()}</Text>
  }
}

export class ChakraHeadingNode extends HeadingNode {
  constructor(tag: HeadingTagType, key?: NodeKey) {
    super(tag, key)
  }

  static getType(): string {
    return 'chakra-heading'
  }

  static clone(node: ChakraHeadingNode): ChakraHeadingNode {
    const clone = new ChakraHeadingNode(node.getTag(), node.__key)
    clone.__format = node.__format
    clone.__indent = node.__indent
    clone.__dir = node.__dir
    return clone
  }

  createDOM(): HTMLElement {
    const tag = this.getTag()
    const dom = document.createElement(tag)
    dom.className = 'chakra-heading'
    return dom
  }

  exportJSON(): SerializedChakraHeadingNode {
    return {
      ...super.exportJSON(),
      tag: this.getTag(),
      type: 'chakra-heading',
      version: 1,
    }
  }

  decorate(): ReactNode {
    return <Heading as={this.getTag()}>{this.getTextContent()}</Heading>
  }
}

export class ChakraListNode extends ListNode {
  constructor(listType: ListType, key?: NodeKey) {
    super(listType, 1, key)
  }

  static getType(): string {
    return 'chakra-list'
  }

  static clone(node: ChakraListNode): ChakraListNode {
    const clone = new ChakraListNode(node.getListType(), node.__key)
    clone.__format = node.__format
    clone.__indent = node.__indent
    clone.__dir = node.__dir
    return clone
  }

  createDOM(): HTMLElement {
    const tag = this.getTag()
    const dom = document.createElement(tag)
    dom.className = 'chakra-list'
    return dom
  }

  getTag(): 'ul' | 'ol' {
    return this.getListType() === 'number' ? 'ol' : 'ul'
  }

  exportJSON(): SerializedChakraListNode {
    return {
      ...super.exportJSON(),
      type: 'chakra-list',
      version: 1,
      listType: this.getListType(),
      start: 1,
      tag: this.getTag(),
    }
  }

  decorate(): ReactNode {
    const ListComponent = this.getTag() === 'ol' ? OrderedList : UnorderedList
    return <ListComponent>{this.getTextContent()}</ListComponent>
  }
}

export class ChakraListItemNode extends ListItemNode {
  constructor(value: number = 1, checked: boolean = false, key?: NodeKey) {
    super(value, checked, key)
  }

  static getType(): string {
    return 'chakra-list-item'
  }

  static clone(node: ChakraListItemNode): ChakraListItemNode {
    const clone = new ChakraListItemNode(node.getValue(), node.getChecked(), node.__key)
    clone.__format = node.__format
    clone.__indent = node.__indent
    clone.__dir = node.__dir
    return clone
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('li')
    dom.className = 'chakra-list-item'
    return dom
  }

  exportJSON(): SerializedListItemNode {
    return {
      ...super.exportJSON(),
      type: 'chakra-list-item',
      version: 1,
      value: this.getValue(),
      checked: this.getChecked(),
    }
  }

  static importJSON(serializedNode: SerializedListItemNode): ChakraListItemNode {
    const node = new ChakraListItemNode(serializedNode.value, serializedNode.checked)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  decorate(): ReactNode {
    return <ListItem value={this.getValue()}>{this.getTextContent()}</ListItem>
  }
}

export class ChakraLinkNode extends LinkNode {
  constructor(url: string, attributes = {}, key?: NodeKey) {
    super(url, attributes, key)
  }

  static getType(): string {
    return 'chakra-link'
  }

  static clone(node: ChakraLinkNode): ChakraLinkNode {
    const clone = new ChakraLinkNode(
      node.getURL(),
      {
        rel: node.getRel(),
        target: node.getTarget(),
        title: node.getTitle(),
      },
      node.__key
    )
    clone.__format = node.__format
    clone.__indent = node.__indent
    clone.__dir = node.__dir
    return clone
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('a')
    dom.href = this.getURL()
    dom.className = 'chakra-link'
    return dom
  }

  exportJSON(): SerializedChakraLinkNode {
    return {
      ...super.exportJSON(),
      type: 'chakra-link',
      version: 1,
      url: this.getURL(),
    }
  }

  decorate(): ReactNode {
    return <Link href={this.getURL()}>{this.getTextContent()}</Link>
  }
}

function convertParagraphElement(element: HTMLElement): DOMConversionOutput {
  const node = new ChakraTextNode()
  if (element.textContent) {
    const textNode = $createTextNode(element.textContent)
    node.append(textNode)
  }
  return { node }
}

export function $createChakraTextNode(): ChakraTextNode {
  return new ChakraTextNode()
}

export function $createChakraHeadingNode(tag: HeadingTagType): ChakraHeadingNode {
  return new ChakraHeadingNode(tag)
}

export function $createChakraListNode(ordered: boolean): ChakraListNode {
  return new ChakraListNode(ordered ? 'number' : 'bullet')
}

export function $createChakraListItemNode(): ChakraListItemNode {
  return new ChakraListItemNode()
}

export function $createChakraLinkNode(url: string): ChakraLinkNode {
  return new ChakraLinkNode(url, {})
}
