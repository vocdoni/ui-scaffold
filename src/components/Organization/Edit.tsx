import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { CreateOrgParams } from '~components/Account/AccountTypes'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { ApiEndpoints } from '~components/Auth/api'
import { HSeparator } from '~components/Auth/SignIn'
import { useAuth } from '~components/Auth/useAuth'
import { DashboardBox } from '~components/Layout/Dashboard'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { SelectOptionType } from '~components/Layout/SaasSelector'
import { ImageUploader } from '~components/Layout/Uploader'
import { QueryKeys } from '~src/queries/keys'
import { SetupStepIds, useOrganizationSetup } from '~src/queries/organization'
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
  const client = useQueryClient()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.Organization.replace('{address}', account?.address), {
        body: params,
        method: 'PUT',
      }),
    ...options,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: QueryKeys.organization.info(),
      })
    },
  })
}

const EditOrganization = () => {
  const { t } = useTranslation()
  const [isPending, setPending] = useState(false)
  const {
    updateAccount,
    loading: { update: isUpdateLoading },
    errors: { update: updateError },
  } = useClient()
  const { organization } = useSaasAccount()
  const { setStepDoneAsync } = useOrganizationSetup()

  const { mutateAsync, isError: isSaasError, error: saasError, isSuccess } = useOrganizationEdit()

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
      country: organization?.country,
      communications: organization?.communications || false,
      avatar: organization?.account.avatar || '',
      header: organization?.account.header || '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    setPending(true)
    const newInfo: CreateOrgParams = {
      website: values.website,
      size: values.size?.value,
      type: values.type?.value,
      country: values.country?.value,
      communications: values.communications,
    }

    try {
      await mutateAsync({ ...organization, ...newInfo })
      const newAccount = new Account({ ...organization?.account, ...values })
      // Check if account changed before trying to update
      if (JSON.stringify(newAccount.generateMetadata()) !== JSON.stringify(organization?.account.generateMetadata())) {
        await updateAccount(newAccount)
      }
      await setStepDoneAsync(SetupStepIds.organizationDetails)
    } catch (e) {
      console.error('Form submit failed:', e)
    } finally {
      setPending(false)
    }
  }

  const isError = isSaasError || !!updateError
  const error = saasError || updateError

  return (
    <DashboardBox p={6}>
      <FormProvider {...methods}>
        <Flex as='form' id='process-create-form' onSubmit={handleSubmit(onSubmit)} flexDirection='column'>
          <Heading size='md' fontWeight='extrabold'>
            {t('create_org.organization_details', { defaultValue: 'Organization Details' })}
          </Heading>
          <Text mb={6} color='gray.500' size='sm'>
            {t('create_org.organization_details_description', {
              defaultValue: "Manage your organization's profile and configuration settings.",
            })}
          </Text>
          <Box me='auto'>
            <Text fontWeight='bold' mb={4} size='lg'>
              {t('create_org.public_info', { defaultValue: 'Public Profile' })}
            </Text>
            <Text color='gray.500' size='sm' mb={4}>
              {t('create_org.public_info_description', {
                defaultValue: 'This information is shown in various places including the voting pages.',
              })}
            </Text>
          </Box>
          <Flex gap={6} flexDirection={{ base: 'column', lg: 'row' }}>
            <CustomizeOrgForm />
            <PublicOrgForm />
          </Flex>
          <Flex align='center' my={6}>
            <HSeparator />
            <Text color='gray.500' fontWeight='bold' mx={3.5} whiteSpace='nowrap' size='xs' textTransform='uppercase'>
              {t('other_details', { defaultValue: 'Other Details' })}
            </Text>
            <HSeparator />
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <PrivateOrgForm />
          </SimpleGrid>

          <Flex align='center' direction='column' alignSelf='end'>
            <Button type='submit' isLoading={isPending} aria-label='' w='full'>
              {t('actions.save', { defaultValue: 'Save' })}
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
      </FormProvider>
    </DashboardBox>
  )
}

export type CustomOrgFormData = {
  timeZoneSelect: SelectOptionType
  languageSelect: SelectOptionType
}

const CustomizeOrgForm = () => {
  const { t } = useTranslation()
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormData>()
  const { mutateAsync: uploadFile, isPending } = useUploadFile()

  const avatar = watch('avatar')

  // Common upload handler
  const onUpload =
    (field: keyof FormData) =>
    async ([file]: File[]) => {
      clearErrors(field)
      try {
        const url = await uploadFile(file)
        setValue(field, url)
      } catch (error) {
        setError(field, {
          message: error.message,
        })
        console.error(`Error uploading ${field}:`, error)
      }
    }

  // Avatar upload handler
  const onAvatarUpload = onUpload('avatar')

  const allowed = ['PNG', 'JPG', 'JPEG']
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

  return (
    <Box flex='0 0 auto'>
      <FormControl as={Box} isInvalid={!!errors?.avatar}>
        <FormLabel fontSize='sm' fontWeight='500' mb={2}>
          {t('avatar.label', {
            defaultValue: 'Logo/Avatar',
          })}
        </FormLabel>
        <Box position='relative' borderRadius='full' px={6}>
          {avatar ? (
            <Box position='relative'>
              <AspectRatio ratio={1} w='full' borderRadius='full' overflow='hidden'>
                <Image src={avatar} fallbackSrc={fallback} alt='Avatar preview' />
              </AspectRatio>
              <Flex
                position='absolute'
                top={0}
                left={0}
                w='full'
                h='full'
                align='center'
                justify='center'
                bg='blackAlpha.400'
                opacity={0}
                _hover={{ opacity: 1 }}
                transition='opacity 0.2s'
                borderRadius='full'
              >
                <IconButton
                  icon={<BiTrash />}
                  aria-label={t('remove_avatar', { defaultValue: 'Remove avatar' })}
                  onClick={() => setValue('avatar', '')}
                  size='sm'
                  variant='ghost'
                  color='white'
                  bg='red.500'
                  _hover={{ bg: 'red.600' }}
                />
              </Flex>
            </Box>
          ) : (
            <Box mb={4}>
              <ImageUploader
                getRootProps={getAvatarRootProps}
                getInputProps={getAvatarInputProps}
                isDragActive={isAvatarDragActive}
                isLoading={isPending}
                formats={allowed}
              />
            </Box>
          )}
        </Box>
        <FormErrorMessage>{errors?.avatar?.message?.toString()}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

export default EditOrganization
