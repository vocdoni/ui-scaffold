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
      <Box mb='80px' margin='-20px auto 125px' maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}>
        <Text
          fontSize={{ base: '40px', xl: '60px' }}
          lineHeight={{ base: '36px', xl: '78px' }}
          fontWeight='bold'
          textAlign='center'
          mb='25px'
          fontFamily='basier'
        >
          {t('home.features.title')}
        </Text>
        <Text
          mb='60px'
          maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}
          mx='auto'
          textAlign={{ base: 'center', lg: 'left' }}
          fontFamily='basier'
          fontSize='20px'
          opacity='0.75'
          margin='0px auto'
        >
          {t('home.features.subtitle_1')}
        </Text>
      </Box>

      <Flex maxW={{ base: '100%', sm: '70%', sm2: '85%' }} margin='0px auto' flexWrap='wrap' gap={10}>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaVoteYea min='56px' />
            </Box>
            <Box>
              <Text>{t('home.features.card_1.title')}</Text>
              <Text>{t('home.features.card_1.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaPalette />
            </Box>
            <Box>
              <Text>{t('home.features.card_2.title')}</Text>
              <Text>{t('home.features.card_2.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaUsers />
            </Box>
            <Box>
              <Text>{t('home.features.card_3.title')}</Text>
              <Text>{t('home.features.card_3.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaUserLock />
            </Box>
            <Box>
              <Text>{t('home.features.card_4.title')}</Text>
              <Text>{t('home.features.card_4.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaTasks />
            </Box>
            <Box>
              <Text>{t('home.features.card_5.title')}</Text>
              <Text>{t('home.features.card_5.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaNewspaper />
            </Box>
            <Box>
              <Text>{t('home.features.card_6.title')}</Text>
              <Text>{t('home.features.card_6.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaLanguage />
            </Box>
            <Box>
              <Text>{t('home.features.card_7.title')}</Text>
              <Text>{t('home.features.card_7.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaBullseye />
            </Box>
            <Box>
              <Text>{t('home.features.card_8.title')}</Text>
              <Text>{t('home.features.card_8.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} mb='60px'>
          <CardBody>
            <Box>
              <FaCubes />
            </Box>
            <Box>
              <Text>{t('home.features.card_9.title')}</Text>
              <Text>{t('home.features.card_9.description')}</Text>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  )
}

export default Features
