import { MenuItem } from '@chakra-ui/react'
import { LanguagesSlice } from '@i18n/languages.mjs'
import { useTranslation } from 'react-i18next'

const LanguagesList = ({ closeOnSelect }: { closeOnSelect: boolean }) => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  const isAnyLanguageSelected = Object.keys(languages).some((l) => l === i18n.language)

  return (
    <>
      {Object.keys(languages).map((k) => (
        <MenuItem
          key={k}
          onClick={() => {
            i18n.changeLanguage(k)
          }}
          closeOnSelect={closeOnSelect}
          w='full'
          display='flex'
          justifyContent={closeOnSelect ? 'center' : 'start'}
          fontWeight={k === i18n.language || (k === 'en' && !isAnyLanguageSelected) ? 'extrabold' : ''}
          borderRadius='none'
        >
          {k.toUpperCase()}
        </MenuItem>
      ))}
    </>
  )
}

export default LanguagesList
