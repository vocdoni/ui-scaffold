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
    <Box
      id='features'
      width='full'
      m='50px auto 0px'
      maxW='1920px'
      px={{
        base: '10px',
        sm: '20px',
        md: '80px',
      }}
      mb={{ base: '75px', lg: '100px' }}
    >
      <Box mx='auto' maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '1600px' }}>
        <Text
          fontSize={{ base: '32px', xl: '42px' }}
          lineHeight={{ base: '36px', xl: '46px' }}
          fontWeight='bold'
          textAlign='center'
          mb={'10px'}
          fontFamily='basier'
          mt={{ base: '50px', sm2: '180px' }}
        >
          {t('home.features.title')}
        </Text>
        <Text
          maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '1024px' }}
          mx='auto'
          mb={'60px'}
          textAlign='center'
          fontFamily='basier'
          fontSize='20px'
          lineHeight='28px'
        >
          {t('home.features.subtitle_1')}
        </Text>
      </Box>

      <Flex maxW={{ base: '100%', sm: '70%', sm2: '1600px' }} margin='0px auto' flexWrap='wrap' gap={'30px'}>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaVoteYea />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_1.title')}
              </Text>
              <Text>{t('home.features.card_1.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaPalette />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_2.title')}
              </Text>
              <Text>{t('home.features.card_2.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaUsers />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_3.title')}
              </Text>
              <Text>{t('home.features.card_3.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaUserLock />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_4.title')}
              </Text>
              <Text>{t('home.features.card_4.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaTasks />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_5.title')}
              </Text>
              <Text>{t('home.features.card_5.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaNewspaper />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_6.title')}
              </Text>
              <Text>{t('home.features.card_6.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaLanguage />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_7.title')}
              </Text>
              <Text>{t('home.features.card_7.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaBullseye />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_8.title')}
              </Text>
              <Text>{t('home.features.card_8.description')}</Text>
            </Box>
          </CardBody>
        </Card>
        <Card variant='icon-card' flex={{ base: '1 0 100%', lg: '1 1 30%' }} margin='30px auto'>
          <CardBody>
            <Box>
              <FaCubes />
            </Box>
            <Box>
              <Text style={{ fontSize: '22px', marginTop: '6px', marginBottom: '6px' }}>
                {t('home.features.card_9.title')}
              </Text>
              <Text>{t('home.features.card_9.description')}</Text>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  )
}

export default Features
