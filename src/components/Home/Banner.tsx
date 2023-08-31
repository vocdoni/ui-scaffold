import { Box, Flex, Img, Link, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import bannerLogo from '/assets/banner.png'

const Banner = () => {
  const { t } = useTranslation()
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      alignItems='center'
      maxW={250}
      mx='auto'
      pl={{ md: 8 }}
      mb={20}
    >
      <Img
        src={bannerLogo}
        alt=''
        width={{ base: '50%', sm: '40%', md: '300px', md2: '320px', lg: '350px', xl: '400px' }}
        order={{ base: 0, md: 1 }}
      />

      <Box pt={{ base: 5 }} px={{ sm: 10, md: 0 }}>
        <Text
          as='h1'
          fontSize={{ base: 'xl3', sm: 'xl4', md: 'xl3' }}
          fontWeight='extrabold'
          textAlign={{ base: 'center', md: 'start' }}
          pb={{ base: 3, md: 1 }}
          width={{ md: '420px' }}
          lineHeight={{ md: 1.4 }}
        >
          {t('banner.title')}
        </Text>
        <Text as='h2' fontSize={{ base: 'xl', md: 'lg' }} textAlign={{ base: 'center', md: 'start' }}>
          {t('banner.subtitle')}
        </Text>
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
            variant='rounded'
            colorScheme='primary'
            aria-label={t('menu.new_process')}
            title={t('menu.new_process')}
          >
            <Text as='span' display={{ base: 'none', sm: 'inline-block' }}>
              {t('banner.start_now')}
            </Text>
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Banner
