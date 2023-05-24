import { Alert, AlertIcon, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AccountCreate } from '../Account/Create'
import { useAccountHealthTools } from '../Account/use-account-health-tools'
import { ProcessCreateForm } from './Form'

const ProcessCreate = () => {
  const { exists, existsVariation } = useAccountHealthTools()
  const { t } = useTranslation()

  const Form = existsVariation(ProcessCreateForm, AccountCreate)

  return (
    <Flex
      direction='column'
      gap={4}
      mt={1}
      mx='auto'
      p={{ base: 0, sm: 4 }}
      borderRadius='md'
      width={{ base: '98%', md: 160 }}
      borderWidth={{ sm: 2 }}
      borderStyle={{ sm: 'solid' }}
      borderColor={{ sm: 'gray.100' }}
    >
      {!exists && (
        <Alert variant='subtle' status='error'>
          <AlertIcon />
          {t('form.process_create.unhealthy_account')}
        </Alert>
      )}
      <Form />
    </Flex>
  )
}

export default ProcessCreate
