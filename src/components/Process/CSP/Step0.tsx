import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Routes } from '~routes'
import { useCspAuthContext } from './CSPStepsProvider'
import { CSPStep0FormData, CSPStep0RequestData, useTwoFactorAuth } from './basics'

export const Step0Base = ({ election }: { election: PublishedElection }) => {
  const { t } = useTranslation()
  const { setCurrentStep, setAuthData, authFields, twoFaFields } = useCspAuthContext()
  const {
    actions: { csp1 },
  } = useElection()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CSPStep0FormData>()
  const auth = useTwoFactorAuth<0>(election, 0)
  const is2Factor = twoFaFields.length > 0

  const onSubmit = async (values: CSPStep0FormData) => {
    const form: CSPStep0RequestData = {}

    // Add auth fields to the form
    authFields.forEach((field) => {
      if (values[field]) {
        form[field] = values[field]
      }
    })

    // Handle 2FA field - process based on available methods
    if (values.contact) {
      if (twoFaFields.includes('email') && twoFaFields.includes('phone')) {
        // Both are supported, determine based on content
        if (values.contact.includes('@')) {
          form.email = values.contact
        } else {
          form.phone = values.contact
        }
      } else if (twoFaFields.includes('email')) {
        form.email = values.contact
      } else if (twoFaFields.includes('phone')) {
        form.phone = values.contact
      }
    }

    try {
      const { authToken } = await auth.mutateAsync(form)

      // Store auth token in global context
      setAuthData((prev) => ({ ...prev, authToken }))

      // Check if 2FA is required
      if (is2Factor) {
        // 2FA required - proceed to Step 1 for code verification
        setCurrentStep(1)
      } else {
        // No 2FA - complete authentication directly using the same method as Step 1
        csp1(authToken)
      }
    } catch (error) {
      console.error('CSP auth failed:', error)
    }
  }

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      memberNumber: t('csp.fields.memberNumber', 'Member Number'),
      name: t('csp.fields.name', 'Name'),
      surname: t('csp.fields.surname', 'Surname'),
      nationalId: t('csp.fields.nationalId', 'National ID'),
      birthDate: t('csp.fields.birthDate', 'Birth Date'),
    }
    return labels[field] || field
  }

  const get2FaFieldLabel = () => {
    if (twoFaFields.includes('email') && twoFaFields.includes('phone')) {
      return t('csp.fields.email_or_phone', 'Email or Phone')
    } else if (twoFaFields.includes('email')) {
      return t('csp.fields.email', 'Email')
    } else if (twoFaFields.includes('phone')) {
      return t('csp.fields.phone', 'Phone')
    }
    return t('csp.fields.contact', 'Contact')
  }

  const getFieldType = (field: string) => {
    if (field === 'email') return 'email'
    if (field === 'phone') return 'tel'
    if (field === 'birthDate') return 'date'
    return 'text'
  }

  return (
    <VStack spacing={6} align='stretch' w='full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* Render auth fields */}
          {authFields.map((field) => (
            <FormControl key={field} isInvalid={!!errors[field]} isRequired>
              <FormLabel>{getFieldLabel(field)}</FormLabel>
              <Input {...register(field, { required: true })} type={getFieldType(field)} />
            </FormControl>
          ))}

          {/* Render 2FA field */}
          {is2Factor && (
            <FormControl isInvalid={!!errors.contact} isRequired>
              <FormLabel>{get2FaFieldLabel()}</FormLabel>
              <Input {...register('contact', { required: true })} type='text' />
              <FormHelperText>
                <strong>{t('csp.important', 'Important')}:</strong>{' '}
                {t('csp.contact_match_help', 'Must match the one registered in the system')}
              </FormHelperText>
            </FormControl>
          )}

          {auth.isError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertDescription>{auth.error.message}</AlertDescription>
            </Alert>
          )}

          <FormControl isRequired>
            <Checkbox size='sm' variant='inline' colorScheme='blue'>
              <Trans i18nKey='csp.terms_acceptance'>
                I have read and accept the{' '}
                <Link as={RouterLink} to={Routes.terms} isExternal>
                  Terms and Conditions
                </Link>{' '}
                and the{' '}
                <Link as={RouterLink} to={Routes.privacy} isExternal>
                  Privacy Policy
                </Link>
                .
              </Trans>
            </Checkbox>
          </FormControl>

          <Text fontSize='xs'>
            💡{' '}
            {t(
              'csp.data_usage_info',
              'Your data will only be used to verify your identity. Vocdoni does not store personal data.'
            )}
          </Text>

          <Button type='submit' w='full' isLoading={auth.isPending} mt={2}>
            {is2Factor ? t('csp.receive_code', 'Receive Code') : t('csp.authenticate', 'Identify')}
          </Button>

          {is2Factor && (
            <Text textAlign='center' fontSize='sm'>
              {t(
                'csp.code_info',
                'You will receive a unique code on the selected medium to verify your identity and complete authentication'
              )}
            </Text>
          )}
        </Stack>
      </form>
    </VStack>
  )
}
