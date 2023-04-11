import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Flex, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input } from '@chakra-ui/react'
import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, useFormContext, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'

interface Props {
  fields: Record<'id', string>[]
  register: UseFormRegister<FieldValues>
  removeOption: UseFieldArrayRemove
  appendOption: UseFieldArrayAppend<FieldValues, `questions.${number}.options`>
  index: number
}

const Options = ({ fields, register, removeOption, appendOption, index }: Props) => {
  const {
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  return (
    <>
      <HStack justifyContent='space-between' mb={4} mt={8}>
        <FormLabel>Options</FormLabel>
        <IconButton
          type='button'
          size='sm'
          icon={<AddIcon />}
          aria-label='Add option'
          onClick={() => appendOption({ option: '' })}
        />
      </HStack>
      {fields.map((_, idx: number) => (
        <FormControl key={idx} mb={4} isInvalid={isInvalidFieldMap(errors, `questions.${index}.options.${idx}.option`)}>
          <Flex alignItems='center'>
            <FormLabel>Option {idx + 1}</FormLabel>

            <IconButton
              ml='auto'
              size='xs'
              type='button'
              icon={<DeleteIcon />}
              aria-label='delete option'
              onClick={() => removeOption(idx)}
            />
          </Flex>
          <Input
            {...register(`questions.${index}.options.${idx}.option`, {
              required: {
                value: true,
                message: t('form.error.field_is_required'),
              },
            })}
            placeholder={`Option ${idx + 1}`}
          />
          <FormErrorMessage>
            {fieldMapErrorMessage(errors, `questions.${index}.options.${idx}.option`)}
          </FormErrorMessage>
        </FormControl>
      ))}
    </>
  )
}
export default Options
