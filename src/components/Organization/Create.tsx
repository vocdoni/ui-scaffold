import { Button, Flex, FlexProps, Link, Text } from '@chakra-ui/react'

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account, RemoteSigner } from '@vocdoni/sdk'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, To, useNavigate } from 'react-router-dom'
import { useAnalytics } from '~components/AnalyticsProvider'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { LocalStorageKeys, useAuthProvider } from '~components/Auth/useAuthProvider'
import { CreateOrgParams } from '~components/Organization/AccountTypes'
import FormSubmitMessage from '~shared/Layout/FormSubmitMessage'
import { QueryKeys } from '~src/queries/keys'
import { Routes } from '~src/router/routes'
import { AnalyticsEvent } from '~utils/analytics'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'

type FormData = PrivateOrgFormData & CreateOrgParams

type OrganizationCreateResponse = {
  address: string
  account: Account
  signer: RemoteSigner
  client: ReturnType<typeof useClient>['client']
}

const useOrganizationCreate = (
  options?: Omit<UseMutationOptions<OrganizationCreateResponse, Error, FormData>, 'mutationFn'>
) => {
  const { bearedFetch } = useAuth()
  const { client, setSigner, signer: csigner } = useClient()
  const { bearer, signerRefresh } = useAuthProvider()
  const qclient = useQueryClient()

  return useMutation<OrganizationCreateResponse, Error, FormData>({
    mutationFn: async (values: FormData) => {
      // Create account on the saas to generate new priv keys
      const { address }: { address: string } = await bearedFetch(ApiEndpoints.Organizations, {
        body: {
          name: values.name,
          website: values.website,
          description: values.description,
          size: values.size?.value,
          country: values.country?.value,
          type: values.type?.value,
          communications: values.communications,
        },
        method: 'POST',
      })

      const signer = new RemoteSigner({
        url: import.meta.env.SAAS_URL,
        token: bearer,
      })

      signer.address = address
      client.wallet = signer

      const account = new Account({
        name: typeof values.name === 'object' ? values.name.default : values.name,
        description: typeof values.description === 'object' ? values.description.default : values.description,
      })

      await client.createAccount({ account })

      localStorage.setItem(LocalStorageKeys.SignerAddress, address)
      qclient.invalidateQueries({ queryKey: QueryKeys.profile })

      // Refresh the signer if it was already set
      if (csigner !== null) {
        setSigner(signer)
        await signerRefresh()
      }

      return { address, account, signer, client }
    },
    ...options,
  })
}

export const OrganizationCreate = ({
  canSkip,
  minified,
  onSuccessRoute = Routes.dashboard.base,
  ...props
}: {
  onSuccessRoute?: To
  canSkip?: boolean
  minified?: boolean
} & FlexProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
  const methods = useForm<FormData>()
  const { fetchAccount } = useClient()
  const { handleSubmit } = methods
  const { trackPlausibleEvent } = useAnalytics()

  const {
    mutateAsync: createOrganization,
    isError,
    error,
  } = useOrganizationCreate({
    onSuccess: async () => {
      trackPlausibleEvent({ name: AnalyticsEvent.OrganizationCreated })
      navigate(onSuccessRoute)
      setTimeout(async () => {
        await fetchAccount()
      }, 50)
    },
  })

  const onSubmit = async (values: FormData) => {
    setIsPending(true)
    try {
      await createOrganization(values)
    } catch (e) {
      // Error handling is managed by react-query
    } finally {
      setIsPending(false)
    }
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
        <PublicOrgForm minified={minified} />
        <PrivateOrgForm minified={minified} />
        <Button form='process-create-form' type='submit' isLoading={isPending} colorScheme='black'>
          {t('organization.create_org')}
        </Button>
        <FormSubmitMessage isError={isError} error={error} />
        <Text color={'account_create_text_secondary'} fontSize='sm' textAlign='center' mt='auto'>
          <Trans i18nKey='create_org.already_profile'>
            If your organization already has a profile,{' '}
            <Link as={ReactRouterLink} to={Routes.dashboard.base}>
              access the dashboard
            </Link>{' '}
            and contact the administrator to invite you
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
            {t('do_it_later', { defaultValue: 'Do it later' })}
          </Button>
        )}
      </Flex>
    </FormProvider>
  )
}
