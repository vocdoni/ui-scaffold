import { Button, Flex, FlexProps, Stack, Text } from '@chakra-ui/react'

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account, RemoteSigner } from '@vocdoni/sdk'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { CreateOrgParams } from '~components/Account/AccountTypes'
import LogoutBtn from '~components/Account/LogoutBtn'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { useAuthProvider } from '~components/Auth/useAuthProvider'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { QueryKeys } from '~src/queries/keys'
import { Routes } from '~src/router/routes'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'

type FormData = PrivateOrgFormData & CreateOrgParams

const useOrganizationCreate = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch } = useAuth()
  const client = useQueryClient()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) => bearedFetch(ApiEndpoints.Organizations, { body: params, method: 'POST' }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: QueryKeys.profile })
    },
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
  const { bearer, signerRefresh } = useAuthProvider()
  const { client, fetchAccount } = useClient()
  const [promiseError, setPromiseError] = useState<Error | null>(null)

  const { mutateAsync: createSaasAccount, isError: isSaasError, error: saasError } = useOrganizationCreate()

  const error = saasError || promiseError
  const isError = isSaasError || !!promiseError

  const onSubmit = (values: FormData) => {
    setIsPending(true)
    // Create account on the saas to generate new priv keys
    createSaasAccount({
      name: values.name,
      website: values.website,
      description: values.description,
      size: values.size?.value,
      country: values.country?.value,
      type: values.type?.value,
      communications: values.communications,
    })
      .then(() => {
        const signer = new RemoteSigner({
          url: import.meta.env.SAAS_URL,
          token: bearer,
        })
        client.wallet = signer
        return client.createAccount({
          account: new Account({
            name: typeof values.name === 'object' ? values.name.default : values.name,
            description: typeof values.description === 'object' ? values.description.default : values.description,
          }),
        })
      })
      // update state info and redirect
      .then(() => {
        fetchAccount().then(() => signerRefresh())
        return navigate(onSuccessRoute as unknown)
      })
      .catch((e) => {
        setPromiseError(e)
      })
      .finally(() => setIsPending(false))
  }

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
            <Button
              as={ReactRouterLink}
              to={Routes.dashboard.base}
              variant='outline'
              border='none'
              isDisabled={isPending}
            >
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
        <LogoutBtn isDisabled={isPending} />
      </Flex>
    </FormProvider>
  )
}
