import { Box, Flex, FormControl, FormErrorMessage, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { useAuth } from '~components/Auth/useAuth'
import { Loading } from '~src/router/SuspenseLoader'
import { useEffect } from 'react'

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

export default Verify
