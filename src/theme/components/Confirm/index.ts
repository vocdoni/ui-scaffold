import { extendTheme, theme } from '@chakra-ui/react'
import { colors } from '@theme/colors'
import { PreviewQuestions } from './Questions'

export const cofirmTheme = extendTheme(theme, {
  colors,
  components: {
    ElectionQuestions: PreviewQuestions,
  },
})
