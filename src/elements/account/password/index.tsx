import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import PasswordForgotForm from '~components/Auth/PasswordForgotForm'
import { AuthOutletContextType } from '~elements/LayoutAuth'

const PasswordForgot = () => {
  const { t } = useTranslation()
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()

  // Set layout title and subtitle
  useEffect(() => {
    setTitle(t('forgot_password_title'))
    setSubTitle(t('forgot_password_subtitle'))
  }, [setTitle, setSubTitle, t])

  return <PasswordForgotForm />
}

export default PasswordForgot
