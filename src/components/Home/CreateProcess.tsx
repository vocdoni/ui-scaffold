import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Routes } from '~src/router/routes'
import devices from '/assets/devices_vocdoni.png'

const CreateProcess = () => {
  const { t } = useTranslation()

  return (
    <Flex
      as='section'
      width='full'
      maxW='1920px'
      px={{
        base: '10px',
        sm: '20px',
        md: '80px',
      }}
      py={10}
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box flex='1 1 50%'>
        <Text fontSize='48px' mt='80px' textAlign={{ base: 'center', lg: 'start' }}>
          {t('home.create_process.title')}
        </Text>
        <Text fontSize='18px' my={10} textAlign={{ base: 'center', lg: 'start' }}>
          {t('home.create_process.subtitle')}
        </Text>
        <Button as={ReactRouterLink} to={Routes.auth.signIn}>
          {t('home.create_process.btn')}
        </Button>
      </Box>
      <Box flex='1 1 50%' display={{ lg: 'flex' }} justifyContent='center' alignItems='center'>
        <Image src={devices} w={{ base: '535px', lg: '100%' }} mx='auto' />
      </Box>
    </Flex>
  )
}

export default CreateProcess
