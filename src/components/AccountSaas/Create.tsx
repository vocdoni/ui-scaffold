import {
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

import {
  CountriesTypesSelector,
  MembershipSizeTypesSelector,
  OrganzationTypesSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { useClient } from '@vocdoni/react-providers'
import { useAccountCreate } from '~components/Account/useAccountCreate'
import { useState } from 'react'

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
          <Heading color={textColor} fontSize='36px' mb='24px'>
            <Trans i18nKey='create_org.title'>Create Your Organization</Trans>
          </Heading>
        </Box>
        <Text color={textColor} fontWeight='bold' mb='24px'>
          <Trans i18nKey='create_org.public_info'>Public Organization Information</Trans>
        </Text>
        <Box px={{ base: 5, md: 10 }}>
          <FormControl isInvalid={!!errors.name} mb='24px'>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              {t('name', { defaultValue: 'Name' })}
              <Text color={textColorBrand}>*</Text>
            </FormLabel>
            <Input
              type='text'
              {...register('name', { required })}
              placeholder={t('form.account_create.title_placeholder')}
            />
            {!!errors.name && <FormErrorMessage>{errors.name?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.name} mb='24px'>
            <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              <Trans i18nKey='website'>Website</Trans>
            </FormLabel>
            <Input type='text' {...register('website')} placeholder={'https://example.com'} />
            {!!errors.website && <FormErrorMessage>{errors.website?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl mb='32px'>
            <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor}>
              <Trans i18nKey='description'>Description</Trans>
            </FormLabel>
            <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
          </FormControl>
        </Box>
        <Text color={textColor} fontWeight='bold' mb='0px'>
          <Trans i18nKey='create_org.private_org'>Private Organization Details</Trans>
        </Text>
        <Text color={textColorSecondary} mb='24px' fontSize='sm'>
          <Trans i18nKey='create_org.private_org_description'>
            Help us tailor your experience with information about your org. We won't share this info
          </Trans>
        </Text>
        <Flex px={{ base: 5, md: 10 }} direction={'column'} gap={8}>
          <MembershipSizeTypesSelector name={'sizeSelect'} required />
          <OrganzationTypesSelector name={'typeSelect'} required />
          <CountriesTypesSelector name={'countrySelect'} required />
        </Flex>
        <FormControl display='flex' alignItems='start' my='12px'>
          <Checkbox {...register('communications')} colorScheme='brandScheme' me='10px' mt='4px' />
          <FormLabel mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
            <Trans i18nKey='create_org.communication'>
              I want to receive communications and be contacted to tailor my governance experience.
            </Trans>
          </FormLabel>
        </FormControl>
        <Button form='process-create-form' type='submit' isLoading={isPending} mx='auto' mb='32px' w='80%'>
          {t('organization.create_org')}
        </Button>
        <Box pt={2}>
          <FormControl isInvalid={isError}>
            {isError && error !== IgnoreAccountError && (
              <FormErrorMessage>
                {typeof error === 'string' ? error : error?.message || 'Error al realizar la operación'}
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Text color={textColorSecondary} fontSize='sm'>
          <Trans i18nKey='create_org.already_profile'>
            If your organization already have a profile, ask the admin to invite you to your organization.
          </Trans>
        </Text>
      </Flex>
    </FormProvider>
  )
}
