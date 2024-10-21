import { Button, Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import useDarkMode from '~components/Layout/useDarkMode'

const GoogleAuth = () => {
  const { t } = useTranslation()

  const { textColor, googleBg, googleHover, googleActive } = useDarkMode()

  return (
    <Button
      fontSize='sm'
      bg={googleBg}
      color={textColor}
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
