import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSaasAccount } from '~components/Account/SaasAccountProvider'
import { ApiEndpoints } from '~components/Auth/api'
import { HSeparator } from '~components/Auth/SignIn'
import { useAuth } from '~components/Auth/useAuth'
import { CreateOrgParams } from '~components/Organization/AccountTypes'
import { DashboardBox } from '~components/shared/Dashboard/Contents'
import FormSubmitMessage from '~components/shared/Layout/FormSubmitMessage'
import { AvatarUploader } from '~components/shared/Layout/Uploader'
import { QueryKeys } from '~src/queries/keys'
import { SetupStepIds, useOrganizationSetup } from '~src/queries/organization'
import { PrivateOrgForm, PrivateOrgFormData, PublicOrgForm } from './Form'

type FormData = PrivateOrgFormData & CreateOrgParams

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
          <Flex gap={6} flexDirection={{ base: 'column', sm: 'row' }}>
            <AvatarUploader w='fit-content' />
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

export default EditOrganization
