import { extendTheme, theme } from '@chakra-ui/react'
import { colors } from '../../colors'
import { PreviewQuestions } from './Questions'

export const confirmTheme = extendTheme(theme, {
  colors,
  components: {
    ElectionQuestions: PreviewQuestions,
  },
})
