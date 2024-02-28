import { Controller, useFormContext } from 'react-hook-form'
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  FormLabel,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const GitcoinStrategyBuilder = ({ ...props }) => {
  const { t } = useTranslation()

  const { control } = useFormContext()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  return (
    <>
      <FormLabel fontWeight='bold'>{t('form.process_create.census.gitcoin_passport_score')}</FormLabel>
      <Controller
        name={'passportScore'}
        control={control}
        defaultValue={50}
        rules={{
          required,
        }}
        render={({ field: { ref, ...restField } }) => (
          <NumberInput defaultValue={50} min={1} max={100} maxW={40} {...restField}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      ></Controller>
    </>
  )
}
