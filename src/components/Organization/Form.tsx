import { Box, Flex, FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import InputBasic from '~components/Layout/InputBasic'
import {
  CountriesTypesSelector,
  MembershipSizeTypesSelector,
  OrganzationTypesSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'

export const PublicOrgForm = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <Box w='full'>
      <Flex flexDirection='column' gap={6}>
        <InputBasic
          formValue='name'
          label={t('name', { defaultValue: 'Name' })}
          placeholder={t('form.account_create.title_placeholder', {
            defaultValue: "Enter your organization's email",
          })}
          required
        />
        <FormControl>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500'>
            <Trans i18nKey='description'>Description</Trans>
          </FormLabel>
          <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
        </FormControl>
        <InputBasic
          formValue='website'
          label={t('website', { defaultValue: 'Website' })}
          placeholder={t('form.account_create.website_placeholder', {
            defaultValue: 'https://example.com',
          })}
        />
      </Flex>
    </Box>
  )
}

export type PrivateOrgFormData = {
  size: SelectOptionType
  type: SelectOptionType
  country: SelectOptionType
  communications: boolean
}

export const PrivateOrgForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PrivateOrgFormData>()

  return (
    <>
      <Box mb={4}>
        <Text fontWeight='bold' mb={4} size='lg'>
          <Trans i18nKey='create_org.private_org'>Other Details</Trans>
        </Text>
        <Text color='rgb(115, 115, 115)' size='sm'>
          <Trans i18nKey='create_org.private_org_description'>
            This information is private and used for internal configuration.{' '}
          </Trans>
        </Text>
      </Box>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6} mb={6}>
        <Flex flex='1 1 50%' gap={6} flexDirection={'column'}>
          <MembershipSizeTypesSelector name='size' required />
          <OrganzationTypesSelector name='type' required />
        </Flex>
        <Box flex='1 1 50%'>
          <CountriesTypesSelector name='country' required />
        </Box>
      </Flex>
    </>
  )
}
