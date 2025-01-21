import { Button, Flex, FlexProps, Stack, Text } from '@chakra-ui/react'

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account, RemoteSigner } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, To, useNavigate } from 'react-router-dom'
import { CreateOrgParams } from '~components/Account/AccountTypes'
import LogoutBtn from '~components/Account/LogoutBtn'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys, useAuthProvider } from '~components/Auth/useAuthProvider'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { QueryKeys } from '~src/queries/keys'
import { Routes } from '~src/router/routes'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'

type FormData = PrivateOrgFormData & CreateOrgParams

type OrganizationCreateResponse = {
  address: string
}

const useOrganizationCreate = (
  options?: Omit<UseMutationOptions<OrganizationCreateResponse, Error, CreateOrgParams>, 'mutationFn'>
) => {
  const { bearedFetch } = useAuth()
  const client = useQueryClient()
  return useMutation<OrganizationCreateResponse, Error, CreateOrgParams>({
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
  onSuccessRoute?: To
  canSkip?: boolean
} & FlexProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const methods = useForm<FormData>()
  const { handleSubmit } = methods
  const { bearer, signerRefresh } = useAuthProvider()
  const { client, fetchAccount, setClient, setSigner } = useClient()
  const [promiseError, setPromiseError] = useState<Error | null>(null)
  const [redirect, setRedirect] = useState<To | null>(null)

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
      .then(({ address }: { address: string }) => {
        const signer = new RemoteSigner({
          url: import.meta.env.SAAS_URL,
          token: bearer,
        })

        signer.address = address
        client.wallet = signer

        setSigner(signer)
        setClient(client)
        localStorage.setItem(LocalStorageKeys.SignerAddress, address)

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
        setRedirect(onSuccessRoute)
      })
      .catch((e) => {
        setPromiseError(e)
      })
      .finally(() => setIsPending(false))
  }

  // redirect on success
  useEffect(() => {
    if (!redirect) return
    navigate(redirect)
  }, [redirect])

  return (
    <FormProvider {...methods}>
      <Flex
        as='form'
        id='process-create-form'
        direction='column'
        gap={6}
        mx='auto'
        maxW='900px'
        {...props}
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit(onSubmit)(e)
        }}
      >
        <PublicOrgForm />
        <PrivateOrgForm />
        <Button form='process-create-form' type='submit' isLoading={isPending} variant='primary' colorScheme='gradient'>
          {t('organization.create_org')}
        </Button>
        <FormSubmitMessage isError={isError} error={error} />
        <Text color={'account_create_text_secondary'} fontSize='sm' textAlign='center' mt='auto'>
          <Trans i18nKey='create_org.already_profile'>
            If your organization already have a profile, ask the admin to invite you to your organization.
          </Trans>
        </Text>
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
        <Text color={'account_create_text_secondary'} fontSize='sm' textAlign='center'>
          <Trans i18nKey='create_org.logout'>If you want to login from another account, please logout</Trans>
        </Text>
        <LogoutBtn isDisabled={isPending} />
      </Flex>
    </FormProvider>
  )
}
