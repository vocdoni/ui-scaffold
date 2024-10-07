import { Flex, useStepContext } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export type StepContentsProps = {}

export const StepContents = ({ children }: PropsWithChildren<StepContentsProps>) => {
  const { status } = useStepContext()

  if (status !== 'active') {
    return null
  }

  return (
    <Flex flexGrow={1} flexDirection='column' minH='100%'>
      {children}
    </Flex>
  )
}
