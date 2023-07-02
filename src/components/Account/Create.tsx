import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
  const {
    createAccount,
    errors: { account: error },
  } = useClient()
  const { t } = useTranslation()
  const [sent, setSent] = useState<boolean>(false)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const onSubmit = async (values: FormFields) => createAccount(new Account(values))?.finally(() => setSent(true))

  return (
    <Flex
      as='form'
      id='process-create-form'
      direction='column'
      gap={6}
      mt={6}
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
    >
      <FormControl isInvalid={!!errors.name}>
        <Input
          type='text'
          {...register('name', { required })}
          mb={1}
          placeholder={t('form.account_create.title_placeholder').toString()}
        />
        {!!errors.name ? (
          <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
        ) : (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text>{t('form.account_create.title_helper')}</Text>
          </FormHelperText>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.description}>
        <Textarea
          {...register('description')}
          placeholder={t('form.account_create.description_placeholder').toString()}
        />
        {!!errors.description ? (
          <FormErrorMessage>{errors.description?.message?.toString()}</FormErrorMessage>
        ) : (
          <FormHelperText>
            <InfoOutlineIcon />
            <Text> {t('form.account_create.description_helper')}</Text>
          </FormHelperText>
        )}
      </FormControl>
      {sent && error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Flex>
  )
}
