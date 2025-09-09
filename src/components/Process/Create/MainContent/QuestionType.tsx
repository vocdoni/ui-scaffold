import { Box, FormControl, FormLabel, HStack, Switch, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Select } from '~components/shared/Form/Select'
import { DefaultQuestions, SelectorTypes } from '../common'

interface SelectOption {
  value: SelectorTypes
  label: string
}

export const QuestionType = () => {
  const { t } = useTranslation()
  const { control, setValue, getValues, register } = useFormContext()

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Box>
        <FormLabel mb={0} fontWeight='extrabold'>
          <Trans i18nKey='process.question_type.title'>Question Type</Trans>
        </FormLabel>
        <Text fontSize='xs' color='texts.subtle'>
          <Trans i18nKey='process.question_type.description'>
            This applies to all questions in this voting process
          </Trans>
        </Text>
      </Box>
      <HStack>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='extended-info' mb='0'>
            <Trans i18nKey='process.extended_info'>Extended info</Trans>
          </FormLabel>
          <Controller
            name='extendedInfo'
            control={control}
            render={({ field }) => (
              <Switch id='extended-info' isChecked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name='questionType'
          rules={{ required: t('form.error.field_is_required', 'This field is required') }}
          render={({ field }) => {
            const options: SelectOption[] = [
              { value: SelectorTypes.Single, label: t('process.question_type.single', 'Single choice') },
              { value: SelectorTypes.Multiple, label: t('process.question_type.multiple', 'Multiple choice') },
            ]
            const selectedOption = options.find((opt) => opt.value === field.value)

            return (
              <Select
                value={selectedOption}
                onChange={(option: SelectOption) => {
                  const newType = option?.value
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
                placeholder={t('process.question_type.single', 'Single choice')}
                menuPortalTarget={document.body}
              />
            )
          }}
        />
      </HStack>
    </Box>
  )
}
