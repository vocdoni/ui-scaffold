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
    <Box as='section' className='site-wrapper' py={{ base: '60px', lg: '100px' }} mb={{ base: '60px', xl: '120px' }}>
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
        textAlign={{ base: 'center', lg: 'left' }}
        fontFamily='basier'
        fontSize='20px'
        opacity='0.75'
        lineHeight='28px'
        color='black'
        margin='0px auto'
      >
        {t('home.process.description_1')}
        {t('home.process.description_2')}
      </Text>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: '40px', lg: '60px' }} mt='70px'>
        <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
          <Image src={process} borderRadius='lg' maxW={{ base: '350px', xl: '550px' }} mt='-20px' />
        </Flex>
        <Flex flex='1 1' flexBasis={{ lg: '50%' }} flexDirection='column' justifyContent='space-between' gap='40px'>
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
      </Flex>
    </Box>
  )
}
export default Process
