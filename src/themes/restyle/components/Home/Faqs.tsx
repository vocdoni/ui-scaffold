import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Faqs = () => {
  const { t } = useTranslation()

  return (
    <Box className='site-wrapper' py={{ base: '60px', xl: '120px' }}>
      <Text
        fontSize={{ base: '25px', lg: '30px', xl: '40px' }}
        lineHeight={{ base: '30px', lg: '36px', xl: '48px' }}
        fontWeight='bold'
        textAlign='center'
        mb='10px'
      >
        Frequently Ask Question
      </Text>
      <Text textAlign='center' mb='60px' color='gray'>
        What are you looking for and find the solution on our FAQ page
      </Text>
      <Flex flexDirection={{ base: 'column', md2: 'row' }} gap={{ base: '40px', md2: '60px' }}>
        <Box flex='1 1 50%'>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </Text>
          </Box>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Text>
          </Box>
          <Box borderBottom={{ base: '1px solid rgb(229, 229, 229)', md2: 'none' }}>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </Text>
          </Box>
        </Box>
        <Box flex='1 1 50%'>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </Text>
          </Box>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
          </Box>
          <Box borderBottom='1px solid rgb(229, 229, 229)' mb='40px'>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' mb='18px' lineHeight='30px'>
              Which domain should I purchase?
            </Text>
            <Text fontSize='15px' lineHeight='32px' mb='17px'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Faqs
