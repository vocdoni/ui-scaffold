import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaRegCheckCircle } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Routes } from '~src/router/routes'
import devices from '/assets/devices_vocdoni.png'

const CreateProcess = () => {
  const { t } = useTranslation()

  return (
    <Flex
      as='section'
      width='full'
      m='30px auto 20px'
      maxW='1920px'
      px={{
        base: '10px',
        sm: '20px',
        md: '80px',
      }}
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '0px', sm: '15px', md: '30px', md2: '30px', lg: '30px' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Box flex='1 1 50%'>
        <Text
          fontSize={{ base: '48px', md: '52px', md2: '56px', lg2: '64px' }}
          lineHeight={{ base: '54px', md: '58px', md2: '64px', lg2: '78px' }}
          fontWeight='600'
          fontFamily='basier'
          mb='10px'
          mt='80px'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          {t('home.create_process.title')}
        </Text>
        <Text
          fontSize='24px'
          lineHeight='35px'
          fontFamily='basier'
          mt='52px'
          mb='52px'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          {t('home.create_process.subtitle')}
        </Text>
        <Box maxW={{ lg: '90%' }}>
          <Button
            as={ReactRouterLink}
            to={Routes.auth.signIn}
            colorScheme='gradient'
            variant='primary'
            mb='20px'
            w={{ base: 'full', sm: 'fit-content', lg: 'full' }}
            mx={{ base: 'auto', lg: 'start' }}
            height='62px'
            fontSize='20px'
            minW='300px'
          >
            {t('home.create_process.btn')}
          </Button>

          <Flex
            justifyContent='center'
            alignItems={{ base: 'center', lg: 'start' }}
            flexDirection={{ base: 'column', sm: 'row', lg: 'column' }}
            gap={{ sm: 5, lg: 0 }}
          >
            <Text display='flex' alignItems='center' gap={1} ml='3'>
              <FaRegCheckCircle />
              {t('home.create_process.helper_1')}
            </Text>
            <Text display='none' alignItems='center' gap={1} ml='3' mt='1'>
              <FaRegCheckCircle />
              {t('home.create_process.helper_2')}
            </Text>
          </Flex>
        </Box>
      </Box>
      <Box flex='1 1 50%' display={{ lg: 'flex' }} justifyContent='center' alignItems='center'>
        <Image src={devices} w={{ base: '535px', lg: '100%' }} mx='auto' />
      </Box>
    </Flex>
  )
}

export default CreateProcess
