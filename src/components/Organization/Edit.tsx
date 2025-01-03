import { AspectRatio, Box, Button, Flex, FormControl, FormLabel, IconButton, Image, Text } from '@chakra-ui/react'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useDropzone } from 'react-dropzone'
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { MdBrowserUpdated } from 'react-icons/md'
import { CreateOrgParams } from '~components/Account/AccountTypes'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { SelectOptionType } from '~components/Layout/SaasSelector'
import Uploader from '~components/Layout/Uploader'
import { InnerContentsMaxWidth } from '~constants'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'
import fallback from '/assets/default-avatar.png'

type FormData = PrivateOrgFormData & CreateOrgParams

const useUploadFile = () => {
  const { bearedFetch } = useAuth()
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file1', file)
      const response = await bearedFetch<{ urls: string[] }>(ApiEndpoints.Storage, {
        method: 'POST',
        body: formData,
      })
      return response.urls[0]
    },
  })
}

const useOrganizationEdit = (options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>) => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.Organization.replace('{address}', account?.address), {
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
      size: organization?.size && {
        value: organization.size,
      },
      type: organization?.type && {
        value: organization.type,
      },
      country: organization?.country && {
        value: organization.country || '',
      },
      communications: organization?.communications || false,
      avatar: organization?.account.avatar || '',
      header: organization?.account.header || '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    const newInfo: CreateOrgParams = {
      website: values.website,
      size: values.size?.value,
      type: values.type?.value,
      country: values.country?.value,
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
          onSubmit={handleSubmit(onSubmit)}
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
  const { watch, setValue } = useFormContext<FormData>()
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()

  const avatar = watch('avatar')
  const header = watch('header')

  // Avatar upload handler
  const onAvatarUpload = async ([file]: File[]) => {
    try {
      const url = await uploadFile(file)
      setValue('avatar', url)
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  // Header upload handler
  const onHeaderUpload = async ([file]: File[]) => {
    try {
      const url = await uploadFile(file)
      setValue('header', url)
    } catch (error) {
      console.error('Error uploading header:', error)
    }
  }

  const allowed = ['PNG', 'JPG', 'JPEG', 'GIF']
  const extensions = allowed.map((ext) => `.${ext.toLowerCase()}`)

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
    isDragActive: isAvatarDragActive,
  } = useDropzone({
    onDrop: onAvatarUpload,
    multiple: false,
    accept: {
      'image/png': extensions,
    },
  })

  const {
    getRootProps: getHeaderRootProps,
    getInputProps: getHeaderInputProps,
    isDragActive: isHeaderDragActive,
  } = useDropzone({
    onDrop: onHeaderUpload,
    multiple: false,
    accept: {
      'image/png': extensions,
    },
  })

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
        <FormControl>
          <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' mb={2}>
            {t('avatar.label', {
              defaultValue: 'Logo/Avatar',
            })}
          </FormLabel>
          <Box mb={4}>
            <Uploader
              getRootProps={getAvatarRootProps}
              getInputProps={getAvatarInputProps}
              isDragActive={isAvatarDragActive}
              formats={allowed}
            />
          </Box>
          {avatar && (
            <Flex gap={2} alignItems='center' mt={2}>
              <AspectRatio flexShrink={0} ratio={1} w='100px' borderRadius='xl' overflow='hidden'>
                <Image src={avatar} fallbackSrc={fallback} />
              </AspectRatio>
              <IconButton
                aria-label={t('remove_avatar', { defaultValue: 'Remove avatar' })}
                icon={<BiTrash />}
                onClick={() => setValue('avatar', '')}
                size='sm'
              />
            </Flex>
          )}
        </FormControl>

        <FormControl>
          <FormLabel display='flex' ms={1} fontSize='sm' fontWeight='500' mb={2}>
            {t('edit_saas_profile.header_image', { defaultValue: 'Header Image' })}
          </FormLabel>
          <Box mb={4}>
            <Uploader
              getRootProps={getHeaderRootProps}
              getInputProps={getHeaderInputProps}
              isDragActive={isHeaderDragActive}
              formats={allowed}
            />
          </Box>
          {header && (
            <Flex gap={2} flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
              <AspectRatio flexShrink={0} flexGrow={1} ratio={5 / 1} borderRadius='xl' overflow='hidden'>
                <Image src={header} fallbackSrc={fallback} />
              </AspectRatio>
              <IconButton
                aria-label={t('remove_header', { defaultValue: 'Remove header' })}
                icon={<BiTrash />}
                onClick={() => setValue('header', '')}
                size='sm'
              />
            </Flex>
          )}
        </FormControl>
      </Flex>
    </>
  )
}

export default EditOrganization
