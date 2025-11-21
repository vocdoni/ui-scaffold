import { Box, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import vcdLogo from '/assets/logo-classic.svg'

const Footer = () => {
  const { t } = useTranslation()
  const invert = useColorModeValue('invert(0%)', 'invert(100%)')
  const privacyPolicyUrl = import.meta.env.PRIVACY_POLICY_URL
  const termsOfServiceUrl = import.meta.env.TERMS_OF_SERVICE_URL

  return (
    <>
      <Flex
        pt='24px'
        flexDirection={{ base: 'column', xl: 'row' }}
        alignItems='start'
        pb={{ base: '50px', xl: '24px' }}
        gap={6}
      >
        <Box flex='1 1 33%'>
          <Image src={vcdLogo} w='125px' mb='12px' filter={invert} alt={t('vocdoni logo')} />
          <Text fontSize='16px' lineHeight='28px'>
            {t('footer.footer_subtitle')}
          </Text>
        </Box>
        <Flex
          flex='1 1 67%'
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent={{ sm: 'space-between', lg: 'space-between' }}
          gap={{ base: '30px', sm: 0 }}
          mt={1}
          ml={{ xl: 10 }}
          w='full'
        >
          <Flex
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent='space-between'
            gap={{ base: '0px', xl: '90px' }}
            w='full'
          >
            <Text fontWeight='bold' fontSize='18px' lineHeight='21px' mb='16px' display='none'>
              {t('footer.company')}
            </Text>
            <Link fontWeight='bold' variant='footer' href='https://www.vocdoni.io' isExternal>
              Vocdoni
            </Link>
            <Link fontWeight='bold' variant='footer' href='https://www.vocdoni.io/about' whiteSpace='nowrap' isExternal>
              {t('footer.about_us')}
            </Link>
            <Link fontWeight='bold' variant='footer' href='https://www.vocdoni.io/contact' isExternal>
              {t('footer.contact')}
            </Link>
            <Link fontWeight='bold' variant='footer' href='https://www.vocdoni.io/api' isExternal>
              SDK
            </Link>
            <Link fontWeight='bold' variant='footer' href='https://developer.vocdoni.io' whiteSpace='nowrap' isExternal>
              {t('footer.developer_portal')}
            </Link>
            <Link fontWeight='bold' variant='footer' href='https://blog.vocdoni.io' isExternal>
              Blog
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width='full'
        m='0 auto'
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '20px', md: '10px' }}
        justifyContent='space-between'
        alignItems='center'
        py='12px'
        borderTop='1px solid rgb(229, 229, 229)'
      >
        <Text as='span' textAlign='center'>
          <Trans
            i18nKey='footer.terms_and_privacy'
            components={{
              link1: <Link href={termsOfServiceUrl} isExternal color='gray' />,
              link2: <Link href={privacyPolicyUrl} isExternal color='gray' />,
            }}
          />
        </Text>
        <Flex gap='10px'>
          <Link variant='icon' href='https://twitter.com/vocdoni' isExternal>
            <Icon aria-label={t('link.twitter').toString()} as={FaXTwitter} />
          </Link>

          <Link variant='icon' href='https://chat.vocdoni.io/' isExternal>
            <Icon aria-label={t('link.discord').toString()} as={FaDiscord} />
          </Link>

          <Link variant='icon' href='https://github.com/vocdoni' isExternal>
            <Icon aria-label={t('link.github').toString()} as={FaGithub} />
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
