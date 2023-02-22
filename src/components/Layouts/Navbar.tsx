import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  ListItem,
  UnorderedList,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import BtnVocdoniTokens from '../Buttons/BtnVocdoniTokens';
import VocdoniIcon from '../Icons/VocdoniIcon';

export const forceRenderNavbar = new CustomEvent('forceRenderNavbar');

const Navbar = () => {
  const { isConnected } = useAccount();

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
        sx={{
          '& .active': {
            color: 'green.vocdoni',
          },
        }}
      >
        <Box marginRight="auto">
          <NavLink to="/">
            <VocdoniIcon />
          </NavLink>
        </Box>

        <Box display={{ base: 'none', lg: 'flex' }}>
          <UnorderedList display="flex" alignItems="center" gap={4}>
            {isConnected && (
              <>
                <ListItem listStyleType="none">
                  <NavLink to="createprocess">Create Process</NavLink>
                </ListItem>
                <ListItem listStyleType="none">
                  <NavLink to="processeslist">Processes List</NavLink>
                </ListItem>
              </>
            )}
            <ListItem listStyleType="none">
              <ConnectButton accountStatus="avatar" chainStatus="icon" />
            </ListItem>
            <ListItem listStyleType="none">
              {isConnected && <BtnVocdoniTokens />}
            </ListItem>
            <ListItem listStyleType="none">
              <ColorModeSwitcher mb={1} size="sm" justifySelf="flex-end" />
            </ListItem>
          </UnorderedList>
        </Box>

        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen ? (
        <Box
          display={{ lg: 'none' }}
          position="absolute"
          left={0}
          bg="white"
          _dark={{
            bg: 'black.c60',
            borderBottomColor: 'black.c90',
          }}
          width="100%"
          zIndex={10}
          borderBottom="2px solid white"
          borderBottomColor="gray.100"
        >
          <UnorderedList
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={6}
            p={4}
          >
            <ListItem listStyleType="none">
              <ConnectButton accountStatus="avatar" chainStatus="icon" />
            </ListItem>
            {isConnected && (
              <>
                <ListItem listStyleType="none">
                  <BtnVocdoniTokens />
                </ListItem>
                <ListItem listStyleType="none">
                  <Button onClick={onClose}>
                    <NavLink to="createprocess">Create Process</NavLink>
                  </Button>
                </ListItem>
                <ListItem listStyleType="none">
                  <Button onClick={onClose}>
                    <NavLink to="processeslist">Processes List</NavLink>
                  </Button>
                </ListItem>
              </>
            )}
            <ListItem listStyleType="none">
              <ColorModeSwitcher mb={1} size="sm" justifySelf="flex-end" />
            </ListItem>
          </UnorderedList>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
