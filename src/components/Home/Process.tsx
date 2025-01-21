import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {
  PiNumberSquareFourFill,
  PiNumberSquareOneFill,
  PiNumberSquareThreeFill,
  PiNumberSquareTwoFill,
} from 'react-icons/pi'
import process from '/assets/vocdoni_usage.jpg'

const Process = () => {
  const { t } = useTranslation()

  return (
    <Box as='section' width='full' m='0 auto' mb={{ base: '60px', lg: '140px' }}>
      <Text
        fontSize={{ base: '40px', xl: '60px' }}
        lineHeight={{ base: '36px', xl: '78px' }}
        fontWeight='bold'
        mb='25px'
        fontFamily='basier'
        textAlign='center'
      >
        {t('home.process.title')}
      </Text>
      <Text
        mb='60px'
        maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}
        mx='auto'
        textAlign='center'
        fontFamily='basier'
        fontSize='20px'
        lineHeight='28px'
        margin='0px auto'
      >
        {t('home.process.description_1')} {t('home.process.description_2')}
      </Text>
      <Flex
        position={'relative'}
        flexDirection={{ base: 'column', xl: 'row' }}
        gap={{ base: '40px', xl: '60px' }}
        mt={'60px'}
      >
        <Flex
          flex='1 1 50%'
          justifyContent={{ base: 'center', xl: 'start' }}
          alignItems='center'
          position='relative'
          zIndex={10}
          flexDirection='column'
          gap='24px'
          px={{ base: '30px', xl: 0 }}
          pr={{ xl: '37px', xl3: 0 }}
        >
          <Card variant='step'>
            <CardBody>
              <Box>
                <PiNumberSquareOneFill />
              </Box>
              <Box>
                <Text>{t('home.process.step_1.title')}</Text>
                <Text textAlign='justify'>{t('home.process.step_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='step'>
            <CardBody>
              <Box>
                <PiNumberSquareTwoFill />
              </Box>
              <Box>
                <Text>{t('home.process.step_2.title')}</Text>
                <Text textAlign='justify'>{t('home.process.step_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='step'>
            <CardBody>
              <Box>
                <PiNumberSquareThreeFill />
              </Box>
              <Box>
                <Text>{t('home.process.step_3.title')}</Text>
                <Text textAlign='justify'>{t('home.process.step_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='step'>
            <CardBody>
              <Box>
                <PiNumberSquareFourFill color='#fff' />
              </Box>
              <Box>
                <Text>{t('home.process.step_4.title')}</Text>
                <Text textAlign='justify'>{t('home.process.step_4.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
        <Flex justifyContent={{ base: 'center' }} flex='1 1 50%' position='relative'>
          <Box maxW={{ base: 'full', xl: '660px' }} px={{ base: '30px', xl: 0 }} pl={{ xl: '37px', xl3: 0 }}>
            <Image
              src={process}
              position='relative'
              top={{ xl: '50%' }}
              transform={{ xl: 'translateY(-50%)' }}
              borderRadius='xl'
              ml={{ base: '0px' }}
              mx='auto'
              w='full'
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Process
