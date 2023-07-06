import { extendTheme } from '@chakra-ui/react'
import { ElectionQuestions } from './components/Questions'
import { theme } from '..'

export const cofirmTheme = extendTheme(theme, {
  components: {
    ElectionQuestions,
  },
})
