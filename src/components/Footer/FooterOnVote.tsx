import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { HR } from '@vocdoni/chakra-components'
import { Trans } from 'react-i18next'
import farcasterIcon from '/assets/farcaster-icon.svg'
import mirrorIcon from '/assets/mirror-icon.svg'
import onvoteIcon from '/assets/onvote-icon2.svg'
import xIcon from '/assets/x-icon.svg'

const FooterOnVote = () => {
  return (
    <Flex color='white' minH='400px' flexDirection='column' alignItems='center' justifyContent='center'>
      <Flex flex={1} flexDirection='column' alignItems='center' justifyContent='center' gap={5}>
        <Box>
          <Trans
            i18nKey='footer.text'
            components={{
              p1: (
                <Text
                  textAlign='center'
                  fontWeight='bold'
                  textTransform='uppercase'
                  fontFamily='pixeloid'
                  fontSize='xl3'
                />
              ),
              p2: <Text textAlign='center' fontSize='xl4' />,
            }}
          />
        </Box>
        <Flex gap={3} justifyContent='center' alignItems='center'>
          <Text fontSize='xl' whiteSpace='nowrap'>
            <Trans i18nKey='footer.follow_us' />
          </Text>
          <Link href='https://twitter.com/vocdoni' target='_blank' aria-label='link vocdoni twitter' m={0}>
            <Image src={xIcon} w={4} />
          </Link>
          <Link href='https://farcaster.com/' target='_blank' aria-label='link vocdoni twitter'>
            <Image src={farcasterIcon} w={5} />
          </Link>
          <Link href='https://mirror.xyz/onvote.eth' target='_blank' aria-label='link vocdoni mirror'>
            <Image src={mirrorIcon} w={3} />
          </Link>
        </Flex>
      </Flex>
      <Box mt='auto' w='full'>
        <HR m={0} h='1px' />
        <Flex justifyContent='center' my={6} textAlign='center'>
          <Image src={onvoteIcon} mt={1} mr={1} />
        </Flex>
      </Box>
    </Flex>
  )
}

export default FooterOnVote
