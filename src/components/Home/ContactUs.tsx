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
      mb={{ base: '75px', lg: '100px' }}
      gap={{ base: '40px', xl: '60px' }}
      scrollMarginTop='100px'
      minH={{ base: '60vh' }}
    >
      <Flex justifyContent={{ base: 'center' }} flex='1 1 40%' position='relative'>
        <Box maxW={{ base: 'full', xl: '660px' }} px={{ base: '30px', xl: 0 }} pl={{ xl: '37px', xl3: 0 }}>
          <Image
            src={advFeature}
            position='relative'
            top={{ xl: '50%' }}
            transform={{ xl: 'translateY(-50%)' }}
            borderRadius='xl'
            ml={{ base: '0px', xl: '50px' }}
            maxW={{ base: '350px', xl: '550px' }}
            mx='auto'
          />
        </Box>
      </Flex>
      <Flex
        flex='1 1 60%'
        justifyContent={{ base: 'center', xl: 'start' }}
        display={{ xl: 'flex' }}
        alignItems='center'
        position='relative'
        zIndex={10}
      >
        <Flex
          flexDirection='column'
          gap='30px'
          maxW={{ base: 'full', xl: '960px' }}
          px={{ base: '30px', xl: 0 }}
          pr={{ xl: '37px', xl3: 0 }}
        >
          <Box>
            <Text
              fontSize={{ base: '32px', xl: '42px' }}
              lineHeight={{ base: '36px', xl: '46px' }}
              fontWeight='bold'
              fontFamily='basier'
              textAlign={{ base: 'center', xl: 'left' }}
              marginBottom='10px'
            >
              {t('home.contactus.title')}
            </Text>
          </Box>
          <Card variant='icon-card' mt='10px'>
            <CardBody>
              <Box>
                <MdDesignServices />
              </Box>
              <Box>
                <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                  {t('home.contactus.card_1.title')}
                </Text>
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
                <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                  {t('home.contactus.card_2.title')}
                </Text>
                <Text>{t('home.contactus.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaFingerprint />
              </Box>
              <Box>
                <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                  {t('home.contactus.card_3.title')}
                </Text>
                <Text>{t('home.contactus.card_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>

          <Button
            w={{ base: 'full', sm: 'fit-content', xl: 'full' }}
            mx='auto'
            as={ReactRouterLink}
            to='mailto:info@vocdoni.org'
            colorScheme={'gradient'}
            variant={'primary'}
            aria-label={t('home.contactus.btn')}
            title={t('home.contactus.btn')}
            target='_blank'
            height='52px'
            fontSize='20px'
            mt='30px'
            px='130px'
          >
            {t('home.contactus.btn')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ContactUs
