import { extendTheme, theme } from '@chakra-ui/react'
import { PreviewQuestions } from './Questions'
import { colors } from '../../colors'

export const cofirmTheme = extendTheme(theme, {
  colors,
  components: {
    ElectionQuestions: PreviewQuestions,
  },
})
