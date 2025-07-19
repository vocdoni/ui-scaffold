import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { chakraComponents, Select } from 'chakra-react-select'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { useGroups } from '~src/queries/groups'
import { useValidations } from '~utils/validation'
import { CensusTypes } from './CensusCreation'

const VoteChangesStepper = ({ value, onChange, isDisabled }) => {
  const handleDecrement = () => {
    const newValue = Math.max(1, (value || 1) - 1)
    onChange(newValue)
  }

  const handleIncrement = () => {
    const newValue = Math.min(10, (value || 1) + 1)
    onChange(newValue)
  }

  return (
    <HStack spacing={0} border='1px' borderColor='gray.200' borderRadius='md' overflow='hidden' w='full'>
      <IconButton
        icon={<Icon as={LuMinus} />}
        size='md'
        isDisabled={isDisabled || (value || 1) <= 1}
        onClick={handleDecrement}
        variant='ghost'
        borderRadius='none'
        aria-label='Decrease vote changes'
        flex='1'
        minW='48px'
      />
      <Text
        flex='2'
        textAlign='center'
        py={3}
        px={4}
        borderLeft='1px'
        borderRight='1px'
        borderColor='gray.200'
        bg='gray.50'
        fontWeight='medium'
        fontSize='md'
      >
        {value || 1}
      </Text>
      <IconButton
        icon={<Icon as={LuPlus} />}
        size='md'
        isDisabled={isDisabled || (value || 1) >= 10}
        onClick={handleIncrement}
        variant='ghost'
        borderRadius='none'
        aria-label='Increase vote changes'
        flex='1'
        minW='48px'
      />
    </HStack>
  )
}

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
                max: { value: 10, message: t('form.error.max_value', 'Maximum value is 10') },
              }}
              render={({ field }) => (
                <VoteChangesStepper
                  value={field.value || 1}
                  onChange={(newValue) => field.onChange(newValue)}
                  isDisabled={false}
                />
              )}
            />
            <Text fontSize='sm' color='gray.600' mt={2}>
              This is the number of times a voter can change their vote before the voting process ends. Only the last
              one will count.
            </Text>
            <FormErrorMessage>{errors.maxVoteOverwrites?.message?.toString()}</FormErrorMessage>
          </FormControl>
        )}
      </Box>
    </VStack>
  )
}
