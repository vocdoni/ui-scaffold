import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'

const LogoutBtn = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { logout: authLogout } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    setTimeout(() => {
      authLogout()
    }, 100)
    navigate(Routes.root)
  }

  return (
    <Button variant='link' {...props} onClick={logout}>
      {t('menu.logout')}
    </Button>
  )
}

export default LogoutBtn
