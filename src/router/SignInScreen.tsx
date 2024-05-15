import { Button, Text, VStack } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Trans } from 'react-i18next'

const SignInScreen = () => {
  const { openConnectModal } = useConnectModal()

  return (
    <VStack spacing={4}>
      <Text>
        <Trans i18nKey='organization.required_signin'>You must sign in first</Trans>
      </Text>
      <Button onClick={openConnectModal}>
        <Trans i18nKey='menu.login'>Login</Trans>
      </Button>
    </VStack>
  )
}

export default SignInScreen
