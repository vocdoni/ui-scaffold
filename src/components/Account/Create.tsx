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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useFaucet } from '~components/Faucet/use-faucet'

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
  const { getAuthTypes } = useFaucet()
  const [faucetAmount, setFaucetAmount] = useState<number>(0)

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  useEffect(() => {
    ;(async () => {
      try {
        const atypes = await getAuthTypes()
        if (atypes.auth.oauth) {
          setFaucetAmount(atypes.auth.oauth)
        }
      } catch (e) {
        setFaucetAmount(NaN)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: FormFields) =>
    createAccount({
      account: new Account(values),
    })?.finally(() => setSent(true))

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
      <Text>
        <Trans
          i18nKey='new_organization.description1'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
        />
      </Text>
      <Text>
        <Trans
          i18nKey='new_organization.description2'
          components={{
            span: <Text as='span' fontWeight='bold' />,
          }}
          values={{ faucetAmount }}
        />
      </Text>
      <Box px={{ base: 5, md: 10 }} pt={5} pb={10}>
        <FormControl isInvalid={!!errors.name} mb={5}>
          <FormLabel fontWeight='bold' textTransform='uppercase' fontFamily='pixeloidsans'>
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

        <FormControl mb={5}>
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
