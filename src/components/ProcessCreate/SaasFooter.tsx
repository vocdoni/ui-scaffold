import { Box, Flex, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSubscription } from '~components/Auth/Subscription'
import { VocdoniLogo } from '~components/Layout/Logo'
import { PlanId } from '~constants'

const SaasFooter = () => {
  const { t } = useTranslation()
  const { subscription } = useSubscription()
  const isCustom = subscription?.plan.id === PlanId.Custom
  const isFree = subscription?.plan.id === PlanId.Free

  return (
    <Box bgColor={'process_create.bg_light'} _dark={{ bgColor: 'process_create.bg_dark' }}>
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
          <Box minW='100px'>
            <VocdoniLogo />
          </Box>
          <Link variant='footer' as={ReactRouterLink} to='' mt='5px' style={{ transform : 'scale(0.8)' }}>
            {t('terms_and_conditions', { defaultValue: 'Terms and Conditions' })}
          </Link>
          <Link variant='footer' as={ReactRouterLink} to='' mt='5px' style={{ transform : 'scale(0.8)' }}>
            {t('privacy_policy', { defaultValue: 'Privacy Policy' })}
          </Link>
          <Link variant='footer' mt='5px' href='mailto:support@vocdoni.org' style={{ transform : 'scale(0.8)' }}>support@vocdoni.org</Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default SaasFooter
