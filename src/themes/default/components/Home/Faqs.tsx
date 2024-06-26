import { Box, Card, CardBody, CardHeader, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Faqs = () => {
  const { t } = useTranslation()

  return (
    <Box
      id='faqs'
      position='relative'
      className='site-wrapper-full'
      py={{ base: '60px', lg: '100px' }}
      backgroundColor='white'
    >
      <Image
        src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b72f92aa4f58_diagonal-violet-to-pink.svg'
        position='absolute'
        left='-40px'
        mt='-75px'
        width='300px'
        display={{ base: 'none', xl: 'block' }}
      />
      <Box className='site-wrapper' position='relative' zIndex={10}>
        <Text
          fontSize={{ base: '40px', xl: '60px' }}
          lineHeight={{ base: '36px', xl: '78px' }}
          fontWeight='bold'
          textAlign='center'
          mb='25px'
          fontFamily='basier'
        >
          {t('home.faqs.title')}
        </Text>
        <Text
          mb='60px'
          maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}
          mx='auto'
          fontFamily='basier'
          fontSize='20px'
          color='home.description'
          lineHeight='28px'
          margin='0px auto 80px'
          textAlign='center'
        >
          {t('home.faqs.subtitle')}
        </Text>
        <Flex flexWrap='wrap' gap={10}>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px'>
            <CardHeader>
              <Text>{t('home.faqs.faq_1.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_1.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px'>
            <CardHeader>
              <Text>{t('home.faqs.faq_2.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_2.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px'>
            <CardHeader>
              <Text>{t('home.faqs.faq_3.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_3.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px'>
            <CardHeader>
              <Text>{t('home.faqs.faq_8.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_8.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px'>
            <CardHeader>
              <Text>{t('home.faqs.faq_4.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_4.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px'>
            <CardHeader>
              <Text>{t('home.faqs.faq_5.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_5.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px' border={{ xl: 'none' }}>
            <CardHeader>
              <Text>{t('home.faqs.faq_6.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_6.description')}
              </Text>
            </CardBody>
          </Card>
          <Card variant='faqs' flex={{ base: '1 1 100%', xl: '1 1 45%' }} mb='30px' border='none'>
            <CardHeader>
              <Text>{t('home.faqs.faq_7.title')}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='19px !important' opacity='0.75'>
                {t('home.faqs.faq_7.description')}
              </Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </Box>
  )
}

export default Faqs
