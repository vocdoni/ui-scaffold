import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { VerificationPending } from '~components/Auth/Verify'
import { AuthOutletContextType } from '~elements/LayoutAuth'

const Verify = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { setTitle, setSubtitle } = useOutletContext<AuthOutletContextType>()

  const email = searchParams.get('email')
  const code = searchParams.get('code')

  useEffect(() => {
    if (email && code) {
      setTitle(t('verify_mail.verifying_title', { email: email, defaultValue: 'Verifying {{ email }}' }))
      setSubtitle(
        t('verify_mail.verifying_subtitle', {
          defaultValue: 'Await until we verify your email address. You will be redirect on success.',
        })
      )
    } else {
      setTitle(t('verify.verify_your_email', { defaultValue: 'Verify your email' }))
      setSubtitle(
        t('verify.enter_verification_code', {
          defaultValue: 'Enter the verification code sent to your email',
        })
      )
    }
  }, [email, code])

  if (!email) {
    return (
      <Flex direction='column'>
        <Box me='auto'>
          <Heading fontSize='36px' mb='10px'>
            {t('verify.invalid_verification', { defaultValue: 'Invalid verification request' })}
          </Heading>
          <Text mb='36px' ms='4px' color={'verify_subtitle'} fontWeight='400' fontSize='md'>
            {t('verify.missing_email', {
              defaultValue: 'No email address provided for verification',
            })}
          </Text>
        </Box>
      </Flex>
    )
  }

  return <VerificationPending email={email} code={code || undefined} />
}

export default Verify
