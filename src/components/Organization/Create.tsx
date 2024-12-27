import { Button, Flex, FlexProps, Stack, Text } from '@chakra-ui/react'

import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { CreateOrgParams } from '~components/Account/AccountTypes'
import LogoutBtn from '~components/Account/LogoutBtn'
import { useAccountCreate } from '~components/Account/useAccountCreate'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { Routes } from '~src/router/routes'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'

type FormData = PrivateOrgFormData & CreateOrgParams

// This specific error message should be ignored and not displayed in the UI.
// Context: After login, a RemoteSigner is created and passed to the SDK via the useClient hook.
// Immediately following this, the provider attempts to fetch the signer's address. However,
// at this point, the signer has not yet been associated with any organization.
// As a result, the backend returns an error, which is stored in the provider's state.
// We rely on this error message for handling because no error code is provided,
// and the error is not thrown as an exception.
const IgnoreAccountError = 'this user has not been assigned to any organization'

const useOrganizationCreate = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch } = useAuth()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) => bearedFetch(ApiEndpoints.Organizations, { body: params, method: 'POST' }),
    ...options,
  })
}

export const OrganizationCreate = ({
  canSkip,
  onSuccessRoute = Routes.dashboard.base,
  ...props
}: {
  onSuccessRoute?: number | string
  canSkip?: boolean
} & FlexProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const methods = useForm<FormData>()
  const { handleSubmit } = methods
  const [success, setSuccess] = useState<string | null>(null)

  const { create: createAccount, error: accountError } = useAccountCreate()
  const { mutateAsync: createSaasAccount, isError: isSaasError, error: saasError } = useOrganizationCreate()

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
      .then(() =>
        // Create the new account on the vochain
        createAccount({
          name: typeof values.name === 'object' ? values.name.default : values.name,
          description: typeof values.description === 'object' ? values.description.default : values.description,
        })
      )
      .then(() => setSuccess(onSuccessRoute as unknown as string))
      .finally(() => setIsPending(false))
  }

  const isError = (!!accountError || isSaasError) && error !== IgnoreAccountError

  // The promise chain breaks the redirection due to some re-render in between, so we need to redirect in an effect
  useEffect(() => {
    if (!success) return

    navigate(success)
  }, [success])

  return (
    <FormProvider {...methods}>
      <Flex
        as='form'
        id='process-create-form'
        direction='column'
        gap={6}
        mx='auto'
        {...props}
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit(onSubmit)(e)
        }}
      >
        <PublicOrgForm />
        <PrivateOrgForm />
        <Stack justify={'center'} direction={'row'} align={'center'} mx='auto' mt={8} w='80%'>
          {canSkip && (
            <Button as={ReactRouterLink} to={Routes.dashboard.base} variant='outline' border='none'>
              {t('skip', { defaultValue: 'Skip' })}
            </Button>
          )}
          <Button form='process-create-form' type='submit' isLoading={isPending}>
            {t('organization.create_org')}
          </Button>
        </Stack>
        <FormSubmitMessage isError={isError} error={error} />
        <Text color={'account_create_text_secondary'} fontSize='sm' textAlign='center' mt='auto'>
          <Trans i18nKey='create_org.already_profile'>
            If your organization already have a profile, ask the admin to invite you to your organization.
          </Trans>
        </Text>
        <Text color={'account_create_text_secondary'} fontSize='sm' textAlign='center'>
          <Trans i18nKey='create_org.logout'>If you want to login from another account, please logout</Trans>
        </Text>
        <LogoutBtn />
      </Flex>
    </FormProvider>
  )
}
