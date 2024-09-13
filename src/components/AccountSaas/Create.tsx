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
  Link,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'

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

const useAccountCreate = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch } = useAuth()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.ACCOUNT_CREATE, { body: params, method: 'POST' }),
    ...options,
  })
}

type FormData = {
  terms: boolean
  communications: boolean
  sizeSelect: SelectOptionType
  typeSelect: SelectOptionType
  countrySelect: SelectOptionType
} & Pick<OrgInterface, 'name' | 'website' | 'description'>

export const AccountCreate = ({ children, ...props }: FlexProps) => {
  const navigate = useNavigate()
  const { refresh } = useAuth()
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()
  const { mutateAsync, isError, error, isPending } = useAccountCreate()

  const methods = useForm<FormData>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { t } = useTranslation()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const onSubmit = (values: FormData) => {
    mutateAsync({
      name: values.name,
      website: values.website,
      description: values.description,
      size: values.sizeSelect?.value,
      country: values.countrySelect?.value,
      type: values.typeSelect?.value,
    }).then(() => refresh())
  }

  return (
    <FormProvider {...methods}>
      <Flex
        as='form'
        id='process-create-form'
        direction='column'
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
          <MembershipSizeTypesSelector name={'sizeSelect'} />
          <OrganzationTypesSelector name={'typeSelect'} />
          <CountriesTypesSelector name={'countrySelect'} />
        </Flex>
        <FormControl display='flex' alignItems='start' my='12px'>
          <Checkbox {...register('communications')} colorScheme='brandScheme' me='10px' mt='4px' />
          <FormLabel mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
            <Trans i18nKey='create_org.communication'>
              I want to receive communications and be contacted to tailor my governance experience.
            </Trans>
          </FormLabel>
        </FormControl>
        <FormControl isInvalid={!!errors.terms} mb='32px'>
          <Flex alignItems='start'>
            <Checkbox {...register('terms', { required })} colorScheme='brandScheme' me='10px' mt='4px' />
            <FormLabel mb='0' fontWeight='normal' color={textColor} fontSize='sm'>
              <Trans
                i18nKey='signup_agree_terms'
                components={{
                  termsLink: <Link as={ReactRouterLink} to='/terms' />,
                  privacyLink: <Link as={ReactRouterLink} to='/privacy' />,
                }}
              />
            </FormLabel>
          </Flex>
          <FormErrorMessage>{errors.terms?.message}</FormErrorMessage>
        </FormControl>
        <Button form='process-create-form' type='submit' isLoading={isPending} mx='auto' mb='32px' w='80%'>
          {t('organization.create_org')}
        </Button>
        <Box pt={2}>
          <FormControl isInvalid={isError}>
            {isError && <FormErrorMessage>{error?.message || 'Error al realizar la operación'}</FormErrorMessage>}
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
