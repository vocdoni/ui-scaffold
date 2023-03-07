import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGlobeAmericas } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Mobile = () => (
	<Flex
		display={{ md: 'none' }}
		position='absolute'
		left={0}
		bg='white'
		_dark={{
			bg: 'black.c60',
			borderBottomColor: 'black.c90'
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
			<ListItem listStyleType='none'>
				<ConnectButton chainStatus='none' showBalance={false} />
			</ListItem>
			<ListItem listStyleType='none'>
				<NavLink to='processes/create'>Docs</NavLink>
			</ListItem>
			<ListItem listStyleType='none'>
				<NavLink to='processes'>FAQ</NavLink>
			</ListItem>
			<ListItem listStyleType='none' display='flex'>
				<FaGlobeAmericas />
				<ChevronDownIcon />
			</ListItem>
		</UnorderedList>
	</Flex>
);

export default Mobile;
