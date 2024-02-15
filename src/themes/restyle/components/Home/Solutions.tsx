import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCircleCheck, FaArrowsToCircle } from 'react-icons/fa6'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdDesignServices } from 'react-icons/md'
import solutions from '/assets/solutions.png'

const Solutions = () => {
  const { t } = useTranslation()
  return (
    <Flex
      as='section'
      className='site-wrapper'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: '100px' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Flex flex='1 1 50%' justifyContent='center' alignItems='center'>
        <Flex flexDirection='column' gap='24px'>
          <Box mb='40px'>
            <Text color='#175b64' fontWeight='bold' fontSize='20px' lineHeight='24px' mb='6px'>
              {t('home.solutions.header')}
            </Text>
            <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
              {t('home.solutions.title')}
            </Text>
            <Text color='gray' fontSize='16px' lineHeight='28px'>
              {t('home.solutions.subtitle_1')}
            </Text>
          </Box>
          <Card variant='icon-card'>
            <CardBody>
              <Box bgColor='#175b64'>
                <MdDesignServices />
              </Box>
              <Box>
                <Text>{t('home.solutions.card_1.title')}</Text>
                <Text>{t('home.solutions.card_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box bgColor='#175b64'>
                <FaArrowsToCircle />
              </Box>
              <Box>
                <Text>{t('home.solutions.card_2.title')}</Text>
                <Text>{t('home.solutions.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box bgColor='#175b64'>
                <IoSettingsSharp />
              </Box>
              <Box>
                <Text>{t('home.solutions.card_3.title')}</Text>
                <Text>{t('home.solutions.card_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
      <Box flex='1 1 50%' position='relative'>
        <Box maxW={{ base: '250px', lg: '115%', xl: '100%' }} mx='auto' borderRadius='xl' overflow='hidden'>
          <Image src={solutions} mx={{ lg: 'auto' }} />
        </Box>
        <Flex
          flexDirection='column'
          gap={3}
          position='absolute'
          bottom={{ base: 10, lg2: '100px' }}
          ml='50%'
          transform={{
            base: 'translateX(-60%)',
            lg: 'translateX(-80%)',
            lg2: 'translateX(-90%)',
            xl: 'translateX(-100%)',
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
              <FaCircleCheck color='#000' size={22} />
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
              <FaCircleCheck color='#000' size={22} />
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
              <FaCircleCheck color='#000' size={22} />
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
