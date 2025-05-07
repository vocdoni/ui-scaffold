import { Box, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Text, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import InputBasic from '~components/Layout/InputBasic'
import {
  CountrySelector,
  MembershipSizeTypesSelector,
  OrganzationTypesSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'

export const PublicOrgForm = () => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <>
      <Box me='auto'>
        <Text fontWeight='bold'>
          <Trans i18nKey='create_org.public_info'>Public Organization Information</Trans>
        </Text>
      </Box>

      <Flex flexDirection='column' gap={6} px={{ base: 5, md: 10 }}>
        <InputBasic
          formValue='name'
          label={t('name', { defaultValue: 'Name' })}
          placeholder={t('form.account_create.title_placeholder', {
            defaultValue: "Enter your organization's email",
          })}
          required
        />
        <InputBasic
          formValue='website'
          label={t('website', { defaultValue: 'Website' })}
          placeholder={t('form.account_create.website_placeholder', {
            defaultValue: 'https://example.com',
          })}
        />

        <FormControl>
          <FormLabel ms='4px' fontSize='sm' fontWeight='500'>
            <Trans i18nKey='description'>Description</Trans>
          </FormLabel>
          <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
        </FormControl>
      </Flex>
    </>
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
      <Box>
        <Text fontWeight='bold' mb={2.5}>
          <Trans i18nKey='create_org.private_org'>Private Organization Details</Trans>
        </Text>
        <Text color={'org_text_secondary'} fontSize='sm'>
          <Trans i18nKey='create_org.private_org_description'>
            Help us tailor your experience with information about your org. We won't share this info
          </Trans>
        </Text>
      </Box>
      <Flex px={{ base: 5, md: 10 }} direction='column' gap={6}>
        <MembershipSizeTypesSelector name='size' required />
        <OrganzationTypesSelector name='type' required />
        <CountrySelector name='country' required />
      </Flex>
      <FormControl as='fieldset' isInvalid={!!errors?.communications}>
        <Checkbox {...register('communications')}>
          <Trans i18nKey='create_org.communication'>
            I want to receive communications and be contacted to tailor my governance experience.
          </Trans>
        </Checkbox>
        <FormErrorMessage>{errors?.communications?.message.toString()}</FormErrorMessage>
      </FormControl>
    </>
  )
}
