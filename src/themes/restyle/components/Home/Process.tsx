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
    <Box as='section' className='site-wrapper' py={{ base: '60px', lg: '100px' }}>
      <Text color='home.section.title' fontWeight='bold' mb='6px' textAlign='center' fontSize='20px' lineHeight='24px'>
        {t('home.process.header')}
      </Text>
      <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px' textAlign='center'>
        {t('home.process.title')}
      </Text>
      <Text fontSize='16px' lineHeight='28px' color='gray' textAlign='center'>
        {t('home.process.description_1')}
      </Text>
      <Text fontSize='16px' lineHeight='28px' color='gray' mb='60px' textAlign='center'>
        {t('home.process.description_2')}
      </Text>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: '40px', lg: '60px' }}>
        <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
          <Image src={process} borderRadius='lg' w='535px' />
        </Flex>
        <Flex flex='1 1' flexBasis={{ lg: '50%' }} flexDirection='column' justifyContent='space-between' gap='40px'>
          <Card variant='step'>
            <CardBody>
              <Box>
                <PiNumberSquareOneFill />
              </Box>
              <Box>
                <Text>{t('home.process.step_1.title')}</Text>
                <Text>{t('home.process.step_1.description')}</Text>
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
                <Text>{t('home.process.step_2.description')}</Text>
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
                <Text>{t('home.process.step_3.description')}</Text>
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
                <Text>{t('home.process.step_4.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Process
