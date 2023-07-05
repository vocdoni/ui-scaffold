import { WarningIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError() as Error

  return (
    <Flex flexDirection='column' gap={4} alignItems='center' mt={12}>
      <WarningIcon />
      <Text>Error loading the page</Text>
      <Text>{error.toString()}</Text>
    </Flex>
  )
}

export default Error
