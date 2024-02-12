import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdDesignServices } from 'react-icons/md'
import process from '/assets/vocdoni_usage.jpg'

const Process = () => {
  const { t } = useTranslation()

  return (
    <Box as='section' className='site-wrapper' py={{ base: '60px', lg: '100px' }}>
      <Text color='#175CFF' fontWeight='bold' mb='6px' textAlign='center' fontSize='20px' lineHeight='24px'>
        {t('home.process.header')}
      </Text>
      <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px' textAlign='center'>
        {t('home.process.title')}
      </Text>
      <Text fontSize='16px' lineHeight='28px' color='gray' textAlign='center'>
        {t('home.process.description_1')}
      </Text>
      <Text fontSize='16px' lineHeight='28px' color='gray' mb='60px' textAlign='center'>
        {t('home.process.description_2')}
      </Text>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: '40px', lg: '60px' }}>
        <Flex flex='1 1 50%' justifyContent={{ base: 'center', lg: 'end' }} alignItems='center'>
          <Image src={process} borderRadius='lg' w='535px' />
        </Flex>
        <Flex flex='1 1' flexBasis={{ lg: '50%' }} flexDirection='column' justifyContent='space-between' gap='40px'>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                {t('home.process.step_1.header')}
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                {t('home.process.step_1.title')}
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                {t('home.process.step_1.description')}
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                {t('home.process.step_2.header')}
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                {t('home.process.step_2.title')}
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                {t('home.process.step_2.description')}
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                {t('home.process.step_3.header')}
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                {t('home.process.step_3.title')}
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                {t('home.process.step_3.description')}
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex
              justifyContent='center'
              alignItems='center'
              borderRadius='lg'
              minW='45px'
              h='45px'
              border='1px solid gray'
            >
              <MdDesignServices size={25} color='gray' />
            </Flex>
            <Box>
              <Text fontSize='17px' lineHeight='20.4px' color='#175CFF' fontWeight='bold' mb='6px'>
                {t('home.process.step_4.header')}
              </Text>
              <Text fontSize='20px' lineHeight='24px' fontWeight='bold' mb='8px'>
                {t('home.process.step_4.title')}
              </Text>
              <Text color='gray' fontSize='16px' lineHeight='28px'>
                {t('home.process.step_4.description')}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Process
