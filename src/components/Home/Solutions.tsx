import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCircleCheck } from 'react-icons/fa6'
import solutions from '/assets/solutions.png'

const Solutions = () => {
  const { t } = useTranslation()

  return (
    <Box as='section' width='full' m='0 auto' mb={{ base: '100px', lg: '200px' }} minH={{ base: '75vh' }}>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ lg: '60px', xl: '120px' }}
        margin={{ base: '0px auto' }}
      >
        <Box flex='1 1' flexBasis={{ lg: '45%' }} order={{ base: 2, lg: 1 }}>
          <Box>
            <Text
              fontSize={{ base: '40px', xl: '46px' }}
              lineHeight={{ base: '36px', xl: '50px' }}
              fontWeight='bold'
              mb={'30px'}
              fontFamily='basier'
              textAlign={{ base: 'center', lg: 'start' }}
            >
              {t('home.solutions.title')}
            </Text>
            <Text
              textAlign={{ base: 'center', lg: 'start' }}
              fontFamily='basier'
              fontSize='20px'
              lineHeight='28px'
              mb={'60px'}
            >
              {t('home.solutions.subtitle_1')}
            </Text>
          </Box>
          <Flex flexDirection='column' gap={{ base: '45px', lg: '30px' }}>
            <Card variant='image-card'>
              <CardBody>
                <Box>
                  <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b771a2aa4f48_large-organizations-api-icon.svg' />
                </Box>
                <Box>
                  <Text>{t('home.solutions.card_1.title')}</Text>
                  <Text fontSize='20px'>{t('home.solutions.card_1.description')}</Text>
                </Box>
              </CardBody>
            </Card>
            <Card variant='image-card'>
              <CardBody>
                <Box>
                  <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b73337aa4f63_services-suppliers-icon.svg' />
                </Box>
                <Box>
                  <Text>{t('home.solutions.card_2.title')}</Text>
                  <Text fontSize='20px'>{t('home.solutions.card_2.description')}</Text>
                </Box>
              </CardBody>
            </Card>
            <Card variant='image-card'>
              <CardBody>
                <Box>
                  <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b79b4caa4f51_gov-institutions-api-icon.svg' />
                </Box>
                <Box>
                  <Text>{t('home.solutions.card_3.title')}</Text>
                  <Text fontSize='20px'>{t('home.solutions.card_3.description')}</Text>
                </Box>
              </CardBody>
            </Card>
          </Flex>
        </Box>
        <Flex
          flex='1 1 40%'
          justifyContent={{ base: 'center', lg: 'start' }}
          alignItems='center'
          order={{ base: 1, lg: 2 }}
          mb={{ base: '100px', lg: 0 }}
        >
          <Image src={solutions} borderRadius='lg' maxW={{ base: '250px', xl: '550px' }} />
        </Flex>
      </Flex>
    </Box>
  )
}
export default Solutions

export const Aaa = () => {
  const { t } = useTranslation()
  return (
    <Flex
      id='solutions'
      as='section'
      mx='auto'
      flexDirection={{ base: 'column', lg: 'row' }}
      gap={{ base: '75px', lg: '60px' }}
      mb={{ base: '100px', lg: '120px' }}
    >
      <Flex
        flex={{ base: '1 1 50%', xl: '1 1 70%' }}
        justifyContent='center'
        alignItems='center'
        order={{ base: 2, lg: 1 }}
      >
        <Flex flexDirection='column' gap='24px'>
          <Box>
            <Text
              fontSize={{ base: '32px', lg: '42px' }}
              lineHeight={{ base: '36px', lg: '46px' }}
              fontWeight='bold'
              mb='30px'
              fontFamily='basier'
              textAlign={{ base: 'center', lg: 'left' }}
            >
              {t('home.solutions.title')}
            </Text>
            <Text
              maxW='90%'
              mx={{ base: 'auto', lg: 'initial' }}
              textAlign={{ base: 'center', lg: 'start' }}
              mb={{ base: '30px', lg: '45px' }}
              fontFamily='basier'
              fontSize='20px'
            >
              {t('home.solutions.subtitle_1')}
            </Text>
          </Box>
          <Card variant='image-card' mb={{ base: '45px', lg: '30px' }}>
            <CardBody>
              <Box>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b771a2aa4f48_large-organizations-api-icon.svg' />
              </Box>
              <Box>
                <Text>{t('home.solutions.card_1.title')}</Text>
                <Text fontSize='20px'>{t('home.solutions.card_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='image-card' mb={{ base: '45px', lg: '30px' }}>
            <CardBody>
              <Box>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b73337aa4f63_services-suppliers-icon.svg' />
              </Box>
              <Box>
                <Text>{t('home.solutions.card_2.title')}</Text>
                <Text fontSize='20px'>{t('home.solutions.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='image-card'>
            <CardBody>
              <Box>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b79b4caa4f51_gov-institutions-api-icon.svg' />
              </Box>
              <Box>
                <Text>{t('home.solutions.card_3.title')}</Text>
                <Text fontSize='20px'>{t('home.solutions.card_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
      <Box flex={{ base: '1 20%', xl: '1 1 35%' }} position='relative' order={{ base: 1, lg: 2 }}>
        <Box maxW={{ base: '250px', lg: '100%' }} mx='auto' borderRadius='xl' overflow='hidden'>
          <Image src={solutions} mx={{ lg: 'auto' }} opacity='0.6' />
        </Box>
        <Flex
          flexDirection='column'
          gap={3}
          // position='absolute'
          // bottom={{ base: 10, lg: '160px', xl2: '230px' }}
          ml={{ base: '55%', xl2: '60%' }}
          // transform={{
          //   base: 'translateX(-60%)',
          //   lg: 'translateX(-80%)',
          //   xl2: 'translateX(-100%)',
          // }}
          // w={{ base: '85%', sm: 'fit-content' }}
        >
          <Card variant='solutions'>
            <FaCircleCheck size={22} />
            <Text as='span'> {t('home.solutions.img_card_1')}</Text>
          </Card>
          <Card variant='solutions'>
            <FaCircleCheck size={22} />
            <Text as='span'> {t('home.solutions.img_card_2')}</Text>
          </Card>
          <Card variant='solutions'>
            <FaCircleCheck size={22} />
            <Text as='span' whiteSpace={{ sm: 'nowrap' }}>
              {t('home.solutions.img_card_3')}
            </Text>
          </Card>
        </Flex>
      </Box>
    </Flex>
  )
}
