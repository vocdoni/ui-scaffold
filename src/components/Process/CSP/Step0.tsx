import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PublishedElection } from '@vocdoni/sdk'
import { useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import { AlertIcon } from '~components/Layout/AlertIcon'
import { Routes } from '~routes'
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
      participantNo: values.participantNo.padStart(6, '0'),
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
          <FormControl isInvalid={!!errors.participantNo} isRequired>
            <FormLabel>DNI</FormLabel>
            <Input {...register('participantNo', { required: true })} />
          </FormControl>

          <FormControl isInvalid={!!errors.contact} isRequired>
            <FormLabel>Correu electrònic</FormLabel>
            <Input {...register('contact', { required: true })} />
            <FormHelperText>
              <strong>Important:</strong> Ha de coincidir amb el registrat al Alhora.
            </FormHelperText>
          </FormControl>
          {auth.isError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>{auth.error.message}</AlertDescription>
            </Alert>
          )}

          <FormControl isRequired>
            <Checkbox size='sm' variant='inline' colorScheme='blue'>
              He llegit i accepto els{` `}
              <Link as={RouterLink} to={Routes.terms} isExternal>
                Termes i Condicions
              </Link>{' '}
              i la{' '}
              <Link as={RouterLink} to={Routes.privacy} isExternal>
                Política de Privacitat
              </Link>
              .
            </Checkbox>
          </FormControl>

          <Text fontSize='xs'>
            💡 Les teves dades s'utlilitzaran només per verificar la teva identitat. Vocdoni no emmagatzema dades personals.
          </Text>

          <Button type='submit' variant='primary' borderRadius='full' w='full' isLoading={auth.isPending} mt={2}>
            Rebre Codi
          </Button>

          <Text textAlign='center' fontSize='sm'>
            Rebràs un codi únic al correu especificat per verificar la teva identitat i completar l'autenticació
          </Text>
        </Stack>
      </form>
    </VStack>
  )
}
