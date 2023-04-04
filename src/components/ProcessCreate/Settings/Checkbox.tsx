import { Checkbox, FormControl, FormControlProps, FormLabel } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

interface Props extends FormControlProps {
  label: string
  field: any
}

const SettingsCheckbox = ({ label, field, ...props }: Props) => {
  const { register } = useFormContext()
  return (
    <FormControl display='flex' alignItems='center' {...props}>
      <FormLabel whiteSpace='nowrap' mb='0'>
        {label}
      </FormLabel>
      <Checkbox {...register(field)} />
    </FormControl>
  )
}

export default SettingsCheckbox
