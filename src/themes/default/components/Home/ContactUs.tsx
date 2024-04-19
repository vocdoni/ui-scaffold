import { Box, Button, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaFingerprint } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'
import advFeature from '/assets/vocdoni.jpeg'
import { Link as ReactRouterLink } from 'react-router-dom'

const ContactUs = () => {
  const { t } = useTranslation()

  return (
    <Flex
      as='section'
      id='contactus'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: 0 }}
      bgColor={{ base: 'home.section.bg', lg: 'transparent' }}
      gap={{ base: '40px', lg: '60px' }}
      scrollMarginTop='100px'
    >
      <Flex justifyContent={{ base: 'center' }} flex='1 1 50%' position='relative'>
        <Box maxW={{ base: 'full', lg: '660px' }} px={{ base: '30px', lg: 0 }} pl={{ lg: '37px', xl3: 0 }}>
          <Image
            src={advFeature}
            position='relative'
            top={{ lg: '50%' }}
            transform={{ lg: 'translateY(-50%)' }}
            borderRadius='lg'
            ml={{ base: '0px', lg: '50px' }}
            maxW='550px'
          />
        </Box>
      </Flex>
      <Flex
        flex='1 1 50%'
        justifyContent={{ base: 'center', lg: 'start' }}
        display={{ lg: 'flex' }}
        alignItems='center'
        py={{ base: '60px', lg: '100px' }}
      >
        <Flex
          flexDirection='column'
          gap='24px'
          maxW={{ base: 'full', lg: '660px' }}
          px={{ base: '30px', lg: 0 }}
          pr={{ lg: '37px', xl3: 0 }}
        >
          <Box>
            <Text fontSize='60' lineHeight='68px' mb='10px' fontFamily='basier'>
              {t('home.contactus.title')}
            </Text>
          </Box>
          <Card variant='icon-card' mt='30px' mb='20px'>
            <CardBody>
              <Box>
                <MdDesignServices />
              </Box>
              <Box fontSize='22px'>
                <Text>{t('home.contactus.card_1.title')}</Text>
                <Text>{t('home.contactus.card_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaFingerprint />
              </Box>
              <Box fontSize='22px'>
                <Text> {t('home.contactus.card_2.title')}</Text>
                <Text>{t('home.contactus.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>

          <Button
            w={{ base: 'full', sm: 'fit-content', lg: 'full' }}
            mx='auto'
            as={ReactRouterLink}
            to='mailto:info@vocdoni.org'
            aria-label={t('home.contactus.btn')}
            title={t('home.contactus.btn')}
            target='_blank'
            height='52px'
            textDecoration='underline'
            fontSize='20px'
            mt='30px'
          >
            {t('home.contactus.btn')}
          </Button>
        </Flex>
      </Flex>

      <div
        class='vector-wrapper origins'
        style={{ width: '500px', position: 'relative', float: 'right', marginLeft: '-500px', top: '10px' }}
        display={{ sm: 'none', lg: 'block' }}
      >
        <img
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436edfde50ddf8203cfef89_Vector-builders1.png'
          loading='lazy'
          sizes='100vw'
          srcset='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436edfde50ddf8203cfef89_Vector-builders1-p-500.png 500w, https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436edfde50ddf8203cfef89_Vector-builders1.png 528w'
          alt=''
          class='origin-vector-1'
        />
        <img
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436edf13d923ae2692920a9_Vector-builders2.png'
          loading='lazy'
          alt=''
          class='origin-vector-2'
          style={{ position: 'relative', marginTop: '-300px' }}
        />
      </div>
    </Flex>
  )
}

export default ContactUs
