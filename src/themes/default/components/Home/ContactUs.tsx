import { Box, Button, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaFingerprint } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'
import { Link as ReactRouterLink } from 'react-router-dom'
import advFeature from '/assets/vocdoni.jpeg'

const ContactUs = () => {
  const { t } = useTranslation()

  return (
    <Flex
      as='section'
      id='contactus'
      flexDirection={{ base: 'column', xl: 'row' }}
      py={{ base: '60px', xl: 0 }}
      gap={{ base: '40px', xl: '60px' }}
      scrollMarginTop='100px'
    >
      <Flex justifyContent={{ base: 'center' }} flex='1 1 50%' position='relative'>
        <Box maxW={{ base: 'full', xl: '660px' }} px={{ base: '30px', xl: 0 }} pl={{ xl: '37px', xl3: 0 }}>
          <Image
            src={advFeature}
            position='relative'
            top={{ xl: '50%' }}
            transform={{ xl: 'translateY(-50%)' }}
            borderRadius='xl'
            ml={{ base: '0px', xl: '50px' }}
            maxW={{ base: '350px', xl: '550px' }}
          />
        </Box>
      </Flex>
      <Flex
        flex='1 1 50%'
        justifyContent={{ base: 'center', xl: 'start' }}
        display={{ xl: 'flex' }}
        alignItems='center'
        py={{ base: '60px', xl: '100px' }}
        position='relative'
        zIndex={10}
      >
        <Flex
          flexDirection='column'
          gap='24px'
          maxW={{ base: 'full', xl: '660px' }}
          px={{ base: '30px', xl: 0 }}
          pr={{ xl: '37px', xl3: 0 }}
        >
          <Box>
            <Text
              fontSize={{ base: '40px', xl: '60px' }}
              lineHeight={{ base: '36px', xl: '78px' }}
              fontWeight='bold'
              mb='10px'
              fontFamily='basier'
            >
              {t('home.contactus.title')}
            </Text>
          </Box>
          <Card variant='icon-card' mt='30px' mb='20px'>
            <CardBody>
              <Box>
                <MdDesignServices />
              </Box>
              <Box>
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
              <Box>
                <Text> {t('home.contactus.card_2.title')}</Text>
                <Text>{t('home.contactus.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>

          <Button
            w={{ base: 'full', sm: 'fit-content', xl: 'full' }}
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
            px='130px'
          >
            {t('home.contactus.btn')}
          </Button>
        </Flex>
      </Flex>

      <Box
        position='relative'
        display={{ base: 'none', xl: 'block' }}
        w='500px'
        float='right'
        marginLeft='-500px'
        top='10px'
      >
        <Image
          w='100vw'
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436edfde50ddf8203cfef89_Vector-builders1.png'
        />
        <Image
          position='relative'
          mt='-300px'
          src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6436edf13d923ae2692920a9_Vector-builders2.png'
        />
      </Box>
    </Flex>
  )
}

export default ContactUs
