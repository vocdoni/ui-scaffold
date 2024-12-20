import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { MdBrowserUpdated } from 'react-icons/md'
import { CreateOrgParams } from '~components/Account/AccountTypes'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import {
  CustomizationLanguageSelector,
  CustomizationTimeZoneSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'
import { InnerContentsMaxWidth, REGEX_AVATAR } from '~constants'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'
import fallback from '/assets/default-avatar.png'

type FormData = CustomOrgFormData & PrivateOrgFormData & CreateOrgParams

const useOrganizationEdit = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch, signerAddress } = useAuth()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.Organization.replace('{address}', signerAddress), {
        body: params,
        method: 'PUT',
      }),
    ...options,
  })
}

const EditOrganization = () => {
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
  } = useOrganizationEdit()

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
      timezone: values.timeZoneSelect?.value,
      language: values.languageSelect?.value,
    }

    await mutateAsync({ ...organization, ...newInfo })
    const newAccount = new Account({ ...organization?.account, ...values })
    // Check if account changed before trying to update
    if (JSON.stringify(newAccount.generateMetadata()) !== JSON.stringify(organization?.account.generateMetadata())) {
      updateAccount(newAccount)
    }
  }

  const isPending = isUpdateLoading || isSaasPending
  const isError = isSaasError || !!updateError
  const error = saasError || updateError

  return (
    <FormProvider {...methods}>
      <Box height='100%' overflowY='auto'>
        <Flex
          as='form'
          id='process-create-form'
          direction='column'
          gap={6}
          maxW={InnerContentsMaxWidth}
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
  const { watch, setValue } = useForm<FormData>()

  const avatar = watch('logo')
  const correctAvatarFormat = (val: string) => REGEX_AVATAR.test(val)

  return (
    <>
      <Box>
        <Text fontWeight='bold'>{t('customization', { defaultValue: 'Customization' })}</Text>
        <Text color={'org_text_secondary'} fontSize='sm'>
          {t('edit_saas_profile.customization_details', {
            defaultValue: 'Define the params that will enhance the user experience and customize the voting page',
          })}
        </Text>
      </Box>
      <Flex flexDirection='column' gap={6} px={{ base: 5, md: 10 }}>
        <CustomizationTimeZoneSelector name={'timeZoneSelect'} />
        <CustomizationLanguageSelector name={'languageSelect'} />
        <FormControl>
          <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' mb={2}>
            {t('logo', {
              defaultValue: 'Logo',
            })}
          </FormLabel>
          <Flex alignItems='center' gap={2}>
            <Input
              placeholder={t('edit_saas_profile.upload_file', {
                defaultValue: 'Upload a file',
              })}
            />
            <Button minW='min-content'>{t('upload', { defaultValue: 'Upload' })}</Button>
          </Flex>
        </FormControl>
        <Box position='relative' outline='none' border='none'>
          <Text fontSize='sm' fontWeight='500' mb={2}>
            {t('edit_saas_profile.header_image', { defaultValue: 'Header Image' })}
          </Text>
          <Flex gap={2} flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
            <AspectRatio flexShrink={0} flexGrow={1} ratio={5 / 1} borderRadius='xl' overflow='hidden'>
              <Image src={avatar} fallbackSrc={fallback} />
            </AspectRatio>
            <Button colorScheme='red' leftIcon={<BsFillTrashFill />}>
              {t('remove', { defaultValue: 'Remove' })}
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

export default EditOrganization
