import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 0, opacity: 0.5, top: '1658px' }}>
        <img
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436e8ff4a93d8291f122d65_Vector4.png'
          loading='lazy'
          alt=''
        />
        <img
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436e915e43ce706c7d17313_Vector5.png'
          loading='lazy'
          alt=''
          style={{ position: 'absolute', top: '2%', bottom: '0%', left: 'auto', right: '9%' }}
        />
      </div>

      <Box as='section' id='benefits' mt={{ base: '50px' }}>
        <Box className='site-wrapper' pb={{ base: '60px', lg: '100px' }} pt={{ base: '60px' }}>
          <Text
            fontSize={{ base: '25px', lg: '30px', xl: '60px' }}
            lineHeight={{ base: '30px', lg: '36px', xl: '78px' }}
            fontWeight='bold'
            textAlign='center'
            mb='10px'
            color='black'
            fontFamily='basier'
          >
            {t('home.benefits.title')}
          </Text>
          <Text
            mb='60px'
            maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}
            mx='auto'
            textAlign='left'
            fontFamily='basier'
            fontSize='20px'
            mt='25px'
            opacity='0.75'
          >
            {t('home.benefits.subtitle_1')}
          </Text>

          <Flex flexWrap='wrap' justifyContent='center' maxW='1240px' mx='auto' gap={10}>
            <Card variant='benefits' bgColor='home.benefits.dark_bg' color='home.benefits.dark_color'>
              <img
                src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a3e8913631fd48de5_card-feature-img-control.png'
                loading='lazy'
                sizes='(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 48vw, (max-width: 1279px) 22vw, (max-width: 1919px) 17vw, 16vw'
                srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a3e8913631fd48de5_card-feature-img-control-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a3e8913631fd48de5_card-feature-img-control.png 630w'
                alt=''
                class='slider-api-img'
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardHeader>{t('home.benefits.card_1.title')}</CardHeader>
              <CardBody>{t('home.benefits.card_1.description')}</CardBody>
            </Card>

            <Card variant='benefits' bgColor='#ffffff87' color='black'>
              <img
                src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a7812b3fd5db1d246_card-feature-img-agile.png'
                loading='lazy'
                sizes='(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 48vw, (max-width: 1279px) 22vw, (max-width: 1919px) 17vw, 16vw'
                srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a7812b3fd5db1d246_card-feature-img-agile-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a7812b3fd5db1d246_card-feature-img-agile.png 630w'
                alt=''
                class='slider-api-img'
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardHeader>{t('home.benefits.card_2.title')}</CardHeader>
              <CardBody>{t('home.benefits.card_2.description')}</CardBody>
            </Card>

            <Card
              variant='benefits'
              bgColor={{
                base: 'home.benefits.dark_bg',
                benefits1: '#ffffff87',
                benefits2: 'home.benefits.dark_bg',
              }}
              color={{
                base: 'home.benefits.dark_color',
                benefits1: '#000',
                benefits2: 'home.benefits.dark_color',
              }}
            >
              <img
                src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ae37bf52a3ec72b34_card-feature-img-privacy.png'
                loading='lazy'
                sizes='(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 48vw, (max-width: 1279px) 22vw, (max-width: 1919px) 17vw, 16vw'
                srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ae37bf52a3ec72b34_card-feature-img-privacy-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ae37bf52a3ec72b34_card-feature-img-privacy.png 631w'
                alt=''
                class='slider-api-img'
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardHeader>{t('home.benefits.card_3.title')}</CardHeader>
              <CardBody>{t('home.benefits.card_3.description')}</CardBody>
            </Card>

            <Card
              variant='benefits'
              bgColor={{
                base: '#ffffff87',
                benefits1: 'home.benefits.dark_bg',
                benefits2: '#ffffff87',
              }}
              color={{
                base: 'black',
                benefits1: 'home.benefits.dark_color',
                benefits2: 'black',
              }}
            >
              <img
                src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2fc101547d4ca362_card-feature-img-anonymous.png'
                loading='lazy'
                sizes='(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 48vw, (max-width: 1279px) 22vw, (max-width: 1919px) 17vw, 16vw'
                srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2fc101547d4ca362_card-feature-img-anonymous-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2fc101547d4ca362_card-feature-img-anonymous.png 631w'
                alt=''
                class='slider-api-img'
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardHeader>{t('home.benefits.card_4.title')}</CardHeader>
              <CardBody>{t('home.benefits.card_4.description')}</CardBody>
            </Card>

            <Card variant='benefits' bgColor='home.benefits.dark_bg' color='home.benefits.dark_color'>
              <img
                src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2c93ed6cd6d1faf0_card-feature-img-guarantee.png'
                loading='lazy'
                sizes='(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 48vw, (max-width: 1279px) 22vw, (max-width: 1919px) 17vw, 16vw'
                srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2c93ed6cd6d1faf0_card-feature-img-guarantee-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29a2c93ed6cd6d1faf0_card-feature-img-guarantee.png 630w'
                alt=''
                class='slider-api-img'
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardHeader>{t('home.benefits.card_5.title')}</CardHeader>
              <CardBody>{t('home.benefits.card_5.description')}</CardBody>
            </Card>

            <Card variant='benefits' bgColor='ffffff87' color='black'>
              <img
                src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ad60f67fa065d02bd_card-feature-img-accesible.png'
                loading='lazy'
                sizes='(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 48vw, (max-width: 1279px) 22vw, (max-width: 1919px) 17vw, 16vw'
                srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ad60f67fa065d02bd_card-feature-img-accesible-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398f29ad60f67fa065d02bd_card-feature-img-accesible.png 631w'
                alt=''
                class='slider-api-img'
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
              <CardHeader>{t('home.benefits.card_6.title')}</CardHeader>
              <CardBody>{t('home.benefits.card_6.description')}</CardBody>
            </Card>
          </Flex>
        </Box>
      </Box>

      <div
        class='vector-wrapper about'
        style={{
          position: 'absolute',
          zIndex: 0,
          opacity: 0.5,
          top: '2354px',
          right: '39px',
          transform: 'scale(-1, -1)',
        }}
      >
        <img
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436e8ff4a93d8291f122d65_Vector4.png'
          loading='lazy'
          alt=''
        />
        <img
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436e915e43ce706c7d17313_Vector5.png'
          loading='lazy'
          alt=''
          style={{ position: 'absolute', top: '6%', bottom: '0%', left: 'auto', right: '9%' }}
        />
      </div>
    </>
  )
}

export default Benefits
