import { TextMatchTransformer } from '@lexical/markdown'
import type { EditorConfig, NodeKey, SerializedLexicalNode, TextNode } from 'lexical'
import { DecoratorNode } from 'lexical'

type SerializedImageNode = {
  src: string
  alt: string
} & SerializedLexicalNode

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string
  __alt: string

  static getType() {
    return 'image'
  }

  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__alt, node.__key)
  }

  constructor(src: string, alt: string, key?: NodeKey) {
    super(key)
    this.__src = src
    this.__alt = alt
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement('div')
    return div
  }

  update(): boolean {
    return false
  }

  decorate(): JSX.Element {
    return <img src={this.__src} alt={this.__alt} className='lexical-image' />
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      src: this.__src,
      alt: this.__alt,
      type: 'image',
      version: 1,
    }
  }

  getSrc(): string {
    return this.__src
  }

  getAltText(): string {
    return this.__alt
  }

  static importJSON(json: SerializedImageNode): ImageNode {
    return new ImageNode(json.src, json.alt)
  }
}

export function $createImageNode(src: string, alt: string): ImageNode {
  return new ImageNode(src, alt)
}

export function $isImageNode(node: any): node is ImageNode {
  return node instanceof ImageNode
}

export const IMAGE: TextMatchTransformer = {
  dependencies: [ImageNode],
  export: (node) => {
    if (!$isImageNode(node)) {
      return null
    }

    return `![${node.getAltText()}](${node.getSrc()})`
  },

  importRegExp: /!\[([^\]]*)\]\(([^)]+)\)/,
  regExp: /!\[([^\]]*)\]\(([^)]+)\)$/,

  replace: (textNode: TextNode, match: RegExpMatchArray) => {
    const [, altText = '', src = ''] = match

    if (!src) return

    const imageNode = $createImageNode(src, altText)
    textNode.replace(imageNode)
  },

  trigger: ')',
  type: 'text-match',
}
