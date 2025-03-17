import { Button, Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'

const GoogleAuth = () => {
  const { t } = useTranslation()

  return (
    <Button fontSize='sm' disabled fontWeight='500'>
      <Icon as={FcGoogle} w={5} h={5} me={2} />

      {t('signin_google')}
    </Button>
  )
}

export default GoogleAuth
