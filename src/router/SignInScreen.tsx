import { Button, Flex, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Trans } from 'react-i18next'

const SignInScreen = () => {
  const { openConnectModal } = useConnectModal()

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
