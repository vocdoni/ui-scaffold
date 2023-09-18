import { DeleteIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormErrorMessage, IconButton, Input, Text, Textarea } from '@chakra-ui/react'
import { fieldMapErrorMessage, isInvalidFieldMap } from '@constants'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Options from './Options'

interface Props {
  index: number
  remove: any
}

const Question = ({ index, remove }: Props) => {
  const { t } = useTranslation()
  const {
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
    <Box bgColor='process_create.section' borderRadius='md' p={6} position='relative'>
      <IconButton
        type='button'
        position='absolute'
        right={2}
        top={2}
        size='sm'
        icon={<DeleteIcon />}
        aria-label=''
        opacity={0.6}
        _hover={{
          '&': {
            opacity: 1,
          },
        }}
        onClick={() => remove(index)}
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
      <FormControl mb={2}>
        <Textarea
          {...register(`questions.${index}.description`)}
          placeholder={t('form.process_create.question.description_placeholder').toString()}
          mb={1}
          maxW='90%'
        />
      </FormControl>

      <Options fields={fields} removeOption={removeOption} appendOption={appendOption} index={index} />

      <Text position='absolute' fontSize='100px' bottom={0} right={5} color='rgb(245, 247, 250)'>
        {index + 1}
      </Text>
    </Box>
  )
}

export default Question
