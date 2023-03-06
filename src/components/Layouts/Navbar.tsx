import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import VocdoniIcon from '../Icons/VocdoniIcon';
import Desktop from '../Navbar/Desktop';
import Mobile from '../Navbar/Mobile';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const refNav = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: refNav,
    handler: () => onClose(),
  });

  return (
    <Box as="nav" ref={refNav}>
      <Flex
        justifyContent="end"
        alignItems="center"
        gap={4}
        paddingTop={4}
        mb={8}
      >
        <Box marginRight="auto">
          <NavLink to="/">
            <VocdoniIcon />
          </NavLink>
        </Box>

        <Desktop />

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && <Mobile />}
    </Box>
  );
};

export default Navbar;
