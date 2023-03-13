import { Box, HStack, Text } from '@chakra-ui/react'

const Counters = () => (
  <HStack gap={6}>
    <Box>
      <Text
        textAlign='center'
        fontSize='1.8em'
        fontWeight='bold'
        color='branding.purple1'
      >
        1K+
      </Text>
      <Text fontSize='.8em'>ETH funded</Text>
    </Box>
    <Box>
      <Text
        textAlign='center'
        fontSize='1.8em'
        fontWeight='bold'
        color='branding.purple2'
      >
        147K+
      </Text>
      <Text fontSize='.8em'>Voting elections</Text>
    </Box>
    <Box>
      <Text
        textAlign='center'
        fontSize='1.8em'
        fontWeight='bold'
        color='branding.purple3'
      >
        3K+
      </Text>
      <Text fontSize='.8em'>Submited votes</Text>
    </Box>
  </HStack>
)
export default Counters
