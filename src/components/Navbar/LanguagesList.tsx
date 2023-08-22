import { MenuItem } from '@chakra-ui/react'
import { LanguagesSlice } from '@i18n/languages.mjs'
import { useTranslation } from 'react-i18next'

const LanguagesList = () => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <>
      {/* <MenuItem display='flex' justifyContent='end' py={2} px={2} aria-hidden>
        <FaGlobeAmericas />
      </MenuItem> */}

      {Object.keys(languages).map((k, index) => (
        <MenuItem
          key={k}
          onClick={() => {
            i18n.changeLanguage(k)
          }}
          w='full'
          fontWeight={k === i18n.language ? 'extrabold' : ''}
          display='flex'
          flexDirection='column'
          alignItems='end'
          borderRadius='none'
          px={2}
          tabIndex={0}
          mt={index === 0 ? 8 : 0}
        >
          {k.toUpperCase()}
        </MenuItem>
      ))}
    </>
  )
}

export default LanguagesList
