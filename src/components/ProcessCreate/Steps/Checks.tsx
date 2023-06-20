import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AccountCreate } from '../../Account/Create'
import { useAccountHealthTools } from '../../Account/use-account-health-tools'
import Wrapper from '../Wrapper'
import { useProcessCreationSteps } from './use-steps'

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
    <Box display='flex'>
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
        <Alert variant='info' status='info'>
          <AlertIcon />
          <Flex flexDirection='column'>
            <AlertTitle>
              <Text>Info</Text>
              <Text>{t('form.process_create.unhealthy_account')}</Text>
            </AlertTitle>
          </Flex>
        </Alert>
        <AccountCreate />
      </Wrapper>
      <Flex justifyContent='end'>
        <Button
          isLoading={loading}
          variant='next'
          type='submit'
          form='process-create-form'
          rightIcon={<ArrowForwardIcon />}
          colorScheme='process_create.next_step'
          mt={5}
        >
          {t('form.process_create.next_step')}
        </Button>
      </Flex>
    </>
  )
}
