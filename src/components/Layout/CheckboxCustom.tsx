import { Box, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

export interface CustomCheckboxProps {
  formValue: string
  label: ReactNode
  required?: boolean
  colorScheme?: string
}

const CustomCheckbox = ({ formValue, label, required = false, colorScheme = 'brandScheme' }: CustomCheckboxProps) => {
  const { t } = useTranslation()
  const { textColor } = useDarkMode()
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
    <FormControl isInvalid={!!errors[formValue]}>
      <Flex alignItems='center'>
        <Checkbox {...register(formValue, validationRules)} colorScheme={colorScheme} me={2.5} />
        <FormLabel display='flex' mb={0} fontWeight='normal' color={textColor} fontSize='sm'>
          <Box>{label}</Box>
          {required && (
            <Text color={textColor} ml={1}>
              *
            </Text>
          )}
        </FormLabel>
      </Flex>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomCheckbox
