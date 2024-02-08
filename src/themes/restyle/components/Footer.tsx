import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaStar } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import vcdLogo from '/assets/logo-classic.svg'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <>
      <Flex
        className='site-wrapper'
        py={{ base: '60px', md: '120px' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: '60px', lg: 0 }}
      >
        <Box flex='1 1 33%'>
          <Image src={vcdLogo} w='125px' mb='24px' />
          <Text fontSize='16px' lineHeight='28px' mb='24px' color='gray'>
            Our latest news, articles, and resources, we will sent to your inbox weekly
          </Text>
          <Flex alignItems='center' gap='10px' mb='24px'>
            <Input placeholder='Enter your email' h='48px' />
            <Button>Subscribe</Button>
          </Flex>
          <Text fontWeight='bold' color='#575757' fontSize='17px' lineHeight='20px' mb='5px'>
            10/10 Overall rating
          </Text>
          <Flex gap={1}>
            <FaStar color='#FFB116' /> <FaStar color='#FFB116' /> <FaStar color='#FFB116' /> <FaStar color='#FFB116' />{' '}
            <FaStar color='#FFB116' />
          </Flex>
        </Box>
        <Flex
          flex='1 1 67%'
          flexDirection={{ base: 'column', sm2: 'row' }}
          justifyContent={{ sm2: 'space-between', lg: 'space-around' }}
          gap={{ base: '30px', sm2: 0 }}
        >
          <Box>
            <Text fontWeight='bold' fontSize='18px' lineHeight='21px' mb='36px'>
              Primary Pages
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Home
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              About Us
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Services
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Career
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Integrations
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Integrations Single
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' fontSize='18px' lineHeight='21px' mb='36px'>
              Pages
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Pricing
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Blog
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Blog Details
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Contact
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Career Single
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Services Single
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold' fontSize='18px' lineHeight='21px' mb='36px'>
              Template
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Contact
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Support
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Suport Single
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Request for Demo
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Cooming Soon
            </Text>
            <Text my='10px' fontSize='15px' lineHeight='26px' color='gray'>
              Career Single
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex
        className='site-wrapper'
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '20px', md: '10px' }}
        justifyContent='space-between'
        alignItems='center'
        py='24px'
        borderTop='1px solid rgb(229, 229, 229)'
      >
        <Text as='span' color='gray' textAlign='center'>
          © 2022 Quiety Rights Reserved. Designed By ThemeTags
        </Text>
        <Flex gap='10px'>
          <Flex
            justifyContent='center'
            alignItems='center'
            borderRadius='sm'
            minW='30px'
            h='30px'
            border='1px solid gray'
          >
            <FaXTwitter size={15} color='gray' />
          </Flex>

          <Flex
            justifyContent='center'
            alignItems='center'
            borderRadius='sm'
            minW='30px'
            h='30px'
            border='1px solid gray'
          >
            <FaDiscord size={15} color='gray' />
          </Flex>
          <Flex
            justifyContent='center'
            alignItems='center'
            borderRadius='sm'
            minW='30px'
            h='30px'
            border='1px solid gray'
          >
            <FaGithub size={15} color='gray' />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
