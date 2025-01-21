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
      position={'relative'}
      flexDirection={{ base: 'column', xl: 'row' }}
      mb={{ base: '60px', lg: '100px' }}
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
            ml={{ base: '0px' }}
            maxW={{ base: '350px', xl: 'full' }}
            mx='auto'
          />
        </Box>
      </Flex>
      <Flex
        flex='1 1 50%'
        justifyContent={{ base: 'center', xl: 'start' }}
        alignItems='center'
        position='relative'
        zIndex={10}
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
            textAlign={{ base: 'center', xl: 'left' }}
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
          fontSize='20px'
          mt='30px'
          px='130px'
        >
          {t('home.contactus.btn')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default ContactUs
