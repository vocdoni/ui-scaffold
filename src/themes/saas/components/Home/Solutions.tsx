import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCircleCheck } from 'react-icons/fa6'
import solutions from '/assets/solutions.png'

const Solutions = () => {
  const { t } = useTranslation()
  return (
    <Flex
      id='solutions'
      as='section'
      width='full'
      m='0 auto'
      px={{
        base: '10px',
        sm: '20px',
        md: '80px',
      }}
      flexDirection={{ base: 'column', xl: 'row' }}
      py={{ base: '60px', xl: '100px' }}
      gap={{ base: '40px', xl: '60px' }}
    >
      <Flex flex='1 1 50%' justifyContent='center' alignItems='center'>
        <Flex flexDirection='column' gap='24px'>
          <Box mb='40px'>
            <Text
              fontSize={{ base: '40px', xl: '60px' }}
              lineHeight={{ base: '36px', xl: '78px' }}
              fontWeight='bold'
              mb='25px'
              fontFamily='basier'
              textAlign={{ base: 'center', xl: 'left' }}
            >
              {t('home.solutions.title')}
            </Text>
            <Text
              variant='home-description-color'
              maxW={{ base: '100%', sm: '70%', sm2: '80%', lg: '840px' }}
              textAlign={{ base: 'center', xl: 'left' }}
              mx='auto'
              fontFamily='basier'
              fontSize='20px'
            >
              {t('home.solutions.subtitle_1')}
            </Text>
          </Box>
          <Card variant='image-card' mb='50px' mt='50px'>
            <CardBody>
              <Box>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b771a2aa4f48_large-organizations-api-icon.svg' />
              </Box>
              <Box ml='30px'>
                <Text>{t('home.solutions.card_1.title')}</Text>
                <Text>{t('home.solutions.card_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='image-card' mb='50px'>
            <CardBody>
              <Box>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b73337aa4f63_services-suppliers-icon.svg' />
              </Box>
              <Box ml='20px'>
                <Text>{t('home.solutions.card_2.title')}</Text>
                <Text>{t('home.solutions.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='image-card'>
            <CardBody>
              <Box>
                <Image src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b79b4caa4f51_gov-institutions-api-icon.svg' />
              </Box>
              <Box ml='10px'>
                <Text>{t('home.solutions.card_3.title')}</Text>
                <Text>{t('home.solutions.card_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
      <Box flex='1 1 35%' position='relative'>
        <Box maxW={{ base: '250px', xl: '100%' }} mx='auto' borderRadius='xl' overflow='hidden'>
          <Image src={solutions} mx={{ xl: 'auto' }} opacity='0.6' />
        </Box>
        <Flex
          flexDirection='column'
          gap={3}
          position='absolute'
          bottom={{ base: 10, xl2: '330px' }}
          ml={{ base: '50%', xl2: '60%' }}
          transform={{
            base: 'translateX(-60%)',
            xl: 'translateX(-80%)',
            xl2: 'translateX(-100%)',
          }}
          w={{ base: '85%', sm: 'fit-content' }}
        >
          <Flex
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck size={22} />
            </Box>
            <Text as='span'> {t('home.solutions.img_card_1')}</Text>
          </Flex>
          <Flex
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck size={22} />
            </Box>

            <Text as='span'> {t('home.solutions.img_card_2')}</Text>
          </Flex>
          <Flex
            alignItems={{ base: 'start', sm: 'center' }}
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck size={22} />
            </Box>
            <Text as='span' whiteSpace={{ sm: 'nowrap' }}>
              {t('home.solutions.img_card_3')}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Solutions
