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
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'

import {
  CountriesTypesSelector,
  MembershipSizeTypesSelector,
  OrganzationTypesSelector,
} from '~components/Layout/SaasSelector'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

interface FormFields {
  name: string
  description: string
}

export const AccountCreate = ({ children, ...props }: FlexProps) => {
  const { textColor, textColorBrand, textColorSecondary } = useDarkMode()

  const methods = useForm({
    defaultValues: {
      name: '',
      website: '',
      description: '',
      membership_size: 0,
      type: '',
      country: '',
      communications: false,
      terms: false,
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  const {
    createAccount,
    updateAccount,
    errors: { account: error },
    loading: { create },
  } = useClient()
  const { t } = useTranslation()
  const [sent, setSent] = useState<boolean>(false)
  // we want to know if account exists, not the organization (slight difference)
  const { exists } = useAccountHealthTools()

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

  const onSubmit = async (values: FormFields) => {
    let call = () =>
      createAccount({
        account: new Account(values),
      })

    if (exists) {
      call = () => updateAccount(new Account(values))
    }

    return call()?.finally(() => setSent(true))
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
            {!!errors.name && <FormErrorMessage>{errors.name?.message?.toString()}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.name} mb='24px'>
            <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
              <Trans i18nKey='website'>Website</Trans>
            </FormLabel>
            <Input type='text' {...register('website')} placeholder={'https://example.com'} />
            {!!errors.website && <FormErrorMessage>{errors.website?.message?.toString()}</FormErrorMessage>}
          </FormControl>
          <FormControl mb='32px'>
            <FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor}>
              <Trans i18nKey='description'>Description</Trans>
            </FormLabel>
            <Textarea
              {...register('description')}
              placeholder={t('form.account_create.description_placeholder').toString()}
            />
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
        <Box px={{ base: 5, md: 10 }}>
          <Box mb='32px'>
            <MembershipSizeTypesSelector formValue='type' required={true} />
          </Box>

          <Box mb='32px'>
            <OrganzationTypesSelector formValue='type' required={true} />
          </Box>

          <Box mb='32px'>
            <CountriesTypesSelector formValue='type' required={true} />
          </Box>
        </Box>
        <FormControl display='flex' alignItems='start' mb='12px'>
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
          <FormErrorMessage>{errors.terms?.message?.toString()}</FormErrorMessage>
        </FormControl>
        <Button form='process-create-form' type='submit' isLoading={create} mx='auto' mb='32px' w='80%'>
          {t('organization.create_org')}
        </Button>
        <Text color={textColorSecondary} fontSize='sm'>
          <Trans i18nKey='create_org.already_profile'>
            If your organization already have a profile, ask the admin to invite you to your organization.
          </Trans>
        </Text>

        {sent && error && (
          <Alert status='error'>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </Flex>
    </FormProvider>
  )
}
