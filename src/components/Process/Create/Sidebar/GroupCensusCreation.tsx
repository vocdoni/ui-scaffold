import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { VoterAuthentication } from '../VoterAuthentication'
import { CensusTypes, GroupSelect } from './CensusCreation'

export const GroupCensusCreation = () => {
  const { t } = useTranslation()
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()

  const censusType = watch('censusType')

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <GroupSelect />
      <VoterAuthentication />

      <FormControl isInvalid={!!errors.censusId}>
        <Input
          type='hidden'
          {...register('census', {
            required: {
              value: censusType === CensusTypes.CSP,
              message: t('form.error.census_config_required', 'Please configure the census authentication settings.'),
            },
          })}
        />
        <FormErrorMessage>{errors.censusId?.message?.toString()}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}
