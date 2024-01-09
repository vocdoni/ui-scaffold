import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AccountCreate } from '~components/Account/Create'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { useProcessCreationSteps } from './use-steps'
import Wrapper from './Wrapper'

export const Checks = () => {
  const {
    connected,
    loaded: { account },
  } = useClient()
  const { exists } = useAccountHealthTools()
  const { next } = useProcessCreationSteps()
  const { t } = useTranslation()

  useEffect(() => {
    if (!exists) return

    next()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exists])
  if (connected && account && !exists) {
    return <NeedsAccount />
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' mt={{ base: 20, lg: 0 }}>
      <Spinner />
      <Text ml={5}>{t('form.process_create.running_checks')}</Text>
    </Box>
  )
}

const NeedsAccount = () => {
  const { t } = useTranslation()

  const {
    loading: { account: loading },
  } = useClient()

  return (
    <>
      <Wrapper>
        <Box>
          <Heading
            className='brand-theme'
            fontSize='md'
            my={5}
            textTransform='uppercase'
            color='process_create.title'
            fontWeight='normal'
          >
            {t('new_organization.title')}
          </Heading>
          <Box p={10} bgColor='process_create.section'>
            <AccountCreate />
          </Box>
        </Box>
        <Flex justifyContent='end' mt='auto'>
          <Button isLoading={loading} type='submit' form='process-create-form' variant='primary' px={12}>
            {t('new_organization.create_organization_btn')}
            <ArrowForwardIcon />
          </Button>
        </Flex>
      </Wrapper>
    </>
  )
}
