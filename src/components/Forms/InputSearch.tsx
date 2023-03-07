import { SearchIcon } from '@chakra-ui/icons';
import {
	FormControl,
	Input,
	InputGroup,
	InputLeftElement
} from '@chakra-ui/react';

const InputSearch = () => (
	<FormControl mb={4}>
		<InputGroup>
			<InputLeftElement
				pointerEvents='none'
				color='gray.300'
				fontSize='1.2em'
				children={<SearchIcon color='gray.300' />}
			/>
			<Input placeholder='Search' pl={10} borderRadius={10} />
		</InputGroup>
	</FormControl>
);

export default InputSearch;
