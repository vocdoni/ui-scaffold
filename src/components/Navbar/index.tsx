import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Img,
  Text,
  UnorderedList,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import vcd1 from '../../assets/vcd1.png'
import SearchInput from '../Search/Input'
import NavList from './List'

const Navbar = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()
  const location = useLocation()

  const refNav = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: refNav,
    handler: () => onClose(),
  })

  return (
    <Box as='nav' ref={refNav} {...props}>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        gap={4}
        paddingY={4}
      >
        <Flex alignItems='center' gap={4} ml={{ base: 2, sm: 0 }}>
          <NavLink to='/'>
            <Img src={vcd1} maxWidth='50px' alt='vocdoni icon' />
          </NavLink>
          <Text fontSize='0.8em' whiteSpace='nowrap'>
            Public voting protocol
          </Text>
        </Flex>

        {location.pathname.includes('organization') && (
          <Flex
            width='30%'
            alignItems='center'
            gap={1}
            display={{ base: 'none', lg: 'flex' }}
          >
            <SearchInput />
            <Link to='#'>
              <Text whiteSpace='nowrap' fontWeight='bold' fontSize='.7em'>
                or browser
              </Text>
            </Link>
          </Flex>
        )}
        <Box display={{ base: 'none', lg: 'flex' }}>
          <UnorderedList display='flex' alignItems='center' gap={4}>
            <NavList mobile={false} />
          </UnorderedList>
        </Box>

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
          bg='white'
          _dark={{
            bg: 'black.c60',
            borderBottomColor: 'black.c90',
          }}
          width='100%'
          zIndex={10}
          borderBottom='2px solid white'
          borderBottomColor='gray.100'
        >
          <UnorderedList
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={4}
            pb={8}
          >
            <NavList mobile={true} onClose={onClose} />
          </UnorderedList>
        </Flex>
      )}
    </Box>
  )
}

export default Navbar
