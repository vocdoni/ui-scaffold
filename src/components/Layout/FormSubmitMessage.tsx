import { Box, BoxProps, FormControl, FormErrorMessage } from '@chakra-ui/react'

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
      <Box pt={2} {...boxProps}>
        {success}
      </Box>
    )
  }
  if (isError) {
    return (
      <FormControl isInvalid={isError}>
        <Box pt={2} {...boxProps}>
          <FormErrorMessage>
            {typeof error === 'string' ? error : error?.message || 'Error performing the operation'}
          </FormErrorMessage>
        </Box>
      </FormControl>
    )
  }
  return null
}

export default FormSubmitMessage
