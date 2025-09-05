import { Box, FormControl, FormErrorMessage, Icon, IconButton, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LuGripVertical, LuPlus, LuTrash2 } from 'react-icons/lu'
import Editor from '~components/Editor'
import { useProcessTemplates } from '~components/Process/TemplateProvider'
import { DashboardBox } from '~components/shared/Dashboard/Contents'
import { ImageUploader } from '~components/shared/Layout/Uploader'

const ExtendedQuestionEditor = ({
  index,
  questionOptions,
  append,
  remove,
}: {
  index: number
  questionOptions: any[]
  append: any
  remove: any
}) => {
  const { t } = useTranslation()
  const { activeTemplate, placeholders } = useProcessTemplates()
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()

  return (
    <SimpleGrid columns={{ base: 1, lg: 2, xl: 3, '2xl': 4 }} spacing={4}>
      {questionOptions.map((field, optionIndex) => (
        <SortableExtendedOption
          key={field.id}
          field={field}
          optionIndex={optionIndex}
          questionIndex={index}
          fieldsLength={questionOptions.length}
          onRemove={() => remove(optionIndex)}
          placeholders={placeholders}
          activeTemplate={activeTemplate}
          register={register}
          errors={errors}
          control={control}
          t={t}
        />
      ))}

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
          <Text>{t('process_create.new_option', { defaultValue: 'Add option' })}</Text>
        </VStack>
      </DashboardBox>
    </SimpleGrid>
  )
}

// SortableExtendedOption component for individual option cards
const SortableExtendedOption = ({
  field,
  optionIndex,
  questionIndex,
  fieldsLength,
  onRemove,
  placeholders,
  activeTemplate,
  register,
  errors,
  control,
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
      <DashboardBox position='relative' p={0}>
        {/* Drag handle */}
        {fieldsLength > 1 && (
          <Box
            {...attributes}
            {...listeners}
            cursor={isDragging ? 'grabbing' : 'grab'}
            position='absolute'
            top={2}
            left={2}
            zIndex='contents'
            p={1}
            borderRadius='md'
            color='gray.400'
            _hover={{ color: 'gray.600', bg: 'gray.100', _dark: { bg: 'gray.700' } }}
          >
            <Icon as={LuGripVertical} size='sm' />
          </Box>
        )}

        {/* Trash button */}
        {fieldsLength > 2 && (
          <IconButton
            icon={<Icon as={LuTrash2} />}
            aria-label='Remove option'
            size='sm'
            colorScheme='red'
            onClick={onRemove}
            position='absolute'
            top={2}
            right={2}
            zIndex='contents'
          />
        )}

        <VStack align='stretch' spacing={4}>
          {/* Image uploader */}
          <ImageUploader name={`questions.${questionIndex}.options.${optionIndex}.image`} />
          {/* Content box */}
          <Box p={4}>
            {/* Title */}
            <FormControl isInvalid={!!errors.questions?.[questionIndex]?.options?.[optionIndex]?.option}>
              <Input
                px={0}
                variant='unstyled'
                placeholder={
                  placeholders[activeTemplate]?.questions?.[questionIndex].options?.[optionIndex]?.option ??
                  t('process_create.option.placeholder', 'Option {{number}}', {
                    number: optionIndex + 1,
                  })
                }
                fontWeight='bold'
                fontSize='md'
                {...register(`questions.${questionIndex}.options.${optionIndex}.option`, {
                  required: t('form.error.required', 'This field is required'),
                })}
              />
              <FormErrorMessage>
                {errors.questions?.[questionIndex]?.options?.[optionIndex]?.option?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            {/* Description */}
            <Controller
              name={`questions.${questionIndex}.options.${optionIndex}.description`}
              control={control}
              render={({ field }) => (
                <Editor
                  onChange={field.onChange}
                  placeholder={
                    placeholders[activeTemplate]?.questions?.[questionIndex].options?.[optionIndex]?.description ??
                    t('process_create.option.description_placeholder', 'Project description')
                  }
                  defaultValue={field.value}
                />
              )}
            />
          </Box>
        </VStack>
      </DashboardBox>
    </div>
  )
}

export default ExtendedQuestionEditor
