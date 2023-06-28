import { Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
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
  const methods = useForm({
    defaultValues: {
      addresses: form.addresses,
      newAddress: '',
    },
  })
  const addresses = methods.watch('addresses')

  useEffect(() => {
    setForm({ ...form, addresses })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses])

  const onSubmit: SubmitHandler<CensusWeb3Values> = (data) => {
    setForm({ ...form, addresses: data.addresses })
    next()
  }

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
