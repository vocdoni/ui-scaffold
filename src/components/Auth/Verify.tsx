import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useOutletContext } from 'react-router-dom'
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

  if (autoSubmit && code && !isVerifyError) {
    return (
      <Box height={'100px'}>
        <Loading minHeight={1} />
      </Box>
    )
  }

  return (
    <>
      <Input type={'text'} placeholder={'12345678'} value={code} onChange={handleInputChange} isDisabled={autoSubmit} />
      <Box>
        <Button
          variant='primary'
          isDisabled={!code || (autoSubmit && isVerifyPending)}
          isLoading={isVerifyPending}
          onClick={verify}
          w='full'
        >
          <Trans i18nKey={'verify.verify_code'}>Verify</Trans>
        </Button>
        <FormSubmitMessage
          isError={isVerifyError}
          error={t('verify_mail.error_subtitle', {
            defaultValue:
              'We found an error verifying your email, please check verification mail to ensure all data is correct',
          })}
        />
      </Box>
    </>
  )
}

export const VerificationPending = ({ email, code }: { email: string; code?: string }) => {
  const { t } = useTranslation()
  const { setTitle, setSubtitle } = useOutletContext<AuthOutletContextType>()
  const {
    mutate: resend,
    isError: isResendError,
    error: resendError,
    isPending: isResendPending,
    isSuccess: isResendSuccess,
  } = useResendVerificationMail()

  useEffect(() => {
    setTitle(t('verify.account_created_succesfully', { defaultValue: 'Account created successfully!' }))
    setSubtitle(
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
      <Flex flexDirection='column' gap={4}>
        <Text ms='4px' fontWeight='bold' fontSize='md'>
          {email}
        </Text>
        <Text ms='4px' fontWeight='400' fontSize='sm' color='auth.secondary_text'>
          {t('verify.follow_email_instructions', {
            defaultValue: 'Follow the instructions there to activate your account.',
          })}
        </Text>
        <VerifyForm email={email} initialCode={code} autoSubmit={!!code} />
      </Flex>

      {!code && (
        <Button variant={'outline'} isLoading={isResendPending} onClick={resendMail} mt={6} w='full'>
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
    </>
  )
}
