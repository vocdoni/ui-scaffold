import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaInfoCircle } from 'react-icons/fa'

interface FormFields {
  name: string
  description: string
}

export const AccountCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const { createAccount } = useClient()
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }
  const maxLength = {
    value: 40,
    message: t('form.error.field_is_too_long', { max: 40 }),
  }

  const onSubmit = async (values: FormFields) => {
    setLoading(true)
    try {
      await createAccount(new Account(values))
    } catch (e: any) {
      // TODO remove after refactor when errors are managed via the client
      if (typeof e === 'string') {
        return setError(e)
      }
      if (typeof e !== 'string' && 'message' in e) {
        return setError(e.message)
      }

      console.error('uncatched error:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex as='form' direction='column' onSubmit={handleSubmit(onSubmit)} gap={3}>
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormLabel>{t('form.account_create.account_name')}</FormLabel>
        <Input type='text' {...register('name', { required, maxLength })} mb={1} />
        {!!errors.name ? (
          <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
        ) : (
          <Text fontSize='sm' color='gray.400'>
            <Icon as={FaInfoCircle} mr={1} />
            {t('form.account_create.account_name_note')}
          </Text>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel>{t('form.account_create.account_description')}</FormLabel>
        <Textarea {...register('description')} />
        <FormErrorMessage>{errors.description?.message?.toString()}</FormErrorMessage>
      </FormControl>
      {error && (
        <Alert>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Button type='submit' isLoading={loading}>
        {t('form.account_create.button_create')}
      </Button>
    </Flex>
  )
}
