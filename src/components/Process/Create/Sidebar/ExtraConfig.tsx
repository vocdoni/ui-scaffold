import { Box, FormControl, FormErrorMessage, FormLabel, VStack } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Select } from '~components/shared/Form/Select'
import { useValidations } from '~utils/validation'

type SelectOption<T = string> = {
  value: T
  label: string
}

export const ExtraConfig = () => {
  const { t } = useTranslation()
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext()
  const { required } = useValidations()

  const resultVisibilityOptions: SelectOption[] = [
    { value: 'live', label: t('process_create.result_visibility.live', 'Live results') },
    { value: 'hidden', label: t('process_create.result_visibility.hidden', 'Hidden until the end') },
  ]

  const voterPrivacyOptions: SelectOption[] = [
    { value: 'anonymous', label: t('process_create.voter_privacy.anonymous', 'Anonymous') },
    { value: 'public', label: t('process_create.voter_privacy.public', 'Public') },
  ]

  return (
    <VStack align='stretch' spacing={4}>
      {/* Result visibility */}
      <Box>
        <FormControl isInvalid={!!errors.resultVisibility}>
          <FormLabel>
            <Trans i18nKey='process_create.result_visibility.title'>Result visibility</Trans>
          </FormLabel>
          <Controller
            control={control}
            name='resultVisibility'
            rules={{ required }}
            render={({ field }) => (
              <Select
                value={resultVisibilityOptions.find((opt) => opt.value === field.value)}
                onChange={(opt) => field.onChange(opt.value)}
                options={resultVisibilityOptions}
                placeholder={t('process_create.result_visibility.live', 'Live results')}
              />
            )}
          />
          <FormErrorMessage>{errors.resultVisibility?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Box>

      {/* Voter's privacy */}
      <Box>
        <FormControl isInvalid={!!errors.voterPrivacy}>
          <FormLabel>
            <Trans i18nKey='process_create.voter_privacy.title'>Voter's privacy</Trans>
          </FormLabel>
          <Controller
            control={control}
            name='voterPrivacy'
            rules={{ required }}
            render={({ field }) => (
              <Select
                value={voterPrivacyOptions.find((opt) => opt.value === field.value)}
                onChange={(opt) => field.onChange(opt.value)}
                options={voterPrivacyOptions}
                placeholder={t('process_create.voter_privacy_placeholder.anonymous', 'Anonymous')}
              />
            )}
          />
          <FormErrorMessage>{errors.voterPrivacy?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Box>
    </VStack>
  )
}
