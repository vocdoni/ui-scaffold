import { Box, Text } from '@chakra-ui/react'
import { enforceHexPrefix, useClient } from '@vocdoni/chakra-components'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { CensusWeb3Addresses } from '../Census/Web3'
import { useProcessCreationSteps } from './use-steps'

export interface CensusWeb3Values {
  addresses: Web3Address[]
}

export interface Web3Address {
  address: string
  weight: number
}

export const StepsCensusWeb3 = () => {
  const { form, setForm, next } = useProcessCreationSteps()
  const { account } = useClient()

  const methods = useForm({
    defaultValues: {
      addresses: form.addresses,
      newAddress: '',
    },
  })

  const addresses = methods.watch('addresses')

  const [initialized, setInitialized] = useState(!!addresses.length)

  useEffect(() => {
    setForm({ ...form, addresses })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  const onSubmit: SubmitHandler<CensusWeb3Values> = (data) => {
    setForm({ ...form, addresses: data.addresses })
    next()
  }

  useEffect(() => {
    setForm({ ...form, addresses })
    if (account?.address && !initialized && addresses.length === 0) {
      methods.setValue('addresses', [{ address: enforceHexPrefix(account.address), weight: 0 }])
      setInitialized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, addresses, initialized])

  return (
    <>
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
