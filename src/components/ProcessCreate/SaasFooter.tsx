import { Box, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccountPlan } from '~components/Account/useAccountPlan'
import vcdLogo from '/assets/logo-classic.svg'

const SaasFooter = () => {
  const { t } = useTranslation()
  const bg = useColorModeValue('process_create.bg_light', 'process_create.bg_dark')

  const { data } = useAccountPlan()
  const isCustom = data?.plan === 'custom'
  const isFree = data?.plan === 'free'

  return (
    <Box bgColor={bg}>
      <Flex
        as='footer'
        maxW='2000px'
        mx='auto'
        justifyContent='space-between'
        alignItems='center'
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={6}
        px={{ base: 2.5, sm: 5, md: 10 }}
        py={{ base: 3, sm: 3, md: 6 }}
        mt='auto'
      >
        <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems='center' gap={6} order={{ base: 2, lg: 1 }}>
          <Image src={vcdLogo} w='125px' />
          <Link as={ReactRouterLink} to=''>
            {t('terms_and_conditions', { defaultValue: 'Terms and Conditions' })}
          </Link>
          <Link as={ReactRouterLink} to=''>
            {t('privacy_policy', { defaultValue: 'Privacy Policy' })}
          </Link>
          <Link as={ReactRouterLink} to=''>
            support@vocdoni.org
          </Link>
        </Flex>
        <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems='center' gap={6} order={{ base: 1, lg: 2 }}>
          {isFree && (
            <Text fontWeight='bold' fontSize='xl' mb={0}>
              $0.00
            </Text>
          )}
          {!isCustom && <Button>UPGRADE TO PREMIUM</Button>}
        </Flex>
      </Flex>
    </Box>
  )
}

export default SaasFooter
