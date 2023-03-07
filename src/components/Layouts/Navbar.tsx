import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	IconButton,
	Text,
	useDisclosure,
	useOutsideClick
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
		handler: () => onClose()
	});

	return (
		<Box as='nav' ref={refNav}>
			<Flex
				justifyContent='end'
				alignItems='center'
				gap={4}
				paddingTop={4}
				mb={{ base: 2, sm: 4, md: 6 }}
			>
				<Flex alignItems='center' gap={4} marginRight='auto'>
					<NavLink to='/'>
						<VocdoniIcon />
					</NavLink>
					<Text mt={1} display={{ base: 'none', sm: 'block' }} fontSize='0.8em'>
						Public voting protocol
					</Text>
				</Flex>

				<Desktop />

				<IconButton
					size={'md'}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={'Open Menu'}
					display={{ md: 'none' }}
					onClick={isOpen ? onClose : onOpen}
				/>
			</Flex>
			{isOpen && <Mobile />}
		</Box>
	);
};

export default Navbar;
