import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  PinInput,
  PinInputField,
  VStack,
} from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { Controller, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useCspAuthContext } from './CSPStepsProvider'
import { useTwoFactorAuth } from './basics'

// Define the form data structure
type CSPStep1FormData = {
  code: string
}

export const Step1Base = ({ election }: { election: PublishedElection }) => {
  const { authData } = useCspAuthContext()
  const {
    actions: { csp1 },
  } = useElection()
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CSPStep1FormData>({
    defaultValues: {
      code: '',
    },
  })
  const auth = useTwoFactorAuth<1>(election, 1)

  const onSubmit = async (values: CSPStep1FormData) => {
    try {
      const { authToken } = await auth.mutateAsync({
        authToken: authData.authToken,
        authData: [values.code],
      })

      csp1(authToken)
    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }

  return (
    <VStack spacing={6} align='stretch' w='full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.code}>
            <HStack justifyContent='center'>
              <Controller
                control={control}
                name='code'
                rules={{
                  required: t('csp_census.auth.step1.validation.required', {
                    defaultValue: 'Code is required',
                  }),
                  minLength: {
                    value: 6,
                    message: t('csp_census.auth.step1.validation.length', {
                      defaultValue: 'Code must be 6 digits',
                    }),
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <PinInput
                    size='lg'
                    value={value}
                    onChange={(val) => {
                      onChange(val)
                      if (val.length === 6) {
                        handleSubmit(onSubmit)()
                      }
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                )}
              />
            </HStack>
            {errors.code && <FormErrorMessage textAlign='center'>{errors.code.message}</FormErrorMessage>}
            <FormHelperText>
              <Trans i18nKey='csp.auth.step1.helper_text'>If using email, don't forget to check spam folder</Trans>
            </FormHelperText>
          </FormControl>
          {auth.isError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>{auth.error.message}</AlertDescription>
            </Alert>
          )}

          <Button type='submit' colorScheme='primary' w='full' isLoading={auth.isPending}>
            {t('csp_census.auth.step1.submit', { defaultValue: 'Authenticate' })}
          </Button>
        </VStack>
      </form>
    </VStack>
  )
}
