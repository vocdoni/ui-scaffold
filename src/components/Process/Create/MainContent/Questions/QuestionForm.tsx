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
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuGripVertical, LuPlus, LuTrash2, LuX } from 'react-icons/lu'
import Editor from '~components/Editor'
import { useProcessTemplates } from '~components/Process/TemplateProvider'
import { DashboardBox, DashboardSection } from '~components/shared/Dashboard/Contents'
import { Select } from '~components/shared/Form/Select'
import { ImageUploader } from '~components/shared/Layout/Uploader'
import { QuestionTypes } from '../..'

interface QuestionFormProps {
  index: number
  onRemove: () => void
  questionId: string
}

const SelectionLimits = ({ index }) => {
  const { control, setValue, watch } = useFormContext()
  const { t } = useTranslation()
  const questionType = watch('questionType')
  const fields = watch(`questions.${index}.options`)
  const min = watch(`questions.${index}.minSelections`)
  const max = watch(`questions.${index}.maxSelections`)
  const options = [{ value: 0, label: '0' }, ...fields.map((_, i) => ({ value: i + 1, label: `${i + 1}` }))]

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
                    const maxOptions = options.filter((opt) => !min || opt.value >= min)
                    const selectedOption = maxOptions.find((opt) => opt.value === field.value) ?? maxOptions[0]

                    return (
                      <Box display='inline-block'>
                        <Select
                          {...field}
                          value={selectedOption}
                          options={maxOptions}
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

// SortableOption component for individual options
const SortableOption = ({
  field,
  optionIndex,
  questionIndex,
  questionType,
  fieldsLength,
  onRemove,
  placeholders,
  activeTemplate,
  register,
  errors,
  t,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <HStack align='start'>
        {/* Drag handle for options */}
        {fieldsLength > 2 && (
          <Box
            {...attributes}
            {...listeners}
            cursor={isDragging ? 'grabbing' : 'grab'}
            display='flex'
            alignItems='center'
            pt={2}
            color='gray.400'
            _hover={{ color: 'gray.600' }}
          >
            <Icon as={LuGripVertical} size='sm' />
          </Box>
        )}

        {questionType === QuestionTypes.Single ? (
          <Radio isChecked={false} isReadOnly inputProps={{ tabIndex: -1 }} mt={2} />
        ) : (
          <Checkbox isChecked={false} isReadOnly tabIndex={-1} mt={2} />
        )}
        <FormControl isInvalid={!!errors.questions?.[questionIndex]?.options?.[optionIndex]?.option} flex='1'>
          <Input
            placeholder={
              placeholders[activeTemplate]?.questions?.[questionIndex]?.options?.[optionIndex]?.option ??
              t('process_create.option.placeholder', 'Option {{number}}', {
                number: optionIndex + 1,
              })
            }
            {...register(`questions.${questionIndex}.options.${optionIndex}.option`, {
              required: t('form.error.required', 'This field is required'),
            })}
          />
          <FormErrorMessage>
            {errors.questions?.[questionIndex]?.options?.[optionIndex]?.option?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        {fieldsLength > 2 && (
          <IconButton
            icon={<Icon as={LuX} />}
            aria-label={t('process_create.option.remove', 'Remove option')}
            onClick={onRemove}
            size='sm'
            variant='ghost'
            mt={1}
          />
        )}
      </HStack>
    </div>
  )
}

export const QuestionForm = ({ index, onRemove, questionId }: QuestionFormProps) => {
  const { t } = useTranslation()
  const { activeTemplate, placeholders } = useProcessTemplates()
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext()
  const {
    fields: questionOptions,
    append,
    remove,
    move,
  } = useFieldArray({
    name: `questions.${index}.options`,
  })
  const min = watch(`questions.${index}.minSelections`)
  const max = watch(`questions.${index}.maxSelections`)
  const questionType = watch('questionType')
  const questions = watch('questions')
  const questionDescription = watch(`questions.${index}.description`)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: questionId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  useEffect(() => {
    if (min && max && max < min) {
      setValue(`questions.${index}.maxSelections`, min)
    }
  }, [min, max, index, setValue])

  if (questionType === QuestionTypes.ParticipatoryBudgeting) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {questionOptions.map((field, optionIndex) => {
          const optionDescription = watch(`questions.${index}.options.${optionIndex}.description`)

          return (
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
                      placeholder={
                        placeholders[activeTemplate]?.questions?.[index].options?.[optionIndex]?.option ??
                        t('process_create.participatory_budgeting.option.option.placeholder', 'Project Title')
                      }
                      fontWeight='bold'
                      fontSize='md'
                      {...register(`questions.${index}.options.${optionIndex}.option`, {
                        required: t('form.error.required', 'This field is required'),
                      })}
                    />
                    <FormErrorMessage>
                      {errors.questions?.[index]?.options?.[optionIndex]?.option?.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  {/* Description */}
                  <Editor
                    onChange={(text: string) => setValue(`questions.${index}.options.${optionIndex}.description`, text)}
                    placeholder={
                      placeholders[activeTemplate]?.questions?.[index].options?.[optionIndex]?.description ??
                      t('process_create.participatory_budgeting.option..description.placeholder', 'Project description')
                    }
                    defaultValue={optionDescription}
                  />
                </Box>
              </VStack>
            </DashboardBox>
          )
        })}

        {/* Add new option card */}
        <DashboardBox
          onClick={() => append({ option: '', description: '' })}
          borderStyle='dashed'
          cursor='pointer'
          minH='350px'
          _hover={{ bg: 'gray.100', _dark: { bg: 'gray.800' } }}
        >
          <VStack justify='center' align='center' height='100%'>
            <Icon as={LuPlus} boxSize={6} />
            <Text>{t('process_create.new_option', { defaultValue: 'Add a new option' })}</Text>
          </VStack>
        </DashboardBox>
      </SimpleGrid>
    )
  }

  return (
    <div ref={setNodeRef} style={style}>
      <DashboardBox>
        {/* Question title and description */}
        <HStack align='stretch' spacing={4}>
          {/* Drag handle */}
          {questions.length > 1 && (
            <Box
              {...attributes}
              {...listeners}
              cursor={isDragging ? 'grabbing' : 'grab'}
              display='flex'
              alignItems='flex-start'
              pt={2}
              color='gray.400'
              _hover={{ color: 'gray.600' }}
            >
              <Icon as={LuGripVertical} />
            </Box>
          )}

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
            <Editor
              onChange={(text: string) => setValue(`questions.${index}.description`, text)}
              placeholder={
                placeholders[activeTemplate]?.questions?.[index]?.description ??
                t(
                  'process_create.question.description.placeholder',
                  'Add the description of the question here (optional)...'
                )
              }
              defaultValue={questionDescription}
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
        {questionType === QuestionTypes.Multiple && <SelectionLimits index={index} />}

        {/* Options */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event

            if (over && active.id !== over.id) {
              const oldIndex = questionOptions.findIndex((field) => field.id === active.id)
              const newIndex = questionOptions.findIndex((field) => field.id === over.id)

              if (oldIndex !== -1 && newIndex !== -1) {
                // Move the field array items
                move(oldIndex, newIndex)
              }
            }
          }}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={questionOptions.map((field) => field.id)} strategy={verticalListSortingStrategy}>
            <VStack align='stretch' spacing={2}>
              {questionOptions.map((field, optionIndex) => (
                <SortableOption
                  key={field.id}
                  field={field}
                  optionIndex={optionIndex}
                  questionIndex={index}
                  questionType={questionType}
                  fieldsLength={questionOptions.length}
                  onRemove={() => remove(optionIndex)}
                  placeholders={placeholders}
                  activeTemplate={activeTemplate}
                  register={register}
                  errors={errors}
                  t={t}
                />
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
          </SortableContext>
        </DndContext>
      </DashboardBox>
    </div>
  )
}
