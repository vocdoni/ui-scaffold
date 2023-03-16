import { Flex, Icon } from '@chakra-ui/react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = () => (
  <Flex
    marginTop='auto'
    justifyContent='center'
    alignItems='center'
    gap={6}
    mb={4}
  >
    <Icon
      as={FaTwitter}
      w={6}
      h={6}
      color='branding.pink'
      cursor='pointer'
      _hover={{
        color: 'branding.pink2',
      }}
    />
    <Icon
      as={FaDiscord}
      w={6}
      h={6}
      color='branding.pink'
      cursor='pointer'
      _hover={{
        color: 'branding.pink2',
      }}
    />
    <Icon
      as={FaGithub}
      w={6}
      h={6}
      color='branding.pink'
      cursor='pointer'
      border='1px solid transparent'
      borderRadius='50%'
      _hover={{
        color: 'branding.pink2',
      }}
    />
  </Flex>
)

export default Footer
