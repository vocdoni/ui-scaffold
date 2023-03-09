import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Text,
  UnorderedList,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import VocdoniIcon from '../Icons/VocdoniIcon'
import NavList from './List'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const refNav = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: refNav,
    handler: () => onClose(),
  })

  return (
    <Box as='nav' ref={refNav}>
      <Flex
        justifyContent='end'
        alignItems='center'
        gap={4}
        paddingTop={4}
        mb={8}
      >
        <Flex
          alignItems='center'
          gap={4}
          marginRight='auto'
          ml={{ base: 2, sm: 0 }}
        >
          <NavLink to='/'>
            <VocdoniIcon />
          </NavLink>
          <Text display={{ base: 'none', sm: 'block' }} fontSize='0.8em'>
            Public voting protocol
          </Text>
        </Flex>

        <Box display={{ base: 'none', md: 'flex' }}>
          <UnorderedList display='flex' alignItems='center' gap={4}>
            <NavList mobile={false} />
          </UnorderedList>
        </Box>

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && (
        <Flex
          display={{ md: 'none' }}
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
