import arrowClockwise from '/shared/editor/arrow-clockwise.svg'
import arrowCounter from '/shared/editor/arrow-counterclockwise.svg'
import chatSquareQuote from '/shared/editor/chat-square-quote.svg'
import chevronDown from '/shared/editor/chevron-down.svg'
import close from '/shared/editor/close.svg'
import code from '/shared/editor/code.svg'
import justify from '/shared/editor/justify.svg'
import link from '/shared/editor/link.svg'
import listOl from '/shared/editor/list-ol.svg'
import listUl from '/shared/editor/list-ul.svg'
import pencil from '/shared/editor/pencil-fill.svg'
import success from '/shared/editor/success-alt.svg'
import textCenter from '/shared/editor/text-center.svg'
import textLeft from '/shared/editor/text-left.svg'
import textParagraph from '/shared/editor/text-paragraph.svg'
import textRight from '/shared/editor/text-right.svg'
import trash from '/shared/editor/trash.svg'
import typeBold from '/shared/editor/type-bold.svg'
import typeH1 from '/shared/editor/type-h1.svg'
import typeH2 from '/shared/editor/type-h2.svg'
import typeH3 from '/shared/editor/type-h3.svg'
import typeItalic from '/shared/editor/type-italic.svg'
import typeStrikethrough from '/shared/editor/type-strikethrough.svg'
import typeUnderline from '/shared/editor/type-underline.svg'

export const shared = {
  'i.chevron-down': {
    bgImg: chevronDown,
  },
  '.link-editor div.link-edit': {
    bgImg: pencil,
  },
  '.link-editor div.link-trash': {
    bgImg: trash,
  },
  '.link-editor div.link-cancel': {
    bgImg: close,
  },
  '.link-editor div.link-confirm': {
    bgImg: success,
  },
  'i.undo': {
    bgImg: arrowCounter,
  },
  'i.redo': {
    bgImg: arrowClockwise,
  },
  '.icon.paragraph': {
    bgImg: textParagraph,
  },
  '.icon.large-heading, .icon.h1': {
    bgImg: typeH1,
  },
  '.icon.small-heading, .icon.h2': {
    bgImg: typeH2,
  },
  '.icon.small-heading, .icon.h3': {
    bgImg: typeH3,
  },
  '.icon.bullet-list, .icon.ul': {
    bgImg: listUl,
  },
  '.icon.numbered-list, .icon.ol': {
    bgImg: listOl,
  },
  '.icon.quote': {
    bgImg: chatSquareQuote,
  },
  '.icon.code': {
    bgImg: code,
  },
  'i.bold': {
    bgImg: typeBold,
  },
  'i.italic': {
    bgImg: typeItalic,
  },
  'i.underline': {
    bgImg: typeUnderline,
  },
  'i.strikethrough': {
    bgImg: typeStrikethrough,
  },
  'i.code': {
    bgImg: code,
  },
  'i.link': {
    bgImg: link,
  },
  'i.left-align': {
    bgImg: textLeft,
  },
  'i.center-align': {
    bgImg: textCenter,
  },
  'i.right-align': {
    bgImg: textRight,
  },
  'i.justify-align': {
    bgImg: justify,
  },
}
