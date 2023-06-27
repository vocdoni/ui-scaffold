import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormErrorMessage, IconButton, Input, Text } from '@chakra-ui/react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { fieldMapErrorMessage, isInvalidFieldMap } from '../../../constants'

const addressTextOverflowBase = (address: string) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 8, address.length)}`

const addressTextOverflowSm = (address: string) =>
  `${address.substring(0, 8)}...${address.substring(address.length - 18, address.length)}`

export const CensusWeb3Addresses = () => {
  const { fields, remove } = useFieldArray({
    name: 'addresses',
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
          <Text display={{ base: 'block', sm: 'none' }}>{addressTextOverflowBase((address as any).address)}</Text>
          <Text display={{ base: 'none', sm: 'block', md: 'none' }}>
            {addressTextOverflowSm((address as any).address)}
          </Text>
          <Text display={{ base: 'none', md: 'block' }}>{(address as any).address}</Text>
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
