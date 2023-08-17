import Data1Cat from '@components/Data/Cat1'
import Data1En from '@components/Data/En1'
import Data1Es from '@components/Data/Es1'
import { useTranslation } from 'react-i18next'

const Data1 = () => {
  const { i18n } = useTranslation()

  const selectedLanguage = i18n.language

  return (
    <>
      {selectedLanguage === 'en' && <Data1En />}
      {selectedLanguage === 'ca' && <Data1Cat />}
      {selectedLanguage === 'es' && <Data1Es />}
    </>
  )
}

export default Data1
