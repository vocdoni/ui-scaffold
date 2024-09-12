import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { ChakraStylesConfig, GroupBase, Select } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

export interface SelectCustomProps {
  options: { label: string; value: string }[] // Puedes cambiar el tipo según lo que necesites
  formValue: string
  label?: string
  placeholder?: string
  required?: boolean
}

const customStyles: ChakraStylesConfig<any, false, GroupBase<any>> = {
  control: (provided) => ({
    ...provided,
    borderColor: 'gray.200',
    minH: '50px',
    borderRadius: 'xl',
    _hover: {
      borderColor: 'gray.300',
    },
    _focus: {
      borderColor: 'gray.300',
      boxShadow: 'none',
    },
  }),
}

const SelectCustom = ({
  options,
  formValue,
  label,
  placeholder = 'Choose an option',
  required = false,
}: SelectCustomProps) => {
  const { t } = useTranslation()
  const { textColor } = useDarkMode()

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext()

  return (
    <FormControl isInvalid={!!errors[formValue]}>
      <FormLabel htmlFor={formValue} fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
        {label}
      </FormLabel>
      <Controller
        name={formValue}
        control={control}
        rules={{ required: required ? t('form.error.field_is_required') : false }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            chakraStyles={customStyles}
            isClearable
            onChange={(selectedOption) => {
              setValue(formValue, selectedOption)
            }}
          />
        )}
      />
      <FormErrorMessage>
        {errors[formValue]?.message && typeof errors[formValue]?.message === 'string' && errors[formValue]?.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default SelectCustom
