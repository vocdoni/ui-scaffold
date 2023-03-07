import { Box, HStack, Text } from '@chakra-ui/react';

const Counters = () => (
	<HStack gap={6}>
		<Box>
			<Text textAlign='center' fontSize='1.8em' color='purple'>
				1K+
			</Text>
			<Text fontSize='.8em'>ETH funded</Text>
		</Box>
		<Box>
			<Text textAlign='center' fontSize='1.8em' color='purple'>
				147K+
			</Text>
			<Text fontSize='.8em'>Voting elections</Text>
		</Box>
		<Box>
			<Text textAlign='center' fontSize='1.8em' color='purple'>
				3K+
			</Text>
			<Text fontSize='.8em'>Submited votes</Text>
		</Box>
	</HStack>
);
export default Counters;
