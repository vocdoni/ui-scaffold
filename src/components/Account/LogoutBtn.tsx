import { Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'

const LogoutBtn = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { logout: authLogout } = useAuth()
  const navigate = useNavigate()
  const { connector } = useAccount()

  const logout = () => {
    setTimeout(async () => {
      authLogout()
      //TODO the next line does not work.
      // The objective is to do the WAGMI
      await connector.disconnect()
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
