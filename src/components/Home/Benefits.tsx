import { Box, Card, CardBody, CardHeader, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()

  return (
    <>
      <Box position='relative'>
        <Box as='section' id='benefits' mt='160px'>
          <Box
            width='full'
            mx='auto'
            maxW='1920px'
            px={{
              base: '10px',
              sm: '20px',
              md: '80px',
            }}
            mb={{ base: '55px', lg: '70px' }}
          >
            <Text
              fontSize={{ base: '40px', xl: '46px' }}
              lineHeight={{ base: '36px', xl: '50px' }}
              fontWeight='bold'
              textAlign='center'
              mb={'10px'}
              fontFamily='basier'
            >
              {t('home.benefits.title')}
            </Text>
            <Text
              mb={'60px'}
              maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '1024px' }}
              mx='auto'
              textAlign='center'
              fontFamily='basier'
              fontSize='20px'
              lineHeight='28px'
            >
              {t('home.benefits.subtitle_1')}
            </Text>

            <Flex flexWrap='wrap' justifyContent='center' maxW='1240px' mx='auto' gap={'30px'}>
              <Card variant='benefits'>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a3e8913631fd48de5_card-feature-img-control.png' />
                <CardHeader>{t('home.benefits.card_1.title')}</CardHeader>
                <CardBody>{t('home.benefits.card_1.description')}</CardBody>
              </Card>

              <Card variant='benefits'>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a7812b3fd5db1d246_card-feature-img-agile.png' />
                <CardHeader>{t('home.benefits.card_2.title')}</CardHeader>
                <CardBody>{t('home.benefits.card_2.description')}</CardBody>
              </Card>

              <Card variant='benefits'>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ae37bf52a3ec72b34_card-feature-img-privacy.png' />
                <CardHeader>{t('home.benefits.card_3.title')}</CardHeader>
                <CardBody>{t('home.benefits.card_3.description')}</CardBody>
              </Card>

              <Card variant='benefits'>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2fc101547d4ca362_card-feature-img-anonymous.png' />
                <CardHeader>{t('home.benefits.card_4.title')}</CardHeader>
                <CardBody>{t('home.benefits.card_4.description')}</CardBody>
              </Card>

              <Card variant='benefits'>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2c93ed6cd6d1faf0_card-feature-img-guarantee.png' />
                <CardHeader>{t('home.benefits.card_5.title')}</CardHeader>
                <CardBody>{t('home.benefits.card_5.description')}</CardBody>
              </Card>

              <Card variant='benefits'>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ad60f67fa065d02bd_card-feature-img-accesible.png' />
                <CardHeader>{t('home.benefits.card_6.title')}</CardHeader>
                <CardBody>{t('home.benefits.card_6.description')}</CardBody>
              </Card>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Benefits
