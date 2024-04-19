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
        <Text fontSize='60px' lineHeight='100px' mb='10px' textAlign='center' fontFamily='basier'>
          {t('home.features.title')}
        </Text>
        <Text
          color='black'
          fontSize='20px'
          lineHeight='28px'
          fontFamily='basier'
          opacity='0.75'
          maxW='840px'
          margin='0px auto'
        >
          {t('home.features.subtitle_1')}
        </Text>
      </Box>

      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: '24px', xl: '65px' }}
        justifyContent='space-between'
        maxW={{ base: '100%', sm: '70%', sm2: '85%' }}
        margin='0px auto'
      >
        <Flex
          flexDirection='column'
          gap={{ base: '65px', lg: '115px' }}
          flex='1 1 30%'
          mb={{ base: '65px', sm: '30px' }}
        >
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px' maxW='56px'>
                <FaVoteYea minW='56px' h='56px' />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_1.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_1.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaPalette />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_2.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_2.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaUsers />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_3.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_3.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
        <Flex
          flexDirection='column'
          gap={{ base: '65px', lg: '115px' }}
          flex='1 1 30%'
          mb={{ base: '65px', sm: '30px' }}
        >
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaUserLock />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_4.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_4.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaTasks />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_5.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_5.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaNewspaper />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_6.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_6.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
        <Flex
          flexDirection='column'
          gap={{ base: '65px', lg: '115px' }}
          flex='1 1 30%'
          mb={{ base: '65px', sm: '30px' }}
        >
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaLanguage />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_7.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_7.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaBullseye />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_8.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_8.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' minH={{ base: '0px', lg: '250px' }}>
            <CardBody>
              <Box minW='56px' h='56px'>
                <FaCubes />
              </Box>
              <Box>
                <Text mr={2} fontSize='26px' fontFamily='basier' fontWeight='600' lineHeight='52'>
                  {t('home.features.card_9.title')}
                </Text>
                <Text fontSize='22px' mt='15px' color='#000000a1 !important'>
                  {t('home.features.card_9.description')}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Features
