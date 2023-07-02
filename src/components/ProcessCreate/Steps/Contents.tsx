import { Box, useStepContext } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export type StepContentsProps = {}

export const StepContents = ({ children }: PropsWithChildren<StepContentsProps>) => {
  const { status } = useStepContext()

  if (status !== 'active') {
    return null
  }

  return (
    <Box flex='1' minW={1}>
      {children}
    </Box>
  )
}
