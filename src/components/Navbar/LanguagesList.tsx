import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'
import { LanguagesSlice } from '~i18n/languages.mjs'

export const LanguagesList = ({ closeOnSelect }: { closeOnSelect: boolean }) => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <>
      {Object.keys(languages).map((k: string) => (
        <MenuItem
          key={k}
          onClick={() => {
            i18n.changeLanguage(k)
          }}
          closeOnSelect={closeOnSelect}
          w='full'
          display='flex'
          justifyContent={closeOnSelect ? 'center' : 'start'}
          fontWeight={k === i18n.language ? 'extrabold' : ''}
          borderRadius='none'
        >
          {k.toUpperCase()}
        </MenuItem>
      ))}
    </>
  )
}

export const LanguagesMenu = () => {
  const { t } = useTranslation()

  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton
            as={Button}
            aria-label={t('menu.burger_aria_label')}
            variant='rounded-ghost'
            sx={{ span: { margin: 'px' } }}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            minW='none'
          >
            <FaGlobeAmericas />
          </MenuButton>
          <MenuList minW={16} mt={2}>
            <LanguagesList closeOnSelect={true} />
          </MenuList>
        </>
      )}
    </Menu>
  )
}
