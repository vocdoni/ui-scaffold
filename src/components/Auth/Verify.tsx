import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, Heading, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useResendVerificationMail } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { Loading } from '~src/router/SuspenseLoader'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'

const Verify = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { textColor, textColorSecondary } = useDarkMode()
  const {
    mailVerify: { isIdle, isPending, isError: isMutationError, error, mutateAsync },
  } = useAuth()

  const email = searchParams.get('email')
  const code = searchParams.get('code')
  const isLoading = isIdle || isPending
  const isError = !email || isMutationError || (import.meta.env.VOCDONI_ENVIRONMENT !== 'dev' && !code)

  // Trigger email verification on component load
  useEffect(() => {
    mutateAsync({ email, code }).then(() => navigate('/organization'))
  }, [])

  let title = t('verify_mail.verifying_title', { email: email, defaultValue: 'Verifying {{ email }}' })
  let subTitle = t('verify_mail.verifying_subtitle', {
    defaultValue: 'Await until we verify your email address. You will be redirect on success.',
  })
  // dev enviorment permits empty code
  if (isError) {
    title = t('verify_mail.error_title', { email: email, defaultValue: 'Error verifying {{ email }}' })
    subTitle = t('verify_mail.error_subtitle', {
      defaultValue:
        'We found an error verifying your email, please check verification mail to ensure all data is correct',
    })
  }

  return (
    <Flex direction='column'>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {title}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {subTitle}
        </Text>
      </Box>
      {isLoading && !isError && (
        <Box height={'100px'}>
          <Loading minHeight={1} />
        </Box>
      )}
      <Box>
        <FormControl isInvalid={isError}>
          {isError && (
            <FormErrorMessage>
              {error?.message || t('error.error_doing_things', { defaultValue: 'Error al realizar la operación' })}
            </FormErrorMessage>
          )}
        </FormControl>
      </Box>
    </Flex>
  )
}

interface IVerifyAccountProps {
  email: string
}

const VerifyForm = ({ email }: IVerifyAccountProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [code, setCode] = useState('')
  const {
    mailVerify: { mutateAsync: verifyAsync, isPending: isVerifyPending, isError: isVerifyError, error: verifyError },
  } = useAuth()

  const verify = useCallback(() => {
    verifyAsync({ email, code }).then(() => navigate('/organization'))
  }, [code, email])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  return (
    <>
      <Input type={'text'} placeholder={'12345678'} value={code} onChange={handleInputChange} />
      <Button isDisabled={!code} isLoading={isVerifyPending} onClick={verify}>
        <Trans i18nKey={'verify.verify_code'}>Verify</Trans>
      </Button>
      <FormSubmitMessage
        isError={isVerifyError}
        error={t('verify_mail.error_subtitle', {
          defaultValue:
            'We found an error verifying your email, please check verification mail to ensure all data is correct',
        })}
      />
    </>
  )
}

export const VerifyAccountNeeded = ({ email }: IVerifyAccountProps) => {
  const { textColor, textColorSecondary } = useDarkMode()
  const { t } = useTranslation()
  const {
    mutate: resend,
    isError: isResendError,
    error: resendError,
    isPending: isResendPending,
    isSuccess: isResendSuccess,
  } = useResendVerificationMail()

  const resendMail = useCallback(() => {
    if (email && !isResendSuccess) {
      resend({ email })
    }
  }, [isResendSuccess, email])

  return (
    <Flex direction='column' gap={2}>
      <Box me='auto'>
        <Heading color={textColor} fontSize='36px' mb='10px'>
          {t('verify.account_created_succesfully', { defaultValue: 'Account created successfully!' })}
        </Heading>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('verify.verification_email_is_sent', {
            defaultValue: 'A verification email has been sent to:',
          })}
        </Text>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='bold' fontSize='md'>
          {email}
        </Text>
        <Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
          {t('verify.follow_email_instructions', {
            defaultValue: 'Follow the instructions there to activate your account.',
          })}
        </Text>
      </Box>
      <VerifyForm email={email} />

      <Button isLoading={isResendPending} onClick={resendMail}>
        <Trans i18nKey={'verify.resend_confirmation_mail'}>Resend Email</Trans>
      </Button>
      <FormSubmitMessage
        isSuccess={isResendSuccess}
        success={t('verify.email_sent', {
          defaultValue: 'Email sent successfully',
        })}
        isError={isResendError}
        error={resendError}
      />

      {import.meta.env.VOCDONI_ENVIRONMENT === 'dev' && (
        <>
          <Divider />
          <Button mt={4} as={ReactRouterLink} to={`/account/verify?email=${encodeURIComponent(email)}`}>
            Mail verification for dev envs
          </Button>
        </>
      )}
    </Flex>
  )
}

export default Verify
