import { Box, FormControl, FormErrorMessage, FormLabel, Spinner, VStack } from '@chakra-ui/react'
import { chakraComponents } from 'chakra-react-select'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Select } from '~components/shared/Form/Select'
import { useGroups } from '~src/queries/groups'
import { useValidations } from '~utils/validation'
import { CensusTypes } from './CensusCreation'

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null

  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// YouTube preview component
const YouTubePreview = ({ videoId }: { videoId: string }) => {
  return (
    <AspectRatio ratio={16 / 9} maxH='120px' mt={2}>
      <Box
        as='iframe'
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        borderRadius='md'
        border='1px solid'
        borderColor='gray.200'
        _dark={{ borderColor: 'gray.600' }}
      />
    </AspectRatio>
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
    watch,
    formState: { errors },
  } = useFormContext()
  const { required } = useValidations()

  const youtubeUrl = watch('youtubeUrl')

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

      {/* Live streaming video URL */}
      <Box>
        <FormControl isInvalid={!!errors.youtubeUrl}>
          <FormLabel>
            <Trans i18nKey='process_create.youtube.title'>Live streaming video</Trans>
          </FormLabel>
          <Controller
            control={control}
            name='youtubeUrl'
            rules={{
              pattern: {
                value: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/,
                message: t('form.error.invalid_youtube_url', 'Please enter a valid YouTube URL'),
              },
            }}
            render={({ field }) => (
              <Input {...field} type='url' placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
            )}
          />
          <FormErrorMessage>{errors.youtubeUrl?.message?.toString()}</FormErrorMessage>
          {/* YouTube Preview */}
          {(() => {
            const videoId = getYouTubeVideoId(youtubeUrl)
            return videoId ? <YouTubePreview videoId={videoId} /> : null
          })()}
        </FormControl>
      </Box>
    </VStack>
  )
}
