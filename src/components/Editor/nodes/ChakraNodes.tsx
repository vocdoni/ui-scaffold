import { Heading, Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
import { HeadingNode, HeadingTagType, SerializedHeadingNode } from '@lexical/rich-text'
import {
  $createTextNode,
  DOMConversionMap,
  DOMConversionOutput,
  ElementNode,
  NodeKey,
  ParagraphNode,
  SerializedElementNode,
  SerializedParagraphNode,
} from 'lexical'
import { ReactNode } from 'react'

type SerializedChakraTextNode = SerializedElementNode
type SerializedChakraHeadingNode = SerializedElementNode & { level: number }
type SerializedChakraListNode = SerializedElementNode & { ordered: boolean }
type SerializedChakraLinkNode = SerializedElementNode & { url: string }

export class ChakraTextNode extends ParagraphNode {
  static getType(): string {
    return 'chakra-text'
  }

  static clone(node: ChakraTextNode): ChakraTextNode {
    return new ChakraTextNode(node.__key)
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

  exportJSON(): SerializedParagraphNode {
    return {
      ...super.exportJSON(),
      type: 'chakra-text',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedChakraTextNode): ChakraTextNode {
    const node = $createChakraTextNode()
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
  __level: HeadingTagType

  constructor(level: HeadingTagType = 'h1', key?: NodeKey) {
    super(level, key)
    this.__level = level
  }

  static getType(): string {
    return 'chakra-heading'
  }

  static clone(node: ChakraHeadingNode): ChakraHeadingNode {
    return new ChakraHeadingNode(node.__level, node.__key)
  }

  createDOM(): HTMLElement {
    const dom = document.createElement(`h${this.__level}`)
    dom.className = 'chakra-heading'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return {
      h1: () => ({
        conversion: convertHeadingElement,
        priority: 1,
      }),
      h2: () => ({
        conversion: convertHeadingElement,
        priority: 1,
      }),
      h3: () => ({
        conversion: convertHeadingElement,
        priority: 1,
      }),
    }
  }

  exportJSON(): SerializedHeadingNode {
    return {
      ...super.exportJSON(),
      tag: this.__level,
      type: 'chakra-heading',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedHeadingNode): ChakraHeadingNode {
    const node = $createChakraHeadingNode(serializedNode.tag)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  decorate(): ReactNode {
    return <Heading as={`${this.__level}`}>{this.getTextContent()}</Heading>
  }
}

export class ChakraListNode extends ElementNode {
  __ordered: boolean

  constructor(ordered: boolean = false, key?: NodeKey) {
    super(key)
    this.__ordered = ordered
  }

  static getType(): string {
    return 'chakra-list'
  }

  static clone(node: ChakraListNode): ChakraListNode {
    return new ChakraListNode(node.__ordered, node.__key)
  }

  createDOM(): HTMLElement {
    const tag = this.__ordered ? 'ol' : 'ul'
    const dom = document.createElement(tag)
    dom.className = 'chakra-list'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return {
      ul: () => ({
        conversion: convertListElement,
        priority: 1,
      }),
      ol: () => ({
        conversion: convertListElement,
        priority: 1,
      }),
    }
  }

  exportJSON(): SerializedChakraListNode {
    return {
      ...super.exportJSON(),
      ordered: this.__ordered,
      type: 'chakra-list',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedChakraListNode): ChakraListNode {
    const node = $createChakraListNode(serializedNode.ordered)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  decorate(): ReactNode {
    const ListComponent = this.__ordered ? OrderedList : UnorderedList
    return <ListComponent>{this.getTextContent()}</ListComponent>
  }
}

export class ChakraListItemNode extends ElementNode {
  static getType(): string {
    return 'chakra-list-item'
  }

  static clone(node: ChakraListItemNode): ChakraListItemNode {
    return new ChakraListItemNode(node.__key)
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('li')
    dom.className = 'chakra-list-item'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return {
      li: () => ({
        conversion: convertListItemElement,
        priority: 1,
      }),
    }
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: 'chakra-list-item',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedElementNode): ChakraListItemNode {
    const node = $createChakraListItemNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  decorate(): ReactNode {
    return <ListItem>{this.getTextContent()}</ListItem>
  }
}

export class ChakraLinkNode extends ElementNode {
  __url: string

  constructor(url: string = '', key?: NodeKey) {
    super(key)
    this.__url = url
  }

  static getType(): string {
    return 'chakra-link'
  }

  static clone(node: ChakraLinkNode): ChakraLinkNode {
    return new ChakraLinkNode(node.__url, node.__key)
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('a')
    dom.href = this.__url
    dom.className = 'chakra-link'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return {
      a: () => ({
        conversion: convertLinkElement,
        priority: 1,
      }),
    }
  }

  exportJSON(): SerializedChakraLinkNode {
    return {
      ...super.exportJSON(),
      url: this.__url,
      type: 'chakra-link',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedChakraLinkNode): ChakraLinkNode {
    const node = $createChakraLinkNode(serializedNode.url)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  decorate(): ReactNode {
    return <Link href={this.__url}>{this.getTextContent()}</Link>
  }
}

function convertParagraphElement(element: HTMLElement): DOMConversionOutput {
  const node = $createChakraTextNode()
  if (element.textContent) {
    const textNode = $createTextNode(element.textContent)
    node.append(textNode)
  }
  return { node }
}

function convertHeadingElement(element: HTMLElement): DOMConversionOutput {
  const tag = element.tagName.toLowerCase()
  const node = $createChakraHeadingNode(tag as HeadingTagType)
  if (element.textContent) {
    const textNode = $createTextNode(element.textContent)
    node.append(textNode)
  }
  return { node }
}

function convertListElement(element: HTMLElement): DOMConversionOutput {
  const tag = element.tagName.toLowerCase()
  const node = $createChakraListNode(tag === 'ol')
  return { node }
}

function convertListItemElement(element: HTMLElement): DOMConversionOutput {
  const node = $createChakraListItemNode()
  if (element.textContent) {
    const textNode = $createTextNode(element.textContent)
    node.append(textNode)
  }
  return { node }
}

function convertLinkElement(element: HTMLElement): DOMConversionOutput {
  const href = element.getAttribute('href') || ''
  const node = $createChakraLinkNode(href)
  if (element.textContent) {
    const textNode = $createTextNode(element.textContent)
    node.append(textNode)
  }
  return { node }
}

export function $createChakraTextNode(): ChakraTextNode {
  return new ChakraTextNode()
}

export function $createChakraHeadingNode(level: HeadingTagType): ChakraHeadingNode {
  return new ChakraHeadingNode(level)
}

export function $createChakraListNode(ordered: boolean): ChakraListNode {
  return new ChakraListNode(ordered)
}

export function $createChakraListItemNode(): ChakraListItemNode {
  return new ChakraListItemNode()
}

export function $createChakraLinkNode(url: string): ChakraLinkNode {
  return new ChakraLinkNode(url)
}
