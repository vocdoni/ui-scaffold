import { Button, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useNavigate, useOutletContext } from 'react-router-dom'
import { useResendVerificationMail } from '~components/Auth/authQueries'
import { useAuth } from '~components/Auth/useAuth'
import FormSubmitMessage from '~components/Layout/FormSubmitMessage'
import { AuthOutletContextType } from '~elements/LayoutAuth'
import { Routes } from '~src/router/routes'

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
    verifyAsync({ email, code }).then(() => navigate(Routes.dashboard.base))
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

export const VerificationPending = ({ email }: IVerifyAccountProps) => {
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
    </>
  )
}
