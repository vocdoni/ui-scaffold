import { extendTheme, theme } from '@chakra-ui/react'
import { colors } from '~theme/onvote/colors'
import { PreviewQuestions } from './Questions'

export const cofirmTheme = extendTheme(theme, {
  colors,
  components: {
    ElectionQuestions: PreviewQuestions,
  },
})
