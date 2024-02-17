import { DeleteIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormErrorMessage, IconButton, Input, Text } from '@chakra-ui/react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Editor from '~components/Editor/Editor'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'
import Options from './Options'

interface Props {
  index: number
  remove: any
}

const Question = ({ index, remove }: Props) => {
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

  return (
    <Box className='process-create-section' bgColor='process_create.section' p={6} position='relative'>
      <IconButton
        variant='icon'
        position='absolute'
        right={2}
        top={2}
        size='xs'
        type='button'
        icon={<DeleteIcon />}
        aria-label={t('form.process_create.question.question_delete', { values: { num: index } })}
        onClick={() => remove(index)}
        ml='auto'
      />

      <FormControl isInvalid={isInvalidFieldMap(errors, `questions.${index}.title`)} mb={2}>
        <Input
          {...register(`questions.${index}.title`, {
            required: {
              value: true,
              message: t('form.error.field_is_required'),
            },
          })}
          placeholder={t('form.process_create.question.title_placeholder').toString()}
          mb={1}
          maxW='90%'
        />
        <FormErrorMessage>{fieldMapErrorMessage(errors, `questions.${index}.title`)}</FormErrorMessage>
      </FormControl>
      <Editor
        onChange={(text: string) => setValue(`questions.${index}.description`, text)}
        placeholder={t('form.process_create.question.description_placeholder').toString()}
      />

      <Options fields={fields} removeOption={removeOption} appendOption={appendOption} index={index} />

      <Text position='absolute' fontSize='100px' bottom={0} right={5} color='rgb(245, 247, 250)'>
        {index + 1}
      </Text>
    </Box>
  )
}

export default Question
