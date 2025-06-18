import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useEffect } from 'react'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuPlus, LuX } from 'react-icons/lu'
import { DashboardBox, DashboardSection } from '~components/shared/Dashboard/Contents'
import { QuestionTypes } from '../..'

interface QuestionFormProps {
  index: number
  onRemove: () => void
}

const SelectionLimits = ({ index }) => {
  const { control, setValue } = useFormContext()
  const { t } = useTranslation()
  const questionType = useWatch({ name: 'questionType', control })
  const fields = useWatch({ name: `questions.${index}.options`, control })
  const min = useWatch({ name: `questions.${index}.minSelections`, control })
  const max = useWatch({ name: `questions.${index}.maxSelections`, control })

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
  const { control } = useFormContext()
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `questions.${index}.options`,
  })
  const min = useWatch({ name: `questions.${index}.minSelections`, control })
  const max = useWatch({ name: `questions.${index}.maxSelections`, control })
  const questionType = useWatch({ name: 'questionType', control })

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
          <VStack flex='1' align='stretch' spacing={4} mb={6}>
            <FormControl isInvalid={!!errors.questions?.[index]?.title}>
              <Input
                px={0}
                variant='unstyled'
                placeholder={t('process_create.question.title.placeholder', 'Add a title to the question')}
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
              placeholder={t(
                'process.create.question.description.placeholder',
                'Add the description of the question here (optional)...'
              )}
              resize='none'
              minH='60px'
              {...register(`questions.${index}.description`)}
            />
          </VStack>
          {index > 0 && (
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
            <HStack key={field.id}>
              <FormControl isInvalid={!!errors.questions?.[index]?.options?.[optionIndex]?.text}>
                <Input
                  placeholder={t('process_create.option.placeholder', 'Option {{number}}', {
                    number: optionIndex + 1,
                  })}
                  {...register(`questions.${index}.options.${optionIndex}.text`, {
                    required: t('form.error.required', 'This field is required'),
                  })}
                />
                <FormErrorMessage>
                  {errors.questions?.[index]?.options?.[optionIndex]?.text?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <IconButton
                icon={<Icon as={LuX} />}
                aria-label={t('process_create.option.remove', 'Remove option')}
                onClick={() => remove(optionIndex)}
                size='sm'
                variant='ghost'
              />
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
