import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuPlus, LuX } from 'react-icons/lu'
import { DashboardBox } from '~components/shared/Dashboard/Contents'

interface QuestionFormProps {
  index: number
  onRemove: () => void
}

export const QuestionForm = ({ index, onRemove }: QuestionFormProps) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `questions.${index}.options`,
  })

  return (
    <DashboardBox>
      <Box position='relative'>
        <IconButton
          icon={<Icon as={LuX} />}
          aria-label={t('process_create.question.remove', 'Remove question')}
          position='absolute'
          right={-2}
          top={-2}
          size='sm'
          variant='ghost'
          onClick={onRemove}
        />

        {/* Question title and description */}
        <VStack align='stretch' spacing={4} mb={6}>
          <FormControl isInvalid={!!errors.questions?.[index]?.title}>
            <Input
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
