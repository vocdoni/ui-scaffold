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
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addressTextOverflow, fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'

export const CensusWeb3Addresses = () => {
  const { fields, remove } = useFieldArray({
    name: 'addresses',
  })

  const value = useBreakpointValue({
    base: 6,
    sm: 8,
    md: null,
  })

  return (
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
  )
}

export const CensusWeb3AddressesAddAddress = ({ onAddAddress }: { onAddAddress: (address: string) => void }) => {
  const { t } = useTranslation()

  const methods = useForm<{ address: string }>({
    defaultValues: {
      address: '',
    },
  })

  const onSubmit = (data: { address: string }) => {
    onAddAddress(data.address)
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <Box as='form' onSubmit={methods.handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={isInvalidFieldMap(methods.formState.errors, 'address')}
          display='flex'
          justifyContent='center'
          gap={2}
        >
          <Box>
            <Input
              {...methods.register('address', {
                required: {
                  value: true,
                  message: t('form.error.field_is_required'),
                },
                pattern: {
                  value: /^(0x)?[0-9a-fA-F]{40}$/,
                  message: t('form.error.address_pattern'),
                },
              })}
              w={{ base: '200px', sm: '300px', md: '420px' }}
            />
            <FormErrorMessage>{fieldMapErrorMessage(methods.formState.errors, 'address')}</FormErrorMessage>
          </Box>
          <Button type='submit' ml='none'>
            Add
          </Button>
        </FormControl>
      </Box>
    </FormProvider>
  )
}
