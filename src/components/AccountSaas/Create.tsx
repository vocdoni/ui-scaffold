import { Box, Flex, FlexProps, Heading, Text } from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { useState } from 'react'
import { useAccountCreate } from '~components/Account/useAccountCreate'
import { CreateOrgParams } from '~components/AccountSaas/AccountTypes'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from '~components/AccountSaas/Layout'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import LogoutBtn from '~components/AccountSaas/LogoutBtn'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'

type FormData = PrivateOrgFormData & CreateOrgParams

// This specific error message should be ignored and not displayed in the UI.
// Context: After login, a RemoteSigner is created and passed to the SDK via the useClient hook.
// Immediately following this, the provider attempts to fetch the signer's address. However,
// at this point, the signer has not yet been associated with any organization.
// As a result, the backend returns an error, which is stored in the provider's state.
// We rely on this error message for handling because no error code is provided,
// and the error is not thrown as an exception.
const IgnoreAccountError = 'this user has not been assigned to any organization'

const useSaasAccountCreate = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch } = useAuth()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.ORGANIZATIONS, { body: params, method: 'POST' }),
    ...options,
  })
}

export const AccountCreate = ({ children, ...props }: FlexProps) => {
  const { t } = useTranslation()

  const [isPending, setIsPending] = useState(false)
  const { textColor, textColorSecondary } = useDarkMode()

  const methods = useForm<FormData>()
  const { handleSubmit } = methods

  const { signer } = useClient()

  const { create: createAccount, error: accountError } = useAccountCreate()
  const { mutateAsync: createSaasAccount, isError: isSaasError, error: saasError } = useSaasAccountCreate()

  const error = saasError || accountError

  const onSubmit = (values: FormData) => {
    setIsPending(true)
    // Create account on the saas to generate new priv keys
    createSaasAccount({
      name: values.name,
      website: values.website,
      description: values.description,
      size: values.sizeSelect?.value,
      country: values.countrySelect?.value,
      type: values.typeSelect?.value,
    })
      .then(() => signer.getAddress()) // Get the address of newly created signer
      .then(() =>
        createAccount({
          name: values.name as string,
          description: values.description as string,
        })
      ) // Create the new account on the vochain
      .finally(() => setIsPending(false))
  }

  const isError = (!!accountError || isSaasError) && error !== IgnoreAccountError

  return (
    <FormProvider {...methods}>
      <Flex
        as='form'
        id='process-create-form'
        direction='column'
        gap={6}
        maxW='90%'
        mx='auto'
        {...props}
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit(onSubmit)(e)
        }}
      >
        {children}
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb={4}>
            <Trans i18nKey='create_org.title'>Create Your Organization</Trans>
          </Heading>
        </Box>
        <PublicOrgForm />
        <PrivateOrgForm />
        <Button form='process-create-form' type='submit' isLoading={isPending} mx='auto' mt={8} w='80%'>
          {t('organization.create_org')}
        </Button>
        <FormSubmitMessage isError={isError} error={error} />
        <Text color={textColorSecondary} fontSize='sm' textAlign='center' py={5} mt='auto'>
          <Trans i18nKey='create_org.already_profile'>
            If your organization already have a profile, ask the admin to invite you to your organization.
          </Trans>
        </Text>
        <Text color={textColorSecondary} fontSize='sm'>
          <Trans i18nKey='create_org.logout'>If you want to login from another account, please logout</Trans>
        </Text>
        <LogoutBtn />
      </Flex>
    </FormProvider>
  )
}
