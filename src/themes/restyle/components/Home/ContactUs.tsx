import { Box, Button, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaFingerprint } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'
import advFeature from '/assets/vocdoni.jpeg'

const ContactUs = () => {
  const { t } = useTranslation()

  return (
    <Flex
      as='section'
      id='contactus'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: 0 }}
      bgColor={{ base: '#eff1f2', lg: 'white' }}
      gap={{ base: '40px', lg: '60px' }}
      scrollMarginTop='100px'
    >
      <Flex
        justifyContent={{ base: 'center', lg: 'end' }}
        flex='1 1 50%'
        bgColor={{ lg: '#175b64' }}
        position='relative'
      >
        <Box bgColor='white' position='absolute' h='100%' w='100px' />
        <Box maxW={{ base: 'full', lg: '560px' }} px={{ base: '30px', lg: 0 }} pl={{ lg: '37px', xl3: 0 }}>
          <Image
            src={advFeature}
            w='535px'
            position='relative'
            top={{ lg: '50%' }}
            transform={{ lg: 'translateY(-50%)' }}
            borderRadius='lg'
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
          maxW={{ base: 'full', lg: '560px' }}
          px={{ base: '30px', lg: 0 }}
          pr={{ lg: '37px', xl3: 0 }}
        >
          <Box>
            <Text color='#175b64' fontWeight='bold' fontSize='20px' lineHeight='24px' mb='6px'>
              {t('home.contactus.header')}
            </Text>
            <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
              {t('home.contactus.title')}
            </Text>
          </Box>
          <Card variant='icon-card'>
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

          <Button bgColor='#24656e' w={{ base: 'full', sm: 'fit-content', lg: 'full' }} mx='auto'>
            {t('home.contactus.btn')}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ContactUs
