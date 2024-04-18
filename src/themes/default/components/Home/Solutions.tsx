import { Box, Card, CardBody, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaArrowsToCircle, FaCircleCheck } from 'react-icons/fa6'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdDesignServices } from 'react-icons/md'
import solutions from '/assets/solutions.png'

const Solutions = () => {
  const { t } = useTranslation()
  return (
    <Flex
      id='solutions'
      as='section'
      className='site-wrapper'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: '100px' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Flex flex='1 1 50%' justifyContent='center' alignItems='center'>
        <Flex flexDirection='column' gap='24px'>
          <Box mb='40px'>
            <Text fontSize='60px' lineHeight='68px' mb='10px' fontFamily='basier'>
              {t('home.solutions.title')}
            </Text>
            <Text color='black' fontSize='20px' lineHeight='28px' opacity='0.75'>
              {t('home.solutions.subtitle_1')}
            </Text>
          </Box>
          <Card variant='icon-card' mb='50px' ml='16px' mt='50px'>
            <CardBody>
              <Box style={{ backgroundColor: 'transparent' }}>
                <div
                  class='css-0'
                  style={{ backgroundColor: 'transparent', width: '120px', height: '120px', minWidth: '120px' }}
                >
                  <img
                    loading='lazy'
                    alt=''
                    class='api-services__icon'
                    w='120px;'
                    src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b771a2aa4f48_large-organizations-api-icon.svg'
                  />
                </div>
              </Box>
              <Box ml='30px'>
                <Text fontSize='25px' lineHeight='53px' fontFamily='basier'>
                  {t('home.solutions.card_1.title')}
                </Text>
                <Text fontSize='20px'>{t('home.solutions.card_1.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card' mb='50px'>
            <CardBody>
              <Box style={{ backgroundColor: 'transparent' }}>
                <div
                  class='css-0'
                  style={{ backgroundColor: 'transparent', width: '120px', height: '120px', minWidth: '120px' }}
                >
                  <img
                    loading='lazy'
                    alt=''
                    class='api-services__icon'
                    w='120px;'
                    src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b73337aa4f63_services-suppliers-icon.svg'
                  />
                </div>
              </Box>
              <Box ml='20px'>
                <Text fontSize='25px' lineHeight='53px' fontFamily='basier'>
                  {t('home.solutions.card_2.title')}
                </Text>
                <Text fontSize='20px'>{t('home.solutions.card_2.description')}</Text>
              </Box>
            </CardBody>
          </Card>
          <Card variant='icon-card'>
            <CardBody>
              <Box style={{ backgroundColor: 'transparent' }}>
                <div
                  class='css-0'
                  style={{ backgroundColor: 'transparent', width: '120px', height: '120px', minWidth: '120px' }}
                >
                  <img
                    loading='lazy'
                    alt=''
                    class='api-services__icon'
                    w='120px;'
                    src='https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b79b4caa4f51_gov-institutions-api-icon.svg'
                  />
                </div>
              </Box>
              <Box ml='10px'>
                <Text fontSize='25px' lineHeight='53px' fontFamily='basier'>
                  {t('home.solutions.card_3.title')}
                </Text>
                <Text fontSize='20px'>{t('home.solutions.card_3.description')}</Text>
              </Box>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
      <Box flex='1 1 35%' position='relative'>
        <Box maxW={{ base: '250px', lg: '115%', xl: '100%' }} mx='auto' borderRadius='xl' overflow='hidden'>
          <Image src={solutions} mx={{ lg: 'auto' }} opacity='0.6' />
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
