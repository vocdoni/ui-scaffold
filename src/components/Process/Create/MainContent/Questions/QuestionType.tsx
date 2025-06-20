import { Box, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { DefaultQuestions, QuestionTypes } from '../..'

interface SelectOption {
  value: string
  label: string
}

export const QuestionType = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()

  return (
    <FormControl isInvalid={!!errors.questionType} display='flex' alignItems='center' justifyContent='space-between'>
      <Box>
        <FormLabel mb={0} fontWeight='extrabold'>
          <Trans i18nKey='process.create.question_type'>Question Type</Trans>
        </FormLabel>
        <Text fontSize='xs' color='texts.subtle'>
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
            { value: QuestionTypes.Single, label: t('process.create.question_type.single', 'Single choice') },
            { value: QuestionTypes.Multiple, label: t('process.create.question_type.multiple', 'Multiple choice') },
          ]
          const selectedOption = options.find((opt) => opt.value === field.value)

          return (
            <Select<SelectOption>
              value={selectedOption}
              onChange={(option) => {
                const newType = option?.value as QuestionTypes
                field.onChange(newType)
                const oldQuestion = getValues('questions')[0]
                setValue('questions', [
                  {
                    ...DefaultQuestions[newType],
                    ...oldQuestion,
                  },
                ])
              }}
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
