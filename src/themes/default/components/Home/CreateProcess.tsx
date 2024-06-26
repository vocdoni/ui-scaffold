import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { FaRegCheckCircle } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import devices from '/assets/devices_vocdoni.png'

const CreateProcess = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <Flex
      as='section'
      className='site-wrapper'
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
          color='home.description'
          mt='52px'
          mb='52px'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          {t('home.create_process.subtitle')}
        </Text>
        <Box maxW={{ lg: '90%' }}>
          {isConnected && (
            <Button
              mb='20px'
              w={{ base: 'full', sm: 'fit-content', lg: 'full' }}
              mx={{ base: 'auto', lg: 'start' }}
              as={ReactRouterLink}
              to='/processes/create'
              minW='300px'
            >
              {t('home.create_process.btn')}
            </Button>
          )}

          {!isConnected && (
            <Button
              mb='20px'
              w={{ base: 'full', sm: 'fit-content', lg: 'full' }}
              mx={{ base: 'auto', lg: 'start' }}
              height='62px'
              fontSize='20px'
              minW='300px'
              onClick={() => {
                if (openConnectModal) openConnectModal()
              }}
            >
              {t('home.create_process.btn')}
            </Button>
          )}

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
