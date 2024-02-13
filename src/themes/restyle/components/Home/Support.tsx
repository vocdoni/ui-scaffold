import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaRegCheckCircle, FaPhoneVolume } from 'react-icons/fa'

const Support = () => {
  const { t } = useTranslation()

  return (
    <Box bgColor='#000111'>
      <Box className='site-wrapper' py={{ base: '60px', xl: '120px' }} position='relative' overflow='hidden'>
        <Box
          w='356px'
          h='356px'
          borderRadius='full'
          bgColor='#FFB116'
          position='absolute'
          right='25px'
          top='-250px'
          display={{ base: 'none', lg: 'block' }}
        />
        <Box
          w='300px'
          h='300px'
          borderRadius='full'
          bgColor='#071C4D'
          position='absolute'
          left='20px'
          bottom='-250px'
          display={{ base: 'none', lg: 'block' }}
        />
        <Text fontSize='20px' lineHeight='24px' mb='6px' color='#FFB116' textAlign='center' fontWeight='bold'>
          {t('home.support.header')}
        </Text>
        <Text
          fontSize='40px'
          lineHeight='48px'
          mb='10px'
          color='white'
          textAlign='center'
          fontWeight='bold'
          maxW='550px'
          mx='auto'
        >
          {t('home.support.title')}
        </Text>
        <Text fontSize='16px' lineHeight='28px' mb='50px' color='white' textAlign='center'>
          {t('home.support.subtitle')}
        </Text>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap='10px'
          mb='40px'
        >
          <Button> {t('home.support.btn_contact')}</Button>
          <Button variant='transparent' color='white'>
            <FaPhoneVolume size={30} />
            <Text as='span' ml='10px'>
              {t('home.support.btn_watch')}
            </Text>
          </Button>
        </Flex>
        <Flex gap='20px' flexDirection={{ base: 'column', md2: 'row' }} justifyContent='center'>
          <Flex justifyContent='center' alignItems='center' gap='2'>
            <FaRegCheckCircle color='#175CFF' />
            <Text as='span' color='white'>
              {t('home.support.helper_1')}
            </Text>
          </Flex>
          <Flex justifyContent='center' alignItems='center' gap='2'>
            <FaRegCheckCircle color='#175CFF' />
            <Text as='span' color='white'>
              {t('home.support.helper_2')}
            </Text>
          </Flex>
          <Flex justifyContent='center' alignItems='center' gap='2'>
            <FaRegCheckCircle color='#175CFF' />
            <Text as='span' color='white'>
              {t('home.support.helper_3')}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Support
