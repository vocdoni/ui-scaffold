import { Box, Button, Flex, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useResendVerificationMail } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'
import { Loading } from '~src/router/SuspenseLoader'
import { UnauthorizedApiError } from './api'

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

  // Auto-submit if code is provided and autoSubmit is true, or when all 6 characters are entered
  useEffect(() => {
    if ((autoSubmit && code) || (!autoSubmit && code?.length === 6)) {
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
      <HStack width='100%' justifyContent='space-between'>
        <PinInput value={code} onChange={setCode} isDisabled={autoSubmit} type='alphanumeric'>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
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
          error={
            verifyError instanceof UnauthorizedApiError
              ? t('verify_mail.error_subtitle', {
                  defaultValue: 'The code you entered is incorrect. Please try again',
                })
              : verifyError && verifyError.message
          }
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
        <Text fontWeight='bold' fontSize='md' color='auth.secondary_text'>
          <Trans i18nKey='verify.sent_to_email' values={{ email }}>
            Email sent to {email}
          </Trans>
        </Text>
        <Text fontWeight='bold' fontSize='sm'>
          {t('verify.enter_code', {
            defaultValue: 'Enter the code below to activate your account',
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
