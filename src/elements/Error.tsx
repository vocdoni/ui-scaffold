import { WarningIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'

const Error = () => (
  <Flex flexDirection='column' gap={4} alignItems='center' mt={12}>
    <WarningIcon />
    <Text>Error loading the page</Text>
  </Flex>
)

export default Error
