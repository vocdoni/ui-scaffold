import { Box, FormControl, FormErrorMessage, FormLabel, Icon, Tooltip, VStack } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuCircleHelp } from 'react-icons/lu'
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

  const weightOptions: SelectOption<boolean>[] = [
    { value: false, label: t('process_create.weight.equal', 'One person, one vote') },
    { value: true, label: t('process_create.weight.weighted', 'Weighted by voting power') },
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
      <Box>
        <FormControl isInvalid={!!errors.weightedVote}>
          <FormLabel display='flex' alignItems='center'>
            <Trans i18nKey='process_create.weight.title'>Voting power</Trans>
            <Tooltip
              placement='top'
              label='Set whether votes are equal for each eligible voter or weighted according to the memberbase "Vote power" field.'
              fontSize='sm'
            >
              <Box as='span' display='inline-flex' ml={1} cursor='help' color='texts.subtle'>
                <Icon as={LuCircleHelp} />
              </Box>
            </Tooltip>
          </FormLabel>
          <Controller
            control={control}
            name='weightedVote'
            render={({ field }) => (
              <Select
                value={weightOptions.find((opt) => opt.value === field.value)}
                onChange={(opt) => field.onChange(opt.value)}
                options={weightOptions}
                placeholder={t('process_create.weight.equal', 'One person, one vote')}
              />
            )}
          />
          <FormErrorMessage>{errors.weightedVote?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Box>
    </VStack>
  )
}
