import { Box, BoxProps } from '@chakra-ui/react'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

export const ContentsBox = (props: BoxProps) => {
  const { bgSecondary } = useDarkMode()

  return <Box borderRadius='lg' bg={bgSecondary} p={4} {...props} />
}
