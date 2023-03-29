import { Checkbox, FormControl, FormControlProps, FormLabel } from '@chakra-ui/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface Props extends FormControlProps {
  register: UseFormRegister<FieldValues>
  label: string
  field: any
}

const SettingsCheckbox = ({ register, label, field, ...props }: Props) => (
  <FormControl display='flex' alignItems='center' {...props}>
    <FormLabel whiteSpace='nowrap' mb='0'>
      {label}
    </FormLabel>
    <Checkbox {...register(field)} />
  </FormControl>
)

export default SettingsCheckbox
