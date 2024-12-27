import { Box, Button, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useNavigate, useOutletContext } from 'react-router-dom'
import { useResendVerificationMail } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'
import { Loading } from '~src/router/SuspenseLoader'

export const verificationSuccessRedirect = Routes.auth.organizationCreate

type VerifyFormProps = {
  email: string
  initialCode?: string
  autoSubmit?: boolean
}

const VerifyForm = ({ email, initialCode = '', autoSubmit = false }: VerifyFormProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [code, setCode] = useState(initialCode)
  const {
    mailVerify: { mutateAsync: verifyAsync, isPending: isVerifyPending, isError: isVerifyError, error: verifyError },
  } = useAuth()

  const verify = useCallback(() => {
    verifyAsync({ email, code }).then(() => navigate(verificationSuccessRedirect))
  }, [code, email])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  // Auto-submit if code is provided and autoSubmit is true
  useEffect(() => {
    if (autoSubmit && code) {
      verify()
    }
  }, [autoSubmit, code])

  if (autoSubmit && code) {
    return (
      <Box height={'100px'}>
        <Loading minHeight={1} />
      </Box>
    )
  }

  return (
    <>
      <Input type={'text'} placeholder={'12345678'} value={code} onChange={handleInputChange} isDisabled={autoSubmit} />
      <Button isDisabled={!code || (autoSubmit && isVerifyPending)} isLoading={isVerifyPending} onClick={verify}>
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

export const VerificationPending = ({ email, code }: { email: string; code?: string }) => {
  const { t } = useTranslation()
  const { setTitle, setSubTitle } = useOutletContext<AuthOutletContextType>()
  const {
    mutate: resend,
    isError: isResendError,
    error: resendError,
    isPending: isResendPending,
    isSuccess: isResendSuccess,
  } = useResendVerificationMail()

  useEffect(() => {
    setTitle(t('verify.account_created_succesfully', { defaultValue: 'Account created successfully!' }))
    setSubTitle(
      t('verify.verification_email_is_sent', {
        defaultValue: 'A verification email has been sent to:',
      })
    )
  }, [])

  const resendMail = useCallback(() => {
    if (email && !isResendSuccess) {
      resend({ email })
    }
  }, [isResendSuccess, email])

  return (
    <>
      <Flex flexDirection='column' gap={6}>
        <Text mb='36px' ms='4px' color={'account.description'} fontWeight='bold' fontSize='md'>
          {email}
        </Text>
        <Text mb='36px' ms='4px' color={'account.description'} fontWeight='400' fontSize='md'>
          {t('verify.follow_email_instructions', {
            defaultValue: 'Follow the instructions there to activate your account.',
          })}
        </Text>
      </Flex>
      <VerifyForm email={email} initialCode={code} autoSubmit={!!code} />

      {!code && (
        <Button isLoading={isResendPending} onClick={resendMail}>
          <Trans i18nKey={'verify.resend_confirmation_mail'}>Resend Email</Trans>
        </Button>
      )}
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
    </>
  )
}
