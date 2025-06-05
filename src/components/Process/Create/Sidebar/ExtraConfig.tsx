import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
  VStack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useValidations } from '~utils/validation'

type SelectOption<T = string> = {
  value: T
  label: string
}

export const ExtraConfig = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const { required, requiredBoolean } = useValidations()

  const maxVoteOverwrites = watch('maxVoteOverwrites')
  const voteOverwrite = watch('voteOverwrite')

  const resultVisibilityOptions: SelectOption[] = [
    { value: 'live', label: t('process_create.result_visibility.live', 'Live results') },
    { value: 'hidden', label: t('process_create.result_visibility.hidden', 'Hidden until the end') },
  ]

  const voterPrivacyOptions: SelectOption[] = [
    { value: 'anonymous', label: t('process_create.voter_privacy.anonymous', 'Anonymous') },
    { value: 'public', label: t('process_create.voter_privacy.public', 'Public') },
  ]

  const voteOverwriteOptions: SelectOption<boolean>[] = [
    { value: false, label: t('process_create.vote_overwrite.single', 'Allow only one vote') },
    { value: true, label: t('process_create.vote_overwrite.multiple', 'Allow vote changes') },
  ]

  return (
    <VStack align='stretch' spacing={4}>
      {/* Result visibility */}
      <Box>
        <FormControl isInvalid={!!errors.resultVisibility}>
          <FormLabel>
            <Trans i18nKey='process_create.result_visibility'>Result visibility</Trans>
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
            <Trans i18nKey='process_create.voter_privacy'>Voter's privacy</Trans>
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
                placeholder={t('process_create.voter_privacy.anonymous', 'Anonymous')}
              />
            )}
          />
          <FormErrorMessage>{errors.voterPrivacy?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Box>

      {/* Vote overwrite */}
      <Box>
        <FormControl isInvalid={!!errors.voteOverwrite}>
          <FormLabel>
            <Trans i18nKey='process_create.vote_overwrite'>Vote overwrite</Trans>
          </FormLabel>
          <Controller
            control={control}
            name='voteOverwrite'
            rules={{ validate: requiredBoolean }}
            render={({ field }) => (
              <Select
                value={voteOverwriteOptions.find((opt) =>
                  (voteOverwrite ?? maxVoteOverwrites > 0) ? opt.value : !opt.value
                )}
                onChange={(opt) => {
                  field.onChange(opt.value)
                  setValue('maxVoteOverwrites', Number(opt.value))
                }}
                options={voteOverwriteOptions}
              />
            )}
          />
          <FormErrorMessage>{errors.voteOverwrite?.message?.toString()}</FormErrorMessage>
        </FormControl>
        {maxVoteOverwrites > 0 && (
          <FormControl isInvalid={!!errors.maxVoteOverwrites} mt={2}>
            <Controller
              control={control}
              name='maxVoteOverwrites'
              rules={{
                required,
                min: { value: 1, message: t('form.error.min_value', 'Minimum value is 1') },
              }}
              render={({ field }) => (
                <NumberInput min={1} {...field}>
                  <NumberInputField
                    placeholder={t('process_create.vote_overwrite.max_changes', 'Maximum vote changes')}
                  />
                </NumberInput>
              )}
            />
            <FormErrorMessage>{errors.maxVoteOverwrites?.message?.toString()}</FormErrorMessage>
          </FormControl>
        )}
      </Box>

      {/* Census creation */}
      <Box>
        <FormControl isInvalid={!!errors.census}>
          <FormLabel>
            <Trans i18nKey='process_create.census.label'>Census creation</Trans>
          </FormLabel>
          <Controller
            control={control}
            name='census'
            rules={{ required }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={t('process_create.census.select', 'Select census')}
                options={[]} // Will be populated with available census options
                onChange={(option: SelectOption | null) => field.onChange(option?.value || '')}
              />
            )}
          />
          <FormErrorMessage>{errors.census?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Box>

      {/* Voter Authentication */}
      <Button isDisabled colorScheme='gray' w='full'>
        <Trans i18nKey='process_create.voter_auth'>Configure Voter Authentication</Trans>
      </Button>
    </VStack>
  )
}
