import { WarningIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <Flex flexDirection='column' gap={4} mt={12} alignItems='center'>
      <WarningIcon />
      <Text>Error loading the page</Text>
    </Flex>
  )
}

export default Error
