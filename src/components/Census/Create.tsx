import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Select, Stack, VStack } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Routes } from '~routes'
import { CensusCreatePayload, useCreateCensus } from '~src/queries/census'

const CreateCensus = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { organization } = useOrganization()
  const createCensus = useCreateCensus()
  const { register, handleSubmit } = useForm<CensusCreatePayload>({
    defaultValues: {
      type: 'sms_or_mail',
    },
  })

  if (!organization) return null

  const onSubmit = async (values: CensusCreatePayload) => {
    const censusId = await createCensus.mutateAsync({
      ...values,
      orgAddress: organization.address,
    })

    // Navigate to participants page
    navigate(Routes.dashboard.census.participants.replace(':id', censusId))
  }

  return (
    <Box>
      <Heading size='lg' mb={6}>
        <Trans i18nKey='census.create.title'>Create Census</Trans>
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={createCensus.isError}>
            <FormLabel>{t('census.create.type', { defaultValue: 'Type' })}</FormLabel>
            <Select {...register('type')}>
              <option value='sms_or_mail'>
                <Trans i18nKey='census.type.sms_or_mail'>SMS or Email</Trans>
              </option>
              <option value='sms'>
                <Trans i18nKey='census.type.sms'>SMS</Trans>
              </option>
              <option value='mail'>
                <Trans i18nKey='census.type.mail'>Email</Trans>
              </option>
            </Select>
            {createCensus.isError && <FormErrorMessage>{createCensus.error.message}</FormErrorMessage>}
          </FormControl>

          <Stack direction='row' spacing={4} justify='flex-end'>
            <Button variant='outline' onClick={() => navigate(Routes.dashboard.census.list)}>
              <Trans i18nKey='common.cancel'>Cancel</Trans>
            </Button>
            <Button type='submit' colorScheme='primary' isLoading={createCensus.isPending}>
              <Trans i18nKey='common.cancel'>Create</Trans>
            </Button>
          </Stack>
        </VStack>
      </form>
    </Box>
  )
}

export default CreateCensus
