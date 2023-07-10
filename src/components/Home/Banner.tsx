import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Banner = () => {
  const { t } = useTranslation()
  return (
    <Box
      px={{ base: 5, sm: 6 }}
      pt={5}
      paddingBottom={10}
      marginTop={{ base: 0, sm: 20 }}
      boxShadow='var(--box-shadow-banner)'
      background='home.banner.bg'
      marginBottom={16}
      borderRadius='lg'
      opacity={0.8}
      maxW={{ xl: '1400px' }}
      mx='auto'
    >
      <Flex
        flexDirection='column'
        marginTop={{ base: '-30', sm: '-24', xl: 0 }}
        alignItems={{ base: 'center', xl: 'start' }}
      >
        <Image
          src='https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-wallet-5432053-4533151.png'
          alt=''
          transform='rotate(13deg)'
          width={{ base: '70%', sm: '40%', md: '30%', lg: '20%' }}
          display={{ xl: 'none' }}
        />
        <Text
          as='h1'
          fontSize='xl5'
          fontWeight='extrabold'
          color='home.banner.color'
          textShadow='1px 2px 4px rgba(2,2,2,0.8)'
          textAlign={{ base: 'center', xl: 'start' }}
        >
          {t('banner.subtitle')}
        </Text>
      </Flex>
      <Text
        as='h3'
        color='home.banner.color'
        fontSize='xl2'
        textShadow='1px 2px 4px rgba(0,0,0,0.8)'
        textAlign={{ base: 'center', xl: 'start' }}
      >
        {t('banner.title')}
      </Text>
      <Flex
        flexDirection={{ base: 'column', sm: 'row' }}
        gap={5}
        justifyContent={{ base: 'center', xl: 'start' }}
        alignItems='center'
        marginTop={10}
      >
        <Button>{t('banner.know_more')}</Button>
        <Button colorScheme='primary'>{t('banner.start_now')}</Button>
      </Flex>
      <Image
        order={{ base: 1, md: 2 }}
        src='https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-wallet-5432053-4533151.png'
        alt=''
        float='right'
        transform='rotate(13deg)'
        marginTop='-305px'
        width='35%'
        display={{ base: 'none', xl: 'block' }}
      />
    </Box>
  )
}

export default Banner
