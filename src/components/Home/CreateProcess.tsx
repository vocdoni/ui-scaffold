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
      mt={{ base: '20px', lg: '40px' }}
      mb={{ base: '80px', lg: '120px' }}
      flexDirection={{ base: 'column', lg: 'row' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Box flex='1 1 50%'>
        <Text
          fontSize={{ base: '42px', md: '48px', md2: '50px', lg2: '58px' }}
          lineHeight={{ base: '48px', md: '52px', md2: '58px', lg2: '64px' }}
          fontWeight='600'
          fontFamily='basier'
          mb={'40px'}
          textAlign={{ base: 'center', lg: 'start' }}
        >
          {t('home.create_process.title')}
        </Text>
        <Text
          fontSize='24px'
          lineHeight='35px'
          fontFamily='basier'
          mb={'40px'}
          textAlign={{ base: 'center', lg: 'start' }}
        >
          {t('home.create_process.subtitle')}
        </Text>
        <Box maxW={{ lg: '90%' }}>
          <Button
            as={ReactRouterLink}
            to={Routes.auth.signUp}
            variant='solid'
            mb='20px'
            w={{ base: 'full', sm: 'fit-content', lg: 'full' }}
            mx={{ base: 'auto', lg: 'start' }}
            height='62px'
            fontSize='20px'
            minW='300px'
          >
            {t('home.create_process.btn')}
          </Button>

          <Text display='flex' alignItems='center' gap={1}>
            <Box flex={'0 0 24px'}>
              <FaRegCheckCircle />
            </Box>

            {t('home.create_process.helper_1')}
          </Text>
        </Box>
      </Box>
      <Box flex='1 1 50%' display={{ lg: 'flex' }} justifyContent='center' alignItems='center'>
        <Image src={devices} w={{ base: '535px', lg: '100%' }} mx='auto' role='none' />
      </Box>
    </Flex>
  )
}

export default CreateProcess
