import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { enforceHexPrefix, useClient } from '@vocdoni/chakra-components'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addressTextOverflow, fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'
import { useProcessCreationSteps } from '../Steps/use-steps'

export const CensusWeb3Addresses = () => {
  const { t } = useTranslation()
  const { account } = useClient()
  const { form, setForm } = useProcessCreationSteps()

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
    resetField,
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    name: 'addresses',
  })

  const addresses = watch('addresses')
  const newAddress = watch('newAddress')

  const [initialized, setInitialized] = useState(!!addresses.length)

  const value = useBreakpointValue({
    base: 6,
    sm: 8,
    md: null,
  })

  useEffect(() => {
    setForm({ ...form, addresses })
    if (account?.address && !initialized && addresses.length === 0) {
      setValue('addresses', [{ address: enforceHexPrefix(account.address), weight: 0 }])
      setInitialized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, addresses, initialized])

  const handleAddAddress = async () => {
    // Trigger form validation
    await trigger()

    if (!errors.newAddress && !!newAddress) {
      // Perform any necessary actions
      setValue('addresses', [...addresses, { address: newAddress, weight: 0 }])
      resetField('newAddress')
    }
  }

  return (
    <>
      <FormControl isInvalid={isInvalidFieldMap(errors, 'newAddress')} display='flex' justifyContent='center' gap={2}>
        <Box mb={3}>
          <Input
            {...register('newAddress', {
              pattern: {
                value: /^(0x)?[0-9a-fA-F]{40}$/,
                message: t('form.error.address_pattern'),
              },
            })}
            w={{ base: '200px', sm: '300px', md: '420px' }}
            onKeyUp={(e) => {
              // avoid submitting form on enter
              if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                handleAddAddress()
              }
            }}
          />
          <FormErrorMessage>{fieldMapErrorMessage(errors, 'newAddress')}</FormErrorMessage>
        </Box>
        <Button type='button' ml='none' onClick={handleAddAddress}>
          {t('form.process_create.census.add_button')}
        </Button>
      </FormControl>
      <Flex
        flexDirection='column'
        gap={3}
        maxW='490px'
        height='400px'
        borderRadius='lg'
        border='1px solid'
        borderColor='process_create.border'
        mx='auto'
        overflowY='scroll'
        bgColor='process_create.input.bg'
      >
        {fields.map((address, index) => (
          <Flex
            key={address.id}
            justifyContent='start'
            alignItems='center'
            gap={2}
            mx='auto'
            borderBottom='1px solid'
            borderColor='process_create.border'
            w='full'
            p={5}
          >
            <Text fontWeight='bold'>{index + 1}</Text>
            <Text>{addressTextOverflow((address as any).address, value)}</Text>

            <IconButton
              size='xs'
              type='button'
              icon={<DeleteIcon />}
              aria-label='delete option'
              onClick={() => remove(index)}
              ml='auto'
            />
          </Flex>
        ))}
      </Flex>
    </>
  )
}
