import {
  Alert,
  AlertDescription,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PublishedElection } from '@vocdoni/sdk'
import { useForm } from 'react-hook-form'
import { AlertIcon } from '~components/Layout/AlertIcon'
import { useCspAuthContext } from './CSPStepsProvider'
import { CSPStep0FormData, CSPStep0RequestData, useTwoFactorAuth } from './basics'

export const Step0Base = ({ election }: { election: PublishedElection }) => {
  const { setCurrentStep, setAuthData } = useCspAuthContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CSPStep0FormData>()
  const auth = useTwoFactorAuth<0>(election, 0)

  const onSubmit = async (values: CSPStep0FormData) => {
    const form: CSPStep0RequestData = {
      participantNo: values.participantNo,
    }

    if (values.contact?.includes('@')) {
      form.email = values.contact
    } else {
      form.phone = values.contact
    }

    try {
      const { authToken } = await auth.mutateAsync(form)

      // Store auth token in global context and proceed to the next step
      setAuthData((prev) => ({ ...prev, authToken }))
      setCurrentStep(1)
    } catch (error) {
      console.error('CSP auth failed:', error)
    }
  }

  return (
    <VStack spacing={6} align='stretch' w='full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.participantNo}>
            <FormLabel>Núm. de col·legiat/da</FormLabel>
            <Input {...register('participantNo', { required: true })} />
          </FormControl>

          <FormControl isInvalid={!!errors.contact}>
            <FormLabel>Correu electrònic o telèfon mòbil</FormLabel>
            <Input {...register('contact', { required: true })} />
            <FormHelperText>
              <strong>Important:</strong> Ha de coincidir amb el registrat al COIB.
            </FormHelperText>
          </FormControl>
          {auth.isError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>{auth.error.message}</AlertDescription>
            </Alert>
          )}

          <Text>
            Rebràs un codi únic al mitjà seleccionat per verificar la teva identitat i completar l'autenticació
          </Text>

          <Button type='submit' variant='primary' borderRadius='full' w='full' isLoading={auth.isPending}>
            Rebre Codi
          </Button>
        </Stack>
      </form>
    </VStack>
  )
}
