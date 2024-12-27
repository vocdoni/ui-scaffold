import { Box, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface CheckboxCustomProps {
  formValue: string
  label: ReactNode
  required?: boolean
  colorScheme?: string
}

const CheckboxCustom = ({ formValue, label, required = false, colorScheme = 'brand' }: CheckboxCustomProps) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  let validationRules = {}
  if (required) {
    validationRules = { required: { value: true, message: t('form.error.field_is_required') } }
  }
  const errorMessage = (errors[formValue]?.message as string) || ''

  return (
    <FormControl isInvalid={!!errors[formValue]} isRequired={required}>
      <Flex alignItems='center'>
        <Checkbox {...register(formValue, validationRules)} colorScheme={colorScheme} me={2.5} />
        <FormLabel display='flex' mb={0} fontWeight='normal' fontSize='sm'>
          <Box>{label}</Box>
        </FormLabel>
      </Flex>
      <FormErrorMessage>{errorMessage || 'Error performing the operation'}</FormErrorMessage>
    </FormControl>
  )
}

export default CheckboxCustom
