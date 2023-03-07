import { SearchIcon } from '@chakra-ui/icons';
import {
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import WrapperFiltersList from '../Wrappers/WrapperFiltersList';

const ProcessesListFilters = () => {
	const { register } = useFormContext();
	return (
		<WrapperFiltersList>
			<>
				<FormControl>
					<InputGroup>
						<InputLeftElement
							pointerEvents='none'
							color='gray.300'
							fontSize='1.2em'
							children={<SearchIcon color='gray.300' />}
						/>
						<Input
							placeholder='Search by title'
							pl={10}
							borderRadius={10}
							{...register('search')}
						/>
					</InputGroup>
				</FormControl>
				<FormControl display='flex' alignItems='center' width='auto'>
					<FormLabel pt={2} whiteSpace='nowrap'>
						Only active elections
					</FormLabel>
					<Checkbox {...register(`onlyCurrentElections`)} />
				</FormControl>
			</>
		</WrapperFiltersList>
	);
};

export default ProcessesListFilters;
