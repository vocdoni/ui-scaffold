import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, List, UnorderedList, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Logo from '../Layout/Logo'
import NavList from './List'

const Navbar = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()

  const refNav = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: refNav,
    handler: () => onClose(),
  })

  return (
    <Box as='nav' ref={refNav} {...props}>
      <Flex justifyContent='space-between' alignItems='center' gap={4} paddingY={4}>
        <Logo />

        <List display={{ base: 'none', lg: 'flex' }} alignItems='center' gap={4}>
          <NavList mobile={false} />
        </List>

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={t('menu.open_menu')}
          display={{ lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && (
        <Flex
          display={{ lg: 'none' }}
          position='absolute'
          left={0}
          bg='navbar.bg'
          width='100%'
          zIndex={10}
          borderStyle='solid'
          borderColor='navbar.border'
          borderWidth={2}
          borderBottomColor='navbar.border_bottom'
        >
          <UnorderedList display='flex' flexDirection='column' alignItems='center' gap={4} pb={8}>
            <NavList mobile={true} onClose={onClose} />
          </UnorderedList>
        </Flex>
      )}
    </Box>
  )
}

export default Navbar
