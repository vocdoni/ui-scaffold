import { Box, FormControl, FormErrorMessage, FormLabel, Spinner, VStack } from '@chakra-ui/react'
import { chakraComponents } from 'chakra-react-select'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Select } from '~components/shared/Form/Select'
import { useGroups } from '~src/queries/groups'
import { useValidations } from '~utils/validation'
import { CensusTypes } from './CensusCreation'

type SelectOption<T = string> = {
  value: T
  label: string
}

export const GroupSelect = () => {
  const { t } = useTranslation()
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext()
  const censusType = watch('censusType')
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
        rules={{
          required: {
            value: censusType === CensusTypes.Memberbase,
            message: t('form.error.required', 'This field is required'),
          },
        }}
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
