import { Box, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react'
import vcdLogo from '/assets/logo-classic.svg'
import { Button } from '@vocdoni/chakra-components'
import { useAccountPlan } from '~components/AccountSaas/useAccountPlan'

const SaasFooter = () => {
  const { data } = useAccountPlan()
  const isCustom = data?.plan === 'custom'
  const isFree = data?.plan === 'free'

  return (
    <Box as='footer' mt='auto'>
      <Flex justify={'space-around'} gap={6}>
        <Image src={vcdLogo} w='125px' mb='12px' />
        <Text fontSize='sm'>Privacy Policy</Text>
        <Text fontSize='sm'>support@vocdoni.org</Text>
        {isFree && <Text fontSize='sm'>$0.00</Text>}
        {!isCustom && <Button>UPGRADE TO PREMIUM</Button>}
      </Flex>
    </Box>
  )
}

export default SaasFooter
