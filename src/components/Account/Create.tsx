import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

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
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handleSubmit(onSubmit)(e)
      }}
    >
      <Text fontWeight='light'>
        <Trans
          i18nKey='new_organization.description1'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
        />
      </Text>

      <Box pt={5} pb={10}>
        <FormControl isInvalid={!!errors.name} mb={5}>
          <FormLabel fontWeight='bold' textTransform='uppercase' fontFamily='pixeloid'>
            *{t('new_organization.name')}
          </FormLabel>
          <Input
            type='text'
            {...register('name', { required })}
            mb={1}
            placeholder={t('form.account_create.title_placeholder').toString()}
          />
          {!!errors.name && <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>}
        </FormControl>

        <FormControl>
          <Textarea
            {...register('description')}
            placeholder={t('form.account_create.description_placeholder').toString()}
          />
        </FormControl>
      </Box>

      {sent && error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Flex>
  )
}
