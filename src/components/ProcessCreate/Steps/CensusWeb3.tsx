import { Box, Text } from '@chakra-ui/react'
import { enforceHexPrefix, useClient } from '@vocdoni/chakra-components'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CensusWeb3Addresses, CensusWeb3AddressesAddAddress } from '../Census/Web3'
import { useProcessCreationSteps } from './use-steps'

export interface CensusWeb3Values {
  addresses: Web3Address[]
}

export interface Web3Address {
  address: string
  weight: number
}

export const StepsCensusWeb3 = () => {
  const { t } = useTranslation()
  const { account } = useClient()
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusWeb3Values>({
    defaultValues: {
      addresses: form.addresses,
    },
  })

  const addresses = methods.watch('addresses')

  const [initialized, setInitialized] = useState(!!addresses.length)

  useEffect(() => {
    setForm({ ...form, addresses })
    if (account?.address && !initialized && addresses.length === 0) {
      methods.setValue('addresses', [{ address: enforceHexPrefix(account.address), weight: 0 }])
      setInitialized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, addresses, initialized])

  useEffect(() => {
    if (methods.formState.errors.addresses?.type === 'manual') {
      methods.clearErrors('addresses')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  const handleAddAddress = (address: string) => {
    methods.setValue('addresses', [...methods.getValues().addresses, { address, weight: 0 }])
  }
  const onSubmit: SubmitHandler<CensusWeb3Values> = (data) => {
    if (!data.addresses.length) {
      methods.setError('addresses', {
        type: 'manual',
        message: t('form.process_create.census.web3_min_address'),
      })
    } else {
      setForm({ ...form, ...data })
      next()
    }
  }
  return (
    <>
      <Box mb={5}>
        <Text fontWeight='bold' fontSize='2xl' textAlign='center' mb={3}>
          {t('form.process_create.census.web3_title')}
        </Text>

        <CensusWeb3AddressesAddAddress onAddAddress={handleAddAddress} />
      </Box>

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
    </>
  )
}
