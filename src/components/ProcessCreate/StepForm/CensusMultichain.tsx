import { Box, Text } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useProcessCreationSteps } from '../Steps/use-steps'
import { MultichainStrategyBuilder } from '~components/ProcessCreate/Census/Multichain'
import { Census3Predicates } from '~components/ProcessCreate/Census/Gitcoin/StampsUnionType'

export type TokenChainAddress = {
  chainId: string
  tokenAddress: string
}

export type CensusMultichainValues = {
  tokens: TokenChainAddress[]
  predicate: Census3Predicates
}

export const StepFormCensusMultichain = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusMultichainValues>({
    defaultValues: {
      tokens: form.tokens,
      predicate: form.predicate,
    },
  })

  const onSubmit: SubmitHandler<CensusMultichainValues> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <Box px={7} py={4}>
      <Text mb={3} className='brand-theme' textTransform='uppercase' color='process_create.census.title'>
        {t('census.multichain_title')}
      </Text>
      <Text fontSize='sm' color='process_create.description' mb={5}>
        {t('census.multichain_description')}
      </Text>
      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <MultichainStrategyBuilder />
        </Box>
      </FormProvider>
    </Box>
  )
}
