import { ListItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaGlobe } from 'react-icons/fa'
import { LanguagesSlice } from '../../i18n/languages.mjs'

const LanguagesList = ({ ...props }) => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <>
      <ListItem display='flex' justifyContent='end'>
        <FaGlobe />
      </ListItem>
      {Object.keys(languages).map((k) => (
        <ListItem
          cursor='pointer'
          fontWeight={k === i18n.language ? 'bold' : ''}
          key={k}
          onClick={() => {
            if (window && 'localStorage' in window) {
              window.localStorage.setItem('vocdoni.lang', k)
            }
            i18n.changeLanguage(k)
          }}
        >
          {k.toUpperCase()}
        </ListItem>
      ))}
    </>
  )
}

export default LanguagesList
