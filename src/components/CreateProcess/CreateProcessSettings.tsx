import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import WrapperFormSection from '../Wrappers/WrapperFormSection';
import CreateProcessAdvancedSettings from './CreateProcessAdvancedSettings';

const CreateProcessSettings = () => {
	const { register, getValues, watch } = useFormContext();
	// watch rerenders all the form
	watch('weightedVote');

	// useWatch rerenders the component
	useWatch({
		name: ['electionType']
	});

	return (
		<WrapperFormSection>
			<Flex direction='column' gap={4}>
				<Text as='legend' fontSize='1.3em'>
					Election settings
				</Text>
				<FormControl
					display='flex'
					flexDirection={{ base: 'column', md: 'row' }}
					alignItems={{ base: 'start', md: 'end' }}
				>
					<FormLabel>End date:</FormLabel>
					<Input
						type='date'
						width='180px'
						{...register(`dates.end`, { required: true })}
					/>
				</FormControl>
				<CreateProcessAdvancedSettings
					register={register}
					getValues={getValues}
				/>
			</Flex>
		</WrapperFormSection>
	);
};

export default CreateProcessSettings;
