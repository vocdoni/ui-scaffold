import { Box, Spinner, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '.'
import { AccountCreate } from '../../Account/Create'
import { useAccountHealthTools } from '../../Account/use-account-health-tools'

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
    return <AccountCreate />
  }

  return (
    <Box display='flex'>
      <Spinner />
      <Text ml={5}>{t('form.process_create.running_checks')}</Text>
    </Box>
  )
}
