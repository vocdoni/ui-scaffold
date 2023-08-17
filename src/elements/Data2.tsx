import Data2Cat from '@components/Data/Cat2'
import Data2En from '@components/Data/En2'
import Data2Es from '@components/Data/Es2'
import { useTranslation } from 'react-i18next'

const Data2 = () => {
  const { i18n } = useTranslation()

  const selectedLanguage = i18n.language

  return (
    <>
      {selectedLanguage === 'en' && <Data2En />}
      {selectedLanguage === 'ca' && <Data2Cat />}
      {selectedLanguage === 'es' && <Data2Es />}
    </>
  )
}

export default Data2
