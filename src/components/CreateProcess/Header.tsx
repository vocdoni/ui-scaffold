import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import WrapperFormSection from './WrapperFormSection'

const CreateProcessHeader = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  return (
    <WrapperFormSection>
      <>
        <FormControl mb={4} isInvalid={!!errors.title}>
          <FormLabel fontSize='1.3em'>Title</FormLabel>
          <Input
            {...register('title', {
              required: {
                value: true,
                message: t('form.error.field_is_required'),
              },
            })}
            placeholder='Title'
          />
          <FormErrorMessage>
            {errors.title?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} placeholder='Description' />
          <FormErrorMessage>
            {errors.description?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
      </>
    </WrapperFormSection>
  )
}

export default CreateProcessHeader
