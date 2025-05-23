import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'
import { LanguagesSlice } from '~i18n/languages.mjs'

import { FormControl, FormLabel } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'

import { selectStyles } from '~theme/selectStyles'
import { formatLanguageOptionLabel } from '~theme/selectStylesLabel'

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

export const LanguagesMenu = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            aria-label={t('menu.burger_aria_label')}
            variant='solid'
            colorScheme='gray'
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            minW='none'
            {...props}
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
interface LanguageOption {
  value: string
  label: string
}
export const LanguageListDashboard = ({ ...props }) => {
  const { t, i18n } = useTranslation()

  const languageOptions: LanguageOption[] = [
    { value: 'en', label: t('language.english', { defaultValue: 'English' }) },
    { value: 'ca', label: t('language.catalan', { defaultValue: 'Català' }) },
    { value: 'es', label: t('language.spanish', { defaultValue: 'Castellano' }) },
  ]

  const selectedLanguage = languageOptions.find((opt) => opt.value === i18n.language)

  return (
    <FormControl w='full' display={'flex'} justifyContent={'space-between'} alignItems={'center'} {...props}>
      <FormLabel fontSize={'14px'} m='0' fontWeight={400}>
        {t('form.select_language', { defaultValue: 'Language' })}
      </FormLabel>

      <Select
        options={languageOptions}
        value={selectedLanguage}
        onChange={(option: LanguageOption | null) => {
          if (option) {
            i18n.changeLanguage(option.value)
          }
        }}
        isClearable={false}
        size='sm'
        placeholder={t('form.choose_an_option', { defaultValue: 'Choose an option' })}
        menuPlacement='top'
        formatOptionLabel={formatLanguageOptionLabel(i18n)}
        chakraStyles={selectStyles}
      />
    </FormControl>
  )
}

export const LanguagesListAccordion = () => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <Accordion allowMultiple m={0} p={0} borderColor='transparent'>
      <AccordionItem>
        <AccordionButton
          as={Button}
          m={0}
          p={0}
          h='fit-content'
          _hover={{ bgColor: 'transparent' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'start'}
          fontSize={'md'}
          leftIcon={<FaGlobeAmericas />}
        >
          <Trans i18nKey={'languages'}>Languages</Trans>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={0}>
          {Object.keys(languages).map((k: string) => (
            <Button
              key={k}
              onClick={() => {
                i18n.changeLanguage(k)
              }}
              display='flex'
              fontWeight={k === i18n.language ? 'extrabold' : ''}
              p={0}
              m={0}
              h={'fit-content'}
              w={'fit-content'}
              my='5px'
            >
              {k.toUpperCase()}
            </Button>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default LanguagesListAccordion
