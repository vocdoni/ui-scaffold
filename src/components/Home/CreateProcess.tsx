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
      m='0 auto'
      flexDirection={{ base: 'column', lg: 'row' }}
      gap={{ base: '40px', lg: '60px' }}
      mb={{ base: '60px', lg: '100px' }}
    >
      <Box flex='1 1 50%'>
        <Text
          fontSize={{ base: '48px', md: '52px', md2: '56px', lg2: '64px' }}
          lineHeight={{ base: '54px', md: '58px', md2: '64px', lg2: '78px' }}
          fontWeight='600'
          fontFamily='basier'
          mb='10px'
          mt={{ base: '20px', sm: '40px', lg: '80px' }}
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
          <Flex justifyContent={'center'}>
            <Button
              as={ReactRouterLink}
              to={Routes.auth.signIn}
              mb='20px'
              w={{ base: 'full', sm: 'fit-content', lg: 'full' }}
              mx='auto'
              height='62px'
              fontSize='20px'
              minW='300px'
            >
              {t('home.create_process.btn')}
            </Button>
          </Flex>

          <Flex
            justifyContent='center'
            alignItems={{ base: 'center', lg: 'start' }}
            flexDirection={'column'}
            gap={{ sm: 5, lg: 0 }}
          >
            <Text display='flex' alignItems='center' gap={1} ml='3' fontSize={'14px'}>
              <Box w={6}>
                <FaRegCheckCircle size={16} />
              </Box>
              {t('home.create_process.helper_1')}
            </Text>
            <Text display='flex' alignItems='center' gap={1} ml='3' mt='1' fontSize={'14px'}>
              <Box w={6}>
                <FaRegCheckCircle size={16} />
              </Box>
              {t('home.create_process.helper_2')}
            </Text>
          </Flex>
        </Box>
      </Box>
      <Box flex='1 1 50%' display={{ base: 'none', lg: 'flex' }} justifyContent='center' alignItems='center'>
        <Image src={devices} w={{ base: '535px', lg: '100%' }} mx='auto' />
      </Box>
    </Flex>
  )
}

export default CreateProcess
