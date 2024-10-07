import { Box, BoxProps, FormControl, FormErrorMessage } from '@chakra-ui/react'

const FormSubmitMessage = ({
  error,
  isError,
  isSuccess,
  success,
  ...boxProps
}: {
  error?: Error | string
  isError?: boolean
  isSuccess?: boolean
  success?: string
} & BoxProps) => {
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
