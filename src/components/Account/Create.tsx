import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Flex, FormControl, FormErrorMessage, Input, Text, Textarea } from '@chakra-ui/react'
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
  const maxLength = {
    value: 40,
    message: t('form.error.field_is_too_long', { max: 40 }),
  }
  const maxLengthDescription = {
    value: 256,
    message: t('form.error.field_is_too_long', { max: 256 }),
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
          {...register('name', { required, maxLength })}
          mb={1}
          placeholder={t('form.account_create.organization_title_placeholder').toString()}
          size='lg'
        />
        {!!errors.name ? (
          <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>
        ) : (
          <Flex alignItems='center' gap={1}>
            <InfoOutlineIcon boxSize={3} color='process_create.account_name_note_logo' />
            <Text fontWeight={400} fontSize='xs' color='process_create.account_name_note'>
              {t('form.account_create.account_name_note')}
            </Text>
          </Flex>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.description}>
        <Textarea
          {...register('description', { maxLength: maxLengthDescription })}
          placeholder={t('form.account_create.organization_description_placeholder').toString()}
        />
        {!!errors.description ? (
          <FormErrorMessage>{errors.description?.message?.toString()}</FormErrorMessage>
        ) : (
          <Flex alignItems='center' gap={1}>
            <InfoOutlineIcon boxSize={3} color='process_create.account_name_note_logo' />
            <Text fontWeight={400} fontSize='xs' color='process_create.account_name_note'>
              {t('form.account_create.account_name_note_description')}
            </Text>
          </Flex>
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
