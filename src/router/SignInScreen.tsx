import { Button, Flex, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Loading } from '~src/router/SuspenseLoader'

const SignInScreen = () => {
  const { openConnectModal } = useConnectModal()
  const navigate = useNavigate()

  // Redirect to the SAAS sign-in page
  useEffect(() => {
    if (import.meta.env.SAAS_URL) {
      navigate('/signin')
    }
  }, [])
  if (import.meta.env.SAAS_URL) {
    return <Loading />
  }

  return (
    <Flex gap={4} justifyContent='center' alignItems='center' flexDirection='column' h='100%'>
      <Text>
        <Trans i18nKey='organization.required_signin'>You must sign in first</Trans>
      </Text>
      <Button onClick={openConnectModal}>
        <Trans i18nKey='menu.login'>Login</Trans>
      </Button>
    </Flex>
  )
}

export default SignInScreen
