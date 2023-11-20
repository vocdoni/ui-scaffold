import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'

const Banner = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      maxW={250}
      mx='auto'
      mb={40}
      mt={{ md: 20 }}
      pl={{ md: 20 }}
    >
      <Box pt={{ base: 5 }} px={{ sm: 10, md: 0 }}>
        <Text
          as='h1'
          fontSize={{ base: 'xl3', sm: 'xl4', md: 'xl3' }}
          fontWeight='extrabold'
          textAlign={{ base: 'center', md: 'start' }}
          pb={{ base: 3, md: 1 }}
          width={{ md: '420px' }}
          lineHeight={{ md: 1.4 }}
          fontFamily='pixeloid'
        >
          {t('banner.title')}
        </Text>
        <Text
          as='h2'
          width={{ md: '370px' }}
          fontSize={{ base: 'xl', md: 'xl2' }}
          textAlign={{ base: 'center', md: 'start' }}
        >
          {t('banner.subtitle')}
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
              aria-label={t('menu.new_process')}
              title={t('menu.new_process')}
            >
              <Text as='span' display='inline-block'>
                {t('banner.start_now')}
              </Text>
            </Link>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default Banner
