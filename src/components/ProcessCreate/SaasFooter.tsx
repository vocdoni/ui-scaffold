import { Box, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react'
import vcdLogo from '/assets/logo-classic.svg'
import { Button } from '@vocdoni/chakra-components'

const SaasFooter = () => {
  // Return a footer component
  return (
    <Box as='footer' mt='auto'>
      <Flex justify={'space-around'} gap={6}>
        <Image src={vcdLogo} w='125px' mb='12px' />
        <Text fontSize='sm'>Privacy Policy</Text>
        <Text fontSize='sm'>support@vocdoni.org</Text>
        <Text fontSize='sm'>$0.00</Text>
        <Button>UPGRADE TO PREMIUM</Button>
      </Flex>
    </Box>
  )
}

export default SaasFooter
