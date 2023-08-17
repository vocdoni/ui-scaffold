import RegistryCat from '@components/Registry/Cat'
import RegistryEn from '@components/Registry/En'
import RegistryEs from '@components/Registry/Es'
import { useTranslation } from 'react-i18next'

const Registry = () => {
  const { i18n } = useTranslation()

  const selectedLanguage = i18n.language

  return (
    <>
      {selectedLanguage === 'en' && <RegistryEn />}
      {selectedLanguage === 'ca' && <RegistryCat />}
      {selectedLanguage === 'es' && <RegistryEs />}
    </>
  )
}

export default Registry
