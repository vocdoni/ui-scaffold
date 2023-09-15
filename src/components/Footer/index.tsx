import { Box, Code, Flex, Icon, Img, Link, List, ListItem, Text } from '@chakra-ui/react'
import { HR } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import poweredBy from '/assets/powered_by_aragon.png'
import logo from '/assets/vocdoni_logo.svg'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Flex flexWrap='wrap' justifyContent={{ base: 'space-around', lg: 'space-between' }} gap={{ base: 8, sm: 5 }}>
        <Flex order={{ base: 1, lg: 0 }} flexDirection='column' alignItems={{ base: 'center', lg: 'start' }} gap={2}>
          <Img src={logo} maxW={36} alt='vocdoni icon' />
          <Img src={poweredBy} maxW={36} alt='aragon icon' />
        </Flex>
        <Box
          flexGrow={0}
          flexShrink={0}
          flexBasis={{ base: '100%', md: '45%', lg: 'min-content' }}
          whiteSpace='nowrap'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold'>{t('footer.company').toUpperCase()}</Text>
          <List>
            <ListItem>
              <Link href='#'> {t('footer.about')}</Link>
            </ListItem>

            <ListItem>
              <Link href='#'>{t('footer.how_we_work')}</Link>
            </ListItem>

            <ListItem>
              <Link href='#'>{t('footer.blog')}</Link>
            </ListItem>
          </List>
        </Box>
        <Box
          flexGrow={0}
          flexShrink={0}
          flexBasis={{ base: '100%', md: '45%', lg: 'min-content' }}
          whiteSpace='nowrap'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold'>{t('footer.developers').toUpperCase()}</Text>
          <List>
            <ListItem>
              <Link href='https://developer.vocdoni.io/' target='_blank'>
                {t('footer.developer_portal')}
              </Link>
            </ListItem>
            <ListItem>
              <Link href='https://vocdoni.io/api' target='_blank'>
                {t('footer.vocdoni_api')}
              </Link>
            </ListItem>

            <ListItem>
              <Link href='https://vocdoni.app/' target='_blank'>
                {t('footer.vocdoni_app')}
              </Link>
            </ListItem>
          </List>
        </Box>
        <Box
          flexGrow={0}
          flexShrink={0}
          flexBasis={{ base: '100%', md: '45%', lg: 'min-content' }}
          whiteSpace='nowrap'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold'>{t('footer.resources').toUpperCase()}</Text>
          <List>
            <ListItem>
              <Link href='#'>{t('footer.guides')}</Link>
            </ListItem>
            <ListItem>
              <Link href='#'>{t('footer.tutorials')}</Link>
            </ListItem>
          </List>
        </Box>
        <Box
          flexGrow={0}
          flexShrink={0}
          flexBasis={{ base: '100%', md: '45%', lg: 'min-content' }}
          whiteSpace='nowrap'
          textAlign={{ base: 'center', lg: 'start' }}
        >
          <Text fontWeight='bold'>{t('footer.contact').toUpperCase()}</Text>
          <List>
            <ListItem>
              <Link href='mailto:info@vocdoni.com'>info@vocdoni.io</Link>
            </ListItem>
          </List>
        </Box>
      </Flex>
      <HR bgColor='black' />
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent={{ base: 'center', lg: 'space-between' }}
        alignItems={{ base: 'center', lg: 'start' }}
        gap={4}
      >
        <Code bg='bg_main' textAlign='center'>
          Copyrights 2022 Vocdoni, Inc. All rights reserved
        </Code>
        <Code bg='bg_main'>
          <Link href='#'>Terms of use & Privacy Policy</Link>
        </Code>

        <Flex justifyContent='center' alignItems='center' gap={6} mb={4}>
          <Link href='https://twitter.com/vocdoni'>
            <Icon aria-label={t('link.twitter').toString()} as={FaTwitter} w={6} h={6} cursor='pointer' />
          </Link>

          <Link href='https://chat.vocdoni.io/'>
            <Icon aria-label={t('link.discord').toString()} as={FaDiscord} w={6} h={6} cursor='pointer' />
          </Link>

          <Link href='https://github.com/vocdoni'>
            <Icon aria-label={t('link.github').toString()} as={FaGithub} w={6} h={6} cursor='pointer' />
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
