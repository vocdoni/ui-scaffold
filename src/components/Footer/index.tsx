import { Flex, Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = ({ ...props }) => {
  const { t } = useTranslation()
  return (
    <Flex
      marginTop='auto'
      justifyContent='center'
      alignItems='center'
      gap={6}
      mb={4}
      {...props}
    >
      <Icon
        aria-label={t('link', { link: 'twitter' }).toString()}
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
        aria-label={t('link', { link: 'discord' }).toString()}
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
        aria-label={t('link', { link: 'github' }).toString()}
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
}

export default Footer
