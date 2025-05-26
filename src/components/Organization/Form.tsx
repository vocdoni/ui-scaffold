import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import InputBasic from '~components/Layout/InputBasic'
import {
  CountrySelector,
  MembershipSizeSelector,
  OrganizationTypeSelector,
  SelectOptionType,
} from '~components/Layout/SaasSelector'

export const PublicOrgForm = ({ minified }: { minified?: boolean }) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <VStack spacing={4} flex={1}>
      <InputBasic
        formValue='name'
        label={t('form.account_create.title', { defaultValue: 'Organization Name' })}
        placeholder={t('form.account_create.title_placeholder', {
          defaultValue: "Enter your organization's email",
        })}
        required
      />
      {!minified && (
        <>
          <FormControl>
            <FormLabel>{t('description', { defaultValue: 'Description' })}</FormLabel>
            <Textarea {...register('description')} placeholder={t('form.account_create.description_placeholder')} />
          </FormControl>
          <InputBasic
            formValue='website'
            label={t('website', { defaultValue: 'Website' })}
            placeholder={t('form.account_create.website_placeholder', {
              defaultValue: 'https://example.com',
            })}
          />
        </>
      )}
    </VStack>
  )
}

export type PrivateOrgFormData = {
  size: SelectOptionType
  type: SelectOptionType
  country: SelectOptionType
  communications: boolean
}

export const PrivateOrgForm = ({ minified }: { minified?: boolean }) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext<PrivateOrgFormData>()

  return (
    <>
      {!minified && (
        <Box>
          <Text fontWeight='bold' mb={2.5}>
            {t('create_org.private_org', { defaultValue: 'Other Details' })}
          </Text>
          <Text fontSize='sm'>
            {t('create_org.private_org_description', {
              defaultValue: 'This information is private and used for internal configuration.',
            })}
          </Text>
        </Box>
      )}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <MembershipSizeSelector name='size' required />
        <OrganizationTypeSelector name='type' required />
        <CountrySelector name='country' required />
      </SimpleGrid>
      {!minified && (
        <FormControl as='fieldset' isInvalid={!!errors?.communications}>
          <Checkbox {...register('communications')}>
            {t('create_org.communication', {
              defaultValue: 'I want to receive communications and be contacted to tailor my governance experience.',
            })}
          </Checkbox>
          <FormErrorMessage>{errors?.communications?.message.toString()}</FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}
