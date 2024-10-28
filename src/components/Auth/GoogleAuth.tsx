import { Button, Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'

const GoogleAuth = () => {
  const { t } = useTranslation()

  return (
    <Button
      fontSize='sm'
      bg={'google.bg.light'}
      fontWeight='500'
      _hover={'google.hover.light'}
      _active={'google.active.light'}
      _focus={'google.active.light'}
      _dark={{
        bg: 'google.bg.dark',

        _hover: {
          bg: 'google.hover.dark',
        },
        _active: {
          bg: 'google.hover.dark',
        },
      }}
    >
      <Icon as={FcGoogle} w={5} h={5} me={2} />

      {t('signin_google')}
    </Button>
  )
}

export default GoogleAuth
