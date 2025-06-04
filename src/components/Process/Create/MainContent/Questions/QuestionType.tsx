import { Box, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

interface SelectOption {
  value: string
  label: string
}

export const QuestionType = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <FormControl isInvalid={!!errors.questionType} display='flex' alignItems='center' justifyContent='space-between'>
      <Box>
        <FormLabel>
          <Trans i18nKey='process.create.question_type'>Question type</Trans>
        </FormLabel>
        <Text fontSize='sm' color='gray.500' mb={2}>
          <Trans i18nKey='process.create.question_type.description'>
            This applies to all questions in this voting process
          </Trans>
        </Text>
      </Box>
      <Controller
        control={control}
        name='questionType'
        rules={{ required: t('form.error.field_is_required', 'This field is required') }}
        render={({ field }) => {
          const options: SelectOption[] = [
            { value: 'single', label: t('process.create.question_type.single', 'Single choice') },
            { value: 'multiple', label: t('process.create.question_type.multiple', 'Multiple choice') },
          ]
          const selectedOption = options.find((opt) => opt.value === field.value)

          return (
            <Select<SelectOption>
              value={selectedOption}
              onChange={(option) => field.onChange(option?.value)}
              options={options}
              placeholder={t('process.create.question_type.single', 'Single choice')}
            />
          )
        }}
      />

      <FormErrorMessage>{errors.questionType?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}
