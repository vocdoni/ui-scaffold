import PrivacyCat from '@components/Privacy/Cat'
import PrivacyEn from '@components/Privacy/En'
import PrivacyEs from '@components/Privacy/Es'
import { useTranslation } from 'react-i18next'

const Privacy = () => {
  const { i18n } = useTranslation()

  const selectedLanguage = i18n.language

  return (
    <>
      {selectedLanguage === 'en' && <PrivacyEn />}
      {selectedLanguage === 'ca' && <PrivacyCat />}
      {selectedLanguage === 'es' && <PrivacyEs />}
    </>
  )
}

export default Privacy
