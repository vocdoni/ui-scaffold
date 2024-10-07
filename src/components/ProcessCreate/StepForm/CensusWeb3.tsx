import { Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CensusWeb3Addresses } from '../Census/Web3'
import { useProcessCreationSteps } from '../Steps/use-steps'

export interface CensusWeb3Values {
  addresses: Web3Address[]
  weightedVote: boolean
}

export interface Web3Address {
  address: string
  weight: number
}

export const StepFormCensusWeb3 = () => {
  const { t } = useTranslation()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm({
    defaultValues: {
      addresses: form.addresses,
      newAddress: '',
      weightedVote: form.weightedVote,
    },
  })
  const addresses = methods.watch('addresses')

  useEffect(() => {
    methods.clearErrors('addresses')
    setForm({ ...form, addresses })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  const onSubmit: SubmitHandler<CensusWeb3Values> = (data) => {
    if (!addresses.length) {
      methods.setError('addresses', {
        type: 'manual',
        message: t('form.error.min_address'),
      })
    } else {
      setForm({ ...form, ...data })
      next()
    }
  }

  return (
    <>
      <Box px={7} py={4}>
        <Text mb={8} className='brand-theme' textTransform='uppercase' color='text.brand'>
          {t('census.wallet_address_title')}
        </Text>

        <FormProvider {...methods}>
          <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
            <CensusWeb3Addresses />
            {methods.formState.errors.addresses && (
              <Text color='red' textAlign='center' mt={2}>
                {methods.formState.errors.addresses.message}
              </Text>
            )}
          </Box>
        </FormProvider>
      </Box>
    </>
  )
}
