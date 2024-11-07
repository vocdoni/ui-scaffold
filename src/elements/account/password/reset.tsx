import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import PasswordResetForm from '~components/Auth/PasswordResetForm'
import { AuthOutletContextType } from '~elements/LayoutAuth'

const PasswordReset = () => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()

  const code = searchParams.get('code') || ''
  const email = searchParams.get('email') || ''

  // Set layout title and subtitle
  useEffect(() => {
    setTitle(t('password_reset.title', { defaultValue: 'Password reset' }))
    setSubTitle(
      t('password_reset.subtitle', {
        defaultValue:
          "If your email is an existant account, you'll receive an email with a code to reset your account.",
      })
    )
  }, [setTitle, setSubTitle, t])

  return <PasswordResetForm code={code} email={email} />
}

export default PasswordReset
