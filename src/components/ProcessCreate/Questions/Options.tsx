import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from '@chakra-ui/react'
import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '~constants'

interface Props {
  fields: Record<'id', string>[]
  removeOption: UseFieldArrayRemove
  appendOption: UseFieldArrayAppend<FieldValues, `questions.${number}.options`>
  index: number
}

const Options = ({ fields, removeOption, appendOption, index }: Props) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Box>
      {fields.map((_, idx: number) => (
        <FormControl key={idx} isInvalid={isInvalidFieldMap(errors, `questions.${index}.options.${idx}.option`)} mb={2}>
          <Flex alignItems='center' justifyContent='start' gap={2}>
            <FormLabel fontWeight='bold' m={0}>
              {idx + 1}
            </FormLabel>

            <Box w='50%'>
              <Input
                {...register(`questions.${index}.options.${idx}.option`, {
                  required: {
                    value: true,
                    message: t('form.error.field_is_required'),
                  },
                })}
                placeholder={t('form.process_create.question.option_placeholder').toString()}
              />

              <FormErrorMessage>
                {fieldMapErrorMessage(errors, `questions.${index}.options.${idx}.option`)}
              </FormErrorMessage>
            </Box>
            {fields.length > 2 && (
              <IconButton
                size='xs'
                type='button'
                icon={<DeleteIcon />}
                aria-label='delete option'
                onClick={() => removeOption(idx)}
              />
            )}
          </Flex>
        </FormControl>
      ))}
      <Button ml={5} onClick={() => appendOption({ option: '' })} fontSize='sm'>
        {t('form.process_create.question.add_new_option')}
      </Button>
    </Box>
  )
}
export default Options
