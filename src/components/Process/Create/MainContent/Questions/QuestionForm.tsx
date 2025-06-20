import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  Radio,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useEffect } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuPlus, LuX } from 'react-icons/lu'
import { useProcessTemplates } from '~components/Process/TemplateProvider'
import { DashboardBox, DashboardSection } from '~components/shared/Dashboard/Contents'
import { QuestionTypes } from '../..'

interface QuestionFormProps {
  index: number
  onRemove: () => void
}

const SelectionLimits = ({ index }) => {
  const { control, setValue, watch } = useFormContext()
  const { t } = useTranslation()
  const questionType = watch('questionType')
  const fields = watch(`questions.${index}.options`)
  const min = watch(`questions.${index}.minSelections`)
  const max = watch(`questions.${index}.maxSelections`)

  // Ensure max is not less than min
  useEffect(() => {
    if (min && max && max < min) {
      setValue(`questions.${index}.maxSelections`, min)
    }
  }, [min, max, index, setValue])

  if (questionType === QuestionTypes.Single) return null

  return (
    <DashboardSection p={4} mb={4}>
      <Box color='white'>
        <Text fontWeight='medium' mb={1}>
          <Trans i18nKey='process.create.selectionLimits.title'>Selection limits:</Trans>
        </Text>
        <Text as='span' fontSize='sm'>
          <Trans
            i18nKey='process.create.selectionLimits.full'
            defaults='Voters must select at least  <min />  and at most  <max />  options.'
            components={{
              min: (
                <Controller
                  name={`questions.${index}.minSelections`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => {
                    const options = fields.map((_, i) => ({ value: i + 1, label: `${i + 1}` }))
                    const selectedOption = options.find((opt) => opt.value === field.value)

                    return (
                      <Box display='inline-block'>
                        <Select
                          {...field}
                          value={selectedOption}
                          options={options}
                          isInvalid={!!fieldState.invalid}
                          isClearable={false}
                          onChange={(option) => field.onChange(option?.value)}
                          size='sm'
                        />
                      </Box>
                    )
                  }}
                />
              ),
              max: (
                <Controller
                  name={`questions.${index}.maxSelections`}
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) =>
                      value >= min || t('form.error.max_greater_than_min', 'Max must be greater than or equal to Min'),
                  }}
                  render={({ field, fieldState }) => {
                    const options = fields
                      .map((_, i) => ({ value: i + 1, label: `${i + 1}` }))
                      .filter((opt) => !min || opt.value >= min)
                    const selectedOption = options.find((opt) => opt.value === field.value) ?? options[0]

                    return (
                      <Box display='inline-block'>
                        <Select
                          {...field}
                          value={selectedOption}
                          options={options}
                          isInvalid={!!fieldState.invalid}
                          isClearable={false}
                          onChange={(option) => field.onChange(option?.value)}
                          size='sm'
                        />
                      </Box>
                    )
                  }}
                />
              ),
            }}
          />
        </Text>
      </Box>
    </DashboardSection>
  )
}

export const QuestionForm = ({ index, onRemove }: QuestionFormProps) => {
  const { t } = useTranslation()
  const { activeTemplate, placeholders } = useProcessTemplates()
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `questions.${index}.options`,
  })
  const min = watch(`questions.${index}.minSelections`)
  const max = watch(`questions.${index}.maxSelections`)
  const questionType = watch('questionType')
  const questions = watch('questions')

  useEffect(() => {
    if (min && max && max < min) {
      setValue(`questions.${index}.maxSelections`, min)
    }
  }, [min, max, index, setValue])

  return (
    <DashboardBox>
      <Box>
        {/* Question title and description */}
        <HStack align='stretch' spacing={4}>
          <VStack flex='1' align='stretch' spacing={2} mb={6}>
            <Text fontSize='sm' color='texts.subtle'>
              {t('process.create.question.question_number', {
                defaultValue: 'Question {{index}} of {{total}}',
                index: index + 1,
                total: questions.length,
              })}
            </Text>
            <FormControl isInvalid={!!errors.questions?.[index]?.title}>
              <Input
                px={0}
                variant='unstyled'
                placeholder={
                  placeholders[activeTemplate]?.questions?.[index]?.title ??
                  t('process_create.question.title.placeholder', 'Add a title to the question')
                }
                fontSize='lg'
                fontWeight='bold'
                {...register(`questions.${index}.title`, {
                  required: t('form.error.required', 'This field is required'),
                })}
              />
              <FormErrorMessage>{errors.questions?.[index]?.title?.message?.toString()}</FormErrorMessage>
            </FormControl>
            <Textarea
              variant='unstyled'
              placeholder={
                placeholders[activeTemplate]?.questions?.[index]?.description ??
                t(
                  'process_create.question.description.placeholder',
                  'Add the description of the question here (optional)...'
                )
              }
              resize='none'
              minH='60px'
              {...register(`questions.${index}.description`)}
            />
          </VStack>
          {questions.length > 1 && (
            <IconButton
              icon={<Icon as={LuX} />}
              aria-label={t('process_create.question.remove', 'Remove question')}
              size='sm'
              variant='ghost'
              onClick={onRemove}
            />
          )}
        </HStack>

        {/* Selection limits */}
        <SelectionLimits index={index} />

        {/* Options */}
        <VStack align='stretch' spacing={2}>
          {fields.map((field, optionIndex) => (
            <HStack key={field.id} align='start'>
              {questionType === QuestionTypes.Single ? (
                <Radio isChecked={false} isReadOnly mt={2} />
              ) : (
                <Checkbox isChecked={false} isReadOnly mt={2} />
              )}
              <FormControl isInvalid={!!errors.questions?.[index]?.options?.[optionIndex]?.text} flex='1'>
                <Input
                  placeholder={
                    placeholders[activeTemplate]?.questions?.[index].options?.[optionIndex] ??
                    t('process_create.option.placeholder', 'Option {{number}}', {
                      number: optionIndex + 1,
                    })
                  }
                  {...register(`questions.${index}.options.${optionIndex}.text`, {
                    required: t('form.error.required', 'This field is required'),
                  })}
                />
                <FormErrorMessage>
                  {errors.questions?.[index]?.options?.[optionIndex]?.text?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              {fields.length > 2 && (
                <IconButton
                  icon={<Icon as={LuX} />}
                  aria-label={t('process_create.option.remove', 'Remove option')}
                  onClick={() => remove(optionIndex)}
                  size='sm'
                  variant='ghost'
                  mt={1}
                />
              )}
            </HStack>
          ))}
          <Button
            leftIcon={<Icon as={LuPlus} />}
            variant='ghost'
            size='sm'
            onClick={() => append({ text: '' })}
            alignSelf='flex-start'
          >
            <Trans i18nKey='process_create.option.add'>Add option</Trans>
          </Button>
        </VStack>
      </Box>
    </DashboardBox>
  )
}
