import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Trans, useTranslation } from 'react-i18next'
import { BsGithub } from 'react-icons/bs'
import { useAccount } from 'wagmi'
import farcasterIcon from '/assets/farcaster-icon.svg'
import mirrorIcon from '/assets/mirror-icon.svg'
import onvoteIcon from '/assets/onvote-icon2.svg'
import xIcon from '/assets/x-icon.svg'

const Footer = () => {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const { t } = useTranslation()

  return (
    <Box bgImage={'/assets/footer-bg.jpg'} bgSize='cover' bgPosition='center'>
      <Flex flexDirection='column' minH='597px' maxW='1920px' mx='auto' color='white'>
        <Flex
          flex={1}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          py='128px'
          px='40px'
          gap='32px'
        >
          <Box mt='20px'>
            <Trans
              i18nKey='footer.text'
              components={{
                p1: (
                  <Text
                    textAlign='center'
                    textTransform='uppercase'
                    fontFamily='pixeloidsans'
                    fontSize={{ base: '22.5px', lg: '30px' }}
                  />
                ),
                p2: <Text textAlign='center' fontSize={{ base: '42px', lg: '56px' }} fontWeight='bold' />,
              }}
            />
          </Box>
          {!isConnected && (
            <Button
              variant='primary'
              onClick={() => {
                if (openConnectModal) openConnectModal()
              }}
            >
              {t('menu.login').toString()}
            </Button>
          )}
          <Flex gap={3} justifyContent='center' alignItems='center'>
            <Text fontSize='xl' whiteSpace='nowrap'>
              <Trans i18nKey='footer.follow_us' />
            </Text>
            <Link
              href='https://twitter.com/onvoteapp'
              target='_blank'
              aria-label='link twitter'
              _hover={{
                opacity: '0.5',
              }}
            >
              <Image src={xIcon} w={4} />
            </Link>
            <Link
              href='https://warpcast.com/onvote'
              target='_blank'
              aria-label='link forecast'
              _hover={{
                opacity: '0.5',
              }}
            >
              <Image src={farcasterIcon} w={5} />
            </Link>
            <Link
              href='https://mirror.xyz/onvote.eth'
              target='_blank'
              aria-label='link mirror'
              _hover={{
                opacity: '0.5',
              }}
            >
              <Image src={mirrorIcon} w={3} />
            </Link>
            <Link
              href='https://github.com/vocdoni'
              target='_blank'
              aria-label='link vocdoni github'
              _hover={{
                opacity: '0.5',
              }}
            >
              <BsGithub size='17px' />
            </Link>
          </Flex>
        </Flex>
        <Flex
          justifyContent='center'
          textAlign='center'
          borderTop='1px solid rgba(255, 255, 255, .2)'
          w='full'
          py='24px'
        >
          <Image src={onvoteIcon} w='96px' />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
