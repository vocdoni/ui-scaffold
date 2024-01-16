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
      maxW={250}
      mx='auto'
      pl={{ md: 8 }}
      mb={30}
    >
      <Img
        src={bannerLogo}
        alt=''
        width={{ base: '80%' }}
        order={{ base: 0 }}
        pt={{ base: 10 }}
      />

      <Box pt={{ base: 10 }}  pb={{ base: 10}}>
        <Text
          as='h1'
          fontSize={{ base: 'xl5' }}
          fontWeight='extrabold'
          textAlign={{ base: 'center', md: 'start' }}
          pb={{ base: 3, md: 1 }}
          lineHeight={{ md: 1.4 }}
          fontFamily='"Archivo", sans-serif'
        >
          {t('banner.title')}
        </Text>
        <Text as='h2' fontSize={{ base: 'xl2' }} fontFamily='"Archivo", sans-serif' textAlign={{ base: 'center', md: 'start' }}>
          {t('banner.subtitle')}<br />
          {t('banner.subtitle1')}
        </Text>
        {isConnected && (
          <Flex
            flexDirection={{ base: 'column', sm: 'row' }}
            gap={5}
            justifyContent={{ base: 'center', md: 'start' }}
            alignItems='center'
            marginTop={{ base: 10, md: 4 }}
          >
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
