import { DeleteIcon } from '@chakra-ui/icons'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
} from '@chakra-ui/react'
import {
  FieldValues,
  UseFieldArrayRemove,
  useFormContext,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'

interface Props {
  fields: Record<'id', string>[]
  getValues: UseFormGetValues<FieldValues>
  register: UseFormRegister<FieldValues>
  remove: UseFieldArrayRemove
}

const AddressesForm = ({ fields, getValues, register, remove }: Props) => {
  const { t } = useTranslation()
  const rowTitle = (i: number) =>
    t('form.process_create.address_title', { num: i + 1 })
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <>
      {fields.map((add, i: number) => (
        <FormControl
          key={i}
          mb={4}
          isInvalid={isInvalidFieldMap(errors, `addresses.${i}.address`)}
        >
          <Flex alignItems='center'>
            <FormLabel whiteSpace='nowrap'>{rowTitle(i)}</FormLabel>
            {getValues().weightedVote && (
              <FormControl
                display='flex'
                alignItems='end'
                m={0}
                isInvalid={isInvalidFieldMap(errors, `addresses.${i}.weight`)}
              >
                <FormLabel>{t('form.process_create.address_weight')}</FormLabel>
                <Input
                  size='sm'
                  type='number'
                  width={24}
                  {...register(`addresses.${i}.weight` as const)}
                />
                <FormErrorMessage>
                  {fieldMapErrorMessage(errors, `addresses.${i}.weight`)}
                </FormErrorMessage>
              </FormControl>
            )}
            <IconButton
              ml='auto'
              size='xs'
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
          <FormErrorMessage>
            {fieldMapErrorMessage(errors, `addresses.${i}.address`)}
          </FormErrorMessage>
        </FormControl>
      ))}
    </>
  )
}

export default AddressesForm
