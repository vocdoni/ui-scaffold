import { DeleteIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormLabel, HStack, IconButton, Input } from '@chakra-ui/react'
import { useFieldArray, UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import OptionsForm from './Questions/OptionsForm'

interface Props {
  index: number
  remove: UseFieldArrayRemove
}
const CreateProcessQuestion = ({ index, remove }: Props) => {
  const { register } = useFormContext()
  const {
    fields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    name: `questions.${index}.options`,
  })

  return (
    <Box bg='white' p={{ base: 2, sm: 4 }} borderRadius='md' _dark={{ bg: 'black.c60' }}>
      <HStack justify='space-between' mb={4}>
        <FormLabel>Question {index + 1}</FormLabel>

        <IconButton
          type='button'
          size='sm'
          icon={<DeleteIcon />}
          aria-label={`Delete question ${index + 1}`}
          onClick={() => remove()}
        />
      </HStack>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          {...register(`questions.${index}.title` as const, {
            required: true,
          })}
          placeholder='Title'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          {...register(`questions.${index}.description` as const, {
            required: true,
          })}
          placeholder='Description'
        />
      </FormControl>

      <OptionsForm
        fields={fields}
        register={register}
        removeOption={removeOption}
        appendOption={appendOption}
        index={index}
      />
    </Box>
  )
}

export default CreateProcessQuestion
