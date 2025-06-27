import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { chakraComponents, Select } from 'chakra-react-select'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useGroups } from '~src/queries/groups'
import { useValidations } from '~utils/validation'
import { VoterAuthentication } from './VoterAuthentication'

type SelectOption<T = string> = {
  value: T
  label: string
}

export const GroupSelect = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [hasFetchedScroll, setHasFetchedScroll] = useState(false)
  const { data, fetchNextPage, hasNextPage, isFetching } = useGroups(6)

  const CustomMenuList = (props) => {
    return (
      <chakraComponents.MenuList {...props}>
        {props.children}
        {hasNextPage && (
          <Box py={2} textAlign='center'>
            {isFetching ? <Spinner size='sm' /> : t('process_create.groups.scroll_to_load', 'Scroll to load more...')}
          </Box>
        )}
      </chakraComponents.MenuList>
    )
  }

  // Reset hasFetchedScroll when fetching starts
  useEffect(() => {
    if (!isFetching) setHasFetchedScroll(false)
  }, [isFetching])

  return (
    <FormControl isInvalid={!!errors.groupId}>
      <FormLabel>
        <Trans i18nKey='process_create.census.label'>Census creation</Trans>
      </FormLabel>
      <Controller
        control={control}
        name='groupId'
        rules={{ required: t('form.error.required', 'This field is required') }}
        render={({ field }) => {
          const selected = data?.find((g) => g.id === field.value) ?? null
          return (
            <Select
              options={data ?? []}
              value={selected}
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option.id}
              placeholder={t('process_create.group.select', 'Select group')}
              isLoading={isFetching}
              onChange={(option) => field.onChange(option?.id ?? '')}
              onMenuScrollToBottom={async () => {
                if (hasNextPage && !hasFetchedScroll) {
                  setHasFetchedScroll(true)
                  await fetchNextPage()
                }
              }}
              closeMenuOnSelect
              maxMenuHeight={200}
              components={{ MenuList: CustomMenuList }}
            />
          )
        }}
      />
      <FormErrorMessage>{errors.groupId?.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
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

      {/* Vote overwrite */}
      <Box>
        <FormControl isInvalid={!!errors.voteOverwrite}>
          <FormLabel>
            <Trans i18nKey='process_create.vote_overwrite.title'>Vote overwrite</Trans>
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
        {voteOverwrite && (
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
      <GroupSelect />

      {/* Voter Authentication */}
      <VoterAuthentication />
    </VStack>
  )
}
