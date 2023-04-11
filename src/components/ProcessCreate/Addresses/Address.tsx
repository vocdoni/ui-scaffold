import { DeleteIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import { FieldValues, UseFieldArrayRemove, useFormContext, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'

interface Props {
  index: number
  weightedVote: boolean
  register: UseFormRegister<FieldValues>
  remove: UseFieldArrayRemove
}

const AddressForm = ({ index, weightedVote, register, remove }: Props) => {
  const { t } = useTranslation()
  const rowTitle = (index: number) => t('form.process_create.address_title', { num: index + 1 })
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <FormControl key={index} mb={4} isInvalid={isInvalidFieldMap(errors, `addresses.${index}.address`)}>
        <Flex alignItems='center'>
          <FormLabel whiteSpace='nowrap'>{rowTitle(index)}</FormLabel>
          {weightedVote && (
            <FormControl
              display='flex'
              alignItems='end'
              m={0}
              isInvalid={isInvalidFieldMap(errors, `addresses.${index}.weight`)}
            >
              <FormLabel>{t('form.process_create.address_weight')}</FormLabel>
              <Input size='sm' type='number' width={24} {...register(`addresses.${index}.weight` as const)} />
              <FormErrorMessage>{fieldMapErrorMessage(errors, `addresses.${index}.weight`)}</FormErrorMessage>
            </FormControl>
          )}
          <IconButton
            ml='auto'
            size='xs'
            type='button'
            icon={<DeleteIcon />}
            aria-label='delete address'
            onClick={() => remove(index)}
          />
        </Flex>
        <Input
          {...register(`addresses.${index}.address` as const, {
            required: {
              value: true,
              message: t('form.error.field_is_required'),
            },
          })}
          placeholder={rowTitle(index)}
        />
        <FormErrorMessage>{fieldMapErrorMessage(errors, `addresses.${index}.address`)}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default AddressForm
