import { Flex, Image, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import onvoteIcon from '/assets/onvote-icon2-black.svg'

const Banner = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()

  return (
    <Flex
      flexDirection='column'
      justifyContent={{ base: 'center', md: 'start' }}
      maxW={200}
      mx='auto'
      mb={44}
      mt={{ md: 5 }}
      pl={{ md: 20 }}
      pt={{ base: 5, md: '100px' }}
      px={{
        base: 10,
        sm: 14,
      }}
    >
      <Flex justifyContent={{ base: 'center', md: 'start' }}>
        <Image src={onvoteIcon} w='330px' mb={14} />
      </Flex>
      <Text
        as='h1'
        fontSize={{ base: 'xl3', sm: 'xl4', md: 'xl5' }}
        fontWeight='extrabold'
        textAlign={{ base: 'center', md: 'start' }}
        pb={{ base: 3, md: 1 }}
        lineHeight={{ md: 1.4 }}
        fontFamily='pixeloid'
        textTransform='uppercase'
        mb={{ base: 0, md: 50 }}
      >
        {t('banner.title')}
      </Text>

      {isConnected && (
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          gap={5}
          justifyContent={{ base: 'center', md: 'start' }}
          alignItems='center'
          marginTop={{ base: 10, md: 4 }}
        >
          <Link
            as={ReactRouterLink}
            to='/processes/create'
            variant='on-vote'
            colorScheme='primary'
            p={{ base: '18px 24px', md: '24px 32px' }}
            fontSize={{ base: 'md', md: 'lg' }}
            aria-label={t('menu.new_process')}
            title={t('menu.new_process')}
          >
            <Text as='span' display='inline-block'>
              {t('banner.start_now')}
            </Text>
          </Link>
        </Flex>
      )}
    </Flex>
  )
}

export default Banner
