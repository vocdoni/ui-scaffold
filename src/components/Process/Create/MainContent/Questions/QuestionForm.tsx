import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Radio,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useEffect } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuPlus, LuTrash2, LuX } from 'react-icons/lu'
import { useProcessTemplates } from '~components/Process/TemplateProvider'
import { DashboardBox, DashboardSection } from '~components/shared/Dashboard/Contents'
import { ImageUploader } from '~components/shared/Layout/Uploader'
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
  const {
    fields: questionOptions,
    append,
    remove,
  } = useFieldArray({
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

  if (questionType === QuestionTypes.ParticipatoryBudgeting) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {questionOptions.map((field, optionIndex) => (
          <DashboardBox key={field.id} position='relative' p={0}>
            {/* Trash button */}
            {questionOptions.length > 2 && (
              <IconButton
                icon={<Icon as={LuTrash2} />}
                aria-label='Remove option'
                size='sm'
                colorScheme='red'
                onClick={() => remove(optionIndex)}
                position='absolute'
                top={2}
                right={2}
                zIndex='contents'
              />
            )}

            <VStack align='stretch' spacing={4}>
              {/* Image uploader */}
              <ImageUploader name={`questions.${index}.options.${optionIndex}.image`} />
              {/* Content box */}
              <Box p={4}>
                {/* Title */}
                <FormControl isInvalid={!!errors.questions?.[index]?.options?.[optionIndex]?.option}>
                  <Input
                    px={0}
                    variant='unstyled'
                    placeholder='Project title'
                    fontWeight='bold'
                    fontSize='md'
                    {...register(`questions.${index}.options.${optionIndex}.option`, {
                      required: 'This field is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.questions?.[index]?.options?.[optionIndex]?.option?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>

                {/* Description */}
                <Textarea
                  variant='unstyled'
                  placeholder='Project description'
                  resize='none'
                  minH='60px'
                  {...register(`questions.${index}.options.${optionIndex}.description`)}
                />

                {/* Budget */}
                <FormControl isInvalid={!!errors.questions?.[index]?.options?.[optionIndex]?.budget}>
                  <Flex align='center' gap={2}>
                    <FormLabel>{t('process_create.option.budget.label', 'Budget for this option:')}</FormLabel>
                    <Input
                      type='number'
                      w='80px'
                      textAlign='right'
                      {...register(`questions.${index}.options.${optionIndex}.budget`, {
                        valueAsNumber: true,
                        required: 'This field is required',
                      })}
                      placeholder='0'
                    />
                    <Text fontSize='sm'>€</Text>
                  </Flex>
                  <FormErrorMessage>
                    {errors.questions?.[index]?.options?.[optionIndex]?.budget?.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </VStack>
          </DashboardBox>
        ))}

        {/* Add new option card */}
        <DashboardBox
          onClick={() => append({ option: '', description: '', budget: null })}
          borderStyle='dashed'
          cursor='pointer'
          minH='350px'
          _hover={{ bg: 'gray.800' }}
        >
          <VStack justify='center' align='center' height='100%'>
            <Icon as={LuPlus} boxSize={6} />
            <Text>Add a new option</Text>
          </VStack>
        </DashboardBox>
      </SimpleGrid>
    )
  }

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

        {/* Options */}
        <VStack align='stretch' spacing={2}>
          {questionOptions.map((field, optionIndex) => (
            <HStack key={field.id} align='start'>
              {questionType === QuestionTypes.Single ? (
                <Radio isChecked={false} isReadOnly mt={2} />
              ) : (
                <Checkbox isChecked={false} isReadOnly mt={2} />
              )}
              <FormControl isInvalid={!!errors.questions?.[index]?.options?.[optionIndex]?.option} flex='1'>
                <Input
                  placeholder={
                    placeholders[activeTemplate]?.questions?.[index].options?.[optionIndex] ??
                    t('process_create.option.placeholder', 'Option {{number}}', {
                      number: optionIndex + 1,
                    })
                  }
                  {...register(`questions.${index}.options.${optionIndex}.option`, {
                    required: t('form.error.required', 'This field is required'),
                  })}
                />
                <FormErrorMessage>
                  {errors.questions?.[index]?.options?.[optionIndex]?.option?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              {questionOptions.length > 2 && (
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
            onClick={() => append({ option: '' })}
            alignSelf='flex-start'
          >
            <Trans i18nKey='process_create.option.add'>Add option</Trans>
          </Button>
        </VStack>
      </Box>
    </DashboardBox>
  )
}
