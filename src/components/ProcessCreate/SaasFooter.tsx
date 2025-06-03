import { Box, Flex, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { VocdoniLogo } from '~components/shared/Layout/Logo'
import { Routes } from '~routes'

const SaasFooter = () => {
  const { t } = useTranslation()

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
          <Link variant='footer' as={ReactRouterLink} to={Routes.terms} mt='5px' fontSize={'sm'}>
            {t('terms_and_conditions', { defaultValue: 'Terms and Conditions' })}
          </Link>
          <Link variant='footer' as={ReactRouterLink} to={Routes.privacy} mt='5px' fontSize={'sm'}>
            {t('privacy_policy', { defaultValue: 'Privacy Policy' })}
          </Link>
          <Link variant='footer' mt='5px' href='mailto:support@vocdoni.org' fontSize={'sm'}>
            support@vocdoni.org
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default SaasFooter
