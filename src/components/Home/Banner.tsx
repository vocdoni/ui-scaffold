import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Banner = () => {
  const { t } = useTranslation()
  return (
    <Box
      px={{ base: 5, sm: 7, md: 8 }}
      pt='20px'
      paddingBottom='40px'
      marginTop='20'
      boxShadow='7px 6px 6px -3px rgba(0,0,0,0.37)'
      background='linear-gradient(to right, rgb(149, 38, 252), rgb(46, 211, 191))'
      marginBottom='16'
      borderRadius='12px'
      opacity='0.8'
      maxH={{ xl: '300px' }}
      maxW={{ xl: '1300px' }}
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
          fontSize='45px'
          fontWeight='900'
          color='#fff'
          textShadow='1px 2px 4px rgba(2,2,2,0.8)'
          textAlign={{ base: 'center', xl: 'start' }}
        >
          {t('banner.subtitle')}
        </Text>
      </Flex>
      <Text
        as='h3'
        color='#fff'
        fontSize='26px'
        textShadow='1px 2px 4px rgba(0,0,0,0.8)'
        textAlign={{ base: 'center', xl: 'start' }}
      >
        {t('banner.title')}
      </Text>
      <Flex
        flexDirection={{ base: 'column', sm: 'row' }}
        gap='5'
        justifyContent={{ base: 'center', xl: 'start' }}
        alignItems='center'
        marginTop='10'
      >
        <Button
          backgroundColor='#fffff5'
          border='2px solid #000'
          padding='16px 40px'
          borderRadius='12px'
          fontWeight='600'
        >
          {t('banner.know_more')}
        </Button>
        <Button
          background='linear-gradient(to left, rgb(149, 38, 252), rgb(46, 211, 191));border:2px solid #000'
          padding='16px 40px'
          borderRadius='12px'
          fontWeight='900'
        >
          {t('banner.start_now')}
        </Button>
      </Flex>
      <Image
        order={{ base: 1, md: 2 }}
        src='https://cdn3d.iconscout.com/3d/premium/thumb/cryptocurrency-wallet-5432053-4533151.png'
        alt=''
        float='right'
        transform='rotate(13deg)'
        marginTop='-280px'
        width='35%'
        display={{ base: 'none', xl: 'block' }}
      />
    </Box>
  )
}

export default Banner
