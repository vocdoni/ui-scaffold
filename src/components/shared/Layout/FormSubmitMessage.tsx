import { BoxProps, Flex, FormControl, FormErrorMessage, Text } from '@chakra-ui/react'

const FormSubmitMessage = ({
  isLoading,
  error,
  isError,
  isSuccess,
  success,
  ...boxProps
}: {
  isLoading?: boolean
  error?: Error | string
  isError?: boolean
  isSuccess?: boolean
  success?: string
} & BoxProps) => {
  if (isLoading) {
    return null
  }
  if (isSuccess) {
    return (
      <Flex w='full' justifyContent={'center'} pt={2} {...boxProps}>
        <Text as={'span'} size={'sm'}>
          {success}
        </Text>
      </Flex>
    )
  }
  if (isError) {
    return (
      <FormControl isInvalid={isError}>
        <Flex justifyContent={'center'} w='full' {...boxProps}>
          <FormErrorMessage>
            {typeof error === 'string' ? error : error?.message || 'Error performing the operation'}
          </FormErrorMessage>
        </Flex>
      </FormControl>
    )
  }
  return null
}

export default FormSubmitMessage
