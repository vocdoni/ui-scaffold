import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaPhoneVolume, FaRegCheckCircle } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'

const Support = () => {
  const { t } = useTranslation()

  return (
    <Box
      backgroundImage='url("https://assets-global.website-files.com/6398d7c1bcc2b775ebaa4f2f/6398d7c1bcc2b75c38aa4f55_Net.svg")'
      backgroundColor={'home.support.bg.light'}
      _dark={{
        bgColor: 'home.support.bg.dark',
      }}
      backgroundRepeat='no-repeat'
      backgroundPosition='right'
      mb='100px'
    >
      <Box
        width='full'
        m='0 auto'
        maxW='1920px'
        px={{
          base: '10px',
          sm: '20px',
          md: '80px',
        }}
        py={{ base: '60px', lg: '200px' }}
        position='relative'
        overflow='hidden'
      >
        <Box
          w='356px'
          h='356px'
          borderRadius='full'
          bgColor='#738A57cf'
          position='absolute'
          right='25px'
          top='-250px'
          display={{ base: 'none', lg: 'block' }}
        />
        <Box
          w='300px'
          h='300px'
          borderRadius='full'
          bgColor='#D8E1D1cf'
          position='absolute'
          left='20px'
          bottom='-250px'
          display={{ base: 'none', lg: 'block' }}
        />
        <Text
          fontSize='20px'
          lineHeight='24px'
          mb='6px'
          color='home.support.title'
          textAlign='center'
          fontWeight='bold'
        >
          {t('home.support.header')}
        </Text>
        <Text
          fontSize='60px'
          lineHeight='68px'
          mb='10px'
          color='white'
          textAlign='center'
          fontFamily='basier'
          maxW='550px'
          mx='auto'
        >
          {t('home.support.title')}
        </Text>
        <Text
          fontSize='22px'
          lineHeight='28px'
          mb='50px'
          color='white'
          textAlign='center'
          fontFamily='basier'
          fontWeight='100'
        >
          {t('home.support.subtitle')}
        </Text>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap='10px'
          mb='40px'
        >
          <Button
            as={ReactRouterLink}
            to='mailto:info@vocdoni.org'
            variant='secondary'
            aria-label={t('home.support.btn_contact')}
            title={t('home.support.btn_contact')}
            target='_blank'
            minW='280px'
            height='60px'
            mb='30px'
          >
            {t('home.support.btn_contact')}
          </Button>
          <Button
            as={ReactRouterLink}
            variant='secondary'
            to='https://calendly.com/vocdoni-app/30min'
            aria-label={t('home.support.btn_watch')}
            title={t('home.support.btn_watch')}
            target='_blank'
            minW='280px'
            mb='30px'
            height='60px'
          >
            <FaPhoneVolume size={30} />
            <Text as='span' ml='10px'>
              {t('home.support.btn_watch')}
            </Text>
          </Button>
        </Flex>
        <Flex gap='20px' flexDirection={{ base: 'column', md2: 'row' }} justifyContent='center'>
          <Flex justifyContent='center' alignItems='center' gap='2' color='home.support.helper' opacity='.8'>
            <FaRegCheckCircle />
            <Text as='span'>{t('home.support.helper_1')}</Text>
          </Flex>
          <Flex justifyContent='center' alignItems='center' gap='2' color='home.support.helper' opacity='.8'>
            <FaRegCheckCircle />
            <Text as='span'>{t('home.support.helper_2')}</Text>
          </Flex>
          <Flex justifyContent='center' alignItems='center' gap='2' color='home.support.helper' opacity='.8'>
            <FaRegCheckCircle />
            <Text as='span'>{t('home.support.helper_3')}</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Support
