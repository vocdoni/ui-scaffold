import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import onvoteIcon from '/assets/onvote-icon2-black.svg'

const Banner = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()

  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Flex justifyContent={{ base: 'center', md: 'start' }}>
        <Image src={onvoteIcon} w='408px' mb={4} />
      </Flex>
      <Text
        as='h1'
        fontSize='35px'
        fontWeight={400}
        textAlign='center'
        lineHeight='44px'
        fontFamily='pixeloid'
        textTransform='uppercase'
        mb={!isConnected ? '130px' : '36px'}
      >
        {t('banner.title')}
      </Text>

      {isConnected && (
        <Button
          variant='primary'
          as={ReactRouterLink}
          to='/processes/create'
          aria-label={t('menu.new_process')}
          title={t('menu.new_process')}
          mb='130px'
        >
          {t('banner.start_now')}
        </Button>
      )}
    </Flex>
  )
}

export default Banner
