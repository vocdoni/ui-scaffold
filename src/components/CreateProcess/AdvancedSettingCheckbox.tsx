import {
	Checkbox,
	FormControl,
	FormControlProps,
	FormLabel
} from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props extends FormControlProps {
	register: UseFormRegister<FieldValues>;
	label: string;
	field: any;
}

const AdvancedSettingCheckbox = ({
	register,
	label,
	field,
	...props
}: Props) => (
	<FormControl display='flex' alignItems='center' {...props}>
		<FormLabel pt={2} whiteSpace='nowrap'>
			{label}
		</FormLabel>
		<Checkbox {...register(field)} />
	</FormControl>
);

export default AdvancedSettingCheckbox;
