import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaRegCheckCircle, FaRegPlayCircle } from 'react-icons/fa'

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
          Let's Try! Get Free Support
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
          Start giving voice to your comunity
        </Text>
        <Text fontSize='16px' lineHeight='28px' mb='50px' color='white' textAlign='center'>
          We can help you to create your dream website for better business revenue
        </Text>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap='10px'
          mb='40px'
        >
          <Button>Contact with us</Button>
          <Button variant='transparent' color='white'>
            <FaRegPlayCircle size={35} />
            <Text as='span' ml='10px'>
              Watch Demo
            </Text>
          </Button>
        </Flex>
        <Flex gap='20px' justifyContent='center'>
          <Flex justifyContent='center' alignItems='center' gap='2'>
            <FaRegCheckCircle color='#175CFF' />
            <Text as='span' color='white'>
              Free call with our experts
            </Text>
          </Flex>
          <Flex justifyContent='center' alignItems='center' gap='2'>
            <FaRegCheckCircle color='#175CFF' />
            <Text as='span' color='white'>
              Reduce costs & working hours
            </Text>
          </Flex>
          <Flex justifyContent='center' alignItems='center' gap='2'>
            <FaRegCheckCircle color='#175CFF' />
            <Text as='span' color='white'>
              Competitive costs
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Support
