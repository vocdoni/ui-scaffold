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

export const LanguagesListAccordion = () => {
  const { i18n } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <Accordion allowMultiple m={0} p={0} borderColor='transparent'>
      <AccordionItem>
        <AccordionButton
          as={Button}
          variant='unstyled'
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
              variant={'unstyled'}
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
