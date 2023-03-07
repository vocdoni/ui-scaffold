import { IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { useContext } from 'react';
import { MODAL_TYPE } from '../../constants/modalType';
import { UpdatedBalanceContext } from '../../lib/contexts/UpdatedBalanceContext';
import ModalWrapper from '../Modals/ModalWrapper';

const BtnVocdoniTokens = () => {
	const { client } = useClientContext();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { updatedBalance, updateBalance } = useContext(UpdatedBalanceContext);
	return (
		<>
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				type={MODAL_TYPE.LOADING}
			/>
			<Flex
				alignItems='center'
				gap={2}
				height='39px'
				px={2}
				borderRadius={6}
				boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px 0px'
				_dark={{
					bg: 'black.c90'
				}}
				cursor='default'
				_hover={{
					scale: 3
				}}
			>
				<Text fontWeight='bold'>{updatedBalance} Tokens</Text>

				<IconButton
					size='sm'
					icon={<AddIcon />}
					aria-label='Add tokens'
					onClick={async () => {
						onOpen();
						try {
							await client.collectFaucetTokens();
						} catch (err) {
							console.log(err);
						} finally {
							onClose();
							updateBalance();
						}
					}}
				/>
			</Flex>
		</>
	);
};

export default BtnVocdoniTokens;
