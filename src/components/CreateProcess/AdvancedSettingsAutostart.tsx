import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
	FieldValues,
	UseFormGetValues,
	UseFormRegister
} from 'react-hook-form';
import AdvancedSettingCheckbox from './AdvancedSettingCheckbox';

interface Props {
	register: UseFormRegister<FieldValues>;
	getValues: UseFormGetValues<FieldValues>;
}

const AdvancesSettignsAutostart = ({ register, getValues }: Props) => (
	<Flex
		gap={{ base: 3, md: 8 }}
		justifyContent='start'
		flexDirection={{ base: 'column', md: 'row' }}
		alignItems={{ base: 'start', md: 'end' }}
		mb={3}
	>
		<AdvancedSettingCheckbox
			register={register}
			label='Autostart'
			field='electionType.autoStart'
			width='auto'
		/>

		{!getValues().electionType.autoStart && (
			<FormControl
				display='flex'
				flexDirection={{ base: 'column', sm: 'row' }}
				alignItems={{ base: 'start', sm: 'end' }}
			>
				<FormLabel whiteSpace='nowrap'>Start date:</FormLabel>
				<Input
					type='date'
					width='180px'
					{...register(`dates.start`, { required: true })}
				/>
			</FormControl>
		)}
	</Flex>
);

export default AdvancesSettignsAutostart;
