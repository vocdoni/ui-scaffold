import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { useState } from 'react'
import { useAccountCreate } from '~components/Account/useAccountCreate'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import CheckboxCustom from '~components/Layout/CheckboxCustom'
import InputCustom from '~components/Layout/InputCustom'
import {
  CountriesTypesSelector,
  MembershipSizeTypesSelector,
  OrganzationTypesSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import LogoutBtn from '~components/AccountSaas/LogoutBtn'

interface OrgInterface {
  name: string
  website: string
  description: string
  size: string
  type: string
  country: string
  timezone: string
  language: string
  logo: string
  header: string
  subdomain: string
  color: string
}

type CreateOrgParams = Partial<OrgInterface>

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
      bearedFetch<void>(ApiEndpoints.ACCOUNT_CREATE, { body: params, method: 'POST' }),
    ...options,
  })
}

type FormData = {
  communications: boolean
  sizeSelect: SelectOptionType
  typeSelect: SelectOptionType
  countrySelect: SelectOptionType
} & Pick<OrgInterface, 'name' | 'website' | 'description'>

export const AccountCreate = ({ children, ...props }: FlexProps) => {
  const { t } = useTranslation()

  const [isPending, setIsPending] = useState(false)
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()

  const methods = useForm<FormData>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { signer } = useClient()

  const { create: createAccount, error: accountError } = useAccountCreate()
  const { mutateAsync: createSaasAccount, isError: isSaasError, error: saasError } = useSaasAccountCreate()

  const isError = !!accountError || isSaasError

  const error = saasError || accountError

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

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
      .then(() => createAccount({ name: values.name, description: values.description })) // Create the new account on the vochain
      .finally(() => setIsPending(false))
  }

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
          <Text color={textColor} fontWeight='bold'>
            <Trans i18nKey='create_org.public_info'>Public Organization Information</Trans>
          </Text>
        </Box>

        <Flex flexDirection='column' gap={6} px={{ base: 5, md: 10 }}>
          <InputCustom
            formValue='name'
            label={t('name', { defaultValue: 'Name' })}
            placeholder={t('form.account_create.title_placeholder', {
              defaultValue: "Enter your organization's emial",
            })}
            type='text'
            required
          />
          <InputCustom
            formValue='website'
            label={t('website', { defaultValue: 'Website' })}
            placeholder={t('form.account_create.website_placeholder', {
              defaultValue: 'https://example.com',
            })}
            type='text'
            required
          />

          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor}>
              <Trans i18nKey='description'>Description</Trans>
            </FormLabel>
            <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
          </FormControl>
        </Flex>
        <Box>
          <Text color={textColor} fontWeight='bold' mb={4}>
            <Trans i18nKey='create_org.private_org'>Private Organization Details</Trans>
          </Text>
          <Text color={textColorSecondary} fontSize='sm'>
            <Trans i18nKey='create_org.private_org_description'>
              Help us tailor your experience with information about your org. We won't share this info
            </Trans>
          </Text>
        </Box>
        <Flex px={{ base: 5, md: 10 }} direction={'column'} gap={6}>
          <MembershipSizeTypesSelector name={'sizeSelect'} required />
          <OrganzationTypesSelector name={'typeSelect'} required />
          <CountriesTypesSelector name={'countrySelect'} required />
        </Flex>

        <CheckboxCustom
          formValue='communications'
          label={t('create_org.communication', {
            defaultValue: '  I want to receive communications and be contacted to tailor my governance experience.',
          })}
        />
        <Button form='process-create-form' type='submit' isLoading={isPending} mx='auto' mt={8} w='80%'>
          {t('organization.create_org')}
        </Button>
        <Box pt={2}>
          <FormControl isInvalid={isError}>
            {isError && error !== IgnoreAccountError && (
              <FormErrorMessage>
                {typeof error === 'string' ? error : error?.message || 'Error performing the operation'}
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
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
