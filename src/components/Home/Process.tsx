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
    <Box
      as='section'
      width='full'
      m='0 auto'
      px={{
        base: '10px',
        sm: '20px',
        md: '40px',
      }}
      mb={{ base: '75px', lg: '100px' }}
      minH={{ base: '75vh' }}
    >
      <Text
        fontSize={{ base: '40px', xl: '46px' }}
        lineHeight={{ base: '36px', xl: '50px' }}
        fontWeight='bold'
        mb='10px'
        fontFamily='basier'
        textAlign='center'
      >
        {t('home.process.title')}
      </Text>
      <Text
        mb='80px'
        maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '1024px' }}
        mx='auto'
        textAlign='center'
        fontFamily='basier'
        fontSize='20px'
        lineHeight='28px'
      >
        {t('home.process.description_1')}
        {t('home.process.description_2')}
      </Text>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={'30px'} margin={{ base: '0px auto' }}>
        <Flex flex='1 1 40%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
          <Image src={process} borderRadius='lg' maxW={{ base: '350px', xl: '550px' }} m={{ base: '-20px auto 0px' }} />
        </Flex>
        <Flex flex='1 1' flexBasis={{ lg: '45%' }} flexDirection='column' justifyContent='space-between' gap='40px'>
          <Card variant='step' maxW={{ base: '700px' }}>
            <CardBody>
              <Box>
                <PiNumberSquareOneFill />
              </Box>
              <Box>
                <Text style={{ fontSize: '22px', marginTop: '4px', marginBottom: '6px' }}>
                  {t('home.process.step_1.title')}
                </Text>
                <Text textAlign='justify'>{t('home.process.step_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='step' maxW={{ base: '700px' }}>
            <CardBody>
              <Box>
                <PiNumberSquareTwoFill />
              </Box>
              <Box>
                <Text style={{ fontSize: '22px', marginTop: '4px', marginBottom: '6px' }}>
                  {t('home.process.step_2.title')}
                </Text>
                <Text textAlign='justify'>{t('home.process.step_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='step' maxW={{ base: '700px' }}>
            <CardBody>
              <Box>
                <PiNumberSquareThreeFill />
              </Box>
              <Box>
                <Text style={{ fontSize: '22px', marginTop: '4px', marginBottom: '6px' }}>
                  {t('home.process.step_3.title')}
                </Text>
                <Text textAlign='justify'>{t('home.process.step_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='step' maxW={{ base: '700px' }}>
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
