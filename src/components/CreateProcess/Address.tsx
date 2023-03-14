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
import { useTranslation } from 'react-i18next'

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
}: Props) => {
  const { t } = useTranslation()
  const rowTitle = (i: number) =>
    t('process.create.address.row_title', { num: i + 1 })
  return (
    <>
      {fields.map((add, i: number) => (
        <FormControl key={add.id} mb={4}>
          <Flex alignItems='center'>
            <FormLabel whiteSpace='nowrap'>{rowTitle(i)}</FormLabel>
            {getValues().weightedVote && (
              <FormControl display='flex' alignItems='end' mb={2} ml={8}>
                <FormLabel>{t('process.create.weight')}</FormLabel>
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
              icon={<DeleteIcon />}
              aria-label='delete address'
              onClick={() => remove(i)}
            />
          </Flex>
          <Input
            {...register(`addresses.${i}.address` as const, {
              required: {
                value: true,
                message: t('form.error.field_is_required'),
              },
            })}
            placeholder={rowTitle(i)}
          />
        </FormControl>
      ))}
    </>
  )
}

export default CreateProcessAddress
