import { Box, Checkbox, FormControl, FormErrorMessage, FormLabel, Text, Textarea } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import InputBasic from '~components/Layout/InputBasic'
import {
  CountrySelector,
  MembershipSizeSelector,
  OrganzationTypesSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'

export const PublicOrgForm = ({ minified }: { minified?: boolean }) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <>
      {!minified && (
        <Text fontWeight='bold'>
          <Trans i18nKey='create_org.public_info'>Public Organization Information</Trans>
        </Text>
      )}

      <InputBasic
        formValue='name'
        label={t('name', { defaultValue: 'Name' })}
        placeholder={t('form.account_create.title_placeholder', {
          defaultValue: "Enter your organization's email",
        })}
        required
      />

      {!minified && (
        <>
          <InputBasic
            formValue='website'
            label={t('website', { defaultValue: 'Website' })}
            placeholder={t('form.account_create.website_placeholder', {
              defaultValue: 'https://example.com',
            })}
          />
          <FormControl>
            <FormLabel>
              <Trans i18nKey='description'>Description</Trans>
            </FormLabel>
            <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
          </FormControl>
        </>
      )}
    </>
  )
}

export type PrivateOrgFormData = {
  size: SelectOptionType
  type: SelectOptionType
  country: SelectOptionType
  communications: boolean
}

export const PrivateOrgForm = ({ minified }: { minified?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PrivateOrgFormData>()

  return (
    <>
      {!minified && (
        <Box>
          <Text fontWeight='bold' mb={2.5}>
            <Trans i18nKey='create_org.private_org'>Private Organization Details</Trans>
          </Text>
          <Text fontSize='sm'>
            <Trans i18nKey='create_org.private_org_description'>
              Help us tailor your experience with information about your org. We won't share this info
            </Trans>
          </Text>
        </Box>
      )}
      <MembershipSizeSelector name='size' required />
      <OrganzationTypesSelector name='type' required />
      <CountrySelector name='country' required />
      {!minified && (
        <FormControl as='fieldset' isInvalid={!!errors?.communications}>
          <Checkbox {...register('communications')}>
            <Trans i18nKey='create_org.communication'>
              I want to receive communications and be contacted to tailor my governance experience.
            </Trans>
          </Checkbox>
          <FormErrorMessage>{errors?.communications?.message.toString()}</FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}
