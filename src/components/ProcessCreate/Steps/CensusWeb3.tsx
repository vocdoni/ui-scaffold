import { Box, Text } from '@chakra-ui/react'
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
  const { form, setForm, next } = useProcessCreationSteps()
  const methods = useForm<CensusWeb3Values>({
    defaultValues: {
      addresses: form.addresses,
    },
  })

  const addresses = methods.watch('addresses')

  const [minAddresses, setMinAddresses] = useState('')

  const onSubmit: SubmitHandler<CensusWeb3Values> = (data) => {
    if (addresses.length === 0) {
      setMinAddresses('Min 1 addresses')
    } else {
      setForm({ ...form, ...data })
      next()
    }
  }

  useEffect(() => {
    if (addresses.length >= 2) setMinAddresses('')
  }, [addresses])

  const handleAddAddress = (address: string) => {
    methods.setValue('addresses', [...methods.getValues().addresses, { address, weight: 0 }])
  }

  return (
    <>
      <Box mb={5}>
        <Text fontWeight={700} fontSize='2xl' textAlign='center' mb={3}>
          {t('form.process_create.census.web3_title')}
        </Text>

        <CensusWeb3AddressesAddAddress onAddAddress={handleAddAddress} />
      </Box>

      <FormProvider {...methods}>
        <Box as='form' id='process-create-form' onSubmit={methods.handleSubmit(onSubmit)}>
          <CensusWeb3Addresses />
          <Text color='red' textAlign='center'>
            {minAddresses}
          </Text>
        </Box>
      </FormProvider>
    </>
  )
}
