import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import WrapperFormSection from '../Wrappers/WrapperFormSection';

const CreateProcessHeader = () => {
	const { register } = useFormContext();

	return (
		<WrapperFormSection>
			<>
				<FormControl mb={4}>
					<FormLabel fontSize='1.3em'>Title</FormLabel>
					<Input
						{...register('titleProcess', { required: true })}
						placeholder='Title'
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Input
						{...register('descriptionProcess', { required: true })}
						placeholder='Description'
					/>
				</FormControl>
			</>
		</WrapperFormSection>
	);
};

export default CreateProcessHeader;
