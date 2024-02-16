import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()

  return (
    <Box as='section' id='benefits' bgColor='#eff1f2'>
      <Box className='site-wrapper' py={{ base: '60px', lg: '100px' }}>
        <Text
          fontSize={{ base: '25px', lg: '30px', xl: '40px' }}
          lineHeight={{ base: '30px', lg: '36px', xl: '48px' }}
          fontWeight='bold'
          textAlign='center'
          mb='10px'
        >
          {t('home.benefits.title')}
        </Text>
        <Text
          color='gray'
          mb='60px'
          maxW={{ base: '100%', sm: '70%', sm2: '60%', lg: '840px' }}
          mx='auto'
          textAlign='justify'
        >
          {t('home.benefits.subtitle_1')}
        </Text>
        <Flex flexWrap='wrap' justifyContent='center' maxW='1100px' mx='auto' gap={5}>
          <Card variant='benefits' bgColor='home.benefits.dark_bg' color='home.benefits.dark_color'>
            <CardHeader>{t('home.benefits.card_1.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_1.description')}</CardBody>
          </Card>
          <Card variant='benefits' bgColor='home.benefits.light_bg' color='home.benefits.light_color'>
            <CardHeader>{t('home.benefits.card_2.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_2.description')}</CardBody>
          </Card>
          <Card
            variant='benefits'
            bgColor={{
              base: 'home.benefits.dark_bg',
              benefits1: 'home.benefits.light_bg',
              benefits2: 'home.benefits.dark_bg',
            }}
            color={{
              base: 'home.benefits.dark_color',
              benefits1: 'home.benefits.light_color',
              benefits2: 'home.benefits.dark_color',
            }}
          >
            <CardHeader>{t('home.benefits.card_3.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_3.description')}</CardBody>
          </Card>
          <Card
            variant='benefits'
            bgColor={{
              base: 'home.benefits.light_bg',
              benefits1: 'home.benefits.dark_bg',
              benefits2: 'home.benefits.light_bg',
            }}
            color={{
              base: 'home.benefits.lighy_color',
              benefits1: 'home.benefits.dark_color',
              benefits2: 'home.benefits.light_color',
            }}
          >
            <CardHeader>{t('home.benefits.card_4.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_4.description')}</CardBody>
          </Card>
          <Card variant='benefits' bgColor='home.benefits.dark_bg' color='home.benefits.dark_color'>
            <CardHeader>{t('home.benefits.card_5.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_5.description')}</CardBody>
          </Card>
          <Card variant='benefits' bgColor='home.benefits.light_bg' color='home.benefits.light_color'>
            <CardHeader>{t('home.benefits.card_6.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_6.description')}</CardBody>
          </Card>
        </Flex>
      </Box>
    </Box>
  )
}

export default Benefits
