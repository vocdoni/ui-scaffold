import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { t } from 'i18next'
import { FaRegCheckCircle } from 'react-icons/fa'
import devices from '/assets/devices.jpg'

const CreateProcess = () => {
  return (
    <Flex
      as='section'
      className='site-wrapper'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: '120px' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Box flex='1 1 40%'>
        <Text
          fontSize={{ base: '30px', sm: '33px', sm2: '36px', md: '39px', md2: '42px', lg2: '48px' }}
          lineHeight={{ base: '36px', sm: '39.5px', sm2: '43px', md: '47px', md2: '50px', lg2: '58px' }}
          fontWeight='800'
          mb='10px'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          {t('home.create_process.title')}
          {/* Secure, Fast & User-Friendly Voting Solution */}
        </Text>
        <Text fontSize='20px' lineHeight='35px' color='gray' mb='30px' textAlign={{ base: 'center', lg: 'start' }}>
          {t('home.create_process.subtitle')}
          {/* Reduce the complexity, cost & time of letting your community vote & decide */}
        </Text>
        <Box maxW={{ lg: '90%' }}>
          <Button mb='20px' w={{ base: 'full', sm: 'fit-content', lg: 'full' }} mx={{ base: 'auto', lg: 'start' }}>
            {t('home.create_process.btn')}
            {/* Create Process Now */}
          </Button>
          <Flex
            justifyContent='center'
            alignItems={{ base: 'center', lg: 'start' }}
            flexDirection={{ base: 'column', sm: 'row', lg: 'column' }}
            gap={{ sm: 5, lg: 0 }}
          >
            <Text display='flex' alignItems='center' gap={1}>
              <FaRegCheckCircle color='#175CFF' />
              Free up to 1K voters
            </Text>
            <Text display='flex' alignItems='center' gap={1}>
              <FaRegCheckCircle color='#175CFF' />
              No credit card required
            </Text>
          </Flex>
        </Box>
      </Box>
      <Box flex='1 1 60%' display={{ lg: 'flex' }} justifyContent='center' alignItems='center'>
        <Image src={devices} w={{ base: '535px', lg: '100%' }} mx='auto' bgColor='white' />
      </Box>
    </Flex>
  )
}

export default CreateProcess
