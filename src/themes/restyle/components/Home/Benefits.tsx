import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()

  return (
    <Box as='section' bgColor='#eff1f2'>
      <Box className='site-wrapper' py={{ base: '60px', lg: '120px' }}>
        <Text
          fontSize={{ base: '25px', lg: '30px', xl: '40px' }}
          lineHeight={{ base: '30px', lg: '36px', xl: '48px' }}
          fontWeight='bold'
          textAlign='center'
          mb='10px'
        >
          {t('home.benefits.title')}
        </Text>
        <Text textAlign='center' color='gray'>
          {t('home.benefits.subtitle_1')}
        </Text>
        <Text textAlign='center' mb='60px' color='gray'>
          {t('home.benefits.subtitle_2')}
        </Text>
        <Flex flexWrap='wrap' justifyContent='center' maxW='1100px' mx='auto' gap={5}>
          <Card variant='benefits' bgColor='black' color='white'>
            <CardHeader>{t('home.benefits.card_1.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_1.description')}</CardBody>
          </Card>
          <Card variant='benefits'>
            <CardHeader>{t('home.benefits.card_2.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_2.description')}</CardBody>
          </Card>
          <Card
            variant='benefits'
            bgColor={{ base: 'black', benefits1: 'white', benefits2: 'black' }}
            color={{ base: 'white', benefits1: 'black', benefits2: 'white' }}
          >
            <CardHeader>{t('home.benefits.card_3.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_3.description')}</CardBody>
          </Card>
          <Card
            variant='benefits'
            bgColor={{ base: 'white', benefits1: 'black', benefits2: 'white' }}
            color={{ base: 'black', benefits1: 'white', benefits2: 'black' }}
          >
            <CardHeader>{t('home.benefits.card_4.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_4.description')}</CardBody>
          </Card>
          <Card variant='benefits' bgColor='black' color='white'>
            <CardHeader>{t('home.benefits.card_5.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_5.description')}</CardBody>
          </Card>
          <Card variant='benefits'>
            <CardHeader>{t('home.benefits.card_6.title')}</CardHeader>
            <CardBody>{t('home.benefits.card_6.description')}</CardBody>
          </Card>
        </Flex>
      </Box>
    </Box>
  )
}

export default Benefits
