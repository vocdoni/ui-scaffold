import { AspectRatio, Box, Flex, FormControl, FormLabel, IconButton, Image, Input, Text } from '@chakra-ui/react'
import { Button } from '@vocdoni/chakra-components'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdBrowserUpdated } from 'react-icons/md'
import { CreateOrgParams } from '~components/AccountSaas/AccountTypes'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from '~components/AccountSaas/Layout'
import {
  CustomizationLanguageSelector,
  CustomizationTimeZoneSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'
import { REGEX_AVATAR } from '~constants'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import fallback from '/assets/default-avatar.png'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useAuth } from '~components/Auth/useAuth'
import { ApiEndpoints } from '~components/Auth/api'
import { useSaasAccount } from '~components/AccountSaas/useSaasAccount'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'

type FormData = CustomOrgFormData & PrivateOrgFormData & CreateOrgParams

const useEditSaasOrganization = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch, signerAddress } = useAuth()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.ORGANIZATION.replace('{address}', signerAddress), {
        body: params,
        method: 'PUT',
      }),
    ...options,
  })
}

const EditProfile = () => {
  const { t } = useTranslation()
  const {
    updateAccount,
    loading: { update: isUpdateLoading },
    errors: { update: updateError },
  } = useClient()
  const { organization } = useSaasAccount()

  const {
    mutateAsync,
    isPending: isSaasPending,
    isError: isSaasError,
    error: saasError,
    isSuccess,
  } = useEditSaasOrganization()

  const methods = useForm<FormData>({
    defaultValues: {
      name: organization?.account.name.default || '',
      website: organization?.website || '',
      description: organization?.account.description.default || '',
      sizeSelect: organization?.size && {
        value: organization.size,
      },
      typeSelect: organization?.type && {
        value: organization.type,
      },
      countrySelect: organization?.country && {
        value: organization.country || '',
      },
      communications: organization?.communications || false,
      timeZoneSelect: organization?.timezone && {
        value: organization.timezone,
      },
      languageSelect: organization?.language && {
        value: organization.language,
      },
      logo: organization?.account.avatar || '',
      header: organization?.header || '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    const newInfo: CreateOrgParams = {
      website: values.website,
      size: values.sizeSelect?.value,
      type: values.typeSelect?.value,
      country: values.countrySelect?.value,
      timezone: values.timeZoneSelect.value,
      language: values.languageSelect.value,
    }
    mutateAsync({
      ...organization,
      ...newInfo,
    }).then(() => {
      const newAccount = new Account({ ...organization?.account, ...values })
      // Check if account changed before trying to update
      if (JSON.stringify(newAccount.generateMetadata()) !== JSON.stringify(organization?.account.generateMetadata())) {
        updateAccount(newAccount)
      }
    })
  }

  const isPending = isUpdateLoading || isSaasPending
  const isError = isSaasError || !!updateError
  const error = saasError || updateError

  return (
    <FormProvider {...methods}>
      <Box height='100%' maxH='100%' overflowY='auto'>
        <Flex
          as='form'
          id='process-create-form'
          direction='column'
          gap={6}
          maxW='600px'
          mx='auto'
          onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleSubmit(onSubmit)(e)
          }}
        >
          <PublicOrgForm />
          <PrivateOrgForm />
          <CustomizeOrgForm />
          <Flex align='center' direction={'column'}>
            <Button
              type={'submit'}
              leftIcon={<MdBrowserUpdated />}
              isLoading={isPending}
              aria-label=''
              w='full'
              maxW='400px'
            >
              {t('update', {
                defaultValue: 'Update',
              })}
            </Button>
            <FormSubmitMessage
              isLoading={isPending}
              isError={isError}
              error={error}
              isSuccess={isSuccess}
              success={t('edit_saas_profile.edited_successfully', { defaultValue: 'Updated successfully' })}
            />
          </Flex>
        </Flex>
      </Box>
    </FormProvider>
  )
}

export type CustomOrgFormData = {
  timeZoneSelect: SelectOptionType
  languageSelect: SelectOptionType
}

const CustomizeOrgForm = () => {
  const { t } = useTranslation()
  const { textColor, textColorSecondary } = useDarkMode()
  const { watch, setValue } = useForm<FormData>()

  const avatar = watch('logo')
  const correctAvatarFormat = (val: string) => REGEX_AVATAR.test(val)

  return (
    <>
      <Box>
        <Text color={textColor} fontWeight='bold'>
          {t('customization', { defaultValue: 'Customization' })}
        </Text>
        <Text color={textColorSecondary} fontSize='sm'>
          {t('edit_saas_profile.customization_details', {
            defaultValue: 'Define the params that will enhance the user experience and customize the voting page',
          })}
        </Text>
      </Box>
      <Flex flexDirection='column' gap={6} px={{ base: 5, md: 10 }}>
        <CustomizationTimeZoneSelector name={'timeZoneSelect'} />
        <CustomizationLanguageSelector name={'languageSelect'} />
        <FormControl>
          <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' color={textColor} mb={2}>
            {t('logo', {
              defaultValue: 'Logo',
            })}
          </FormLabel>
          <Flex gap={2} alignItems='center'>
            <Input
              placeholder={t('edit_saas_profile.upload_file', {
                defaultValue: 'Upload a file',
              })}
            />
            <Button bgColor='gray' minH={12} borderRadius='xl'>
              {t('upload', { defaultValue: 'Upload' })}
            </Button>
          </Flex>
        </FormControl>
        <Box position='relative' outline='none' border='none'>
          <Text fontSize='sm' fontWeight='500' color={textColor} mb={2}>
            {t('edit_saas_profile.header_image', { defaultValue: 'Header Image' })}
          </Text>
          <Flex gap={2} flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
            <AspectRatio flexShrink={0} flexGrow={1} ratio={5 / 1} borderRadius='xl' overflow='hidden'>
              <Image src={avatar} fallbackSrc={fallback} />
            </AspectRatio>
            <Button
              minH={12}
              borderRadius='xl'
              sx={{
                span: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                },
              }}
            >
              <BsFillTrashFill />
              <Text as='span'>{t('remove', { defaultValue: 'Remove' })}</Text>
            </Button>
          </Flex>
          {correctAvatarFormat(avatar) && (
            <IconButton
              aria-label={t('form.account_create.delete_image')}
              icon={<BiTrash />}
              onClick={() => setValue('logo', '')}
              position='absolute'
              top={2}
              right={2}
              cursor='pointer'
              size='xs'
              fontSize='md'
            />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default EditProfile
