import { Button, ButtonProps } from '@chakra-ui/react'
import { useAuth } from '~components/Auth/useAuth'
import { useNavigate } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { useTranslation } from 'react-i18next'

const LogoutBtn = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { logout: authLogout } = useAuth()
  const navigate = useNavigate()
  const { textColorSecondary } = useDarkMode()

  const logout = () => {
    authLogout()
    navigate('/')
  }

  return (
    <Button
      variant='outline'
      border='none'
      color={textColorSecondary}
      textDecoration='underline'
      _hover={{ textDecoration: 'none' }}
      {...props}
      onClick={logout}
    >
      {t('menu.logout')}
    </Button>
  )
}

export default LogoutBtn
