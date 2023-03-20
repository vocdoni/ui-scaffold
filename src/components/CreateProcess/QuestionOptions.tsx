import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react'
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form'

interface Props {
  fields: Record<'id', string>[]
  register: UseFormRegister<FieldValues>
  removeOption: UseFieldArrayRemove
  appendOption: UseFieldArrayAppend<FieldValues, `questions.${number}.options`>
  index: number
}

const CreateProcessQuestionOptions = ({
  fields,
  register,
  removeOption,
  appendOption,
  index,
}: Props) => (
  <>
    <HStack justifyContent='space-between' mb={4} mt={8}>
      <FormLabel>Options</FormLabel>
      <IconButton
        type='button'
        icon={<AddIcon />}
        aria-label='Add option'
        onClick={() => appendOption({ option: '' })}
      />
    </HStack>
    {fields.map((_, idx: number) => (
      <FormControl key={idx} mb={4}>
        <Flex alignItems='center'>
          <FormLabel>Option {idx + 1}</FormLabel>

          <IconButton
            ml='auto'
            type='button'
            size='sm'
            icon={<DeleteIcon />}
            aria-label='delete option'
            onClick={() => removeOption(idx)}
          />
        </Flex>
        <Input
          {...register(`questions.${index}.options.${idx}.option` as const, {
            required: true,
          })}
          placeholder={`Option ${idx + 1}`}
        />
      </FormControl>
    ))}
  </>
)
export default CreateProcessQuestionOptions
