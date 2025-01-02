import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, FormControl, FormErrorMessage, HStack, IconButton, Input, Text } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'
import Options from './Options'

interface Props {
  index: number
  remove: (number) => void
  isMultiQuestion?: boolean
}

export const Question = ({ index, isMultiQuestion, remove }: Props) => {
  const { t } = useTranslation()
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext()

  const {
    fields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
  })

  const questions = watch('questions')
  const description = watch(`questions.${index}.description`)

  return (
    <Box p={6} position='relative'>
      <HStack mb={2}>
        <IconButton
          type='button'
          icon={<DeleteIcon />}
          aria-label={t('form.process_create.question.question_delete', { values: { num: index } })}
          onClick={() => remove(index)}
          colorScheme='red'
          size='sm'
          ml='auto'
          variant={'transparent'}
        />
      </HStack>
      <Flex gap={6} mb={2}>
        <FormControl isInvalid={isInvalidFieldMap(errors, `questions.${index}.title`)}>
          <Input
            {...register(`questions.${index}.title`, {
              required: {
                value: true,
                message: t('form.error.field_is_required'),
              },
            })}
            placeholder={t('form.process_create.question.title_placeholder').toString()}
            mb={1}
          />
          <FormErrorMessage>{fieldMapErrorMessage(errors, `questions.${index}.title`)}</FormErrorMessage>
        </FormControl>

        {questions?.length > 1 && (
          <IconButton
            type='button'
            icon={<DeleteIcon />}
            aria-label={t('form.process_create.question.question_delete', { values: { num: index } })}
            onClick={() => remove(index)}
            colorScheme='red'
          />
        )}
      </Flex>
      <Editor
        onChange={(text: string) => setValue(`questions.${index}.description`, text)}
        placeholder={t('form.process_create.question.description_placeholder').toString()}
        defaultValue={description}
      />

      <Options fields={fields} removeOption={removeOption} appendOption={appendOption} index={index} />

      {isMultiQuestion && (
        <Text
          position='absolute'
          bottom={0}
          right={5}
          fontSize='100px'
          color='process_create.question_index'
          opacity={0.2}
        >
          {index + 1}
        </Text>
      )}
    </Box>
  )
}
