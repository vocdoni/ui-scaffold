import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Faqs = () => {
  const { t } = useTranslation()

  return (
    <Box
      id='faqs'
      className='site-wrapper-full'
      py={{ base: '60px', lg: '100px' }}
      backgroundColor='white'
      mt='60px'
    >
      <img
        src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b72f92aa4f58_diagonal-violet-to-pink.svg'
        loading='lazy'
        alt=''
        class='section-home-protocol__diagonal'
        style={{ position: 'absolute', left: '-40px', marginTop: '-75px' }}
      />
      <Box className='site-wrapper'>
        <Text
          fontSize={{ base: '25px', lg: '30px', xl: '60px' }}
          lineHeight={{ base: '30px', lg: '36px', xl: '98px' }}
          fontWeight='bold'
          textAlign='center'
          mb='10px'
          fontFamily='basier'
        >
          {t('home.faqs.title')}
        </Text>
        <Text
          textAlign='left'
          color='black'
          fontSize='20px'
          lineHeight='28px'
          opacity='0.75'
          fontFamily='basier'
          maxW='840px'
          margin='0px auto 80px'
        >
          {t('home.faqs.subtitle')}
        </Text>
        <Flex flexDirection={{ base: 'column', md2: 'row' }} gap={{ base: '40px', md2: '60px' }}>
          <Box flex='1 1 50%'>
            <Card variant='faqs' mb='40px' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_1.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_1.description')}
                </Text>
              </CardBody>
            </Card>
            <Card variant='faqs' mb='40px' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_2.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_2.description')}
                </Text>
              </CardBody>
            </Card>
            <Card variant='faqs' mb='40px' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_3.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_3.description')}
                </Text>
              </CardBody>
            </Card>
            <Card
              variant='faqs'
              mb='40px'
              borderBottom={{ base: '1px solid rgb(229, 229, 229)', xl: 'none' }}
              backgroundColor='transparent'
              fontSize='22px'
            >
              <CardHeader>
                <Text>{t('home.faqs.faq_8.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_8.description')}
                </Text>
              </CardBody>
            </Card>
          </Box>
          <Box flex='1 1 50%'>
            <Card variant='faqs' mb='40px' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_4.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_4.description')}
                </Text>
              </CardBody>
            </Card>
            <Card variant='faqs' mb='40px' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_5.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_5.description')}
                </Text>
              </CardBody>
            </Card>
            <Card variant='faqs' mb='40px' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_6.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_6.description')}
                </Text>
              </CardBody>
            </Card>
            <Card variant='faqs' mb='40px' borderBottom='none' backgroundColor='transparent' fontSize='22px'>
              <CardHeader>
                <Text>{t('home.faqs.faq_7.title')}</Text>
              </CardHeader>
              <CardBody>
                <Text fontSize='19px !important' opacity='0.75'>
                  {t('home.faqs.faq_7.description')}
                </Text>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Faqs
