import { Button, Icon, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'

const GoogleAuth = () => {
  const { t } = useTranslation()

  const googleBg = useColorModeValue('google.bg.light', 'google.bg.dark')
  const googleHover = useColorModeValue({ bg: 'google.hover.light' }, { bg: 'google.hover.dark' })
  const googleActive = useColorModeValue({ bg: 'google.active.light' }, { bg: 'google.active.dark' })

  return (
    <Button
      fontSize='sm'
      bg={googleBg}
      fontWeight='500'
      _hover={googleHover}
      _active={googleActive}
      _focus={googleActive}
    >
      <Icon as={FcGoogle} w={5} h={5} me={2} />

      {t('signin_google')}
    </Button>
  )
}

export default GoogleAuth
