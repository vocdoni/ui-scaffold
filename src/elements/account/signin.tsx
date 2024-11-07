import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import SignIn from '~components/Auth/SignIn'
import { AuthOutletContextType } from '~elements/LayoutAuth'

const Signin = () => {
  const { t } = useTranslation()
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()

  // Set layout title and subtitle
  useEffect(() => {
    setTitle(t('signin_title'))
    setSubTitle(t('signin_subtitle'))
  }, [])

  return <SignIn />
}

export default Signin
