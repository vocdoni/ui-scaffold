import { Box, Card, CardBody, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import {
  FaBullseye,
  FaCubes,
  FaLanguage,
  FaNewspaper,
  FaPalette,
  FaTasks,
  FaUserLock,
  FaUsers,
  FaVoteYea,
} from 'react-icons/fa'

const Features = () => {
  const { t } = useTranslation()

  return (
    <Box id='features' className='site-wrapper' py={{ base: '60px', lg: '100px' }}>
      <Box mb='80px'>
        <Text color='home.section.title' fontWeight='bold' fontSize='20px' lineHeight='24px' mb='6px'>
          {t('home.features.header')}
        </Text>
        <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
          {t('home.features.title')}
        </Text>
        <Text color='gray' fontSize='16px' lineHeight='28px'>
          {t('home.features.subtitle_1')}
        </Text>
      </Box>

      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: '24px', xl: '148px' }}
        justifyContent='space-between'
      >
        <Flex flexDirection='column' gap={{ base: '36px', xl: '60px' }} flex='1 1 30%'>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaVoteYea />
              </Box>
              <Box>
                <Text>{t('home.features.card_1.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaPalette />
              </Box>
              <Box>
                <Text>{t('home.features.card_2.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaUsers />
              </Box>
              <Box>
                <Text>{t('home.features.card_3.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
        <Flex flexDirection='column' gap={{ base: '36px', xl: '60px' }} flex='1 1 30%'>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaUserLock />
              </Box>
              <Box>
                <Text>{t('home.features.card_4.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_4.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaTasks />
              </Box>
              <Box>
                <Text>{t('home.features.card_5.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_5.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaNewspaper />
              </Box>
              <Box>
                <Text>{t('home.features.card_6.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_6.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
        <Flex flexDirection='column' gap={{ base: '36px', xl: '60px' }} flex='1 1 30%'>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaLanguage />
              </Box>
              <Box>
                <Text>{t('home.features.card_7.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_7.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaBullseye />
              </Box>
              <Box>
                <Text>{t('home.features.card_8.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_8.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box>
                <FaCubes />
              </Box>
              <Box>
                <Text>{t('home.features.card_9.title')}</Text>
                <Text textAlign='justify'>{t('home.features.card_9.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Features
