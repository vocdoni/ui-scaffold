import { DeleteIcon } from '@chakra-ui/icons'
import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
} from '@chakra-ui/react'
import {
  FieldValues,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form'

interface Props {
  fields: Record<'id', string>[]
  getValues: UseFormGetValues<FieldValues>
  register: UseFormRegister<FieldValues>
  remove: UseFieldArrayRemove
}

const CreateProcessAddress = ({
  fields,
  getValues,
  register,
  remove,
}: Props) => (
  <>
    {fields.map((add, i: number) => (
      <FormControl key={add.id} mb={4}>
        <Flex alignItems='center'>
          <FormLabel whiteSpace='nowrap'>{`Address ${i + 1}`}</FormLabel>
          {getValues().weightedVote && (
            <FormControl display='flex' alignItems='end' mb={2} ml={8}>
              <FormLabel>Weight:</FormLabel>
              <Input
                type='number'
                width={24}
                {...register(`addresses.${i}.weight` as const)}
              />
            </FormControl>
          )}
          <IconButton
            ml='auto'
            type='button'
            size='sm'
            icon={<DeleteIcon />}
            aria-label='delete address'
            onClick={() => remove(i)}
          />
        </Flex>
        <Input
          {...register(`addresses.${i}.address` as const, { required: true })}
          placeholder={`Address ${i + 1}`}
        />
      </FormControl>
    ))}
  </>
)

export default CreateProcessAddress
