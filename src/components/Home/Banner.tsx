import { Box, Button, Flex, Img, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import bannerLogo from '/assets/banner.png'

const Banner = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()

  return (
    <Flex
      flexDirection={{ base: 'column' }}
      justifyContent='space-between'
      alignItems='center'
      maxW='1250px'
      mx='auto'
      mb={50}
      pt={20}
    >
      <Img src={bannerLogo} alt='' width={{ base: '100%', md: '80%', lg: '60%' }} order={0} mb={10} />

      <Box pb={10} px={{ base: '32px', xl: 0 }}>
        <Text
          as='h1'
          fontSize={{ base: 'xl5' }}
          fontWeight='extrabold'
          textAlign={{ base: 'center', lg: 'start' }}
          pb={{ base: 3, lg: 1 }}
          lineHeight={{ base: 1.3, lg: 1.4 }}
          fontFamily='"Archivo", sans-serif'
        >
          {t('banner.title')}
        </Text>
        <Text
          as='h2'
          fontSize={{ base: 'xl2' }}
          fontFamily='"Archivo", sans-serif'
          textAlign={{ base: 'center', lg: 'start' }}
          marginBottom={{ base: 10, lg: 4 }}
        >
          {t('banner.subtitle')}
          <br />
          {t('banner.subtitle1')}
        </Text>
        {isConnected && (
          <Flex gap={5} justifyContent={{ base: 'center', lg: 'start' }} alignItems='center'>
            <Button
              as={ReactRouterLink}
              to='/processes/create'
              aria-label={t('menu.new_process')}
              title={t('menu.new_process')}
            >
              <Text as='span' display='inline-block'>
                {t('banner.start_now')}
              </Text>
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}

export default Banner
