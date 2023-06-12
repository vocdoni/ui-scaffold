import { Box } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { CensusWeb3Addresses } from '../Census/Web3'
import { StepsNavigation } from './Navigation'
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
  const methods = useForm<CensusWeb3Values>({
    defaultValues: {
      addresses: form.addresses,
    },
  })

  const onSubmit: SubmitHandler<CensusWeb3Values> = (data) => {
    setForm({ ...form, ...data })
    next()
  }

  return (
    <>
      <FormProvider {...methods}>
        <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusWeb3Addresses />
          <StepsNavigation />
        </Box>
      </FormProvider>
    </>
  )
}
