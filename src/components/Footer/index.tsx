import { Box, Code, Flex, Grid, Icon, Img, Link, List, ListItem, Text } from '@chakra-ui/react'
import { HR } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import vocdoni_logo from '../../assets/vocdoni_logo.svg'

const Footer = ({ ...props }) => {
  const { t } = useTranslation()

  return (
    <Box pt={5} {...props}>
      <Grid
        gridTemplateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gridTemplateRows={{
          base: 'min-content',
          md: 'repeat(2, 1fr)',
          lg: 'auto',
        }}
      >
        <Flex
          flexDirection='column'
          alignItems={{ base: 'center', lg: 'start' }}
          gap={2}
          gridColumn={{ base: '1/3', sm: '1/3', md: '1/5', lg: '1/2' }}
          gridRow={{ base: '5/6', md: '2/3', lg: '1/2' }}
        >
          <Img src={vocdoni_logo} maxW={36}></Img>
          <Img src={`/assets/powered_by_aragon.png`} maxW={36}></Img>
        </Flex>
        <Box textAlign={{ base: 'center', lg: 'start' }} mb={4}>
          <Text fontWeight='bold'>{t('footer.company').toUpperCase()}</Text>
          <List ml={0} textAlign={{ base: 'center', lg: 'start' }}>
            <ListItem>
              <Link href='#'> {t('footer.about')} </Link>
            </ListItem>

            <ListItem>
              <Link href='#'>{t('footer.how_we_work')}</Link>
            </ListItem>

            <ListItem>
              <Link href='#'>{t('footer.blog')} </Link>
            </ListItem>
          </List>
        </Box>
        <Box textAlign={{ base: 'center', lg: 'start' }} mb={4}>
          <Text fontWeight='bold'>{t('footer.developers').toUpperCase()}</Text>
          <List ml={0} textAlign={{ base: 'center', lg: 'start' }}>
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
        <Box textAlign={{ base: 'center', lg: 'start' }} mb={4}>
          <Text fontWeight='bold'>{t('footer.resources').toUpperCase()}</Text>
          <List ml={0} textAlign={{ base: 'center', lg: 'start' }}>
            <ListItem>
              <Link href='#'>{t('footer.guides')}</Link>
            </ListItem>
            <ListItem>
              <Link href='#'>{t('footer.tutorials')}</Link>
            </ListItem>
          </List>
        </Box>
        <Box textAlign={{ base: 'center', lg: 'start' }} mb={4}>
          <Text fontWeight='bold'>{t('footer.contact').toUpperCase()}</Text>
          <List display='flex' flexDirection='column' alignItems={{ base: 'center', lg: 'start' }} ml={0}>
            <ListItem>
              <Link href='mailto:info@vocdoni.com'>info@vocdoni.io</Link>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <HR bgColor='black' />
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent={{ base: 'center', lg: 'space-between' }}
        alignItems={{ base: 'center', lg: 'start' }}
        gap={4}
      >
        <Code bg='white'>
          <Text textAlign='center'>Copyrights 2022 Vocdoni, Inc. All rights reserved</Text>
        </Code>
        <Code bg='white'>
          <Link href='#'>
            <Text>Terms of use & Privacy Policy</Text>
          </Link>
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
