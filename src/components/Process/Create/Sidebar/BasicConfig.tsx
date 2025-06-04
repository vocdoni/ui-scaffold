import { Box, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

export const BasicConfig = () => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()

  const startDate = watch('startDate')
  const today = new Date().toISOString().split('T')[0]

  return (
    <VStack align='stretch'>
      {/* Start date and time */}
      <Box>
        <FormLabel htmlFor='startDate'>
          <Trans i18nKey='process_create.start_datetime'>Start date and time</Trans>
        </FormLabel>
        <HStack>
          <FormControl isInvalid={!!errors.startDate} mb={2}>
            <Input
              type='date'
              min={today}
              id='startDate'
              {...register('startDate', {
                required: t('form.error.field_is_required', 'This field is required'),
              })}
            />
            <FormErrorMessage>{errors.startDate?.message?.toString()}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.startTime} mb={2}>
            <Input
              type='time'
              {...register('startTime', {
                required: t('form.error.field_is_required', 'This field is required'),
              })}
            />
            <FormErrorMessage>{errors.startTime?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </HStack>
      </Box>

      {/* End date and time */}
      <Box>
        <FormLabel htmlFor='endDate'>
          <Trans i18nKey='process_create.end_datetime'>End date and time</Trans>
        </FormLabel>
        <HStack>
          <FormControl isInvalid={!!errors.endDate} mb={2}>
            <Input
              type='date'
              min={startDate || today}
              id='endDate'
              {...register('endDate', {
                required: t('form.error.field_is_required', 'This field is required'),
              })}
            />
            <FormErrorMessage>{errors.endDate?.message?.toString()}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.endTime} mb={2}>
            <Input
              type='time'
              {...register('endTime', {
                required: t('form.error.field_is_required', 'This field is required'),
              })}
            />
            <FormErrorMessage>{errors.endTime?.message?.toString()}</FormErrorMessage>
          </FormControl>
        </HStack>
      </Box>
    </VStack>
  )
}
