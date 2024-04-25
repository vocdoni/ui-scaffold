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
      <Text fontSize='60px' lineHeight='98px' mb='10px' textAlign='center' fontFamily='basier'>
        {t('home.process.title')}
      </Text>
      <Text
        fontSize='20px'
        lineHeight='28px'
        color='black'
        textAlign='left'
        opacity='0.75'
        maxW='840px'
        margin='0px auto'
        fontFamily='basier'
      >
        {t('home.process.description_1')}
        {t('home.process.description_2')}
      </Text>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: '40px', lg: '60px' }} mt='70px'>
        <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
          <Image src={process} borderRadius='lg' w='535px' mt='-20px' />
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
