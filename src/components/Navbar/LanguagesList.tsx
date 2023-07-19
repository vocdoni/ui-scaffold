import { Button, ListItem } from '@chakra-ui/react'
import { LanguagesSlice } from '@i18n/languages.mjs'
import { useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'

const LanguagesList = () => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <>
      <ListItem display={{ base: 'flex', lg: 'none' }} justifyContent='end' py={2} mr={{ base: 4, lg: 0 }}>
        <FaGlobeAmericas />
      </ListItem>

      {Object.keys(languages).map((k) => (
        <ListItem
          key={k}
          onClick={() => {
            if (window && 'localStorage' in window) {
              window.localStorage.setItem('vocdoni.lang', k)
            }
            i18n.changeLanguage(k)
          }}
          cursor='pointer'
          w='full'
        >
          <Button
            display='flex'
            justifyContent={{ base: 'end', lg: 'center' }}
            variant='dropdown'
            fontWeight={k === i18n.language ? 'extrabold' : ''}
            bgColor={k === i18n.language ? 'language_selected_bg' : 'white'}
          >
            {k.toUpperCase()}
          </Button>
        </ListItem>
      ))}
    </>
  )
}

export default LanguagesList
